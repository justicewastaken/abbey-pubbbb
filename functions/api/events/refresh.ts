const GITHUB_API = "https://api.github.com/repos/justicewastaken/abbey-pubbbb/actions/workflows/refresh-events.yml/dispatches";

export const onRequestPost = async ({ env }) => {
  const token = env.GITHUB_WORKFLOW_TOKEN;

  if (!token) {
    return new Response(
      JSON.stringify({ error: "Missing workflow token." }),
      {
        status: 500,
        headers: { "content-type": "application/json" },
      },
    );
  }

  const response = await fetch(GITHUB_API, {
    method: "POST",
    headers: {
      authorization: `Bearer ${token}`,
      accept: "application/vnd.github+json",
      "content-type": "application/json",
      "user-agent": "abbey-events-refresh",
    },
    body: JSON.stringify({ ref: "main" }),
  });

  if (!response.ok) {
    const text = await response.text();
    return new Response(
      JSON.stringify({ error: "Failed to trigger refresh.", details: text }),
      {
        status: 502,
        headers: { "content-type": "application/json" },
      },
    );
  }

  return new Response(JSON.stringify({ ok: true }), {
    headers: { "content-type": "application/json", "cache-control": "no-store" },
  });
};
