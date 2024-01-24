import supabase from '@/lib/supabase/private'

import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  const requestHeaders = new Headers(request.headers)
  const secret = requestHeaders.get('x-vercel-reval-key')

  if (secret !== process.env.CONTENTFUL_REVALIDATE_SECRET) {
    return NextResponse.json({ message: 'Invalid secret' }, { status: 401 })
  }

  const data = await request.json()
  const { id } = data
  if (!id) return NextResponse.json({ error: 'Missing id parameter' }, { status: 400 })

  try {
    const res = await supabase.rpc('delete_view_count', { entry_id: id })
    return NextResponse.json({ messsage: `View count Deleted successfully for id: ${id}` }, { status: 200 })
  } catch (error: any) {
    console.error('Error incrementing view count:', error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
