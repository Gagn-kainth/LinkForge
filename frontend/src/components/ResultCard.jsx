import { useState } from "react";
import { QRCodeSVG } from "qrcode.react";
import "./ResultCard.css";

function truncate(url, max = 46) {
  return url.length > max ? `${url.slice(0, max - 1)}…` : url;
}

export default function ResultCard({ longUrl, shortUrl }) {
  const [copied, setCopied] = useState(false);
  const [showQr, setShowQr] = useState(false);

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(shortUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
    
    }
  }

  return (
    <div className="result-card">
      <div className="result-chain">
        <span className="result-long" title={longUrl}>
          {truncate(longUrl)}
        </span>
        <span className="result-link-icon" aria-hidden="true">
          ⟶
        </span>
        <span className="result-short">{shortUrl}</span>
      </div>

      <div className="result-actions">
        <button className="result-btn result-btn-primary" onClick={handleCopy}>
          {copied ? "Copied" : "Copy link"}
        </button>
        <button className="result-btn" onClick={() => setShowQr((v) => !v)}>
          {showQr ? "Hide QR code" : "Show QR code"}
        </button>
      </div>

      {showQr && (
        <div className="result-qr">
          <div className="result-qr-box">
            <QRCodeSVG value={shortUrl} size={168} bgColor="#f7f5f0" fgColor="#14121f" />
          </div>
          <p className="result-qr-caption">Scan to open the short link</p>
        </div>
      )}
    </div>
  );
}
