import { Pedido } from '@/types/domain';
import { getTimeSince, formatCurrency } from '@/data/mock';
import { motion } from 'framer-motion';
import { Clock, AlertTriangle } from 'lucide-react';

interface PedidoCardProps {
  pedido: Pedido;
  onEstadoChange: (id: string, estado: string) => void;
}

export default function PedidoCard({ pedido, onEstadoChange }: PedidoCardProps) {
  const mins = Math.floor((Date.now() - new Date(pedido.created_at).getTime()) / 60000);
  const isLate = mins > 10;
  const total = pedido.items.reduce((s, i) => s + i.precio_snapshot * i.cantidad, 0);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className={`rounded-xl border p-4 ${
        pedido.prioridad > 0
          ? 'border-status-ocupada/40 bg-status-ocupada/5'
          : 'border-border bg-card'
      }`}
    >
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <span className="font-display text-lg font-bold">Mesa {pedido.mesa_numero}</span>
          {pedido.prioridad > 0 && (
            <AlertTriangle className="h-4 w-4 text-status-ocupada" />
          )}
        </div>
        <div className={`flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-semibold ${
          isLate ? 'bg-status-ocupada/20 text-status-ocupada' : 'bg-secondary text-secondary-foreground'
        }`}>
          <Clock className="h-3 w-3" />
          {getTimeSince(pedido.created_at)}
        </div>
      </div>

      <p className="text-xs text-muted-foreground mb-3">Mozo: {pedido.mozo_nombre}</p>

      <div className="space-y-2 mb-4">
        {pedido.items.map((item) => (
          <div key={item.id} className="flex items-start justify-between text-sm">
            <div>
              <span className="font-medium text-foreground">
                {item.nombre_snapshot} ×{item.cantidad}
              </span>
              {(item.modificaciones.length > 0 || item.notas) && (
                <p className="text-xs text-primary mt-0.5">
                  {[...item.modificaciones, item.notas].filter(Boolean).join(' · ')}
                </p>
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="flex gap-2">
        {pedido.estado === 'pendiente' && (
          <button
            onClick={() => onEstadoChange(pedido.id, 'preparacion')}
            className="flex-1 rounded-lg bg-status-cocina/20 py-2 text-sm font-semibold text-status-cocina transition-colors hover:bg-status-cocina/30"
          >
            En preparación
          </button>
        )}
        {(pedido.estado === 'pendiente' || pedido.estado === 'preparacion') && (
          <button
            onClick={() => onEstadoChange(pedido.id, 'listo')}
            className="flex-1 rounded-lg bg-gradient-warm py-2 text-sm font-bold text-primary-foreground transition-all hover:shadow-warm"
          >
            ✓ Listo
          </button>
        )}
      </div>
    </motion.div>
  );
}
