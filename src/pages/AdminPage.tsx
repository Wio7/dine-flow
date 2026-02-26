import { useAuth } from '@/contexts/AuthContext';
import { formatCurrency } from '@/data/mock';
import { motion } from 'framer-motion';
import { BarChart3, TrendingUp, Clock, DollarSign, Users } from 'lucide-react';
import { LogOut, User } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const stats = [
  { label: 'Mesas activas', value: '8/12', icon: BarChart3, color: 'text-status-cocina' },
  { label: 'Ticket promedio', value: '$18.500', icon: TrendingUp, color: 'text-status-libre' },
  { label: 'Tiempo promedio', value: '52 min', icon: Clock, color: 'text-status-cuenta' },
  { label: 'Ventas del día', value: '$340.000', icon: DollarSign, color: 'text-primary' },
];

const mozos = [
  { nombre: 'Carlos', mesas: 8, ventas: 148000, pct: 85 },
  { nombre: 'Ana', mesas: 6, ventas: 112000, pct: 65 },
  { nombre: 'Luis', mesas: 5, ventas: 80000, pct: 47 },
];

const topProducts = [
  { nombre: 'Lomo Saltado', cantidad: 34 },
  { nombre: 'Limonada', cantidad: 28 },
  { nombre: 'Ceviche Mixto', cantidad: 21 },
  { nombre: 'Arroz Chaufa', cantidad: 18 },
  { nombre: 'Pisco Sour', cantidad: 15 },
];

export default function AdminPage() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen pb-20">
      <div className="sticky top-0 z-40 border-b border-border bg-background/95 backdrop-blur-xl px-4 py-3">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="font-display text-xl font-bold text-gradient-warm">Dashboard</h1>
            <p className="text-xs text-muted-foreground">Vista en tiempo real</p>
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

      <div className="p-4 space-y-6 max-w-4xl mx-auto">
        {/* KPIs */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="rounded-xl border border-border bg-card p-4"
            >
              <stat.icon className={`h-5 w-5 ${stat.color} mb-2`} />
              <p className="font-display text-2xl font-bold text-foreground">{stat.value}</p>
              <p className="text-xs text-muted-foreground">{stat.label}</p>
            </motion.div>
          ))}
        </div>

        {/* Mozos performance */}
        <div className="rounded-xl border border-border bg-card p-4">
          <h2 className="font-display text-sm font-bold text-foreground mb-4 flex items-center gap-2">
            <Users className="h-4 w-4 text-primary" />
            Rendimiento mozos (hoy)
          </h2>
          <div className="space-y-3">
            {mozos.map(mozo => (
              <div key={mozo.nombre}>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm font-medium text-foreground">{mozo.nombre}</span>
                  <span className="text-xs text-muted-foreground">{mozo.mesas} mesas · {formatCurrency(mozo.ventas)}</span>
                </div>
                <div className="h-2 rounded-full bg-secondary overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${mozo.pct}%` }}
                    transition={{ delay: 0.3, duration: 0.8, ease: 'easeOut' }}
                    className="h-full rounded-full bg-gradient-warm"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Top products */}
        <div className="rounded-xl border border-border bg-card p-4">
          <h2 className="font-display text-sm font-bold text-foreground mb-4">🔥 Productos más vendidos</h2>
          <div className="space-y-2">
            {topProducts.map((product, i) => (
              <div key={product.nombre} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-secondary text-xs font-bold text-primary">{i + 1}</span>
                  <span className="text-sm text-foreground">{product.nombre}</span>
                </div>
                <span className="text-sm font-medium text-muted-foreground">×{product.cantidad}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Alerts */}
        <div className="rounded-xl border border-status-cuenta/30 bg-status-cuenta/5 p-4">
          <h2 className="font-display text-sm font-bold text-status-cuenta mb-3">⚠️ Alertas activas</h2>
          <ul className="space-y-2 text-sm text-foreground">
            <li className="flex items-start gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-status-ocupada mt-1.5 flex-shrink-0" />
              Mesa 3 lleva 18 min sin actualización en cocina
            </li>
            <li className="flex items-start gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-status-cuenta mt-1.5 flex-shrink-0" />
              Mesa 7 tiene cuenta solicitada hace 12 min
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
