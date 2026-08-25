import { useState, useEffect, useRef, useCallback } from 'react';
import { Difficulty, PersonalBests, SoundType, StatPoint, TestResult, TestState } from './types';
import { DIFFICULTY_PRESETS, getRandomPassage } from './data/passages';
import { playKeySound, playErrorSound, playCompleteSound } from './utils/audio';
import { getPersonalBests, savePersonalBest, saveToHistory } from './utils/storage';
import { Header } from './components/Header';
import { ControlsBar } from './components/ControlsBar';
import { LiveStatsBar } from './components/LiveStatsBar';
import { TypingArea } from './components/TypingArea';
import { ResultsView } from './components/ResultsView';
import { ShortcutsModal } from './components/ShortcutsModal';

export default function App() {
  // Test Configuration State
  const [difficulty, setDifficulty] = useState<Difficulty>('easy');
  const [timeLimit, setTimeLimit] = useState<number>(DIFFICULTY_PRESETS['easy'].defaultTime);
  const [soundType, setSoundType] = useState<SoundType>('mechanical');
  const [showShortcuts, setShowShortcuts] = useState(false);

  // Active Passage & User Input State
  const [currentPassage, setCurrentPassage] = useState(() => getRandomPassage('easy'));
  const [userInput, setUserInput] = useState('');
  const [testState, setTestState] = useState<TestState>('idle');
  const [timeLeft, setTimeLeft] = useState<number>(DIFFICULTY_PRESETS['easy'].defaultTime);

  // Telemetry & Metrics State
  const [totalKeystrokes, setTotalKeystrokes] = useState(0);
  const [correctKeystrokes, setCorrectKeystrokes] = useState(0);
  const [totalErrors, setTotalErrors] = useState(0);
  const [telemetryHistory, setTelemetryHistory] = useState<StatPoint[]>([]);
  const [testResult, setTestResult] = useState<TestResult | null>(null);

  // Personal Bests State
  const [personalBests, setPersonalBests] = useState<PersonalBests>(() => getPersonalBests());

  // Refs for tracking timer intervals and exact start times
  const timerRef = useRef<number | null>(null);
  const startTimeRef = useRef<number | null>(null);
  const errorsThisSecondRef = useRef<number>(0);

  // Compute live current stats
  const computeCurrentStats = useCallback(
    (elapsedSeconds: number, currentInput: string) => {
      if (elapsedSeconds <= 0 || currentInput.length === 0) {
        return { wpm: 0, rawWpm: 0, accuracy: 100, correctChars: 0, incorrectChars: 0 };
      }

      let correctCount = 0;
      let incorrectCount = 0;
      for (let i = 0; i < currentInput.length; i++) {
        if (currentInput[i] === currentPassage.text[i]) {
          correctCount++;
        } else {
          incorrectCount++;
        }
      }

      const timeInMinutes = elapsedSeconds / 60;
      // Standard net WPM: (correct chars / 5) / minutes
      const wpm = Math.max(0, Math.round(correctCount / 5 / timeInMinutes));
      // Raw gross WPM: (all typed chars / 5) / minutes
      const rawWpm = Math.max(0, Math.round(currentInput.length / 5 / timeInMinutes));
      // Accuracy
      const acc =
        totalKeystrokes > 0
          ? Math.max(0, Math.min(100, Math.round((correctKeystrokes / totalKeystrokes) * 100)))
          : 100;

      return {
        wpm,
        rawWpm,
        accuracy: acc,
        correctChars: correctCount,
        incorrectChars: incorrectCount,
      };
    },
    [currentPassage.text, totalKeystrokes, correctKeystrokes]
  );

  // Finish the test and show results
  const finishTest = useCallback(() => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }

    const elapsedSeconds = startTimeRef.current
      ? Math.max(1, Math.round((Date.now() - startTimeRef.current) / 1000))
      : timeLimit - timeLeft;

    const stats = computeCurrentStats(elapsedSeconds, userInput);
    const isNewPB = savePersonalBest(difficulty, stats.wpm);
    if (isNewPB) {
      setPersonalBests(getPersonalBests());
    }

    // Add final telemetry point
    const finalHistory = [
      ...telemetryHistory,
      {
        second: elapsedSeconds,
        wpm: stats.wpm,
        rawWpm: stats.rawWpm,
        errors: errorsThisSecondRef.current,
      },
    ];

    const result: TestResult = {
      wpm: stats.wpm,
      rawWpm: stats.rawWpm,
      accuracy: stats.accuracy,
      errors: totalErrors,
      totalChars: currentPassage.text.length,
      correctChars: stats.correctChars,
      incorrectChars: stats.incorrectChars,
      timeElapsed: elapsedSeconds,
      timeLimit,
      difficulty,
      timestamp: Date.now(),
      isPersonalBest: isNewPB,
      graphData: finalHistory.length > 0 ? finalHistory : [
        { second: 0, wpm: 0, rawWpm: 0, errors: 0 },
        { second: elapsedSeconds, wpm: stats.wpm, rawWpm: stats.rawWpm, errors: totalErrors },
      ],
    };

    saveToHistory(result);
    setTestResult(result);
    setTestState('completed');
    playCompleteSound(soundType !== 'off');
  }, [
    computeCurrentStats,
    currentPassage.text.length,
    difficulty,
    soundType,
    telemetryHistory,
    timeLeft,
    timeLimit,
    totalErrors,
    userInput,
  ]);

  // Restart current test with clean state (same passage)
  const handleRestart = useCallback(() => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
    startTimeRef.current = null;
    errorsThisSecondRef.current = 0;

    setUserInput('');
    setTestState('idle');
    setTimeLeft(timeLimit);
    setTotalKeystrokes(0);
    setCorrectKeystrokes(0);
    setTotalErrors(0);
    setTelemetryHistory([]);
    setTestResult(null);
  }, [timeLimit]);

  // Load a new random passage
  const handleNewPassage = useCallback(() => {
    const nextPassage = getRandomPassage(difficulty, currentPassage.id);
    setCurrentPassage(nextPassage);
    handleRestart();
  }, [difficulty, currentPassage.id, handleRestart]);

  // Start test on first typing action
  const handleStartTest = useCallback(() => {
    if (testState !== 'idle') return;
    setTestState('running');
    startTimeRef.current = Date.now();
    errorsThisSecondRef.current = 0;
  }, [testState]);

  // Handle difficulty level change
  const handleDifficultyChange = (newDiff: Difficulty) => {
    setDifficulty(newDiff);
    const newTime = DIFFICULTY_PRESETS[newDiff].defaultTime;
    setTimeLimit(newTime);
    const nextPassage = getRandomPassage(newDiff);
    setCurrentPassage(nextPassage);

    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
    startTimeRef.current = null;
    setUserInput('');
    setTestState('idle');
    setTimeLeft(newTime);
    setTotalKeystrokes(0);
    setCorrectKeystrokes(0);
    setTotalErrors(0);
    setTelemetryHistory([]);
    setTestResult(null);
  };

  // Handle custom time limit selection
  const handleTimeLimitChange = (newTime: number) => {
    setTimeLimit(newTime);
    setTimeLeft(newTime);
    handleRestart();
  };

  // User input keystroke handler
  const handleInputChange = (value: string, keyAdded?: string, isBackspace?: boolean) => {
    if (testState === 'completed') return;

    if (testState === 'idle') {
      handleStartTest();
    }

    const currentIndex = value.length - 1;

    if (!isBackspace && keyAdded !== undefined && currentIndex >= 0) {
      setTotalKeystrokes((prev) => prev + 1);
      const isCorrect = keyAdded === currentPassage.text[currentIndex];

      if (isCorrect) {
        setCorrectKeystrokes((prev) => prev + 1);
        playKeySound(soundType);
      } else {
        setTotalErrors((prev) => prev + 1);
        errorsThisSecondRef.current += 1;
        playErrorSound(soundType !== 'off');
      }
    }

    setUserInput(value);

    // Check if user finished the full passage
    if (value.length === currentPassage.text.length) {
      setTimeout(() => finishTest(), 50);
    }
  };

  // Countdown timer and telemetry sampling effect
  useEffect(() => {
    if (testState === 'running') {
      timerRef.current = window.setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            finishTest();
            return 0;
          }
          return prev - 1;
        });

        // Record telemetry sample every second
        if (startTimeRef.current) {
          const elapsed = Math.max(1, Math.round((Date.now() - startTimeRef.current) / 1000));
          const currentStats = computeCurrentStats(elapsed, userInput);
          setTelemetryHistory((prev) => [
            ...prev,
            {
              second: elapsed,
              wpm: currentStats.wpm,
              rawWpm: currentStats.rawWpm,
              errors: errorsThisSecondRef.current,
            },
          ]);
          // Reset per-second error counter
          errorsThisSecondRef.current = 0;
        }
      }, 1000);
    }

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
    };
  }, [testState, finishTest, computeCurrentStats, userInput]);

  // Global Tab / Escape key listener for instantaneous restart
  useEffect(() => {
    const handleGlobalKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Tab') {
        e.preventDefault();
        handleRestart();
      } else if (e.key === 'Escape') {
        setShowShortcuts(false);
      }
    };

    window.addEventListener('keydown', handleGlobalKeyDown);
    return () => window.removeEventListener('keydown', handleGlobalKeyDown);
  }, [handleRestart]);

  // Calculate live stats for the stats bar
  const liveElapsedSeconds = startTimeRef.current
    ? Math.max(1, Math.round((Date.now() - startTimeRef.current) / 1000))
    : 0;
  const liveStats = computeCurrentStats(liveElapsedSeconds, userInput);

  return (
    <div className="min-h-screen bg-[#08090d] text-slate-100 flex flex-col justify-between selection:bg-blue-500/30 selection:text-blue-200">
      {/* Top Main Container */}
      <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 flex-1 flex flex-col justify-center py-6 sm:py-10">
        {/* Header */}
        <Header
          difficulty={difficulty}
          personalBests={personalBests}
          soundType={soundType}
          onSoundChange={setSoundType}
          onShowShortcuts={() => setShowShortcuts(true)}
        />

        {testState === 'completed' && testResult ? (
          /* Results Screen */
          <ResultsView
            result={testResult}
            onRestart={handleRestart}
            onNextPassage={handleNewPassage}
          />
        ) : (
          /* Active Typing Test Interface */
          <div className="w-full flex flex-col gap-5">
            {/* Difficulty and Controls Bar */}
            <ControlsBar
              difficulty={difficulty}
              timeLimit={timeLimit}
              onDifficultyChange={handleDifficultyChange}
              onTimeLimitChange={handleTimeLimitChange}
              onRestart={handleRestart}
              onNewPassage={handleNewPassage}
              disabled={testState === 'running'}
            />

            {/* Live Stats and Progress Bar */}
            <LiveStatsBar
              timeLeft={timeLeft}
              timeLimit={timeLimit}
              testState={testState}
              wpm={liveStats.wpm}
              rawWpm={liveStats.rawWpm}
              accuracy={liveStats.accuracy}
              errorCount={totalErrors}
              typedChars={userInput.length}
              totalChars={currentPassage.text.length}
            />

            {/* Typing Area */}
            <TypingArea
              text={currentPassage.text}
              userInput={userInput}
              testState={testState}
              onInputChange={handleInputChange}
              onStartTest={handleStartTest}
            />

            {/* Passage Meta info & Quick hint */}
            <div className="flex items-center justify-between text-xs text-slate-500 font-mono px-1">
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-500/60" />
                <span>{currentPassage.source || 'Standard Passage'}</span>
                <span className="text-slate-700">•</span>
                <span>{DIFFICULTY_PRESETS[difficulty].description}</span>
              </div>
              <div className="hidden sm:flex items-center gap-1.5">
                <span>Press</span>
                <kbd className="px-1.5 py-0.5 rounded bg-slate-900 border border-slate-800 text-slate-400 text-[10px]">
                  Tab
                </kbd>
                <span>to quickly restart</span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Subtle Footer */}
      <footer className="w-full border-t border-slate-800/40 py-4 text-center text-xs text-slate-600 font-mono">
        TypeSprint • Minimal Dev-Tool Typing Speed Telemetry • Pure Client-Side Audio & Storage
      </footer>

      {/* Keyboard Shortcuts Modal */}
      <ShortcutsModal isOpen={showShortcuts} onClose={() => setShowShortcuts(false)} />
    </div>
  );
}
