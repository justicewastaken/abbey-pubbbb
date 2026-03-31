const GITHUB_API = "https://api.github.com/repos/justicewastaken/abbey-pubbbb/actions/workflows/refresh-events.yml/dispatches";

export const onRequestPost = async (context) => {
  try {
    const token = context.env?.GITHUB_WORKFLOW_TOKEN;

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
        "x-github-api-version": "2022-11-28",
      },
      body: JSON.stringify({ ref: "main" }),
    });

    if (!response.ok) {
      const text = await response.text();
      return new Response(
        JSON.stringify({
          error: "Failed to trigger refresh.",
          status: response.status,
          details: text,
        }),
        {
          status: 502,
          headers: { "content-type": "application/json" },
        },
      );
    }

    return new Response(JSON.stringify({ ok: true }), {
      headers: { "content-type": "application/json", "cache-control": "no-store" },
    });
  } catch (error) {
    return new Response(
      JSON.stringify({
        error: "Unhandled refresh exception.",
        details: error instanceof Error ? error.stack || error.message : String(error),
      }),
      {
        status: 500,
        headers: { "content-type": "application/json", "cache-control": "no-store" },
      },
    );
  }
};
