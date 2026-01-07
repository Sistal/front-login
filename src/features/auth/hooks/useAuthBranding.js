import { useMemo } from 'react';

export default function useAuthBranding(role) {
  return useMemo(() => {
    switch (role) {
      case 'admin':
        return { title: 'Panel Admin', accent: '#3b82f6' };
      default:
        return { title: 'Bienvenido', accent: '#22c55e' };
    }
  }, [role]);
}

