import { NextResponse } from 'next/server';
import { getSupabaseAdmin } from '@/lib/supabase';
import crypto from 'crypto';

export async function GET(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const supabase = getSupabaseAdmin();
    const { id } = await params;
    
    const { data, error } = await supabase
      .from('file_transfers')
      .select('filename, size, expires_at, password_hash')
      .eq('id', id)
      .single();
      
    if (error || !data) {
      return NextResponse.json({ error: 'Transfer not found or expired' }, { status: 404 });
    }
    
    if (new Date(data.expires_at) < new Date()) {
      return NextResponse.json({ error: 'This transfer has expired' }, { status: 410 });
    }
    
    // Fetch actual file list from storage
    const { data: filesData, error: filesError } = await supabase.storage.from('transfers').list(id);
    let files = [];
    if (!filesError && filesData) {
      files = filesData.filter(f => f.name !== '.emptyFolderPlaceholder').map(f => ({ name: f.name, size: f.metadata?.size || 0 }));
    }
    
    return NextResponse.json({
      filename: data.filename,
      size: data.size,
      expiresAt: data.expires_at,
      isProtected: !!data.password_hash,
      files: files.length > 0 ? files : [{ name: data.filename, size: data.size }]
    });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || 'Internal Server Error' }, { status: 500 });
  }
}

export async function POST(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const supabase = getSupabaseAdmin();
    const { id } = await params;
    
    // Safety check for empty body
    let password = null;
    try {
      const body = await req.json();
      password = body.password;
    } catch (e) {
      // no body provided
    }
    
    const { data, error } = await supabase
      .from('file_transfers')
      .select('password_hash, expires_at, encrypted_key, salt')
      .eq('id', id)
      .single();
      
    if (error || !data) {
      return NextResponse.json({ error: 'Transfer not found' }, { status: 404 });
    }
    
    if (new Date(data.expires_at) < new Date()) {
      return NextResponse.json({ error: 'This transfer has expired' }, { status: 410 });
    }
    
    if (data.password_hash) {
      if (!password) {
        return NextResponse.json({ error: 'Password required' }, { status: 401 });
      }
      const attemptHash = crypto.createHash('sha256').update(password).digest('hex');
      if (attemptHash !== data.password_hash) {
        return NextResponse.json({ error: 'Incorrect password' }, { status: 401 });
      }
    }
    
    // Fetch actual file list from storage
    const { data: filesData, error: filesError } = await supabase.storage.from('transfers').list(id);
    if (filesError || !filesData || filesData.length === 0) {
      return NextResponse.json({ error: 'No files found in storage' }, { status: 404 });
    }

    // Generate signed download URLs for all files
    const downloadUrls = await Promise.all(filesData.filter(f => f.name !== '.emptyFolderPlaceholder').map(async (f) => {
      const filePath = `${id}/${f.name}`;
      const { data: urlData, error: urlError } = await supabase
        .storage
        .from('transfers')
        .createSignedUrl(filePath, 3600, { download: f.name });
      
      if (urlError) throw urlError;
      return { name: f.name, downloadUrl: urlData.signedUrl };
    }));
    
    return NextResponse.json({ 
      downloadUrls,
      encryptedKey: data.encrypted_key,
      salt: data.salt
    });
    
  } catch (err: any) {
    return NextResponse.json({ error: err.message || 'Internal Server Error' }, { status: 500 });
  }
}
