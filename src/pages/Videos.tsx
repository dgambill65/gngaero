import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { Play } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { type VideoTopic, videoPath, videos } from "@/data/videos";

type Filter = "all" | VideoTopic["track"];

const PAGE_TITLE = "Videos | GnG Aero Consulting";
const PAGE_DESC =
  "Short videos from David Gambill on aircraft structures, certification, and engineering consulting.";
const PAGE_URL = "https://gngaero.com/videos";

const formatVideoDate = (date: string) =>
  new Intl.DateTimeFormat("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(`${date}T00:00:00Z`));

const Videos = () => {
  const [filter, setFilter] = useState<Filter>("all");
  const filteredVideos = useMemo(
    () => videos.filter((video) => filter === "all" || video.track === filter),
    [filter],
  );

  useEffect(() => {
    document.title = PAGE_TITLE;

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

    upsertMeta("name", "description", PAGE_DESC);
    upsertMeta("property", "og:title", PAGE_TITLE);
    upsertMeta("property", "og:description", PAGE_DESC);
    upsertMeta("property", "og:url", PAGE_URL);
    upsertMeta("property", "og:type", "website");
    upsertMeta("name", "twitter:card", "summary");

    let canonical = document.head.querySelector(
      'link[rel="canonical"]',
    ) as HTMLLinkElement | null;
    if (!canonical) {
      canonical = document.createElement("link");
      canonical.rel = "canonical";
      document.head.appendChild(canonical);
    }
    canonical.href = PAGE_URL;
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-24 pb-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <header className="max-w-3xl mb-10">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">Videos</h1>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Two to three minutes each. Structures, certification, and how I work — posted
              twice a week on LinkedIn.
            </p>
          </header>

          <div className="flex flex-wrap gap-2 mb-10" aria-label="Filter videos by track">
            {(["all", "technical", "business"] as const).map((option) => (
              <Button
                key={option}
                type="button"
                variant={filter === option ? "default" : "outline"}
                size="sm"
                aria-pressed={filter === option}
                onClick={() => setFilter(option)}
              >
                {option.charAt(0).toUpperCase() + option.slice(1)}
              </Button>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredVideos.map((video) => (
              <Link key={video.slug} to={videoPath(video)} className="group h-full">
                <Card className="h-full border-border transition-colors group-hover:border-primary/50 group-focus-visible:ring-2 group-focus-visible:ring-ring group-focus-visible:ring-offset-2">
                  <CardContent className="p-6 h-full flex flex-col">
                    <div className="flex items-center justify-between gap-3 mb-4">
                      <span className="text-xs font-semibold uppercase text-muted-foreground">
                        Topic {video.topic}
                      </span>
                      <Badge variant={video.track === "technical" ? "default" : "secondary"}>
                        {video.track === "technical" ? "Technical" : "Business"}
                      </Badge>
                    </div>
                    <h2 className="text-xl font-semibold text-foreground mb-3 leading-snug group-hover:text-primary transition-colors">
                      {video.title}
                    </h2>
                    <p className="text-sm text-muted-foreground leading-relaxed line-clamp-3 mb-4">
                      {video.summary}
                    </p>
                    {video.keyLine && (
                      <p className="text-sm text-foreground italic leading-relaxed mb-6">
                        “{video.keyLine}”
                      </p>
                    )}
                    <div className="mt-auto pt-4 border-t border-border flex items-center justify-between gap-3 text-xs text-muted-foreground">
                      <span>
                        {video.status === "scheduled" ? "Posts " : ""}
                        {formatVideoDate(video.postDate)} · {video.runtime}
                      </span>
                      {video.status === "posted" && video.youtubeId && (
                        <Play className="h-4 w-4 text-primary" aria-label="Play video" />
                      )}
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Videos;