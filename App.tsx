
import React, { useState, useCallback } from 'react';
import { FilterPanel } from './components/FilterPanel';
import { ActivityCard } from './components/ActivityCard';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import type { Filters, Activity, AppState } from './types';
import { generateActivity } from './services/geminiService';
import { SparklesIcon } from './components/icons';

const App: React.FC = () => {
  const [activity, setActivity] = useState<Activity | null>(null);
  const [appState, setAppState] = useState<AppState>('idle');
  const [error, setError] = useState<string | null>(null);

  const handleGenerateActivity = useCallback(async (filters: Filters) => {
    setAppState('loading');
    setError(null);
    setActivity(null);
    try {
      const newActivity = await generateActivity(filters);
      setActivity(newActivity);
      setAppState('success');
    } catch (err) {
      console.error(err);
      setError('Oops! Não conseguimos gerar uma atividade. Tente novamente.');
      setAppState('error');
    }
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow container mx-auto p-4 md:p-8 flex flex-col items-center">
        <div className="w-full max-w-2xl">
          <FilterPanel onGenerate={handleGenerateActivity} isLoading={appState === 'loading'} />
          <div className="mt-8">
            <ActivityCard state={appState} activity={activity} error={error} />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default App;
