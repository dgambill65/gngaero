import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Founder from "./pages/Founder";
import WhitepaperRedirect from "./pages/WhitepaperRedirect";
import Fdt from "./pages/Fdt";
import FdtRedirect from "./pages/FdtRedirect";
import Videos from "./pages/Videos";
import VideoDetail from "./pages/VideoDetail";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/founder" element={<Founder />} />
          <Route path="/fdt" element={<Fdt />} />
          <Route path="/white-paper" element={<FdtRedirect />} />
          <Route path="/whitepaper" element={<FdtRedirect />} />
          <Route path="/videos" element={<Videos />} />
          <Route path="/videos/:slug" element={<VideoDetail />} />
          <Route
            path="/resources/fdt-hybrid-evtol-whitepaper.pdf"
            element={<WhitepaperRedirect />}
          />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
