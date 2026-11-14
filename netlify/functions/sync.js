export default async (request) => {
  const { getStore } = await import('@netlify/blobs');
  const store = getStore('progress');

  if (request.method === 'POST') {
    const body = await request.text();
    await store.set('data', body);
    return Response.json({ ok: true });
  }

  const data = await store.get('data');
  return new Response(data || '{}', {
    headers: { 'Content-Type': 'application/json' }
  });
};
