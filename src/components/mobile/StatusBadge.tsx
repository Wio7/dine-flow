import { EstadoMesa } from '@/types/domain';

const statusConfig: Record<EstadoMesa, { label: string; class: string }> = {
  libre: { label: 'Libre', class: 'bg-status-libre/20 text-status-libre border-status-libre/30' },
  ocupada: { label: 'Ocupada', class: 'bg-status-ocupada/20 text-status-ocupada border-status-ocupada/30' },
  cocina: { label: 'En cocina', class: 'bg-status-cocina/20 text-status-cocina border-status-cocina/30' },
  cuenta: { label: 'Cuenta', class: 'bg-status-cuenta/20 text-status-cuenta border-status-cuenta/30' },
};

export default function StatusBadge({ estado }: { estado: EstadoMesa }) {
  const config = statusConfig[estado];
  return (
    <span className={`inline-flex items-center rounded-full border px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider ${config.class}`}>
      {config.label}
    </span>
  );
}
