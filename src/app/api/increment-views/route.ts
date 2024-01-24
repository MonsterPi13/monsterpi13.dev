import { NextRequest, NextResponse } from 'next/server'

import supabase from '@/lib/supabase/private'
import { getPost } from '@/lib/contentful'

export const runtime = 'edge'

export async function POST(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const slug = searchParams.get('slug')
  if (!slug) return NextResponse.json({ error: 'Missing slug parameter' }, { status: 400 })

  const res = await getPost(slug)

  try {
    await supabase.rpc('increment_view_count', { page_slug: slug, id: res.sys.id })
    return NextResponse.json({ messsage: `View count incremented successfully for slug: ${slug}` }, { status: 200 })
  } catch (error: any) {
    console.error('Error incrementing view count:', error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
