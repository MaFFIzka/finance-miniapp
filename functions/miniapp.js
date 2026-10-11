export async function onRequest(context) {
  const GAS_URL = 'https://script.google.com/macros/s/AKfycbzmQsT80R8BamkzCmwjRNBnxTAcz_zOqDZFc4ff_EiIM_U9ieozPYNJsljYLXZEoYyM/exec';

  if (context.request.method !== 'POST') {
    return new Response('Method Not Allowed', { status: 405 });
  }

  const body = await context.request.text();

  try {
    const gasResponse = await fetch(GAS_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: body,
      redirect: 'follow'
    });

    const responseText = await gasResponse.text();

    return new Response(responseText, {
      status: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json'
      }
    });
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), {
      status: 500,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json'
      }
    });
  }
}
