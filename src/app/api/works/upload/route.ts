import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/libs/supabase'

export async function POST(req: NextRequest) {
  const formData = await req.formData()
  const file = formData.get('file') as File
  if (!file) return NextResponse.json({ error: 'No file' }, { status: 400 })

  const ext = file.name.split('.').pop()
  const name = `${Date.now()}.${ext}`
  const buffer = Buffer.from(await file.arrayBuffer())

  const { data, error } = await supabaseAdmin.storage
    .from('works-images')
    .upload(name, buffer, { contentType: file.type, cacheControl: '31536000' })

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })

  const { data: url } = supabaseAdmin.storage
    .from('works-images')
    .getPublicUrl(data.path)

  return NextResponse.json({ url: url.publicUrl })
}