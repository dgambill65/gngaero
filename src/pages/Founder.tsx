import { Link } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Mail,
  Linkedin,
  MapPin,
  Phone,
  Award,
  GraduationCap,
  Briefcase,
  ArrowLeft,
} from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import davidPhoto from "@/assets/david-gambill.jpg.asset.json";

const competencies = [
  "Vehicle-Level Integration",
  "Systems Engineering (MBSE)",
  "Design Gate Leadership (PDR/CDR/SDR)",
  "FAA Part 23/25/27/29 Certification",
  "ASTM F3264 (eVTOL)",
  "Digital Thread: NX, CATIA, Teamcenter, 3DEXPERIENCE",
  "Electric & Hybrid-Electric Propulsion",
  "Configuration Control & Trade Studies",
  "Agile PI Planning (Jira, ClickUp, Asana)",
  "AI-Assisted Engineering Workflows",
  "Team Leadership (150+ engineers)",
];

const experience = [
  {
    role: "CEO and Founder",
    company: "GnG Design LLC",
    location: "West Chester, PA",
    dates: "Sept 2014 – Present",
    points: [
      "Establish efficient CAD/PLM workflows and configuration management for design continuity.",
      "Apply CFD/FEA modeling and structural validation to refine performance and manufacturability.",
      "Support requirements management and documentation aligned with FAA standards.",
      "Integrate AI tools into engineering processes for increased task efficiency.",
    ],
  },
  {
    role: "Head of Design & Integration",
    company: "EOS Aircraft Inc.",
    location: "Portland, OR (Remote)",
    dates: "Aug 2024 – May 2025",
    points: [
      "Directed a 10-person multidisciplinary team for an all-electric regional aircraft; achieved 50% vehicle weight reduction.",
      "Drove on-time deliverables from 60% to 95% via Agile PI planning and ClickUp dashboards.",
      "Introduced AI-assisted tools (Lovable.ai, ChatGPT) to streamline documentation and workflow automation.",
    ],
  },
  {
    role: "Chief Aerospace Engineer / H1X Program Manager",
    company: "Doroni Aerospace Inc.",
    location: "Miami, FL",
    dates: "Apr 2023 – May 2025",
    points: [
      "Led the H1X eVTOL through SDR to prototype readiness, ensuring coherence between propulsion and aero-structures.",
      "Developed and owned the ASTM F3264 certification roadmap.",
      "Deployed Valispace and Duro PLM, increasing productivity by 20%.",
    ],
  },
  {
    role: "Chief Engineer",
    company: "XTI Aircraft Corporation",
    location: "Denver, CO",
    dates: "Oct 2020 – Jul 2022",
    points: [
      "Owned the vehicle-level technical baseline for the TriFan 600 hybrid VTOL.",
      "Chaired the Engineering Review Board (ERB) ensuring 100% traceability.",
      "Integrated 3DEXPERIENCE MBSE with hardware-in-the-loop (HIL) testing.",
    ],
  },
  {
    role: "Design Quality Leader",
    company: "AgustaWestland (Leonardo)",
    location: "Philadelphia, PA",
    dates: "Oct 2014 – May 2020",
    points: [
      "Directed the FAA type certification data package for the AW609 tiltrotor.",
      "Established CAD governance and ENOVIA configuration rules across global engineering teams.",
    ],
  },
  {
    role: "Senior Structures & Payloads Design Engineer",
    company: "The Boeing Company",
    location: "Philadelphia, PA",
    dates: "Oct 1997 – Sep 2014",
    points: [
      "Founded the Rapid Prototyping Lab using additive manufacturing, cutting modification lead times by 60%.",
      "Directed the Teamcenter migration for 1TB of CAD files; earned the Boeing Pride Award.",
    ],
  },
];

const Founder = () => {
  useEffect(() => {
    document.title = "David Gambill — Founder | GnG Design Consultants";
    const ensure = (selector: string, create: () => HTMLElement) => {
      let el = document.head.querySelector(selector) as HTMLElement | null;
      if (!el) {
        el = create();
        document.head.appendChild(el);
      }
      return el;
    };
    const desc = ensure('meta[name="description"]', () => {
      const m = document.createElement("meta");
      m.setAttribute("name", "description");
      return m;
    });
    desc.setAttribute(
      "content",
      "David Gambill, Founder of GnG Design — 30+ years aerospace engineering across Boeing, AgustaWestland, eVTOL and fixed-wing programs."
    );
    const canonical = ensure('link[rel="canonical"]', () => {
      const l = document.createElement("link");
      l.setAttribute("rel", "canonical");
      return l;
    });
    canonical.setAttribute("href", `${window.location.origin}/founder`);
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
              className="inline-flex items-center text-primary-foreground/80 hover:text-primary-foreground mb-8 transition-colors"
            >
              <ArrowLeft className="h-4 w-4 mr-2" /> Back to Home
            </Link>
            <div className="grid md:grid-cols-[auto,1fr] gap-10 items-center">
              <img
                src={davidPhoto.url}
                alt="Portrait of David Gambill, Founder of GnG Design Consultants"
                className="w-48 h-48 md:w-56 md:h-56 rounded-2xl object-cover shadow-2xl ring-4 ring-primary-foreground/20"
                loading="eager"
              />
              <div>
                <p className="text-sm uppercase tracking-widest text-primary-foreground/70 mb-2">
                  Founder & CEO
                </p>
                <h1 className="text-4xl md:text-5xl font-bold mb-3">
                  David Gambill
                </h1>
                <p className="text-xl text-primary-foreground/90 mb-6 max-w-2xl">
                  Senior aerospace engineering executive with 30+ years across
                  rotorcraft, tiltrotor, eVTOL, and fixed-wing programs.
                </p>
                <div className="flex flex-wrap gap-4 text-primary-foreground/90 mb-6">
                  <span className="inline-flex items-center gap-2">
                    <MapPin className="h-4 w-4" /> West Chester, PA
                  </span>
                  <span className="inline-flex items-center gap-2">
                    <Phone className="h-4 w-4" /> 610-996-7934
                  </span>
                </div>
                <div className="flex flex-wrap gap-3">
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
          </div>
        </section>

        {/* Bio */}
        <section className="py-16 lg:py-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
            <h2 className="text-3xl font-bold text-foreground mb-6">About David</h2>
            <div className="space-y-5 text-lg text-muted-foreground leading-relaxed">
              <p>
                David Gambill is an aerospace engineer and entrepreneur with
                30+ years of experience across rotorcraft, tiltrotor, eVTOL,
                and fixed-wing programs, including Boeing, Leonardo
                AgustaWestland, and multiple VTOL startups. He holds a B.S. in
                Aerospace Engineering and an MBA in Technology Management, and
                has served as Chief Engineer or technical lead on several
                early-stage ventures — XTI Aircraft, Doroni Aerospace, EOS
                Aircraft, and others — guiding them from concept through
                design reviews, certification strategy, and prototype
                readiness.
              </p>
              <p>
                Through GnG Design LLC, David advises startups on systems
                integration, digital engineering workflows, and certification
                planning. He has introduced AI-assisted tools into engineering
                and documentation pipelines and holds two U.S. patents in VTOL
                aircraft design. His combination of deep technical authority
                and hands-on startup experience gives him a practical view of
                where early-stage teams succeed and where they stall.
              </p>
              <p>
                Based in the Philadelphia area, David works with clients
                remotely and on-site.
              </p>
            </div>
          </div>
        </section>

        {/* Competencies */}
        <section className="py-16 lg:py-20 bg-muted/40">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">
            <h2 className="text-3xl font-bold text-foreground mb-8">
              Core Competencies
            </h2>
            <div className="flex flex-wrap gap-3">
              {competencies.map((c) => (
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

        {/* Experience */}
        <section className="py-16 lg:py-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">
            <div className="flex items-center gap-3 mb-10">
              <Briefcase className="h-7 w-7 text-primary" />
              <h2 className="text-3xl font-bold text-foreground">
                Professional Experience
              </h2>
            </div>
            <div className="space-y-6">
              {experience.map((job) => (
                <Card key={`${job.company}-${job.dates}`} className="border-l-4 border-l-primary">
                  <CardContent className="p-6">
                    <div className="flex flex-col md:flex-row md:items-baseline md:justify-between gap-2 mb-3">
                      <div>
                        <h3 className="text-xl font-semibold text-foreground">
                          {job.role}
                        </h3>
                        <p className="text-primary font-medium">
                          {job.company} · {job.location}
                        </p>
                      </div>
                      <span className="text-sm text-muted-foreground whitespace-nowrap">
                        {job.dates}
                      </span>
                    </div>
                    <ul className="list-disc list-outside ml-5 space-y-2 text-muted-foreground">
                      {job.points.map((p) => (
                        <li key={p}>{p}</li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Education & Patents */}
        <section className="py-16 lg:py-20 bg-muted/40">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl grid md:grid-cols-2 gap-8">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <GraduationCap className="h-6 w-6 text-primary" />
                  <h2 className="text-2xl font-bold text-foreground">Education</h2>
                </div>
                <ul className="space-y-3 text-muted-foreground">
                  <li>
                    <span className="font-semibold text-foreground">
                      B.S., Aerospace Engineering
                    </span>
                    <br />
                    University of Texas at Arlington
                  </li>
                  <li>
                    <span className="font-semibold text-foreground">
                      MBA, Technology Management
                    </span>
                    <br />
                    University of Phoenix
                  </li>
                </ul>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <Award className="h-6 w-6 text-primary" />
                  <h2 className="text-2xl font-bold text-foreground">Patents</h2>
                </div>
                <ul className="space-y-3 text-muted-foreground">
                  <li>
                    <span className="font-semibold text-foreground">
                      U.S. Patent 12,312,080 B1 (2025)
                    </span>
                    <br />
                    Wing Fences for VTOL Aircraft
                  </li>
                  <li>
                    <span className="font-semibold text-foreground">
                      U.S. Patent Application 2024/0217653 A1
                    </span>
                    <br />
                    Control of Lift Plus Cruise Quadcopter Aircraft
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 bg-gradient-to-br from-primary to-primary-dark text-primary-foreground text-center">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-3xl">
            <h2 className="text-3xl font-bold mb-4">
              Work with David and the GnG Design Team
            </h2>
            <p className="text-primary-foreground/90 mb-8 text-lg">
              From early concept through certification readiness, GnG Design
              helps aerospace teams move faster with the right technical
              backbone.
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
