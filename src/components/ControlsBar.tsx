import { RotateCcw, Shuffle, Timer } from 'lucide-react';
import { Difficulty } from '../types';
import { DIFFICULTY_PRESETS } from '../data/passages';

interface ControlsBarProps {
  difficulty: Difficulty;
  timeLimit: number;
  onDifficultyChange: (diff: Difficulty) => void;
  onTimeLimitChange: (time: number) => void;
  onRestart: () => void;
  onNewPassage: () => void;
  disabled?: boolean;
}

export function ControlsBar({
  difficulty,
  timeLimit,
  onDifficultyChange,
  onTimeLimitChange,
  onRestart,
  onNewPassage,
  disabled = false,
}: ControlsBarProps) {
  const difficulties: Difficulty[] = ['easy', 'medium', 'hard'];
  const timePresets = [15, 30, 45, 60, 75, 120];

  return (
    <div className="w-full flex flex-wrap items-center justify-between gap-3 py-2 text-xs">
      {/* Difficulty Selector Tabs */}
      <div className="flex items-center gap-1 p-1 bg-slate-900/90 rounded-xl border border-slate-800/80">
        <span className="text-slate-500 text-[11px] font-mono px-2 hidden sm:inline">Mode:</span>
        {difficulties.map((diff) => {
          const isSelected = difficulty === diff;
          return (
            <button
              key={diff}
              id={`difficulty-btn-${diff}`}
              onClick={() => onDifficultyChange(diff)}
              className={`px-3 py-1.5 rounded-lg font-medium transition-all ${
                isSelected
                  ? 'bg-blue-600 text-white shadow-sm shadow-blue-600/30'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
              }`}
            >
              {DIFFICULTY_PRESETS[diff].label}
              <span className="ml-1 text-[10px] opacity-75 font-mono">
                {DIFFICULTY_PRESETS[diff].defaultTime}s
              </span>
            </button>
          );
        })}
      </div>

      {/* Time Limit Selector */}
      <div className="flex items-center gap-1 p-1 bg-slate-900/90 rounded-xl border border-slate-800/80">
        <div className="flex items-center gap-1 text-slate-500 text-[11px] font-mono px-1.5">
          <Timer className="w-3 h-3 text-slate-400" />
          <span className="hidden sm:inline">Time:</span>
        </div>
        {timePresets.map((time) => {
          const isSelected = timeLimit === time;
          return (
            <button
              key={time}
              id={`time-btn-${time}`}
              onClick={() => onTimeLimitChange(time)}
              className={`px-2.5 py-1 rounded-lg font-mono text-xs transition-all ${
                isSelected
                  ? 'bg-slate-700/90 text-blue-300 font-semibold border border-blue-500/30'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/40'
              }`}
            >
              {time}s
            </button>
          );
        })}
      </div>

      {/* Quick Action Buttons */}
      <div className="flex items-center gap-1.5 ml-auto">
        <button
          id="shuffle-passage-btn"
          onClick={onNewPassage}
          disabled={disabled}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-300 hover:text-white transition-all disabled:opacity-50"
          title="Load different passage"
        >
          <Shuffle className="w-3.5 h-3.5 text-slate-400" />
          <span className="hidden md:inline text-[11px]">New Passage</span>
        </button>

        <button
          id="restart-test-btn"
          onClick={onRestart}
          disabled={disabled}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-300 hover:text-white transition-all disabled:opacity-50"
          title="Restart current test (Tab)"
        >
          <RotateCcw className="w-3.5 h-3.5 text-slate-400" />
          <span className="hidden md:inline text-[11px]">Restart</span>
          <kbd className="hidden sm:inline-block px-1 py-0.2 text-[9px] font-mono bg-slate-800 rounded text-slate-400 border border-slate-700">
            Tab
          </kbd>
        </button>
      </div>
    </div>
  );
}
