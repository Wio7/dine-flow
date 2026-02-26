import { useState, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { mockCategorias, mockProductos, mockMesas, formatCurrency } from '@/data/mock';
import { ItemPedido } from '@/types/domain';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Mic, Plus, Minus, X } from 'lucide-react';

export default function PedidoPage() {
  const { mesaId } = useParams();
  const navigate = useNavigate();
  const mesa = mockMesas.find(m => m.id === mesaId);
  const [categoriaActiva, setCategoriaActiva] = useState(mockCategorias[0].id);
  const [items, setItems] = useState<ItemPedido[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<string | null>(null);
  const [cantidad, setCantidad] = useState(1);
  const [notas, setNotas] = useState('');

  const productos = mockProductos.filter(p => p.categoria_id === categoriaActiva);
  const total = items.reduce((s, i) => s + i.precio_snapshot * i.cantidad, 0);

  const addItem = (productoId: string) => {
    const producto = mockProductos.find(p => p.id === productoId)!;
    setItems(prev => [
      ...prev,
      {
        id: `item-${Date.now()}`,
        producto_id: producto.id,
        nombre_snapshot: producto.nombre,
        precio_snapshot: producto.precio,
        cantidad,
        modificaciones: [],
        notas: notas || undefined,
        estado: 'pendiente',
      },
    ]);
    setSelectedProduct(null);
    setCantidad(1);
    setNotas('');
  };

  const removeItem = (id: string) => {
    setItems(prev => prev.filter(i => i.id !== id));
  };

  return (
    <div className="min-h-screen pb-40 flex flex-col">
      {/* Header */}
      <div className="sticky top-0 z-40 border-b border-border bg-background/95 backdrop-blur-xl px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button onClick={() => navigate('/mesas')} className="rounded-full bg-secondary p-2 text-muted-foreground hover:text-foreground transition-colors">
              <ArrowLeft className="h-4 w-4" />
            </button>
            <div>
              <h1 className="font-display text-lg font-bold">Mesa {mesa?.numero}</h1>
              <p className="text-xs text-muted-foreground">{mesa?.mozo_nombre || 'Nueva orden'}</p>
            </div>
          </div>
          <span className="font-display text-lg font-bold text-primary">{formatCurrency(total)}</span>
        </div>
      </div>

      {/* Categories */}
      <div className="flex gap-2 overflow-x-auto px-4 py-3 scrollbar-none">
        {mockCategorias.map(cat => (
          <button
            key={cat.id}
            onClick={() => setCategoriaActiva(cat.id)}
            className={`flex-shrink-0 rounded-full px-4 py-2 text-sm font-medium transition-all ${
              categoriaActiva === cat.id
                ? 'bg-gradient-warm text-primary-foreground shadow-warm'
                : 'bg-secondary text-secondary-foreground hover:bg-muted'
            }`}
          >
            {cat.icono} {cat.nombre}
          </button>
        ))}
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-2 gap-3 px-4 py-2 flex-1">
        {productos.map(producto => (
          <motion.button
            key={producto.id}
            whileTap={{ scale: 0.96 }}
            onClick={() => setSelectedProduct(producto.id)}
            className="flex flex-col items-start gap-1.5 rounded-xl border border-border bg-card p-3 text-left transition-all hover:border-primary/30 hover:shadow-card"
          >
            <span className="font-medium text-sm text-foreground">{producto.nombre}</span>
            {producto.descripcion && (
              <span className="text-[11px] text-muted-foreground line-clamp-1">{producto.descripcion}</span>
            )}
            <span className="font-display text-sm font-bold text-primary">{formatCurrency(producto.precio)}</span>
          </motion.button>
        ))}
      </div>

      {/* Voice Button */}
      <div className="fixed bottom-36 right-4 z-40">
        <button className="flex h-14 w-14 items-center justify-center rounded-full bg-gradient-warm shadow-warm text-primary-foreground transition-transform hover:scale-105 active:scale-95">
          <Mic className="h-6 w-6" />
        </button>
      </div>

      {/* Bottom Sheet - Product Detail */}
      <AnimatePresence>
        {selectedProduct && (() => {
          const producto = mockProductos.find(p => p.id === selectedProduct)!;
          return (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 bg-background/60 backdrop-blur-sm"
              onClick={() => setSelectedProduct(null)}
            >
              <motion.div
                initial={{ y: '100%' }}
                animate={{ y: 0 }}
                exit={{ y: '100%' }}
                transition={{ type: 'spring', damping: 30, stiffness: 400 }}
                onClick={e => e.stopPropagation()}
                className="absolute bottom-0 left-0 right-0 rounded-t-2xl border-t border-border bg-card p-6"
              >
                <div className="mx-auto mb-4 h-1 w-12 rounded-full bg-muted" />
                <h3 className="font-display text-xl font-bold">{producto.nombre}</h3>
                <p className="text-primary font-display font-bold mt-1">{formatCurrency(producto.precio)}</p>
                {producto.descripcion && (
                  <p className="text-sm text-muted-foreground mt-2">{producto.descripcion}</p>
                )}

                <div className="mt-4">
                  <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Notas</label>
                  <input
                    type="text"
                    value={notas}
                    onChange={e => setNotas(e.target.value)}
                    placeholder="Sin sal, término medio..."
                    className="mt-1 w-full rounded-lg border border-border bg-secondary px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary"
                  />
                </div>

                <div className="mt-4 flex items-center justify-between">
                  <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Cantidad</span>
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => setCantidad(c => Math.max(1, c - 1))}
                      className="flex h-8 w-8 items-center justify-center rounded-full bg-secondary text-foreground hover:bg-muted"
                    >
                      <Minus className="h-4 w-4" />
                    </button>
                    <span className="w-8 text-center font-display text-lg font-bold">{cantidad}</span>
                    <button
                      onClick={() => setCantidad(c => c + 1)}
                      className="flex h-8 w-8 items-center justify-center rounded-full bg-secondary text-foreground hover:bg-muted"
                    >
                      <Plus className="h-4 w-4" />
                    </button>
                  </div>
                </div>

                <button
                  onClick={() => addItem(producto.id)}
                  className="mt-6 w-full rounded-xl bg-gradient-warm py-3 text-center font-display font-bold text-primary-foreground shadow-warm transition-all hover:scale-[1.01] active:scale-[0.99]"
                >
                  Agregar · {formatCurrency(producto.precio * cantidad)}
                </button>
              </motion.div>
            </motion.div>
          );
        })()}
      </AnimatePresence>

      {/* Summary Footer */}
      {items.length > 0 && (
        <motion.div
          initial={{ y: 100 }}
          animate={{ y: 0 }}
          className="fixed bottom-16 left-0 right-0 z-40 border-t border-border bg-card/95 backdrop-blur-xl p-4"
        >
          <div className="mb-2 max-h-24 overflow-y-auto space-y-1">
            {items.map(item => (
              <div key={item.id} className="flex items-center justify-between text-sm">
                <span className="text-foreground">
                  {item.nombre_snapshot} ×{item.cantidad}
                  {item.notas && <span className="text-xs text-primary ml-1">· {item.notas}</span>}
                </span>
                <div className="flex items-center gap-2">
                  <span className="text-muted-foreground">{formatCurrency(item.precio_snapshot * item.cantidad)}</span>
                  <button onClick={() => removeItem(item.id)} className="text-muted-foreground hover:text-destructive">
                    <X className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
          <button
            onClick={() => {
              // Would send to Supabase
              navigate('/mesas');
            }}
            className="w-full rounded-xl bg-gradient-warm py-3 text-center font-display font-bold text-primary-foreground shadow-warm"
          >
            Enviar a Cocina · {items.length} items · {formatCurrency(total)}
          </button>
        </motion.div>
      )}
    </div>
  );
}
