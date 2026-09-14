import { useEffect, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhitepaperForm from "@/components/WhitepaperForm";

const PAGE_TITLE =
  "Fatigue & Damage Tolerance Planning for Hybrid eVTOL Structures | GnG Aero Consulting";
const PAGE_DESC =
  "Why the metal inside your composite airframe decides your inspection intervals — and why that decision is made two years before anyone writes a certification plan.";
const PAGE_URL = "https://gngaero.com/fdt";

const WRONG = [
  {
    title: "One test article will not substantiate both materials.",
    body: 'AC 20-107B says peak repeated loads are needed to demonstrate composite fatigue and damage tolerance in a limited number of component tests, and that "as a result, metal structures present in the test article generally require additional consideration and testing." The composite spectrum may be truncated at the low end but generally not clipped at the high end — close to the opposite of metallic practice. A program budgeting one full-scale fatigue test has budgeted for half the problem.',
  },
  {
    title: "Flaw tolerance is the requirement, not the upgrade.",
    body: "AC 29 MG 11 states twice that the enhanced safe-life and fail-safe flaw growth approaches are to be used unless shown to be impractical within the limitations of geometry, inspectability and good design practice. Safe life is the exception you have to argue for, per part — and all three of those limitations are frozen early.",
  },
  {
    title: "Inspection intervals are arithmetic, not judgment.",
    body: "The guidance prescribes how they are built: initial inspection at a third of the life to first detectable cracking, repetitive intervals at a quarter or a third of what follows, with minimum interval counts that differ for single and multiple load path structure. Which means the maintenance cost consequence of a configuration decision is computable before the structure exists.",
  },
];

const SECTIONS = [
  {
    title: "Why hybrid structure is the hard case",
    body: "two evaluation philosophies in one aircraft, and what the certification basis actually has to answer.",
  },
  {
    title: "The usage spectrum is a design input, not a documentation task",
    body: "helicopters have standardized loading sequences; powered-lift does not.",
  },
  {
    title: "Where the metal is, and why it governs",
    body: "the parts that set your retirement lives, and the three questions to have answered for each.",
  },
  {
    title: "Choosing the substantiation route",
    body: "safe life, flaw tolerant safe life, and fail-safe flaw growth, with what each costs to prove and to operate.",
  },
  {
    title: "Composite damage tolerance, without the hand-waving",
    body: "the five damage categories, the three growth approaches, and what a no-growth demonstration does not buy.",
  },
  {
    title: "Inspection intervals are product economics",
    body: "how a structural decision turns into dollars per flight hour, with a worked example on stated assumptions.",
  },
  {
    title: "Sequencing",
    body: "what has to happen, and when.",
  },
  {
    title: "A ninety-day starting plan",
    body: "four stages you can begin before the configuration is frozen.",
  },
  {
    title: "Five ways this planning fails",
    body: "",
  },
];

const sanitizeSource = (raw: string | null): string | null => {
  if (!raw) return null;
  const cleaned = raw.replace(/[^a-zA-Z0-9_-]/g, "").slice(0, 100);
  return cleaned.length > 0 ? cleaned : null;
};

const Fdt = () => {
  const [searchParams] = useSearchParams();
  const source = useMemo(
    () => sanitizeSource(searchParams.get("src")),
    [searchParams],
  );

  useEffect(() => {
    document.title = PAGE_TITLE;

    const upsertMeta = (attr: "name" | "property", key: string, value: string) => {
      let el = document.head.querySelector(
        `meta[${attr}="${key}"]`,
      ) as HTMLMetaElement | null;
      if (!el) {
        el = document.createElement("meta");
        el.setAttribute(attr, key);
        document.head.appendChild(el);
      }
      el.setAttribute("content", value);
    };

    upsertMeta("name", "description", PAGE_DESC);
    upsertMeta("property", "og:title", PAGE_TITLE);
    upsertMeta("property", "og:description", PAGE_DESC);
    upsertMeta("property", "og:url", PAGE_URL);
    upsertMeta("property", "og:type", "article");
    upsertMeta("name", "twitter:card", "summary_large_image");
    upsertMeta("name", "twitter:title", PAGE_TITLE);
    upsertMeta("name", "twitter:description", PAGE_DESC);

    let canonical = document.head.querySelector(
      'link[rel="canonical"]',
    ) as HTMLLinkElement | null;
    if (!canonical) {
      canonical = document.createElement("link");
      canonical.setAttribute("rel", "canonical");
      document.head.appendChild(canonical);
    }
    canonical.setAttribute("href", PAGE_URL);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="pt-24 pb-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto">
            <header className="mb-12">
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-5 leading-tight">
                Fatigue &amp; Damage Tolerance Planning for Hybrid eVTOL Structures
              </h1>
              <p className="text-lg md:text-xl text-foreground/90 font-medium leading-relaxed mb-4">
                Why the metal inside your composite airframe decides your inspection
                intervals — and why that decision is made two years before anyone writes a
                certification plan.
              </p>
              <p className="text-sm text-muted-foreground">
                31 pages · 18 sources · David Gambill, GnG Aero Consulting
              </p>
            </header>

            <p className="text-muted-foreground leading-relaxed mb-14">
              Powered-lift airframes run two evaluation philosophies at once. The composite
              shell sizes the static case. The metallic fittings, joints and mounts set the
              inspection program the operator pays for. Most programs discover the second
              half late, when the cheap fixes have already been designed out.
            </p>

            <section className="mb-14">
              <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-6">
                Three things in here that most programs get wrong
              </h2>
              <div className="space-y-6">
                {WRONG.map((item) => (
                  <Card key={item.title} className="border-border">
                    <CardContent className="p-6">
                      <h3 className="font-semibold text-foreground mb-2">{item.title}</h3>
                      <p className="text-muted-foreground leading-relaxed">{item.body}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </section>

            <section className="mb-14">
              <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-6">
                What's inside
              </h2>
              <ol className="space-y-4">
                {SECTIONS.map((section, index) => (
                  <li key={section.title} className="flex gap-4">
                    <span
                      aria-hidden="true"
                      className="text-primary font-semibold shrink-0 w-6"
                    >
                      {index + 1}.
                    </span>
                    <p className="text-muted-foreground leading-relaxed">
                      <span className="text-foreground font-medium">{section.title}</span>
                      {section.body ? ` — ${section.body}` : ""}
                    </p>
                  </li>
                ))}
              </ol>
              <p className="text-muted-foreground leading-relaxed mt-5">
                Plus a starting critical parts list, a glossary, and a full reference list.
              </p>
            </section>

            <section className="mb-14">
              <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
                Who it's for
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                Founders, VPs of Engineering, chief engineers and structures leads on
                powered-lift programs — and investors doing technical diligence.
              </p>
            </section>

            <section id="get-the-paper" className="mb-14">
              <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-6">
                Get the paper
              </h2>
              <Card className="border-border">
                <CardContent className="p-6 sm:p-8">
                  <WhitepaperForm source={source} />
                </CardContent>
              </Card>
            </section>

            <section className="mb-10">
              <Card className="border-border bg-muted/30">
                <CardContent className="p-6">
                  <p className="text-muted-foreground leading-relaxed">
                    David Gambill has spent thirty years in aerospace structures and
                    certification — the CH-47 Chinook at Boeing Philadelphia, the AW609
                    civil tiltrotor, the F-16 at General Dynamics, and multiple eVTOL and
                    advanced air mobility programs. He holds two U.S. patents in VTOL
                    aircraft design and runs GnG Aero Consulting.
                  </p>
                </CardContent>
              </Card>
            </section>

            <p className="text-muted-foreground leading-relaxed">
              If one of these is a live problem on your program rather than background
              reading,{" "}
              <a href="/#contact" className="text-primary font-medium hover:underline">
                a thirty-minute scope call
              </a>{" "}
              is free.
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Fdt;
