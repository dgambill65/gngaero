import { Link } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Mail,
  Linkedin,
  MapPin,
  Phone,
  ArrowLeft,
  Plane,
  Compass,
  Lightbulb,
  Quote,
} from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import davidPhoto400w from "@/assets/david-gambill-400w.jpg.asset.json";
import davidPhoto400wWebp from "@/assets/david-gambill-400w.webp.asset.json";
import davidPhoto800w from "@/assets/david-gambill-800w.jpg.asset.json";
import davidPhoto800wWebp from "@/assets/david-gambill-800w.webp.asset.json";

const focusAreas = [
  "eVTOL & Advanced Air Mobility",
  "Rotorcraft & Tiltrotor",
  "FAA / EASA Certification Strategy",
  "Systems Engineering (MBSE)",
  "Digital Engineering & PLM",
  "AI-Assisted Workflows",
];

const highlights = [
  {
    icon: Plane,
    title: "30+ years in aerospace",
    body: "From Boeing rotorcraft structures to chief-engineer roles at eVTOL and tiltrotor startups — XTI, Doroni, EOS, and the AW609 program at Leonardo AgustaWestland.",
  },
  {
    icon: Compass,
    title: "Founder, GnG Design",
    body: "Advising early-stage aerospace teams on systems integration, configuration control, and the engineering backbone needed to reach design-review and certification milestones.",
  },
  {
    icon: Lightbulb,
    title: "Two U.S. patents",
    body: "Inventor on patents covering wing fences for VTOL aircraft and lift-plus-cruise quadcopter control — practical IP from years on the drawing board.",
  },
];

const FOUNDER_TITLE = "David Gambill — Founder | GnG Design Consultants";
const FOUNDER_DESC =
  "Meet David Gambill, Founder of GnG Design — aerospace engineer with 30+ years in rotorcraft, tiltrotor, eVTOL and certification leadership.";
const FOUNDER_URL = "https://gngaero.lovable.app/founder";

const Founder = () => {
  useEffect(() => {
    document.title = FOUNDER_TITLE;

    const upsertMeta = (attr: "name" | "property", key: string, value: string) => {
      let el = document.head.querySelector(
        `meta[${attr}="${key}"]`
      ) as HTMLMetaElement | null;
      if (!el) {
        el = document.createElement("meta");
        el.setAttribute(attr, key);
        document.head.appendChild(el);
      }
      el.setAttribute("content", value);
    };

    upsertMeta("name", "description", FOUNDER_DESC);
    upsertMeta("property", "og:title", FOUNDER_TITLE);
    upsertMeta("property", "og:description", FOUNDER_DESC);
    upsertMeta("property", "og:url", FOUNDER_URL);
    upsertMeta("property", "og:type", "profile");

    let canonical = document.head.querySelector(
      'link[rel="canonical"]'
    ) as HTMLLinkElement | null;
    if (!canonical) {
      canonical = document.createElement("link");
      canonical.setAttribute("rel", "canonical");
      document.head.appendChild(canonical);
    }
    canonical.setAttribute("href", FOUNDER_URL);

    const ldId = "founder-person-jsonld";
    let ld = document.getElementById(ldId) as HTMLScriptElement | null;
    if (!ld) {
      ld = document.createElement("script");
      ld.id = ldId;
      ld.type = "application/ld+json";
      document.head.appendChild(ld);
    }
    ld.textContent = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "Person",
      name: "David Gambill",
      jobTitle: "Founder & CEO",
      url: FOUNDER_URL,
      worksFor: {
        "@type": "Organization",
        name: "GnG Design Consultants",
      },
      address: {
        "@type": "PostalAddress",
        addressLocality: "West Chester",
        addressRegion: "PA",
        addressCountry: "US",
      },
      alumniOf: [
        { "@type": "CollegeOrUniversity", name: "University of Texas at Arlington" },
        { "@type": "CollegeOrUniversity", name: "University of Phoenix" },
      ],
      knowsAbout: [
        "Aerospace Engineering",
        "eVTOL",
        "Rotorcraft",
        "FAA Certification",
        "ASTM F3264",
        "MBSE",
        "Systems Integration",
      ],
    });

    return () => {
      ld?.remove();
    };
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="pt-24">
        {/* Hero */}
        <section className="bg-gradient-to-br from-primary to-primary-dark text-primary-foreground">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
            <Link
              to="/"
              className="inline-flex items-center text-primary-foreground/80 hover:text-primary-foreground mb-10 transition-colors"
            >
              <ArrowLeft className="h-4 w-4 mr-2" /> Back to Home
            </Link>

            <div className="flex flex-col items-center text-center">
              <div className="relative mb-8">
                <picture>
                  <source
                    type="image/webp"
                    srcSet={`${davidPhoto400wWebp.url} 400w, ${davidPhoto800wWebp.url} 800w`}
                    sizes="(max-width: 768px) 256px, 320px"
                  />
                  <img
                    src={davidPhoto800w.url}
                    srcSet={`${davidPhoto400w.url} 400w, ${davidPhoto800w.url} 800w`}
                    sizes="(max-width: 768px) 256px, 320px"
                    alt="Portrait of David Gambill, Founder of GnG Design Consultants"
                    className="w-64 h-64 md:w-80 md:h-80 rounded-full object-cover shadow-2xl ring-4 ring-primary-foreground/25"
                    loading="eager"
                    width={320}
                    height={320}
                  />
                </picture>
                <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 bg-primary-foreground text-primary text-sm font-semibold px-4 py-1.5 rounded-full shadow-lg">
                  Founder & CEO
                </div>
              </div>

              <h1 className="text-4xl md:text-6xl font-bold mb-4">
                David Gambill
              </h1>
              <p className="text-xl md:text-2xl text-primary-foreground/90 mb-8 max-w-2xl">
                Aerospace engineer helping early-stage VTOL and fixed-wing teams
                build the technical backbone to reach flight and certification.
              </p>

              <div className="flex flex-wrap justify-center gap-6 text-primary-foreground/90 mb-8">
                <span className="inline-flex items-center gap-2">
                  <MapPin className="h-4 w-4" /> West Chester, PA
                </span>
                <span className="inline-flex items-center gap-2">
                  <Phone className="h-4 w-4" /> 610-996-7934
                </span>
              </div>

              <div className="flex flex-wrap justify-center gap-3">
                <Button asChild variant="secondary" size="lg">
                  <a href="mailto:davidg@gngdesignllc.com">
                    <Mail className="h-4 w-4 mr-2" /> Email David
                  </a>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  size="lg"
                  className="border-primary-foreground bg-transparent text-primary-foreground hover:bg-primary-foreground hover:text-primary"
                >
                  <a
                    href="https://linkedin.com/in/davidgambill"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Linkedin className="h-4 w-4 mr-2" /> LinkedIn
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Story */}
        <section className="py-16 lg:py-24">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-3xl">
            <h2 className="text-3xl font-bold text-foreground mb-8">My Story</h2>
            <div className="space-y-6 text-lg text-muted-foreground leading-relaxed">
              <p>
                I've spent my career on aircraft that didn't exist yet — rapid
                prototyping at Boeing, the AW609 tiltrotor at Leonardo
                AgustaWestland, and chief-engineer seats at three eVTOL and
                hybrid-VTOL startups. The constant thread is taking a fuzzy
                concept and turning it into something a team can actually build,
                review, and certify.
              </p>
              <p>
                I started GnG Design to bring that experience to founders who
                are brilliant on the technology but stuck on the engineering
                machinery around it — requirements, configuration control, gate
                reviews, FAA strategy, the digital thread that holds it all
                together. The work is hands-on. I sit with your team, not above
                it.
              </p>
              <p>
                When I'm not in CAD or a design review, I'm exploring how AI
                tools change the way small aerospace teams move — the same
                workflows the big OEMs take years to adopt are practical for a
                ten-person startup today.
              </p>
            </div>
          </div>
        </section>

        {/* Quote */}
        <section className="py-12 bg-muted/40">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-3xl">
            <Quote className="h-10 w-10 text-primary mb-4" aria-hidden="true" />
            <blockquote className="text-2xl md:text-3xl font-medium text-foreground leading-snug">
              "Most aerospace startups don't fail at the idea. They stall at the
              engineering discipline needed to fly it."
            </blockquote>
            <p className="mt-4 text-muted-foreground">— David Gambill</p>
          </div>
        </section>

        {/* Highlights */}
        <section className="py-16 lg:py-24">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">
            <h2 className="text-3xl font-bold text-foreground mb-10">
              At a glance
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              {highlights.map(({ icon: Icon, title, body }) => (
                <div
                  key={title}
                  className="rounded-2xl border border-border bg-card p-6 shadow-sm"
                >
                  <Icon className="h-8 w-8 text-primary mb-4" aria-hidden="true" />
                  <h3 className="text-lg font-semibold text-foreground mb-2">
                    {title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">{body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Focus areas */}
        <section className="py-16 lg:py-20 bg-muted/40">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
            <h2 className="text-3xl font-bold text-foreground mb-3">
              What I focus on
            </h2>
            <p className="text-muted-foreground mb-8 text-lg">
              The areas where I tend to add the most leverage to a program.
            </p>
            <div className="flex flex-wrap gap-3">
              {focusAreas.map((c) => (
                <Badge
                  key={c}
                  variant="secondary"
                  className="text-sm py-2 px-4 bg-accent text-accent-foreground hover:bg-accent"
                >
                  {c}
                </Badge>
              ))}
            </div>
          </div>
        </section>

        {/* Background */}
        <section className="py-16 lg:py-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-3xl">
            <h2 className="text-3xl font-bold text-foreground mb-6">
              Background
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed mb-8">
              B.S. in Aerospace Engineering from the University of Texas at
              Arlington and an MBA in Technology Management from the University
              of Phoenix. Career roles include Senior Structures & Payloads
              Engineer at The Boeing Company, Design Quality Leader on the AW609
              at AgustaWestland (Leonardo), Chief Engineer at XTI Aircraft,
              Chief Aerospace Engineer at Doroni Aerospace, and Head of Design
              & Integration at EOS Aircraft. Based in the Philadelphia area,
              working remotely and on-site with clients worldwide.
            </p>
            <Button asChild variant="outline">
              <a
                href="https://linkedin.com/in/davidgambill"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Linkedin className="h-4 w-4 mr-2" /> Full career on LinkedIn
              </a>
            </Button>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 bg-gradient-to-br from-primary to-primary-dark text-primary-foreground text-center">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-3xl">
            <h2 className="text-3xl font-bold mb-4">
              Let's talk about your program
            </h2>
            <p className="text-primary-foreground/90 mb-8 text-lg">
              Whether you're heading into PDR, a certification gate, or just
              trying to get the engineering org pointed in the right direction —
              I'd love to hear what you're building.
            </p>
            <Button asChild variant="secondary" size="lg">
              <Link to="/#contact">Get in Touch</Link>
            </Button>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Founder;
