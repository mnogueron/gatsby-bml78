import {useEffect, useState} from 'react';

if (typeof window !== 'undefined') {
  window.toggleBetaFeature = () => {
    if (!localStorage.getItem('beta')) {
      localStorage.setItem('beta', 'enabled');
    } else {
      localStorage.removeItem('beta');
    }
  };
}

export const useBetaFeature = () => {
  const [beta, setBeta] = useState(
    typeof localStorage !== 'undefined' &&
      localStorage.getItem('beta') === 'enabled'
  );

  // TODO use context instead
  useEffect(() => {
    if (typeof window !== 'undefined' && typeof localStorage !== 'undefined') {
      const listener = () => {
        setBeta(localStorage.getItem('beta') === 'enabled');
      };
      window.addEventListener('storage', listener);
      return () => {
        window.removeEventListener('storage', listener);
      };
    }
  }, []);

  return beta;
};
