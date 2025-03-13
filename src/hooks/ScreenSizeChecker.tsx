import React, { useEffect, useState } from 'react';
import { ReactNode } from 'react';
import { FaTabletAlt, FaDesktop, FaExclamationTriangle } from 'react-icons/fa';
import { RiArrowLeftRightLine } from 'react-icons/ri';

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
      <div className="h-screen flex justify-center items-center bg-gradient-to-br from-gray-100 to-blue-100 text-gray-800 p-5 font-sans">
        <div className="max-w-md bg-white rounded-2xl p-8 shadow-xl text-center">
          <div className="text-yellow-500 mb-6 flex justify-center items-center">
            <FaExclamationTriangle size={60} />
          </div>

          <h1 className="text-3xl font-semibold mb-4 text-gray-800">Accès limité</h1>

          <p className="text-lg mb-8 text-gray-500 leading-relaxed">
            Cette application nécessite un écran plus grand pour une expérience optimale.
          </p>

          <div className="flex justify-center items-center my-8">
            <div className="flex flex-col items-center text-blue-500 p-2.5 hover:scale-105 transition-transform">
              <FaTabletAlt size={40} />
              <span className="mt-2 text-sm">Tablette</span>
            </div>

            <RiArrowLeftRightLine className="mx-5 text-gray-500" size={30} />

            <div className="flex flex-col items-center text-blue-500 p-2.5 hover:scale-105 transition-transform">
              <FaDesktop size={40} />
              <span className="mt-2 text-sm">Ordinateur</span>
            </div>
          </div>

          <div className="mt-6 text-xs text-gray-400 p-2 border-t border-gray-100">
            <span>Résolution minimale requise: 820×600 pixels</span>
          </div>
        </div>
      </div>
    );
  }

  return <div>{children}</div>;
};

export default ScreenSizeChecker;
