export type Difficulty = 'easy' | 'medium' | 'hard';

export type TestState = 'idle' | 'running' | 'completed';

export type SoundType = 'mechanical' | 'soft' | 'bubble' | 'off';

export interface StatPoint {
  second: number;
  wpm: number;
  rawWpm: number;
  errors: number;
}

export interface TestResult {
  wpm: number;
  rawWpm: number;
  accuracy: number;
  errors: number;
  totalChars: number;
  correctChars: number;
  incorrectChars: number;
  timeElapsed: number;
  timeLimit: number;
  difficulty: Difficulty;
  timestamp: number;
  isPersonalBest: boolean;
  graphData: StatPoint[];
}

export interface PersonalBests {
  easy: number;
  medium: number;
  hard: number;
}

export interface Passage {
  id: string;
  difficulty: Difficulty;
  text: string;
  source?: string;
}
