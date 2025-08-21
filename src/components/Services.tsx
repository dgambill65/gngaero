import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Lightbulb, Cog, Shield, FileText } from "lucide-react";

const Services = () => {
  const services = [
    {
      icon: <Lightbulb className="h-8 w-8 text-primary" />,
      title: "Research & Development",
      description: "Cutting-edge aviation research and innovative product development solutions that push the boundaries of aerospace technology.",
      features: ["Advanced Materials Research", "Aerodynamic Analysis", "Performance Optimization", "Innovation Consulting"]
    },
    {
      icon: <Cog className="h-8 w-8 text-primary" />,
      title: "Product Design Development",
      description: "Comprehensive design and development services from concept to production-ready aviation systems and components.",
      features: ["3D Modeling & CAD", "Prototype Development", "System Integration", "Manufacturing Support"]
    },
    {
      icon: <Shield className="h-8 w-8 text-primary" />,
      title: "Certification Services",
      description: "Expert guidance through complex aviation certification processes ensuring full compliance with industry standards.",
      features: ["FAA Certification", "EASA Compliance", "Type Certification", "STC Applications"]
    },
    {
      icon: <FileText className="h-8 w-8 text-primary" />,
      title: "Regulatory Requirements",
      description: "Navigate complex aviation regulations with our comprehensive compliance and documentation services.",
      features: ["Regulatory Analysis", "Documentation Prep", "Compliance Audits", "Technical Writing"]
    }
  ];

  return (
    <section id="services" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Our Engineering Services
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Comprehensive aviation engineering solutions designed to meet the most demanding industry requirements and regulatory standards.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, index) => (
            <Card key={index} className="group hover:shadow-lg transition-all duration-300 border-border">
              <CardHeader className="text-center">
                <div className="mx-auto mb-4 p-3 bg-accent rounded-full w-fit group-hover:bg-primary/10 transition-colors">
                  {service.icon}
                </div>
                <CardTitle className="text-xl mb-2">{service.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4 text-sm leading-relaxed">
                  {service.description}
                </p>
                <div className="space-y-2">
                  {service.features.map((feature, featureIndex) => (
                    <Badge key={featureIndex} variant="secondary" className="text-xs">
                      {feature}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;