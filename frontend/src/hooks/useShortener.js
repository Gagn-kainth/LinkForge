import { useCallback, useEffect, useState } from "react";
import { createShortUrl, getMyUrls, deleteUrl } from "../api";

export function useShortener(isLoggedIn) {
  const [result, setResult] = useState(null);
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


  async function deleteLink(shortId) {
    await deleteUrl(shortId);
    setLinks((prev) => prev.filter((link) => link.id !== shortId));
  }

  return { result, links, loadingLinks, formError, submitting, shorten, deleteLink };
}