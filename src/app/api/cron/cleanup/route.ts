import { NextResponse } from 'next/server';
import { getSupabaseAdmin } from '@/lib/supabase';

export async function GET(req: Request) {
  try {
    // Basic security for cron job if you are using Vercel Cron or similar
    const authHeader = req.headers.get('authorization');
    if (process.env.CRON_SECRET && authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    const supabase = getSupabaseAdmin();
    if (!supabase) {
      return NextResponse.json({ error: 'Supabase admin not configured' }, { status: 500 });
    }

    // 1. Find all expired transfers
    const { data: expiredTransfers, error: fetchError } = await supabase
      .from('file_transfers')
      .select('id')
      .lt('expires_at', new Date().toISOString());

    if (fetchError) {
      console.error('Error fetching expired transfers:', fetchError);
      return NextResponse.json({ error: 'Failed to fetch expired transfers' }, { status: 500 });
    }

    if (!expiredTransfers || expiredTransfers.length === 0) {
      return NextResponse.json({ message: 'No expired transfers to clean up.' });
    }

    let deletedCount = 0;
    let failedCount = 0;

    // 2. Process each expired transfer
    for (const transfer of expiredTransfers) {
      const { id } = transfer;

      try {
        // Delete all files in the storage bucket for this transfer ID
        const { data: files, error: listError } = await supabase
          .storage
          .from('transfers')
          .list(id);

        if (!listError && files && files.length > 0) {
          const filePaths = files.map(f => `${id}/${f.name}`);
          await supabase.storage.from('transfers').remove(filePaths);
        }

        // Delete the database record
        const { error: dbDeleteError } = await supabase
          .from('file_transfers')
          .delete()
          .eq('id', id);

        if (dbDeleteError) {
          console.error(`Failed to delete DB record for transfer ${id}:`, dbDeleteError);
          failedCount++;
        } else {
          deletedCount++;
        }
      } catch (err) {
        console.error(`Unexpected error cleaning up transfer ${id}:`, err);
        failedCount++;
      }
    }

    return NextResponse.json({
      message: 'Cleanup completed successfully.',
      deleted: deletedCount,
      failed: failedCount
    });

  } catch (err: any) {
    console.error('Cron Cleanup Error:', err);
    return NextResponse.json({ error: 'Internal server error during cleanup' }, { status: 500 });
  }
}
