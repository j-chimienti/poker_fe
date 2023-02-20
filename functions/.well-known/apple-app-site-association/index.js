const json = {
  "applinks": {
    "apps": [],
    "details": [
      {
        "appID": "5LV9Y4CY6W.com.bjack.space",
        "paths": ["*"]
      }
    ]
  }
}

const body = JSON.stringify(json)
const opts = {
  headers: {
    'content-type': "application/json"
  }
}
export async function onRequest(context) {
  return new Response(body, opts);
}


