import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Mail, Phone, MapPin, Clock } from "lucide-react";

const Contact = () => {
  return (
    <section id="contact" className="py-20 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Start Your Aviation Project
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Ready to ensure your aviation project meets all regulatory requirements? Contact our experts today for a consultation.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <Card className="border-border">
            <CardHeader>
              <CardTitle className="text-2xl">Get a Free Consultation</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName">First Name</Label>
                  <Input id="firstName" placeholder="John" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input id="lastName" placeholder="Doe" />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" placeholder="john@company.com" />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="company">Company</Label>
                <Input id="company" placeholder="Your Aviation Company" />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="service">Service Interest</Label>
                <select className="w-full p-2 border border-input rounded-md bg-background">
                  <option>Research & Development</option>
                  <option>Product Design Development</option>
                  <option>Certification Services</option>
                  <option>Regulatory Requirements</option>
                  <option>Other</option>
                </select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="message">Project Details</Label>
                <Textarea 
                  id="message" 
                  placeholder="Tell us about your aviation project and regulatory requirements..."
                  className="min-h-[120px]"
                />
              </div>
              
              <Button className="w-full bg-primary hover:bg-primary-light">
                Submit Consultation Request
              </Button>
            </CardContent>
          </Card>

          {/* Contact Information */}
          <div className="space-y-8">
            <div>
              <h3 className="text-2xl font-bold text-foreground mb-6">Contact Information</h3>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-accent rounded-lg">
                    <Mail className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground">Email</h4>
                    <p className="text-muted-foreground">davidg@gngdesignllc.com</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="p-3 bg-accent rounded-lg">
                    <Phone className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground">Phone</h4>
                    <p className="text-muted-foreground">610 996 7934</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="p-3 bg-accent rounded-lg">
                    <MapPin className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground">Office</h4>
                    <p className="text-muted-foreground">
                      1121 Koble Lane<br />
                      West Chester, PA 19382
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="p-3 bg-accent rounded-lg">
                    <Clock className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground">Hours</h4>
                    <p className="text-muted-foreground">
                      Monday - Friday: 8:00 AM - 6:00 PM PST<br />
                      Emergency Support: 24/7
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <Card className="border-border bg-muted/30">
              <CardContent className="p-6">
                <h4 className="font-semibold text-foreground mb-3">Quick Response Guarantee</h4>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  We understand the critical nature of aviation projects. Our team commits to responding 
                  to all consultation requests within 24 hours, with emergency support available around the clock.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;