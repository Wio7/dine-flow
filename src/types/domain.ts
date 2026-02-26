export type Rol = 'mozo' | 'cocina' | 'caja' | 'admin';

export type EstadoMesa = 'libre' | 'ocupada' | 'cocina' | 'cuenta';

export type EstadoPedido = 'pendiente' | 'preparacion' | 'listo' | 'cerrado';

export interface Restaurante {
  id: string;
  nombre: string;
  slug: string;
}

export interface Usuario {
  id: string;
  nombre: string;
  rol: Rol;
  restaurante_id: string;
}

export interface Mesa {
  id: string;
  numero: number;
  capacidad: number;
  estado: EstadoMesa;
  mozo_id?: string;
  mozo_nombre?: string;
  total_acumulado: number;
  opened_at?: string;
}

export interface Categoria {
  id: string;
  nombre: string;
  icono: string;
  orden: number;
}

export interface Producto {
  id: string;
  categoria_id: string;
  nombre: string;
  descripcion?: string;
  precio: number;
  tiempo_prep: number;
  imagen_url?: string;
}

export interface ItemPedido {
  id: string;
  producto_id: string;
  nombre_snapshot: string;
  precio_snapshot: number;
  cantidad: number;
  modificaciones: string[];
  notas?: string;
  estado: string;
}

export interface Pedido {
  id: string;
  mesa_id: string;
  mesa_numero: number;
  mozo_nombre: string;
  estado: EstadoPedido;
  prioridad: number;
  items: ItemPedido[];
  notas_generales?: string;
  created_at: string;
}
