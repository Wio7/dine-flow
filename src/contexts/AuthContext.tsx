import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Rol, Usuario } from '@/types/domain';

interface AuthContextType {
  user: Usuario | null;
  login: (rol: Rol) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

const usersByRole: Record<Rol, Usuario> = {
  mozo: { id: '1', nombre: 'Carlos', rol: 'mozo', restaurante_id: 'r1' },
  cocina: { id: '2', nombre: 'Chef Marco', rol: 'cocina', restaurante_id: 'r1' },
  caja: { id: '3', nombre: 'María', rol: 'caja', restaurante_id: 'r1' },
  admin: { id: '4', nombre: 'Roberto', rol: 'admin', restaurante_id: 'r1' },
};

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<Usuario | null>(null);

  const login = (rol: Rol) => setUser(usersByRole[rol]);
  const logout = () => setUser(null);

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be inside AuthProvider');
  return ctx;
}
