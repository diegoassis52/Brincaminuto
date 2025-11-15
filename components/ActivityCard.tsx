
import React from 'react';
import type { Activity, AppState } from '../types';
import { LoadingSpinnerIcon, ErrorIcon, IdeaIcon } from './icons';

interface ActivityCardProps {
  state: AppState;
  activity: Activity | null;
  error: string | null;
}

const CardShell: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className = '' }) => (
    <div className={`bg-white rounded-2xl shadow-xl border border-gray-100 p-8 transition-all duration-500 transform-gpu ${className}`}>
        {children}
    </div>
);

export const ActivityCard: React.FC<ActivityCardProps> = ({ state, activity, error }) => {
  const renderContent = () => {
    switch (state) {
      case 'idle':
        return (
          <CardShell className="text-center">
            <IdeaIcon />
            <h2 className="text-xl font-bold text-amber-800 mt-4">Pronto para a diversão?</h2>
            <p className="text-amber-600 mt-2">Escolha suas opções acima e clique em "Criar Brincadeira" para receber uma atividade surpresa!</p>
          </CardShell>
        );
      case 'loading':
        return (
            <CardShell className="text-center">
                <LoadingSpinnerIcon />
                <h2 className="text-xl font-bold text-amber-800 mt-4 animate-pulse">Buscando a ideia perfeita...</h2>
                <p className="text-amber-600 mt-2">Um minutinho, a diversão já vem!</p>
            </CardShell>
        );
      case 'error':
        return (
            <CardShell className="text-center">
                <ErrorIcon />
                <h2 className="text-xl font-bold text-red-600 mt-4">Ah, não!</h2>
                <p className="text-red-500 mt-2">{error}</p>
            </CardShell>
        );
      case 'success':
        if (!activity) return null;
        return (
            <CardShell className="animate-fade-in-up">
                <div className="text-center mb-6">
                    <span className="text-6xl">{activity.emoji}</span>
                    <h2 className="text-2xl md:text-3xl font-bold text-amber-900 mt-4">{activity.title}</h2>
                </div>
                <div className="space-y-4 text-amber-800">
                    <p className="leading-relaxed">{activity.description}</p>
                    <div>
                        <h3 className="font-semibold text-amber-900">Você vai precisar de:</h3>
                        <p>{activity.materials_needed}</p>
                    </div>
                </div>
            </CardShell>
        );
      default:
        return null;
    }
  };

  return <div className="min-h-[250px] flex flex-col justify-center">{renderContent()}</div>;
};

// Add fade-in animation to tailwind config or a style tag if needed.
// For simplicity here, we can add it directly in a style tag in index.html,
// or better, configure tailwind.config.js for a real project.
// Let's assume a keyframe animation is available.
// In a real project tailwind.config.js:
/*
theme: {
  extend: {
    keyframes: {
      'fade-in-up': {
        '0%': { opacity: '0', transform: 'translateY(10px)' },
        '100%': { opacity: '1', transform: 'translateY(0)' },
      },
    },
    animation: {
      'fade-in-up': 'fade-in-up 0.5s ease-out',
    },
  },
},
*/
