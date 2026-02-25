import { NextRequest, NextResponse } from 'next/server'
import { requireSupabaseAdmin } from '@/libs/supabase'

// GET — گرفتن همه کارها
export async function GET() {
  let admin
  try {
    admin = requireSupabaseAdmin()
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 })
  }

  const { data, error } = await admin
    .from('works')
    .select('*')
    .order('sort_order', { ascending: true })
  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json(data)
}

// POST — اضافه کردن کار جدید
export async function POST(req: NextRequest) {
  const body = await req.json()
  let admin
  try {
    admin = requireSupabaseAdmin()
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 })
  }

  const { data, error } = await admin
    .from('works')
    .insert(body)
    .select()
    .single()
  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json(data, { status: 201 })
}

// PUT — ویرایش کار موجود
export async function PUT(req: NextRequest) {
  const body = await req.json()
  const { id, ...rest } = body
  let admin
  try {
    admin = requireSupabaseAdmin()
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 })
  }

  const { data, error } = await admin
    .from('works')
    .update(rest)
    .eq('id', id)
    .select()
    .single()
  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json(data)
}

// DELETE — حذف کار
export async function DELETE(req: NextRequest) {
  const id = new URL(req.url).searchParams.get('id')
  let admin
  try {
    admin = requireSupabaseAdmin()
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 })
  }

  const { error } = await admin.from('works').delete().eq('id', id)
  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ success: true })
}
