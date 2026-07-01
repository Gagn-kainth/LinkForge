import { useCallback, useEffect, useState } from "react";
import { createShortUrl, getAllUrls } from "../api";

export function useShortener() {
  const [result, setResult] = useState(null);
  const [links, setLinks] = useState([]);
  const [loadingLinks, setLoadingLinks] = useState(true);
  const [formError, setFormError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const refreshLinks = useCallback(async () => {
    setLoadingLinks(true);
    try {
      const data = await getAllUrls();
      setLinks(data.urls);
    } catch {
    } finally {
      setLoadingLinks(false);
    }
  }, []);

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
