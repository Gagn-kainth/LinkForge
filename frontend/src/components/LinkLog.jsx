import { useState } from "react";
import { shortUrlFor } from "../api";
import "./LinkLog.css";

function truncate(url, max = 34) {
  return url.length > max ? `${url.slice(0, max - 1)}…` : url;
}

function LogRow({ index, link }) {
  const [copied, setCopied] = useState(false);
  const shortUrl = shortUrlFor(link.id);

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(shortUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
    
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
      </div>
      <span className="log-clicks">
        {link.totalClicks} {link.totalClicks === 1 ? "click" : "clicks"}
      </span>
      <button className="log-copy" onClick={handleCopy}>
        {copied ? "Copied" : "Copy"}
      </button>
    </div>
  );
}

export default function LinkLog({ links, loading }) {
  return (
    <section className="log-section">
      <span className="eyebrow">02 — your links</span>

      {loading && <p className="log-empty">Loading your links…</p>}

      {!loading && links.length === 0 && (
        <p className="log-empty">
          Nothing snipped yet. Your links will collect here as you create them.
        </p>
      )}

      {!loading && links.length > 0 && (
        <div className="log-list">
          {links.map((link, i) => (
            <LogRow key={link.id} index={i} link={link} />
          ))}
        </div>
      )}
    </section>
  );
}
