export default async (request) => {
  const kv = Netlify.kv;

  if (request.method === 'POST') {
    const body = await request.text();
    await kv.set('progress_data', body);
    return Response.json({ ok: true });
  }

  const data = await kv.get('progress_data');
  return new Response(data || '{}', {
    headers: { 'Content-Type': 'application/json' }
  });
};
