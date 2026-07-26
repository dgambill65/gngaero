import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { FileDown, FileText } from "lucide-react";

const Resources = () => {
  return (
    <section id="resources" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Resources
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Practical engineering write-ups from the work — free to download, no signup.
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          <Card className="border-border">
            <CardContent className="p-8">
              <div className="flex items-start gap-4 mb-6">
                <div className="p-3 bg-accent rounded-lg shrink-0">
                  <FileText className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="text-xl md:text-2xl font-semibold text-foreground mb-2">
                    Fatigue &amp; Damage Tolerance Planning for Hybrid eVTOL Structures
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Why powered-lift airframes run two certification philosophies at once — and five planning principles that keep programs off the critical path. Free PDF, no signup required.
                  </p>
                </div>
              </div>
              <Button asChild size="lg">
                <a
                  href="/resources/fdt-hybrid-evtol-whitepaper.pdf"
                  download
                >
                  <FileDown className="h-4 w-4 mr-2" />
                  Download PDF
                </a>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default Resources;
