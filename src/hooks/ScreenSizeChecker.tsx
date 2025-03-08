import React, { useEffect, useState } from 'react';
import { ReactNode } from 'react';

const ScreenSizeChecker = ({ children }: { children: ReactNode }) => {
  const [isScreenTooSmall, setIsScreenTooSmall] = useState(false);

  useEffect(() => {
    const checkScreenSize = () => {
      const screenWidth = window.innerWidth;
      const screenHeight = window.innerHeight;

      // Vérification si l'écran est plus petit qu'une tablette standard (820x1180)
      if (screenWidth < 820 || screenHeight < 600) {
        setIsScreenTooSmall(true);
      } else {
        setIsScreenTooSmall(false);
      }
    };

    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);

    return () => {
      window.removeEventListener('resize', checkScreenSize);
    };
  }, []);

  if (isScreenTooSmall) {
    return (
      <div style={{ textAlign: 'center', marginTop: '20%' }}>
        <h1>Accès bloqué</h1>
        <p>Cette application nécessite un écran d'au moins 820x600 pixels.</p>
        <p>
          Veuillez utiliser une tablette ou un ordinateur pour accéder à
          l'application.
        </p>
      </div>
    );
  }

  return <>{children}</>;
};

export default ScreenSizeChecker;
