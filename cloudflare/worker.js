const PUBLIC_ORIGIN = "https://glaubi.net";
const PAGES_ORIGIN = "https://robertzaufall.github.io";
const BASE = "/heglau2";
const REQUEST_HEADERS = [
  "accept",
  "accept-encoding",
  "range",
  "if-range",
  "if-none-match",
  "if-modified-since",
  "if-match",
  "if-unmodified-since",
];

const inScope = (path) => path === BASE || path.startsWith(`${BASE}/`);

function failure(request, status, message, extra = {}) {
  return new Response(request.method === "HEAD" ? null : message, {
    status,
    headers: {
      "content-type": "text/plain; charset=utf-8",
      "cache-control": "no-store",
      ...extra,
    },
  });
}

// The injectable transport lets tests exercise routing without live requests.
export async function proxy(request, fetchOrigin = fetch) {
  const url = new URL(request.url);
  if (url.hostname !== "glaubi.net" || !inScope(url.pathname))
    return failure(request, 404, "Seite nicht gefunden.");
  if (request.method !== "GET" && request.method !== "HEAD")
    return failure(request, 405, "Methode nicht erlaubt.", {
      allow: "GET, HEAD",
    });

  if (url.pathname === BASE || url.protocol !== "https:") {
    const destination = new URL(
      url.pathname === BASE ? `${BASE}/` : url.pathname,
      PUBLIC_ORIGIN,
    );
    destination.search = url.search;
    return Response.redirect(destination.href, 308);
  }

  const target = new URL(PAGES_ORIGIN);
  target.pathname = url.pathname;
  target.search = url.search;
  const headers = new Headers();
  for (const name of REQUEST_HEADERS)
    if (request.headers.has(name)) headers.set(name, request.headers.get(name));

  let upstream;
  try {
    upstream = await fetchOrigin(target.href, {
      method: request.method,
      headers,
      redirect: "manual",
      // Keep HTML current; versioned source URLs handle browser asset caching.
      ...(url.pathname.endsWith("/") || url.pathname.endsWith(".html")
        ? { cf: { cacheTtl: 0 } }
        : {}),
    });
  } catch {
    console.error("Heglau 2 origin request failed");
    return failure(
      request,
      502,
      "Die Website ist gerade nicht erreichbar. Bitte später erneut versuchen.",
    );
  }

  const outgoing = new Headers(upstream.headers);
  const location = outgoing.get("location");
  if (location) {
    const destination = new URL(location, target);
    // Origin redirects must stay inside this site and on the public hostname.
    if (destination.origin !== PAGES_ORIGIN || !inScope(destination.pathname)) {
      await upstream.body?.cancel();
      return failure(
        request,
        502,
        "Unerwartete Weiterleitung vom Hostinganbieter.",
      );
    }
    outgoing.set(
      "location",
      `${PUBLIC_ORIGIN}${destination.pathname}${destination.search}${destination.hash}`,
    );
  }
  if (upstream.status >= 400) {
    await upstream.body?.cancel();
    return failure(
      request,
      upstream.status,
      upstream.status === 404
        ? "Seite nicht gefunden."
        : "Die Website ist gerade nicht erreichbar.",
      upstream.status === 416 && outgoing.has("content-range")
        ? { "content-range": outgoing.get("content-range") }
        : {},
    );
  }
  outgoing.delete("set-cookie");
  outgoing.delete("server");
  outgoing.delete("x-github-request-id");
  outgoing.set("x-content-type-options", "nosniff");
  outgoing.set("referrer-policy", "strict-origin-when-cross-origin");
  if (outgoing.get("content-type")?.includes("text/html"))
    outgoing.set("cache-control", "no-cache");
  // Preserve validators, Content-Range and the stream, including large movies.
  return new Response(request.method === "HEAD" ? null : upstream.body, {
    status: upstream.status,
    statusText: upstream.statusText,
    headers: outgoing,
  });
}

export default { fetch: (request) => proxy(request) };
