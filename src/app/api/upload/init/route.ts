import { NextResponse } from 'next/server';
import { getSupabaseAdmin } from '@/lib/supabase';
import crypto from 'crypto';

export async function POST(req: Request) {
  try {
    const { files, expiresInDays = 7, passwordHash, encryptedKey, salt, customSlug } = await req.json();
    
    if (!files || !Array.isArray(files) || files.length === 0) {
      return NextResponse.json({ error: 'No files provided' }, { status: 400 });
    }
    
    const totalSize = files.reduce((acc: number, f: any) => acc + (f.size || 0), 0);
    const maxSizeMB = parseInt(process.env.NEXT_PUBLIC_MAX_FILE_SIZE_MB || '300'); // 300MB MVP Limit
    
    if (totalSize > maxSizeMB * 1024 * 1024) {
      return NextResponse.json({ error: `Total size exceeds maximum of ${maxSizeMB}MB` }, { status: 400 });
    }

    let shareId: string = crypto.randomUUID();

    if (customSlug) {
      // Validate customSlug format safely
      const slugRegex = /^[a-z0-9-_]+$/;
      if (typeof customSlug !== 'string' || !slugRegex.test(customSlug) || customSlug.trim() === '') {
        return NextResponse.json({ error: 'Invalid custom link name. Use only lowercase letters, numbers, hyphens, and underscores.' }, { status: 400 });
      }

      // Check reserved routes
      const reservedSlugs = [
        'api', 'download', 'pricing', 'privacy', 'tools', 'image-tools', 'pdf-tools', 
        'audio-tools', 'documents', 'archive', '_next', 'static', 'public'
      ];
      if (reservedSlugs.includes(customSlug)) {
        return NextResponse.json({ error: 'This custom link name is reserved. Please choose another.' }, { status: 400 });
      }

      shareId = customSlug.trim();
    }
    
    const supabase = getSupabaseAdmin();
    if (!supabase) {
      return NextResponse.json({ error: 'Supabase configuration missing.' }, { status: 500 });
    }

    // If using a custom slug, ensure it's not already taken
    if (customSlug) {
      const { data: existing } = await supabase
        .from('file_transfers')
        .select('id')
        .eq('id', shareId)
        .maybeSingle();

      if (existing) {
        return NextResponse.json({ error: 'This custom link name is already taken. Please choose another.' }, { status: 409 });
      }
    }
    
    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + Math.min(expiresInDays, 30));
    
    const primaryName = files.length === 1 ? files[0].name : `${files.length} files`;
    
    const { error: dbError } = await supabase
      .from('file_transfers')
      .insert({
        id: shareId as any,
        filename: primaryName,
        size: totalSize,
        password_hash: passwordHash || null,
        encrypted_key: encryptedKey || null,
        salt: salt || null,
        expires_at: expiresAt.toISOString()
      });
      
    if (dbError) {
      console.error("DB Error creating transfer:");
      console.error("Message:", dbError.message);
      console.error("Code:", dbError.code);
      console.error("Details:", dbError.details);
      console.error("Hint:", dbError.hint);
      return NextResponse.json({ error: 'Transfer database is not configured or unavailable.' }, { status: 500 });
    }
    
    // Generate Signed Upload URLs for each file
    const uploadUrls = await Promise.all(files.map(async (file: any) => {
      // Sanitize file name to prevent path traversal
      const safeName = file.name.replace(/[^a-zA-Z0-9.\-_]/g, '_');
      const filePath = `${shareId}/${safeName}`;
      const { data, error } = await supabase.storage.from('transfers').createSignedUploadUrl(filePath);
      
      if (error) {
        console.error("Signed URL Error:", error.message);
        if (error.message && error.message.toLowerCase().includes('bucket not found')) {
           throw new Error("Transfer storage is not configured.");
        }
        throw new Error("Unable to prepare secure upload.");
      }
      
      return {
        name: file.name,
        safeName,
        uploadUrl: data.signedUrl
      };
    }));
    
    return NextResponse.json({ shareId, uploadUrls });
    
  } catch (err: any) {
    console.error("API Error:", err);
    return NextResponse.json({ error: err.message || 'Internal Server Error' }, { status: 500 });
  }
}
