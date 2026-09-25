import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, FileText } from "lucide-react";
import WhitepaperForm from "@/components/WhitepaperForm";

const BULLETS = [
  "31 pages, fully referenced — 18 sources, each read rather than summarized",
  "Why one full-scale test article will not substantiate both materials",
  "How inspection intervals are actually constructed, and what they cost per flight hour",
  "A ninety-day plan you can start before the configuration is frozen",
];

const Resources = () => {
  return (
    <section id="resources" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Resources
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Engineering write-ups from the work.
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          <Card className="border-border">
            <CardContent className="p-6 sm:p-8">
              <div className="flex flex-col sm:flex-row items-start gap-4 mb-6">
                <div className="p-3 bg-accent rounded-lg shrink-0">
                  <FileText className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="text-xl md:text-2xl font-semibold text-foreground mb-3">
                    Fatigue &amp; Damage Tolerance Planning for Hybrid eVTOL Structures
                  </h3>
                  <p className="text-base text-foreground/90 font-medium leading-relaxed mb-3">
                    Why the metal inside your composite airframe decides your inspection
                    intervals — and why that decision is made two years before anyone writes a
                    certification plan.
                  </p>
                  <p className="text-muted-foreground leading-relaxed">
                    Powered-lift airframes run two evaluation philosophies at once. The
                    composite shell sizes the static case; the metallic fittings, joints and
                    mounts set the inspection program the operator pays for. This paper works
                    through where that goes wrong and what to do about it, with every claim
                    sourced to the regulations, FAA and EASA guidance, and published literature.
                  </p>
                </div>
              </div>

              <ul className="space-y-2 mb-8">
                {BULLETS.map((bullet) => (
                  <li key={bullet} className="flex gap-3 text-sm text-muted-foreground">
                    <span aria-hidden="true" className="text-primary">
                      ·
                    </span>
                    <span>{bullet}</span>
                  </li>
                ))}
              </ul>

              <div className="border-t border-border pt-6 space-y-4">
                <WhitepaperForm />
                <p className="text-sm text-muted-foreground">
                  <Link
                    to="/fdt"
                    className="text-primary font-medium inline-flex items-center hover:underline"
                  >
                    Read what is inside the paper first
                    <ArrowRight className="h-4 w-4 ml-1" />
                  </Link>
                </p>
                <p className="text-sm text-muted-foreground">
                  <Link
                    to="/videos"
                    className="text-primary font-medium inline-flex items-center hover:underline"
                  >
                    Watch the video series
                    <ArrowRight className="h-4 w-4 ml-1" />
                  </Link>
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default Resources;
