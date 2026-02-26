import { useState } from 'react';
import { mockPedidos } from '@/data/mock';
import PedidoCard from '@/components/cocina/PedidoCard';
import { AnimatePresence, motion } from 'framer-motion';
import { useAuth } from '@/contexts/AuthContext';
import { LogOut, User } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const filters = ['Todos', 'Pendiente', 'En prep', 'Listo'];
const filterMap: Record<string, string | undefined> = {
  'Todos': undefined,
  'Pendiente': 'pendiente',
  'En prep': 'preparacion',
  'Listo': 'listo',
};

export default function CocinaPage() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [pedidos, setPedidos] = useState(mockPedidos);
  const [filtro, setFiltro] = useState('Todos');

  const filtered = filterMap[filtro]
    ? pedidos.filter(p => p.estado === filterMap[filtro])
    : pedidos.filter(p => p.estado !== 'cerrado');

  const handleEstadoChange = (id: string, estado: string) => {
    setPedidos(prev =>
      prev.map(p => (p.id === id ? { ...p, estado: estado as any } : p))
    );
  };

  return (
    <div className="min-h-screen pb-20">
      <div className="sticky top-0 z-40 border-b border-border bg-background/95 backdrop-blur-xl px-4 py-3">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="font-display text-xl font-bold flex items-center gap-2">
              🍳 <span className="text-gradient-warm">Cocina</span>
            </h1>
            <p className="text-xs text-muted-foreground">Activos: {filtered.length}</p>
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

        {/* Filters */}
        <div className="flex gap-2 mt-3">
          {filters.map(f => (
            <button
              key={f}
              onClick={() => setFiltro(f)}
              className={`rounded-full px-3 py-1 text-xs font-medium transition-all ${
                filtro === f
                  ? 'bg-gradient-warm text-primary-foreground'
                  : 'bg-secondary text-secondary-foreground hover:bg-muted'
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      <div className="p-4 space-y-3">
        <AnimatePresence>
          {filtered.map(pedido => (
            <PedidoCard key={pedido.id} pedido={pedido} onEstadoChange={handleEstadoChange} />
          ))}
        </AnimatePresence>
        {filtered.length === 0 && (
          <div className="text-center py-16 text-muted-foreground">
            <p className="text-4xl mb-2">🎉</p>
            <p className="font-medium">¡Todo al día!</p>
            <p className="text-sm">No hay pedidos pendientes</p>
          </div>
        )}
      </div>
    </div>
  );
}
