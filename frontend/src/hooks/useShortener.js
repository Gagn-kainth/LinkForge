import { useCallback, useEffect, useState } from "react";
import { createShortUrl, getMyUrls } from "../api";

// Owns all the state and API calls behind the shortener UI:
// the list of the current user's links, the most recent result, and form
// submission state.
//
// Shortening works for anyone. The links list only loads when logged in —
// /url/mine requires a session, so guests just see an empty, unfetched list.
export function useShortener(isLoggedIn) {
  const [result, setResult] = useState(null); // { id, longUrl } | null
  const [links, setLinks] = useState([]);
  const [loadingLinks, setLoadingLinks] = useState(false);
  const [formError, setFormError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const refreshLinks = useCallback(async () => {
    if (!isLoggedIn) {
      setLinks([]);
      return;
    }
    setLoadingLinks(true);
    try {
      const data = await getMyUrls();
      setLinks(data.urls);
    } catch {
      // session may have just expired — leave the log empty rather than crash
    } finally {
      setLoadingLinks(false);
    }
  }, [isLoggedIn]);

  useEffect(() => {
    refreshLinks();
  }, [refreshLinks]);

  async function shorten(longUrl) {
    setFormError("");
    setSubmitting(true);
    try {
      const data = await createShortUrl(longUrl);
      setResult({ id: data.id, longUrl });
      refreshLinks();
    } catch (err) {
      setFormError(err.message || "Could not shorten that link.");
    } finally {
      setSubmitting(false);
    }
  }

  return { result, links, loadingLinks, formError, submitting, shorten };
}
