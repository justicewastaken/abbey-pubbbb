export const onRequestGet = async () => {
  const url = `https://raw.githubusercontent.com/justicewastaken/abbey-pubbbb/main/client/src/data/events-source.json?ts=${Date.now()}`;

  const response = await fetch(url, {
    headers: {
      Accept: "application/json",
      "Cache-Control": "no-cache",
    },
  });

  if (!response.ok) {
    return new Response(
      JSON.stringify({ error: "Unable to fetch latest events." }),
      {
        status: 502,
        headers: {
          "content-type": "application/json",
          "cache-control": "no-store",
        },
      },
    );
  }

  const body = await response.text();
  return new Response(body, {
    headers: {
      "content-type": "application/json",
      "cache-control": "no-store",
      "access-control-allow-origin": "*",
    },
  });
};
