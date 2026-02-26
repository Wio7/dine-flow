import { Mesa } from '@/types/domain';
import { formatCurrency, getTimeSince } from '@/data/mock';
import StatusBadge from './StatusBadge';
import { motion } from 'framer-motion';
import { Users } from 'lucide-react';

interface MesaCardProps {
  mesa: Mesa;
  onClick: () => void;
}

export default function MesaCard({ mesa, onClick }: MesaCardProps) {
  const isActive = mesa.estado !== 'libre';

  return (
    <motion.button
      onClick={onClick}
      whileTap={{ scale: 0.97 }}
      className={`relative flex flex-col items-start gap-2 rounded-xl border p-4 text-left transition-all w-full ${
        isActive
          ? 'border-border bg-card shadow-card hover:border-primary/30'
          : 'border-border/50 bg-card/50 hover:bg-card hover:border-border'
      }`}
    >
      <div className="flex w-full items-center justify-between">
        <span className="font-display text-lg font-bold text-foreground">
          Mesa {mesa.numero}
        </span>
        <StatusBadge estado={mesa.estado} />
      </div>

      {isActive && (
        <div className="flex w-full flex-col gap-1">
          <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <Users className="h-3 w-3" />
            <span>{mesa.mozo_nombre}</span>
            {mesa.opened_at && (
              <>
                <span>·</span>
                <span>{getTimeSince(mesa.opened_at)}</span>
              </>
            )}
          </div>
          <span className="font-display text-sm font-semibold text-foreground">
            {formatCurrency(mesa.total_acumulado)}
          </span>
        </div>
      )}

      {mesa.estado === 'libre' && (
        <span className="text-xs text-muted-foreground">
          {mesa.capacidad} personas
        </span>
      )}

      {/* Pulsing indicator for ready orders */}
      {mesa.estado === 'cocina' && (
        <div className="absolute -right-1 -top-1 h-3 w-3 rounded-full bg-status-cocina animate-pulse-glow" />
      )}
    </motion.button>
  );
}
