const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:8001";

const TOKEN_KEY = "linkforge_token";

export function getToken() {
  return localStorage.getItem(TOKEN_KEY);
}

export function setToken(token) {
  localStorage.setItem(TOKEN_KEY, token);
}

export function clearToken() {
  localStorage.removeItem(TOKEN_KEY);
}

async function request(path, options = {}) {
  const token = getToken();
  const headers = { ...(options.headers || {}) };
  if (token) headers.Authorization = `Bearer ${token}`;

  const res = await fetch(`${API_BASE}${path}`, { ...options, headers });
  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    throw new Error(body.error || `Request failed (${res.status})`);
  }
  return res.json();
}

function jsonRequest(path, method, payload) {
  return request(path, {
    method,
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
}

export function createShortUrl(url) {
  return jsonRequest("/url", "POST", { url });
}
export function getMyUrls() {
  return request("/url/mine");
}

export function getAnalytics(shortId) {
  return request(`/url/analytics/${shortId}`);
}

export function shortUrlFor(shortId) {
  return `${API_BASE}/url/${shortId}`;
}

export function signup(email, password) {
  return jsonRequest("/auth/signup", "POST", { email, password });
}

export function login(email, password) {
  return jsonRequest("/auth/login", "POST", { email, password });
}

export function fetchMe() {
  return request("/auth/me");
}

export { API_BASE };
