const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:8001";

async function request(path, options) {
  const res = await fetch(`${API_BASE}${path}`, options);
  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    throw new Error(body.error || `Request failed (${res.status})`);
  }
  return res.json();
}

export function createShortUrl(url) {
  return request("/url", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ url }),
  });
}

export function getAllUrls() {
  return request("/url");
}

export function getAnalytics(shortId) {
  return request(`/url/analytics/${shortId}`);
}

export function shortUrlFor(shortId) {
  return `${API_BASE}/url/${shortId}`;
}

export { API_BASE };
