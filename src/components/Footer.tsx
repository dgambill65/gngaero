import { Separator } from "@/components/ui/separator";

const Footer = () => {
  return (
    <footer className="bg-aviation-navy text-white py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="col-span-1 md:col-span-2">
            <h3 className="text-xl font-bold mb-4">GnG Design Consultants</h3>
            <p className="text-white/80 mb-4 leading-relaxed">
              Leading aviation engineering consultancy specializing in FAA and EASA compliance, 
              certification services, and innovative aerospace solutions.
            </p>
            <div className="flex flex-col gap-2 text-sm text-white/70">
              <p>FAA Certified Engineering Services</p>
              <p>EASA Compliance Specialists</p>
              <p>ISO 9001:2015 Certified</p>
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-semibold mb-4">Services</h4>
            <ul className="space-y-2 text-sm text-white/80">
              <li><a href="#services" className="hover:text-aviation-sky transition-colors">Research & Development</a></li>
              <li><a href="#services" className="hover:text-aviation-sky transition-colors">Product Design</a></li>
              <li><a href="#services" className="hover:text-aviation-sky transition-colors">Certification</a></li>
              <li><a href="#services" className="hover:text-aviation-sky transition-colors">Regulatory Compliance</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold mb-4">Contact</h4>
            <ul className="space-y-2 text-sm text-white/80">
              <li>1121 Koble Lane</li>
              <li>West Chester, PA 19382</li>
              <li>610 996 7934</li>
              <li>info@gngdesignconsultants.com</li>
            </ul>
          </div>
        </div>

        <Separator className="my-8 bg-white/20" />

        <div className="flex flex-col md:flex-row justify-between items-center text-sm text-white/70">
          <p>&copy; 2024 GnG Design Consultants. All rights reserved.</p>
          <div className="flex gap-6 mt-4 md:mt-0">
            <a href="#" className="hover:text-aviation-sky transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-aviation-sky transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-aviation-sky transition-colors">Quality Management</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;