import { Link, useLocation } from 'react-router-dom';
import { LayoutGrid, ChefHat, Receipt, BarChart3 } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { motion } from 'framer-motion';

const navItems = [
  { path: '/mesas', icon: LayoutGrid, label: 'Mesas', roles: ['mozo', 'admin'] },
  { path: '/cocina', icon: ChefHat, label: 'Cocina', roles: ['cocina', 'mozo', 'admin'] },
  { path: '/caja', icon: Receipt, label: 'Caja', roles: ['caja', 'admin'] },
  { path: '/admin', icon: BarChart3, label: 'Admin', roles: ['admin'] },
];

export default function BottomNav() {
  const location = useLocation();
  const { user } = useAuth();

  const visibleItems = navItems.filter(item =>
    user && item.roles.includes(user.rol)
  );

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 border-t border-border bg-card/95 backdrop-blur-xl safe-bottom">
      <div className="flex items-center justify-around px-2 py-1">
        {visibleItems.map((item) => {
          const isActive = location.pathname.startsWith(item.path);
          return (
            <Link
              key={item.path}
              to={item.path}
              className="relative flex flex-col items-center gap-0.5 px-4 py-2"
            >
              {isActive && (
                <motion.div
                  layoutId="bottomnav-indicator"
                  className="absolute -top-px left-2 right-2 h-0.5 bg-gradient-warm rounded-full"
                  transition={{ type: 'spring', stiffness: 500, damping: 35 }}
                />
              )}
              <item.icon
                className={`h-5 w-5 transition-colors ${
                  isActive ? 'text-primary' : 'text-muted-foreground'
                }`}
              />
              <span
                className={`text-[10px] font-medium transition-colors ${
                  isActive ? 'text-primary' : 'text-muted-foreground'
                }`}
              >
                {item.label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
