import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Rol } from '@/types/domain';
import { motion } from 'framer-motion';
import { ChefHat, LayoutGrid, Receipt, BarChart3 } from 'lucide-react';

const roles: { rol: Rol; label: string; desc: string; icon: typeof LayoutGrid; path: string }[] = [
  { rol: 'mozo', label: 'Mozo', desc: 'Gestionar mesas y pedidos', icon: LayoutGrid, path: '/mesas' },
  { rol: 'cocina', label: 'Cocina', desc: 'Ver y preparar pedidos', icon: ChefHat, path: '/cocina' },
  { rol: 'caja', label: 'Caja', desc: 'Cobrar y emitir boletas', icon: Receipt, path: '/caja' },
  { rol: 'admin', label: 'Admin', desc: 'Dashboard completo', icon: BarChart3, path: '/admin' },
];

export default function LoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = (rol: Rol, path: string) => {
    login(rol);
    navigate(path);
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-sm"
      >
        <div className="text-center mb-10">
          <h1 className="font-display text-4xl font-bold text-gradient-warm mb-2">Restaurant OS</h1>
          <p className="text-muted-foreground text-sm">El sistema operativo de tu restaurante</p>
        </div>

        <div className="space-y-3">
          {roles.map((r, i) => (
            <motion.button
              key={r.rol}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 + i * 0.07 }}
              onClick={() => handleLogin(r.rol, r.path)}
              className="flex w-full items-center gap-4 rounded-xl border border-border bg-card p-4 text-left transition-all hover:border-primary/30 hover:shadow-card active:scale-[0.98]"
            >
              <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-gradient-warm shadow-warm">
                <r.icon className="h-5 w-5 text-primary-foreground" />
              </div>
              <div>
                <p className="font-display font-bold text-foreground">{r.label}</p>
                <p className="text-xs text-muted-foreground">{r.desc}</p>
              </div>
            </motion.button>
          ))}
        </div>

        <p className="text-center text-[11px] text-muted-foreground mt-8">
          Demo v1.0 · Selecciona un rol para entrar
        </p>
      </motion.div>
    </div>
  );
}
