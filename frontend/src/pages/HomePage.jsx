import Hero from "../components/Hero";
import ShortenForm from "../components/ShortenForm";
import ResultCard from "../components/ResultCard";
import LinkLog from "../components/LinkLog";
import { useShortener } from "../hooks/useShortener";
import { useAuth } from "../context/AuthContext";
import { shortUrlFor } from "../api";

export default function HomePage() {
  const { isLoggedIn } = useAuth();
  const { result, links, loadingLinks, formError, submitting, shorten } =
    useShortener(isLoggedIn);

  return (
    <>
      <Hero />

      <ShortenForm onSubmit={shorten} submitting={submitting} error={formError} />

      {result && (
        <ResultCard
          key={result.id}
          longUrl={result.longUrl}
          shortUrl={shortUrlFor(result.id)}
        />
      )}

      <LinkLog links={links} loading={loadingLinks} isLoggedIn={isLoggedIn} />
    </>
  );
}
