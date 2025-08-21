import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

const Expertise = () => {
  const stats = [
    { label: "Projects Completed", value: "500+", description: "Successful aviation projects delivered" },
    { label: "Years Experience", value: "20+", description: "Combined team expertise in aviation" },
    { label: "Certifications", value: "95%", description: "Success rate for certification projects" },
    { label: "Client Retention", value: "98%", description: "Long-term partnerships with aviation companies" }
  ];

  const expertise = [
    { area: "FAA Regulations", level: 98 },
    { area: "EASA Compliance", level: 95 },
    { area: "Aircraft Systems", level: 92 },
    { area: "Safety Analysis", level: 96 },
    { area: "Technical Documentation", level: 94 },
    { area: "Certification Processes", level: 97 }
  ];

  return (
    <section id="expertise" className="py-20 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Proven Aviation Expertise
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Two decades of specialized experience in aviation engineering, regulatory compliance, and certification processes.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
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

        {/* Expertise Levels */}
        <div className="max-w-4xl mx-auto">
          <h3 className="text-2xl font-bold text-foreground text-center mb-8">
            Our Core Competencies
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {expertise.map((item, index) => (
              <div key={index} className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-foreground font-medium">{item.area}</span>
                  <span className="text-primary font-semibold">{item.level}%</span>
                </div>
                <Progress value={item.level} className="h-2" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Expertise;