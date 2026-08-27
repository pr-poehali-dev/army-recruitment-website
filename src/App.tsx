import { useEffect } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { trackPageview } from "@/lib/analytics";
import Index from "./pages/Index";
import Regions from "./pages/Regions";
import Conditions from "./pages/Conditions";
import Vacancies from "./pages/Vacancies";
import Faq from "./pages/Faq";
import News from "./pages/News";
import NewsArticle from "./pages/NewsArticle";
import Contacts from "./pages/Contacts";
import Crm from "./pages/Crm";
import NotFound from "./pages/NotFound";
import CallbackWidget from "./components/CallbackWidget";

const queryClient = new QueryClient();

const AppRoutes = () => {
  const location = useLocation();
  const isCrm = location.pathname === "/crm";

  useEffect(() => {
    trackPageview(location.pathname);
  }, [location.pathname]);

  return (
    <>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/regions" element={<Regions />} />
        <Route path="/conditions" element={<Conditions />} />
        <Route path="/vacancies" element={<Vacancies />} />
        <Route path="/faq" element={<Faq />} />
        <Route path="/news" element={<News />} />
        <Route path="/news/:slug" element={<NewsArticle />} />
        <Route path="/contacts" element={<Contacts />} />
        <Route path="/crm" element={<Crm />} />
        {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
        <Route path="*" element={<NotFound />} />
      </Routes>
      {!isCrm && <CallbackWidget />}
    </>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;