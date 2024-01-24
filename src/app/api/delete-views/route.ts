import supabase from '@/lib/supabase/private'
import { getPostById } from '@/lib/contentful'

import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  const requestHeaders = new Headers(request.headers)
  const secret = requestHeaders.get('x-vercel-reval-key')

  if (secret !== process.env.CONTENTFUL_REVALIDATE_SECRET) {
    return NextResponse.json({ message: 'Invalid secret' }, { status: 401 })
  }

  const searchParams = request.nextUrl.searchParams
  const id = searchParams.get('id')
  if (!id) return NextResponse.json({ error: 'Missing id parameter' }, { status: 400 })

  const slug = await getPostById(id)

  try {
    const res = await supabase.rpc('delete_view_count', { page_slug: slug })
    console.log('[res]', res)
    return NextResponse.json({ messsage: `View count Deleted successfully for slug: ${slug}` }, { status: 200 })
  } catch (error: any) {
    console.error('Error incrementing view count:', error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
