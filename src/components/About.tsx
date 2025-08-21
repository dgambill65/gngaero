import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Award, Users, Globe, Zap } from "lucide-react";

const About = () => {
  const values = [
    {
      icon: <Award className="h-6 w-6 text-primary" />,
      title: "Excellence",
      description: "Uncompromising commitment to the highest standards of engineering excellence and precision."
    },
    {
      icon: <Users className="h-6 w-6 text-primary" />,
      title: "Partnership",
      description: "Building long-term relationships with clients through trust, transparency, and collaboration."
    },
    {
      icon: <Globe className="h-6 w-6 text-primary" />,
      title: "Global Reach",
      description: "International expertise in both FAA and EASA regulations for worldwide compliance."
    },
    {
      icon: <Zap className="h-6 w-6 text-primary" />,
      title: "Innovation",
      description: "Leveraging cutting-edge technology and methodologies to deliver superior solutions."
    }
  ];

  return (
    <section id="about" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
              Leading Aviation Engineering Consultancy
            </h2>
            <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
              AeroTech Engineering has been at the forefront of aviation consulting for over two decades, 
              providing specialized engineering services to aviation companies worldwide. Our team of certified 
              engineers and regulatory experts ensures your projects meet the most stringent industry standards.
            </p>
            <p className="text-muted-foreground mb-8 leading-relaxed">
              From initial concept through final certification, we guide aviation companies through complex 
              regulatory landscapes, ensuring compliance with both FAA and EASA requirements while maintaining 
              the highest levels of safety and performance.
            </p>
            <Button size="lg" className="bg-primary hover:bg-primary-light">
              Learn More About Us
            </Button>
          </div>

          {/* Values Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {values.map((value, index) => (
              <Card key={index} className="p-6 border-border hover:shadow-md transition-shadow">
                <CardContent className="p-0">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="p-2 bg-accent rounded-lg">
                      {value.icon}
                    </div>
                    <h3 className="font-semibold text-foreground">{value.title}</h3>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {value.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;