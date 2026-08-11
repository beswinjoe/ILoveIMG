import { NextResponse } from 'next/server';
import { getSupabaseAdmin } from '@/lib/supabase';
import crypto from 'crypto';

export async function POST(req: Request) {
  try {
    const { files, expiresInDays = 7, passwordHash, encryptedKey, salt } = await req.json();
    
    if (!files || !Array.isArray(files) || files.length === 0) {
      return NextResponse.json({ error: 'No files provided' }, { status: 400 });
    }
    
    const totalSize = files.reduce((acc: number, f: any) => acc + (f.size || 0), 0);
    const maxSizeMB = parseInt(process.env.NEXT_PUBLIC_MAX_FILE_SIZE_MB || '50'); // 50MB MVP Limit
    
    if (totalSize > maxSizeMB * 1024 * 1024) {
      return NextResponse.json({ error: `Total size exceeds maximum of ${maxSizeMB}MB` }, { status: 400 });
    }
    
    const supabase = getSupabaseAdmin();
    if (!supabase) {
      return NextResponse.json({ error: 'Supabase is not configured. File transfer is disabled. Please set up your .env.local file.' }, { status: 400 });
    }
    const shareId = crypto.randomUUID();
    
    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + Math.min(expiresInDays, 30));
    
    const primaryName = files.length === 1 ? files[0].name : `${files.length} files`;
    
    const { error: dbError } = await supabase
      .from('file_transfers')
      .insert({
        id: shareId,
        filename: primaryName,
        size: totalSize,
        password_hash: passwordHash || null,
        encrypted_key: encryptedKey || null,
        salt: salt || null,
        expires_at: expiresAt.toISOString()
      });
      
    if (dbError) {
      console.error("DB Error Message:", dbError.message);
      console.error("DB Error Code:", dbError.code);
      console.error("DB Error Details:", dbError.details);
      console.error("DB Error Hint:", dbError.hint);
      return NextResponse.json({ error: 'Database error. Ensure Supabase tables are created.' }, { status: 500 });
    }
    
    // Generate Signed Upload URLs for each file
    const uploadUrls = await Promise.all(files.map(async (file: any) => {
      const filePath = `${shareId}/${file.name}`;
      const { data, error } = await supabase.storage.from('transfers').createSignedUploadUrl(filePath);
      
      if (error) {
        console.error("Signed URL Error:", error);
        throw new Error(`Could not generate upload URL for ${file.name}`);
      }
      
      return {
        name: file.name,
        uploadUrl: data.signedUrl
      };
    }));
    
    return NextResponse.json({ shareId, uploadUrls });
    
  } catch (err: any) {
    console.error(err);
    return NextResponse.json({ error: err.message || 'Internal Server Error' }, { status: 500 });
  }
}
