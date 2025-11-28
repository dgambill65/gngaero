import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Sparkles, Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

const AIRegulationEvaluator = () => {
  const [projectDescription, setProjectDescription] = useState("");
  const [regulatoryBody, setRegulatoryBody] = useState("");
  const [projectType, setProjectType] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [evaluation, setEvaluation] = useState("");
  const { toast } = useToast();

  const handleEvaluate = async () => {
    if (!projectDescription || !regulatoryBody || !projectType) {
      toast({
        title: "Missing Information",
        description: "Please fill in all fields before requesting evaluation.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    setEvaluation("");

    try {
      const { data, error } = await supabase.functions.invoke('ai-regulation-evaluator', {
        body: {
          projectDescription,
          regulatoryBody,
          projectType,
        }
      });

      if (error) throw error;

      if (data?.error) {
        toast({
          title: "Evaluation Error",
          description: data.error,
          variant: "destructive",
        });
        return;
      }

      setEvaluation(data.evaluation);
      toast({
        title: "Evaluation Complete",
        description: "AI-powered regulatory analysis generated successfully.",
      });
    } catch (error) {
      console.error('Error getting evaluation:', error);
      toast({
        title: "Error",
        description: "Failed to generate evaluation. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section id="ai-evaluator" className="py-20 bg-gradient-to-b from-background to-muted/20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary mb-4">
            <Sparkles className="w-4 h-4" />
            <span className="text-sm font-medium">AI-Powered Analysis</span>
          </div>
          <h2 className="text-4xl font-bold mb-4">
            Accelerate Your Compliance Timeline
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Get instant AI-powered insights on applicable regulations and certification pathways.
            Our advanced AI agents evaluate your project against FAA and EASA requirements to help you prepare faster and more accurately.
          </p>
        </div>

        <div className="max-w-4xl mx-auto grid gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Project Details</CardTitle>
              <CardDescription>
                Describe your aviation project for AI-powered regulatory evaluation
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="project-type">Project Type</Label>
                <Select value={projectType} onValueChange={setProjectType}>
                  <SelectTrigger id="project-type">
                    <SelectValue placeholder="Select project type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="aircraft-modification">Aircraft Modification</SelectItem>
                    <SelectItem value="new-aircraft-design">New Aircraft Design</SelectItem>
                    <SelectItem value="avionics-system">Avionics System</SelectItem>
                    <SelectItem value="interior-modification">Interior Modification</SelectItem>
                    <SelectItem value="engine-modification">Engine Modification</SelectItem>
                    <SelectItem value="maintenance-procedure">Maintenance Procedure</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="regulatory-body">Regulatory Body</Label>
                <Select value={regulatoryBody} onValueChange={setRegulatoryBody}>
                  <SelectTrigger id="regulatory-body">
                    <SelectValue placeholder="Select regulatory body" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="FAA">FAA (Federal Aviation Administration)</SelectItem>
                    <SelectItem value="EASA">EASA (European Aviation Safety Agency)</SelectItem>
                    <SelectItem value="both">Both FAA and EASA</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="project-description">Project Description</Label>
                <Textarea
                  id="project-description"
                  placeholder="Describe your project in detail... Include aircraft type, proposed modifications, intended use, timeline goals, etc."
                  value={projectDescription}
                  onChange={(e) => setProjectDescription(e.target.value)}
                  rows={8}
                  className="resize-none"
                />
              </div>

              <Button 
                onClick={handleEvaluate} 
                disabled={isLoading}
                className="w-full"
                size="lg"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                    Analyzing Regulations...
                  </>
                ) : (
                  <>
                    <Sparkles className="mr-2 h-5 w-5" />
                    Get AI Evaluation
                  </>
                )}
              </Button>
            </CardContent>
          </Card>

          {evaluation && (
            <Card className="border-primary/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-primary" />
                  Regulatory Evaluation Results
                </CardTitle>
                <CardDescription>
                  AI-generated analysis based on your project details
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="prose prose-sm max-w-none dark:prose-invert whitespace-pre-wrap">
                  {evaluation}
                </div>
                <div className="mt-6 p-4 bg-muted/50 rounded-lg border border-border">
                  <p className="text-sm text-muted-foreground">
                    <strong>Next Steps:</strong> This AI evaluation provides preliminary insights. 
                    For detailed compliance planning and human expert review, schedule a consultation with our team below.
                  </p>
                  <Button 
                    variant="outline" 
                    className="mt-4"
                    onClick={() => {
                      const contactSection = document.getElementById('contact');
                      contactSection?.scrollIntoView({ behavior: 'smooth' });
                    }}
                  >
                    Schedule Expert Consultation
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </section>
  );
};

export default AIRegulationEvaluator;
