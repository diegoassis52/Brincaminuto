
import React, { useState } from 'react';
import type { Filters } from '../types';
import { SparklesIcon, LoadingIcon } from './icons';

interface FilterPanelProps {
  onGenerate: (filters: Filters) => void;
  isLoading: boolean;
}

const FilterSelect: React.FC<{ label: string; id: string; value: string; onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void; children: React.ReactNode }> = ({ label, id, value, onChange, children }) => (
    <div className="flex-1 min-w-[calc(50%-0.5rem)] md:min-w-0">
        <label htmlFor={id} className="block text-sm font-medium text-amber-800 mb-1">{label}</label>
        <select
            id={id}
            value={value}
            onChange={onChange}
            className="w-full bg-white border border-amber-300 rounded-md shadow-sm py-2 px-3 text-amber-900 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition"
        >
            {children}
        </select>
    </div>
);

export const FilterPanel: React.FC<FilterPanelProps> = ({ onGenerate, isLoading }) => {
  const [filters, setFilters] = useState<Filters>({
    age: '2-3',
    time: '10 min',
    location: 'Dentro de casa',
    materials: 'Sem materiais',
  });

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { id, value } = e.target;
    setFilters(prev => ({ ...prev, [id]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onGenerate(filters);
  };

  return (
    <div className="bg-amber-100 p-6 rounded-2xl shadow-lg border border-amber-200">
      <form onSubmit={handleSubmit}>
        <div className="flex flex-wrap gap-4 mb-6">
          <FilterSelect label="Idade da Criança" id="age" value={filters.age} onChange={handleChange}>
            <option value="2-3">2-3 anos</option>
            <option value="4-5">4-5 anos</option>
            <option value="6-7">6-7 anos</option>
            <option value="8+">8+ anos</option>
          </FilterSelect>
          <FilterSelect label="Tempo Disponível" id="time" value={filters.time} onChange={handleChange}>
            <option value="5 min">5 min</option>
            <option value="10 min">10 min</option>
            <option value="15 min">15 min</option>
            <option value="20+ min">20+ min</option>
          </FilterSelect>
          <FilterSelect label="Local" id="location" value={filters.location} onChange={handleChange}>
            <option value="Dentro de casa">Dentro de casa</option>
            <option value="Ar livre">Ar livre</option>
            <option value="Carro">No carro</option>
          </FilterSelect>
          <FilterSelect label="Materiais" id="materials" value={filters.materials} onChange={handleChange}>
            <option value="Sem materiais">Sem materiais</option>
            <option value="Só papel e caneta">Só papel e caneta</option>
            <option value="Itens de cozinha">Itens de cozinha</option>
            <option value="Brinquedos comuns">Brinquedos comuns</option>
          </FilterSelect>
        </div>
        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-orange-500 text-white font-bold py-3 px-4 rounded-lg shadow-md hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 focus:ring-offset-amber-100 disabled:bg-orange-300 disabled:cursor-not-allowed transition-all duration-300 flex items-center justify-center text-lg"
        >
          {isLoading ? (
            <>
                <LoadingIcon />
                Gerando Mágica...
            </>
          ) : (
            <>
                <SparklesIcon />
                Criar Brincadeira!
            </>
          )}
        </button>
      </form>
    </div>
  );
};
