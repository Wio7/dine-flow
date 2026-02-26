import { useState } from 'react';
import { mockMesas, mockPedidos, formatCurrency } from '@/data/mock';
import { useAuth } from '@/contexts/AuthContext';
import { motion } from 'framer-motion';
import { LogOut, User, CreditCard, Banknote, ArrowLeftRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function CajaPage() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const mesasCuenta = mockMesas.filter(m => m.estado === 'cuenta');
  const [selectedMesa, setSelectedMesa] = useState(mesasCuenta[0]?.id || null);

  const mesa = mesasCuenta.find(m => m.id === selectedMesa);
  const pedido = mesa ? mockPedidos.find(p => p.mesa_id === mesa.id) : null;

  const subtotal = pedido?.items.reduce((s, i) => s + i.precio_snapshot * i.cantidad, 0) || 0;
  const iva = Math.round(subtotal * 0.19);
  const total = subtotal + iva;

  return (
    <div className="min-h-screen pb-20">
      <div className="sticky top-0 z-40 border-b border-border bg-background/95 backdrop-blur-xl px-4 py-3">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="font-display text-xl font-bold">💰 <span className="text-gradient-warm">Caja</span></h1>
            <p className="text-xs text-muted-foreground">
              {new Date().toLocaleDateString('es-ES', { weekday: 'long' })} {new Date().toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' })}
            </p>
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

      <div className="flex flex-col lg:flex-row">
        {/* Mesa list */}
        <div className="lg:w-64 border-b lg:border-b-0 lg:border-r border-border p-4">
          <h2 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">Mesas pendientes</h2>
          <div className="flex lg:flex-col gap-2 overflow-x-auto lg:overflow-visible">
            {mesasCuenta.map(m => (
              <button
                key={m.id}
                onClick={() => setSelectedMesa(m.id)}
                className={`flex-shrink-0 rounded-xl border p-3 text-left transition-all ${
                  selectedMesa === m.id
                    ? 'border-primary/40 bg-primary/10'
                    : 'border-border bg-card hover:border-primary/20'
                }`}
              >
                <div className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-status-cuenta" />
                  <span className="font-display font-bold text-sm">Mesa {m.numero}</span>
                </div>
                <p className="text-xs text-muted-foreground mt-1">{m.mozo_nombre} · {formatCurrency(m.total_acumulado)}</p>
              </button>
            ))}
            {mesasCuenta.length === 0 && (
              <p className="text-sm text-muted-foreground py-8 text-center">No hay mesas pendientes</p>
            )}
          </div>
        </div>

        {/* Detail */}
        {mesa && pedido ? (
          <div className="flex-1 p-4 lg:p-6">
            <motion.div
              key={mesa.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="max-w-lg mx-auto"
            >
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-display text-2xl font-bold">Mesa {mesa.numero}</h2>
                <span className="text-xs text-muted-foreground">Mozo: {mesa.mozo_nombre}</span>
              </div>

              <div className="rounded-xl border border-border bg-card p-4 space-y-2">
                {pedido.items.map(item => (
                  <div key={item.id} className="flex justify-between text-sm">
                    <span className="text-foreground">
                      {item.nombre_snapshot} ×{item.cantidad}
                    </span>
                    <span className="text-muted-foreground">{formatCurrency(item.precio_snapshot * item.cantidad)}</span>
                  </div>
                ))}
                <div className="border-t border-border pt-2 mt-3 space-y-1">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span className="text-foreground">{formatCurrency(subtotal)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">IVA (19%)</span>
                    <span className="text-foreground">{formatCurrency(iva)}</span>
                  </div>
                  <div className="flex justify-between text-base font-bold pt-1">
                    <span className="text-foreground">Total</span>
                    <span className="text-gradient-warm">{formatCurrency(total)}</span>
                  </div>
                </div>
              </div>

              <div className="mt-4">
                <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">Método de pago</p>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { label: 'Efectivo', icon: Banknote },
                    { label: 'Tarjeta', icon: CreditCard },
                    { label: 'Mixto', icon: ArrowLeftRight },
                  ].map(method => (
                    <button
                      key={method.label}
                      className="flex flex-col items-center gap-1 rounded-xl border border-border bg-card p-3 text-sm font-medium transition-all hover:border-primary/30 hover:bg-primary/5"
                    >
                      <method.icon className="h-5 w-5 text-primary" />
                      <span className="text-xs text-foreground">{method.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              <button className="mt-6 w-full rounded-xl bg-gradient-warm py-3.5 text-center font-display font-bold text-primary-foreground shadow-warm transition-all hover:scale-[1.01] active:scale-[0.99]">
                Emitir Boleta y Cerrar
              </button>
            </motion.div>
          </div>
        ) : (
          <div className="flex-1 flex items-center justify-center p-8 text-muted-foreground">
            <p>Selecciona una mesa para ver el detalle</p>
          </div>
        )}
      </div>
    </div>
  );
}
