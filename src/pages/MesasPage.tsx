import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { mockMesas, formatCurrency } from '@/data/mock';
import MesaCard from '@/components/mobile/MesaCard';
import { motion } from 'framer-motion';
import { LogOut, User } from 'lucide-react';

export default function MesasPage() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [mesas] = useState(mockMesas);

  const activeMesas = mesas.filter(m => m.estado !== 'libre').length;
  const today = new Date().toLocaleDateString('es-ES', { weekday: 'long', day: 'numeric', month: 'long' });

  const handleMesaClick = (mesa: typeof mesas[0]) => {
    if (mesa.estado === 'libre') {
      navigate(`/pedido/${mesa.id}`);
    } else {
      navigate(`/pedido/${mesa.id}`);
    }
  };

  return (
    <div className="min-h-screen pb-20">
      {/* Header */}
      <div className="sticky top-0 z-40 border-b border-border bg-background/95 backdrop-blur-xl px-4 py-3">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="font-display text-xl font-bold text-gradient-warm">Restaurant OS</h1>
            <p className="text-xs text-muted-foreground capitalize">{today} · {activeMesas} mesas activas</p>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1.5 rounded-full bg-secondary px-3 py-1.5">
              <User className="h-3.5 w-3.5 text-primary" />
              <span className="text-xs font-medium text-secondary-foreground">{user?.nombre}</span>
            </div>
            <button onClick={() => { logout(); navigate('/'); }} className="rounded-full bg-secondary p-2 text-muted-foreground hover:text-foreground transition-colors">
              <LogOut className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Grid */}
      <div className="p-4">
        <motion.div
          className="grid grid-cols-2 gap-3"
          initial="hidden"
          animate="visible"
          variants={{
            visible: { transition: { staggerChildren: 0.04 } },
          }}
        >
          {mesas.map((mesa) => (
            <motion.div
              key={mesa.id}
              variants={{
                hidden: { opacity: 0, y: 12 },
                visible: { opacity: 1, y: 0 },
              }}
            >
              <MesaCard mesa={mesa} onClick={() => handleMesaClick(mesa)} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
