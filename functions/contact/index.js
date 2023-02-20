const opts = {
  headers: {
    'content-type': 'text/html;charset=UTF-8',
  }
}

const html = ""

export async function onRequest(context) {
  return new Response(html, opts);
}
