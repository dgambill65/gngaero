import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { ArrowLeft, ArrowRight, ExternalLink } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { getVideoBySlug, videoPath, videos } from "@/data/videos";
import NotFound from "@/pages/NotFound";

const formatVideoDate = (date: string) =>
  new Intl.DateTimeFormat("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(`${date}T00:00:00Z`));

const VideoDetail = () => {
  const { slug } = useParams();
  const video = slug ? getVideoBySlug(slug) : undefined;

  useEffect(() => {
    if (!video) return;

    const pageTitle = `${video.title} | GnG Aero Consulting`;
    const pageUrl = `https://gngaero.com${videoPath(video)}`;
    document.title = pageTitle;

    const upsertMeta = (attr: "name" | "property", key: string, value: string) => {
      let element = document.head.querySelector(
        `meta[${attr}="${key}"]`,
      ) as HTMLMetaElement | null;
      if (!element) {
        element = document.createElement("meta");
        element.setAttribute(attr, key);
        document.head.appendChild(element);
      }
      element.setAttribute("content", value);
    };

    upsertMeta("name", "description", video.summary);
    upsertMeta("property", "og:title", pageTitle);
    upsertMeta("property", "og:description", video.summary);
    upsertMeta("property", "og:url", pageUrl);
    upsertMeta("property", "og:type", video.youtubeId ? "video.other" : "article");
    upsertMeta("name", "twitter:card", "summary_large_image");
    upsertMeta("name", "twitter:title", pageTitle);
    upsertMeta("name", "twitter:description", video.summary);

    let canonical = document.head.querySelector(
      'link[rel="canonical"]',
    ) as HTMLLinkElement | null;
    if (!canonical) {
      canonical = document.createElement("link");
      canonical.rel = "canonical";
      document.head.appendChild(canonical);
    }
    canonical.href = pageUrl;

    if (!video.youtubeId) return;

    const script = document.createElement("script");
    script.id = "video-object-jsonld";
    script.type = "application/ld+json";
    script.textContent = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "VideoObject",
      name: video.title,
      description: video.summary,
      uploadDate: video.postDate,
      embedUrl: `https://www.youtube-nocookie.com/embed/${video.youtubeId}`,
      url: pageUrl,
    });
    document.head.appendChild(script);

    return () => script.remove();
  }, [video]);

  if (!video) return <NotFound />;

  const videoIndex = videos.findIndex((item) => item.slug === video.slug);
  const previous = videoIndex > 0 ? videos[videoIndex - 1] : undefined;
  const next = videoIndex < videos.length - 1 ? videos[videoIndex + 1] : undefined;
  const formattedDate = formatVideoDate(video.postDate);
  const postDateHasPassed = new Date(`${video.postDate}T23:59:59Z`).getTime() < Date.now();

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-24 pb-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <article className="max-w-3xl mx-auto">
            <Link
              to="/videos"
              className="inline-flex items-center text-sm font-medium text-primary hover:underline mb-8"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              All videos
            </Link>

            <header className="mb-10">
              <p className="text-sm font-semibold text-primary mb-3">
                Topic {video.topic} · {video.track === "technical" ? "Technical" : "Business"} ·{" "}
                {formattedDate} · {video.runtime}
              </p>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground leading-tight">
                {video.title}
              </h1>
            </header>

            {video.youtubeId ? (
              <div className="aspect-video mb-10 overflow-hidden rounded-lg bg-muted">
                <iframe
                  className="h-full w-full"
                  src={`https://www.youtube-nocookie.com/embed/${video.youtubeId}`}
                  title={video.title}
                  loading="lazy"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  referrerPolicy="strict-origin-when-cross-origin"
                  allowFullScreen
                />
              </div>
            ) : video.linkedinUrl ? (
              <Card className="border-border mb-10 bg-muted/30">
                <CardContent className="p-8 text-center">
                  <p className="text-lg font-medium text-foreground mb-5">This one is on LinkedIn.</p>
                  <Button asChild>
                    <a href={video.linkedinUrl} target="_blank" rel="noopener noreferrer">
                      Watch on LinkedIn <ExternalLink className="h-4 w-4" />
                    </a>
                  </Button>
                </CardContent>
              </Card>
            ) : (
              <div className="aspect-video mb-10 rounded-lg bg-muted border border-border flex items-center justify-center px-6 text-center">
                <p className="text-lg font-medium text-muted-foreground">
                  {video.status === "posted"
                    ? "Posted on LinkedIn — embed coming."
                    : postDateHasPassed
                      ? "Coming soon"
                      : `Posts ${formattedDate}`}
                </p>
              </div>
            )}

            <p className="text-lg text-muted-foreground leading-relaxed mb-8">{video.summary}</p>

            {video.keyLine && (
              <blockquote className="border-l-4 border-primary pl-5 py-2 mb-12 text-xl md:text-2xl font-medium italic text-foreground leading-relaxed">
                “{video.keyLine}”
              </blockquote>
            )}

            <nav
              className="grid grid-cols-1 sm:grid-cols-2 gap-4 py-8 border-y border-border mb-12"
              aria-label="Video topics"
            >
              <div>
                {previous && (
                  <Link to={videoPath(previous)} className="group inline-flex flex-col text-left">
                    <span className="text-xs text-muted-foreground mb-1">Previous topic</span>
                    <span className="inline-flex items-center font-medium text-foreground group-hover:text-primary">
                      <ArrowLeft className="h-4 w-4 mr-2" /> {previous.title}
                    </span>
                  </Link>
                )}
              </div>
              <div className="sm:text-right">
                {next && (
                  <Link to={videoPath(next)} className="group inline-flex flex-col sm:items-end text-left sm:text-right">
                    <span className="text-xs text-muted-foreground mb-1">Next topic</span>
                    <span className="inline-flex items-center font-medium text-foreground group-hover:text-primary">
                      {next.title} <ArrowRight className="h-4 w-4 ml-2" />
                    </span>
                  </Link>
                )}
              </div>
            </nav>

            <section className="bg-muted/30 border border-border rounded-lg p-6 sm:p-8">
              <h2 className="text-2xl font-bold text-foreground mb-3">Have a live problem?</h2>
              <p className="text-muted-foreground leading-relaxed mb-5">
                If this is a live problem on your program rather than background reading, a
                thirty-minute scope call is free.
              </p>
              <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-5">
                <Button asChild>
                  <a href="/#contact">Request a scope call</a>
                </Button>
                <Link to="/fdt" className="text-sm font-medium text-primary hover:underline">
                  Read the F&amp;DT paper
                </Link>
              </div>
            </section>
          </article>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default VideoDetail;