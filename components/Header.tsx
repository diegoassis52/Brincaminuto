
import React from 'react';

export const Header: React.FC = () => {
  return (
    <header className="bg-amber-100/50 backdrop-blur-sm sticky top-0 z-10 py-4 shadow-sm">
      <div className="container mx-auto text-center px-4">
        <h1 className="text-3xl md:text-4xl font-bold text-amber-900">
          BrincaMinuto
        </h1>
        <p className="text-sm md:text-base text-amber-700 mt-1">
          Troque a culpa da tela por minutos de conexão.
        </p>
      </div>
    </header>
  );
};
