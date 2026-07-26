import { Card, CardContent } from "@/components/ui/card";

const Expertise = () => {
  const stats = [
    { value: "30+ Years", label: "Aerospace Experience", description: "Rotorcraft, tiltrotor & eVTOL structures and certification" },
    { value: "18 Years", label: "Boeing", description: "8 years on CH-47 Chinook, 10+ years on 777/767/787 fixed-wing programs" },
    { value: "AW609", label: "Tiltrotor Certification", description: "Design Quality Leader on the first civil tiltrotor certification effort" },
    { value: "2 U.S. Patents", label: "VTOL Innovation", description: "VTOL wing fences and lift-plus-cruise quadcopter control" },
    { value: "AI-Integrated", label: "Design Workflow", description: "CFD, CAD, and FEM pipelines with AI-assisted review at every stage." }
  ];

  return (
    <section id="expertise" className="py-20 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Proven Aviation Expertise
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            More than three decades of hands-on aerospace engineering — from Boeing rotorcraft to civil tiltrotor certification and eVTOL chief-engineer roles.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
          {stats.map((stat, index) => (
            <Card key={index} className="text-center p-6 border-border">
              <CardContent className="p-0">
                <div className="text-3xl md:text-4xl font-bold text-primary mb-2">
                  {stat.value}
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-1">
                  {stat.label}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {stat.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Expertise;
