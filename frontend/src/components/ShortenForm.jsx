import { useState } from "react";
import "./ShortenForm.css";

function isLikelyUrl(value) {
  try {
    const withProtocol = /^https?:\/\//i.test(value) ? value : `https://${value}`;
    new URL(withProtocol);
    return true;
  } catch {
    return false;
  }
}

export default function ShortenForm({ onSubmit, submitting, error }) {
  const [value, setValue] = useState("");
  const [touched, setTouched] = useState(false);

  const valid = value.trim().length > 0 && isLikelyUrl(value.trim());

  function handleSubmit(e) {
    e.preventDefault();
    setTouched(true);
    if (!valid || submitting) return;
    const normalized = /^https?:\/\//i.test(value.trim())
      ? value.trim()
      : `https://${value.trim()}`;
    onSubmit(normalized);
  }

  return (
    <form className="shorten-form" onSubmit={handleSubmit}>
      <label className="shorten-label" htmlFor="long-url">
        Paste your long link
      </label>
      <div className="shorten-row">
        <input
          id="long-url"
          type="text"
          inputMode="url"
          autoComplete="off"
          placeholder="https://example.com/a/very/long/path?with=params"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onBlur={() => setTouched(true)}
          className="shorten-input"
        />
        <button type="submit" className="shorten-button" disabled={submitting}>
          {submitting ? "Snipping…" : "Snip it"}
        </button>
      </div>
      {touched && !valid && (
        <p className="shorten-hint">That doesn't look like a full web address yet.</p>
      )}
      {error && <p className="shorten-hint shorten-hint-error">{error}</p>}
    </form>
  );
}
