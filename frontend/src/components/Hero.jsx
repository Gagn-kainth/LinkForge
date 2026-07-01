import "./Hero.css";

export default function Hero() {
  return (
    <header className="hero">
      <span className="eyebrow">01 — paste a link</span>
      <h1 className="wordmark">
        Snip<span className="wordmark-dot">.</span>
      </h1>
      <p className="tagline">
        A long web address goes in. An eight-character link comes out — with click
        tracking and a scannable code, built in.
      </p>
    </header>
  );
}
