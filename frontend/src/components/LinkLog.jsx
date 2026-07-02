import { useState } from "react";
import { Link } from "react-router-dom";
import { shortUrlFor } from "../api";
import "./LinkLog.css";

function truncate(url, max = 34) {
  return url.length > max ? `${url.slice(0, max - 1)}…` : url;
}

function LogRow({ index, link, onDelete }) {
  const [copied, setCopied] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [deleteError, setDeleteError] = useState("");
  const shortUrl = shortUrlFor(link.id);

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(shortUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      /* no-op */
    }
  }

  async function handleDelete() {
    const confirmed = window.confirm(`Delete /${link.id}? This can't be undone.`);
    if (!confirmed) return;

    setDeleteError("");
    setDeleting(true);
    try {
      await onDelete(link.id);
    } catch (err) {
      setDeleteError(err.message || "Couldn't delete that link.");
      setDeleting(false);
    }
  }

  return (
    <div className="log-row">
      <span className="log-index">{String(index + 1).padStart(2, "0")}</span>
      <div className="log-main">
        <a
          className="log-short"
          href={shortUrl}
          target="_blank"
          rel="noreferrer"
        >
          /{link.id}
        </a>
        <span className="log-long" title={link.redirectUrl}>
          {truncate(link.redirectUrl)}
        </span>
        {deleteError && <span className="log-delete-error">{deleteError}</span>}
      </div>
      <span className="log-clicks">
        {link.totalClicks} {link.totalClicks === 1 ? "click" : "clicks"}
      </span>
      <button className="log-copy" onClick={handleCopy}>
        {copied ? "Copied" : "Copy"}
      </button>
      <button className="log-delete" onClick={handleDelete} disabled={deleting}>
        {deleting ? "Deleting…" : "Delete"}
      </button>
    </div>
  );
}

export default function LinkLog({ links, loading, isLoggedIn, onDelete }) {
  return (
    <section className="log-section">
      <span className="eyebrow">02 — your links</span>

      {!isLoggedIn && (
        <p className="log-empty">
          <Link to="/signup" className="log-empty-link">
            Create an account
          </Link>{" "}
          to save every link you shorten to a dashboard like this one.
        </p>
      )}

      {isLoggedIn && loading && (
        <p className="log-empty">Loading your links…</p>
      )}

      {isLoggedIn && !loading && links.length === 0 && (
        <p className="log-empty">
          Nothing snipped yet. Your links will collect here as you create them.
        </p>
      )}

      {isLoggedIn && !loading && links.length > 0 && (
        <div className="log-list">
          {links.map((link, i) => (
            <LogRow key={link.id} index={i} link={link} onDelete={onDelete} />
          ))}
        </div>
      )}
    </section>
  );
}