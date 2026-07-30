import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Index from "./pages/Index.tsx";
import CommentCaMarche from "./pages/CommentCaMarche.tsx";
import Tarifs from "./pages/Tarifs.tsx";
import ZoneDeCollecte from "./pages/ZoneDeCollecte.tsx";
import Contact from "./pages/Contact.tsx";
import AppMobile from "./pages/AppMobile.tsx";
import Connexion from "./pages/Connexion.tsx";
import TableauDeBord from "./pages/TableauDeBord.tsx";
import Admin from "./pages/Admin.tsx";
import NotFound from "./pages/NotFound.tsx";
import { AuthProvider } from "./hooks/useAuth";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/comment-ca-marche" element={<CommentCaMarche />} />
          <Route path="/tarifs" element={<Tarifs />} />
          <Route path="/zone-de-collecte" element={<ZoneDeCollecte />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/app" element={<AppMobile />} />
          <Route path="/connexion" element={<Connexion />} />
          <Route path="/tableau-de-bord" element={<TableauDeBord />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
