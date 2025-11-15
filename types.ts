
export interface Filters {
  age: string;
  time: string;
  location: string;
  materials: string;
}

export interface Activity {
  title: string;
  description: string;
  materials_needed: string;
  emoji: string;
}

export type AppState = 'idle' | 'loading' | 'success' | 'error';
