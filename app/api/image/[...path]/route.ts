// app/api/image/[...path]/route.ts
import { get } from '@vercel/blob';

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ path: string[] }> }
) {
  const { path } = await params;
  const pathname = path.join('/'); // "projects/netlify.png"

  // TODO: check the user's session here

  const result = await get(pathname, { access: 'private' });
  if (!result || result.statusCode !== 200) {
    return new Response('Not found', { status: 404 });
  }

  return new Response(result.stream, {
    headers: {
      'Content-Type': result.blob.contentType,
      'Cache-Control': 'private, max-age=3600',
    },
  });
}