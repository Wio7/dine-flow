import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "@/contexts/AuthContext";
import BottomNav from "@/components/mobile/BottomNav";
import LoginPage from "./pages/LoginPage";
import MesasPage from "./pages/MesasPage";
import PedidoPage from "./pages/PedidoPage";
import CocinaPage from "./pages/CocinaPage";
import CajaPage from "./pages/CajaPage";
import AdminPage from "./pages/AdminPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { user } = useAuth();
  if (!user) return <Navigate to="/" replace />;
  return (
    <>
      {children}
      <BottomNav />
    </>
  );
}

function AppRoutes() {
  const { user } = useAuth();
  return (
    <Routes>
      <Route path="/" element={user ? <Navigate to="/mesas" replace /> : <LoginPage />} />
      <Route path="/mesas" element={<ProtectedRoute><MesasPage /></ProtectedRoute>} />
      <Route path="/pedido/:mesaId" element={<ProtectedRoute><PedidoPage /></ProtectedRoute>} />
      <Route path="/cocina" element={<ProtectedRoute><CocinaPage /></ProtectedRoute>} />
      <Route path="/caja" element={<ProtectedRoute><CajaPage /></ProtectedRoute>} />
      <Route path="/admin" element={<ProtectedRoute><AdminPage /></ProtectedRoute>} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <AuthProvider>
        <BrowserRouter>
          <AppRoutes />
        </BrowserRouter>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
