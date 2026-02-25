import { NextRequest, NextResponse } from 'next/server'
import { requireSupabaseAdmin } from '@/libs/supabase'

/**
 * POST /api/works/create-upload-url
 *
 * Generate a presigned upload URL so the client can PUT a file directly to
 * Supabase storage without sending the file through this serverless function.
 * This avoids request body size limits and is more efficient.
 *
 * Request body: { filename: string }
 * Response: { uploadUrl: string, publicUrl: string } or { error: string }
 */
export async function POST(req: NextRequest) {
  let admin
  try {
    admin = requireSupabaseAdmin()
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 })
  }

  try {
    const { filename } = await req.json()

    if (!filename || typeof filename !== 'string') {
      return NextResponse.json(
        { error: 'Missing or invalid filename' },
        { status: 400 },
      )
    }

    // Generate a presigned upload URL valid for 1 hour (3600 seconds)
    const { data, error } = await admin.storage
      .from('works-images')
      .createSignedUploadUrl(filename, {
        upsert: false,
      })

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    // Get the public URL for reference (the client will use the signed URL to upload)
    const { data: publicUrlData } = admin.storage
      .from('works-images')
      .getPublicUrl(filename)

    return NextResponse.json({
      uploadUrl: data.signedUrl,
      publicUrl: publicUrlData.publicUrl,
    })
  } catch (err: any) {
    return NextResponse.json(
      { error: err.message || 'Failed to create upload URL' },
      { status: 500 },
    )
  }
}
