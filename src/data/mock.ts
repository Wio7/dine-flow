import { Mesa, Categoria, Producto, Pedido, Usuario } from '@/types/domain';

export const mockUser: Usuario = {
  id: '1',
  nombre: 'Carlos',
  rol: 'mozo',
  restaurante_id: 'r1',
};

export const mockMesas: Mesa[] = [
  { id: 'm1', numero: 1, capacidad: 4, estado: 'libre', total_acumulado: 0 },
  { id: 'm2', numero: 2, capacidad: 4, estado: 'ocupada', mozo_nombre: 'Carlos', total_acumulado: 12500, opened_at: new Date(Date.now() - 45 * 60000).toISOString() },
  { id: 'm3', numero: 3, capacidad: 6, estado: 'cocina', mozo_nombre: 'Ana', total_acumulado: 8200, opened_at: new Date(Date.now() - 30 * 60000).toISOString() },
  { id: 'm4', numero: 4, capacidad: 2, estado: 'cuenta', mozo_nombre: 'Carlos', total_acumulado: 21000, opened_at: new Date(Date.now() - 80 * 60000).toISOString() },
  { id: 'm5', numero: 5, capacidad: 4, estado: 'ocupada', mozo_nombre: 'Luis', total_acumulado: 15800, opened_at: new Date(Date.now() - 20 * 60000).toISOString() },
  { id: 'm6', numero: 6, capacidad: 8, estado: 'libre', total_acumulado: 0 },
  { id: 'm7', numero: 7, capacidad: 4, estado: 'cuenta', mozo_nombre: 'Luis', total_acumulado: 45500, opened_at: new Date(Date.now() - 95 * 60000).toISOString() },
  { id: 'm8', numero: 8, capacidad: 4, estado: 'cocina', mozo_nombre: 'Ana', total_acumulado: 9800, opened_at: new Date(Date.now() - 15 * 60000).toISOString() },
  { id: 'm9', numero: 9, capacidad: 6, estado: 'libre', total_acumulado: 0 },
  { id: 'm10', numero: 10, capacidad: 4, estado: 'ocupada', mozo_nombre: 'Carlos', total_acumulado: 6200, opened_at: new Date(Date.now() - 10 * 60000).toISOString() },
  { id: 'm11', numero: 11, capacidad: 2, estado: 'libre', total_acumulado: 0 },
  { id: 'm12', numero: 12, capacidad: 4, estado: 'libre', total_acumulado: 0 },
];

export const mockCategorias: Categoria[] = [
  { id: 'c1', nombre: 'Entradas', icono: '🥗', orden: 0 },
  { id: 'c2', nombre: 'Fondos', icono: '🍖', orden: 1 },
  { id: 'c3', nombre: 'Bebidas', icono: '🥤', orden: 2 },
  { id: 'c4', nombre: 'Postres', icono: '🍰', orden: 3 },
];

export const mockProductos: Producto[] = [
  { id: 'p1', categoria_id: 'c1', nombre: 'Ceviche Mixto', precio: 11000, tiempo_prep: 12, descripcion: 'Pescado y mariscos frescos' },
  { id: 'p2', categoria_id: 'c1', nombre: 'Causa Limeña', precio: 8500, tiempo_prep: 8, descripcion: 'Papa amarilla rellena' },
  { id: 'p3', categoria_id: 'c1', nombre: 'Anticuchos', precio: 7000, tiempo_prep: 10, descripcion: 'Brochetas de corazón' },
  { id: 'p4', categoria_id: 'c2', nombre: 'Lomo Saltado', precio: 9500, tiempo_prep: 15, descripcion: 'Res salteada al wok' },
  { id: 'p5', categoria_id: 'c2', nombre: 'Pollo a la Brasa', precio: 7200, tiempo_prep: 25, descripcion: 'Pollo entero al carbón' },
  { id: 'p6', categoria_id: 'c2', nombre: 'Arroz Chaufa', precio: 8000, tiempo_prep: 12, descripcion: 'Arroz salteado estilo oriental' },
  { id: 'p7', categoria_id: 'c2', nombre: 'Ají de Gallina', precio: 8800, tiempo_prep: 18, descripcion: 'Crema de ají con pollo' },
  { id: 'p8', categoria_id: 'c3', nombre: 'Limonada', precio: 3000, tiempo_prep: 3, descripcion: 'Limón fresco natural' },
  { id: 'p9', categoria_id: 'c3', nombre: 'Chicha Morada', precio: 3500, tiempo_prep: 3, descripcion: 'Maíz morado tradicional' },
  { id: 'p10', categoria_id: 'c3', nombre: 'Pisco Sour', precio: 6000, tiempo_prep: 5, descripcion: 'Cóctel peruano clásico' },
  { id: 'p11', categoria_id: 'c4', nombre: 'Suspiro Limeño', precio: 5000, tiempo_prep: 5, descripcion: 'Dulce de leche y merengue' },
  { id: 'p12', categoria_id: 'c4', nombre: 'Picarones', precio: 4500, tiempo_prep: 10, descripcion: 'Donas de camote con miel' },
];

export const mockPedidos: Pedido[] = [
  {
    id: 'ped1',
    mesa_id: 'm2',
    mesa_numero: 2,
    mozo_nombre: 'Carlos',
    estado: 'preparacion',
    prioridad: 0,
    created_at: new Date(Date.now() - 12 * 60000).toISOString(),
    items: [
      { id: 'i1', producto_id: 'p4', nombre_snapshot: 'Lomo Saltado', precio_snapshot: 9500, cantidad: 1, modificaciones: ['término medio', 'sin sal'], estado: 'preparacion' },
      { id: 'i2', producto_id: 'p8', nombre_snapshot: 'Limonada', precio_snapshot: 3000, cantidad: 2, modificaciones: ['sin azúcar'], estado: 'pendiente' },
    ],
  },
  {
    id: 'ped2',
    mesa_id: 'm3',
    mesa_numero: 3,
    mozo_nombre: 'Ana',
    estado: 'pendiente',
    prioridad: 1,
    created_at: new Date(Date.now() - 3 * 60000).toISOString(),
    items: [
      { id: 'i3', producto_id: 'p1', nombre_snapshot: 'Ceviche Mixto', precio_snapshot: 11000, cantidad: 1, modificaciones: [], estado: 'pendiente' },
      { id: 'i4', producto_id: 'p6', nombre_snapshot: 'Arroz Chaufa', precio_snapshot: 8000, cantidad: 2, modificaciones: [], estado: 'pendiente' },
      { id: 'i5', producto_id: 'p9', nombre_snapshot: 'Chicha Morada', precio_snapshot: 3500, cantidad: 1, modificaciones: [], estado: 'pendiente' },
    ],
  },
  {
    id: 'ped3',
    mesa_id: 'm5',
    mesa_numero: 5,
    mozo_nombre: 'Luis',
    estado: 'preparacion',
    prioridad: 0,
    created_at: new Date(Date.now() - 7 * 60000).toISOString(),
    items: [
      { id: 'i6', producto_id: 'p5', nombre_snapshot: 'Pollo a la Brasa', precio_snapshot: 7200, cantidad: 1, modificaciones: [], estado: 'preparacion' },
      { id: 'i7', producto_id: 'p10', nombre_snapshot: 'Pisco Sour', precio_snapshot: 6000, cantidad: 2, modificaciones: [], estado: 'listo' },
    ],
  },
  {
    id: 'ped4',
    mesa_id: 'm8',
    mesa_numero: 8,
    mozo_nombre: 'Ana',
    estado: 'listo',
    prioridad: 0,
    created_at: new Date(Date.now() - 18 * 60000).toISOString(),
    items: [
      { id: 'i8', producto_id: 'p7', nombre_snapshot: 'Ají de Gallina', precio_snapshot: 8800, cantidad: 1, modificaciones: [], estado: 'listo' },
      { id: 'i9', producto_id: 'p8', nombre_snapshot: 'Limonada', precio_snapshot: 3000, cantidad: 1, modificaciones: [], estado: 'listo' },
    ],
  },
];

export function formatCurrency(amount: number): string {
  return `$${amount.toLocaleString('es-CL')}`;
}

export function getTimeSince(dateStr: string): string {
  const diff = Date.now() - new Date(dateStr).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 60) return `${mins}m`;
  const hours = Math.floor(mins / 60);
  return `${hours}h ${mins % 60}m`;
}
