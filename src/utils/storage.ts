import { Difficulty, PersonalBests, TestResult } from '../types';

const PB_KEY = 'typesprint_personal_bests';
const HISTORY_KEY = 'typesprint_recent_history';

export function getPersonalBests(): PersonalBests {
  try {
    const data = localStorage.getItem(PB_KEY);
    if (data) {
      return JSON.parse(data);
    }
  } catch {
    // Fallback
  }
  return { easy: 0, medium: 0, hard: 0 };
}

export function savePersonalBest(difficulty: Difficulty, wpm: number): boolean {
  try {
    const current = getPersonalBests();
    if (wpm > current[difficulty]) {
      current[difficulty] = wpm;
      localStorage.setItem(PB_KEY, JSON.stringify(current));
      return true;
    }
  } catch {
    // Fallback
  }
  return false;
}

export function getRecentHistory(): TestResult[] {
  try {
    const data = localStorage.getItem(HISTORY_KEY);
    if (data) {
      return JSON.parse(data);
    }
  } catch {
    // Fallback
  }
  return [];
}

export function saveToHistory(result: TestResult) {
  try {
    const history = getRecentHistory();
    // Keep last 10 results
    const updated = [result, ...history].slice(0, 10);
    localStorage.setItem(HISTORY_KEY, JSON.stringify(updated));
  } catch {
    // Fallback
  }
}
