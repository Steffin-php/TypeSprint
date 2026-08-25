import { Timer, Zap, Target, AlertTriangle } from 'lucide-react';
import { TestState } from '../types';

interface LiveStatsBarProps {
  timeLeft: number;
  timeLimit: number;
  testState: TestState;
  wpm: number;
  rawWpm: number;
  accuracy: number;
  errorCount: number;
  typedChars: number;
  totalChars: number;
}

export function LiveStatsBar({
  timeLeft,
  timeLimit,
  testState,
  wpm,
  accuracy,
  errorCount,
  typedChars,
  totalChars,
}: LiveStatsBarProps) {
  // Progress ratio (based on time if running, or character progress)
  const timeElapsed = timeLimit - timeLeft;
  const timeProgressPercent = Math.min(100, Math.max(0, (timeElapsed / timeLimit) * 100));
  const charProgressPercent = totalChars > 0 ? Math.min(100, Math.round((typedChars / totalChars) * 100)) : 0;

  const isWarningTime = timeLeft <= 10 && testState === 'running';

  return (
    <div className="w-full flex flex-col gap-3 py-1">
      {/* Top row: live stat meters */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-3">
        {/* Countdown Timer */}
        <div
          className={`p-3 rounded-xl bg-slate-900/80 border transition-all flex items-center justify-between ${
            isWarningTime
              ? 'border-rose-500/50 bg-rose-950/20 text-rose-300'
              : 'border-slate-800 text-slate-200'
          }`}
        >
          <div className="flex items-center gap-2">
            <Timer className={`w-4 h-4 ${isWarningTime ? 'text-rose-400 animate-pulse' : 'text-blue-400'}`} />
            <span className="text-xs text-slate-400 font-medium">Time</span>
          </div>
          <div className="font-code font-bold text-lg sm:text-xl">
            {timeLeft}
            <span className="text-xs font-normal text-slate-500 ml-0.5">s</span>
          </div>
        </div>

        {/* Live WPM */}
        <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Zap className="w-4 h-4 text-blue-400" />
            <span className="text-xs text-slate-400 font-medium">Live WPM</span>
          </div>
          <div className="font-code font-bold text-lg sm:text-xl text-blue-400">
            {wpm}
          </div>
        </div>

        {/* Live Accuracy */}
        <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Target className="w-4 h-4 text-emerald-400" />
            <span className="text-xs text-slate-400 font-medium">Accuracy</span>
          </div>
          <div className="font-code font-bold text-lg sm:text-xl text-emerald-400">
            {accuracy}%
          </div>
        </div>

        {/* Live Errors */}
        <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <AlertTriangle
              className={`w-4 h-4 ${errorCount > 0 ? 'text-rose-400' : 'text-slate-500'}`}
            />
            <span className="text-xs text-slate-400 font-medium">Errors</span>
          </div>
          <div
            className={`font-code font-bold text-lg sm:text-xl ${
              errorCount > 0 ? 'text-rose-400' : 'text-slate-300'
            }`}
          >
            {errorCount}
          </div>
        </div>
      </div>

      {/* Progress Bar Container */}
      <div className="w-full flex flex-col gap-1.5">
        <div className="flex items-center justify-between text-[11px] text-slate-500 font-mono">
          <span>
            Progress: <span className="text-slate-300 font-semibold">{charProgressPercent}%</span> ({typedChars}/{totalChars} chars)
          </span>
          <span>
            {testState === 'idle' ? (
              <span className="text-blue-400 animate-pulse">Start typing to begin timer</span>
            ) : (
              <span>{timeLeft}s remaining</span>
            )}
          </span>
        </div>

        {/* Dual visual progress bar (time elapsed & char progress) */}
        <div className="w-full h-2 rounded-full bg-slate-900 border border-slate-800 overflow-hidden relative">
          {/* Passage completion fill */}
          <div
            className="h-full bg-blue-500 shadow-[0_0_12px_#3b82f6] transition-all duration-150 ease-out"
            style={{ width: `${charProgressPercent}%` }}
          />
          {/* Time indicator line */}
          <div
            className="absolute top-0 bottom-0 w-1 bg-amber-400/80 transition-all duration-300 pointer-events-none"
            style={{ left: `${timeProgressPercent}%` }}
            title={`Time elapsed: ${timeElapsed}s`}
          />
        </div>
      </div>
    </div>
  );
}
