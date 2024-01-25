import { NextRequest, NextResponse } from 'next/server'
import { revalidatePath } from 'next/cache'

export async function POST(request: NextRequest) {
  const requestHeaders = new Headers(request.headers)
  const secret = requestHeaders.get('x-vercel-reval-key')

  if (secret !== process.env.CONTENTFUL_REVALIDATE_SECRET) {
    return NextResponse.json({ message: 'Invalid secret' }, { status: 401 })
  }

  const path = requestHeaders.get('path') ?? '/'
  console.log('[path]', path)
  revalidatePath(path)

  return NextResponse.json({ revalidated: true, now: Date.now() }, { status: 200 })
}
