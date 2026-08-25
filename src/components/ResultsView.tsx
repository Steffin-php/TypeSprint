import { useState } from 'react';
import { RotateCcw, Trophy, ArrowRight, Share2, Check, Zap, Target, AlertTriangle, Clock } from 'lucide-react';
import { TestResult } from '../types';
import { WpmChart } from './WpmChart';

interface ResultsViewProps {
  result: TestResult;
  onRestart: () => void;
  onNextPassage: () => void;
}

export function ResultsView({ result, onRestart, onNextPassage }: ResultsViewProps) {
  const [copied, setCopied] = useState(false);

  const handleCopySummary = () => {
    const summary = `⚡ TypeSprint Results ⚡\nDifficulty: ${result.difficulty.toUpperCase()}\nNet WPM: ${result.wpm} | Raw WPM: ${result.rawWpm}\nAccuracy: ${result.accuracy}% | Errors: ${result.errors}\nTime: ${result.timeElapsed}s`;
    navigator.clipboard.writeText(summary);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="w-full max-w-3xl mx-auto flex flex-col gap-6 animate-in fade-in zoom-in-95 duration-300">
      {/* Personal Best Celebration Banner */}
      {result.isPersonalBest && (
        <div className="w-full p-4 rounded-2xl bg-gradient-to-r from-blue-950/80 via-blue-900/40 to-indigo-950/80 border border-blue-500/50 flex items-center justify-between shadow-[0_0_30px_rgba(59,130,246,0.25)]">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-blue-500/20 text-blue-400 border border-blue-500/40">
              <Trophy className="w-6 h-6 text-yellow-400 animate-bounce" />
            </div>
            <div>
              <div className="text-xs uppercase tracking-wider font-semibold text-blue-300">
                New Record Achieved
              </div>
              <div className="text-base sm:text-lg font-bold text-white">
                New Personal Best for {result.difficulty.toUpperCase()} mode!
              </div>
            </div>
          </div>
          <span className="text-2xl font-black font-code text-yellow-400 pr-2">
            {result.wpm} <span className="text-xs text-yellow-200/70 font-normal">WPM</span>
          </span>
        </div>
      )}

      {/* Main Stats Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
        {/* Net WPM */}
        <div className="p-5 rounded-2xl bg-[#0d1017] border border-blue-500/30 flex flex-col justify-between relative overflow-hidden shadow-lg group">
          <div className="absolute top-0 right-0 w-24 h-24 bg-blue-500/5 rounded-full blur-2xl pointer-events-none group-hover:bg-blue-500/10 transition-all" />
          <div className="flex items-center justify-between text-xs text-slate-400 font-medium">
            <span>Net WPM</span>
            <Zap className="w-4 h-4 text-blue-400" />
          </div>
          <div className="mt-3">
            <div className="text-4xl sm:text-5xl font-black font-code text-blue-400 tracking-tight">
              {result.wpm}
            </div>
            <div className="text-[11px] text-slate-500 mt-1">Official Speed</div>
          </div>
        </div>

        {/* Raw WPM */}
        <div className="p-5 rounded-2xl bg-[#0d1017] border border-slate-800 flex flex-col justify-between relative overflow-hidden shadow-sm">
          <div className="flex items-center justify-between text-xs text-slate-400 font-medium">
            <span>Raw WPM</span>
            <span className="text-[11px] font-mono text-sky-400">gross</span>
          </div>
          <div className="mt-3">
            <div className="text-3xl sm:text-4xl font-bold font-code text-slate-200 tracking-tight">
              {result.rawWpm}
            </div>
            <div className="text-[11px] text-slate-500 mt-1">Speed without penalty</div>
          </div>
        </div>

        {/* Accuracy */}
        <div className="p-5 rounded-2xl bg-[#0d1017] border border-slate-800 flex flex-col justify-between relative overflow-hidden shadow-sm">
          <div className="flex items-center justify-between text-xs text-slate-400 font-medium">
            <span>Accuracy</span>
            <Target className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="mt-3">
            <div className="text-3xl sm:text-4xl font-bold font-code text-emerald-400 tracking-tight">
              {result.accuracy}%
            </div>
            <div className="text-[11px] text-slate-500 mt-1">
              {result.correctChars}/{result.totalChars} chars correct
            </div>
          </div>
        </div>

        {/* Errors & Time */}
        <div className="p-5 rounded-2xl bg-[#0d1017] border border-slate-800 flex flex-col justify-between relative overflow-hidden shadow-sm">
          <div className="flex items-center justify-between text-xs text-slate-400 font-medium">
            <span>Errors</span>
            <AlertTriangle className={`w-4 h-4 ${result.errors > 0 ? 'text-rose-400' : 'text-slate-500'}`} />
          </div>
          <div className="mt-3">
            <div className={`text-3xl sm:text-4xl font-bold font-code tracking-tight ${result.errors > 0 ? 'text-rose-400' : 'text-slate-300'}`}>
              {result.errors}
            </div>
            <div className="text-[11px] text-slate-500 mt-1 flex items-center gap-1">
              <Clock className="w-3 h-3 inline" /> {result.timeElapsed}s duration
            </div>
          </div>
        </div>
      </div>

      {/* WPM Progression Graph */}
      <div className="p-5 sm:p-6 rounded-2xl bg-[#0d1017] border border-slate-800/80 flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-semibold text-slate-200">
            Speed Progression & Telemetry
          </h3>
          <span className="text-xs text-slate-500 font-mono">
            {result.difficulty.toUpperCase()} • {result.timeLimit}s Mode
          </span>
        </div>
        <WpmChart data={result.graphData} avgWpm={result.wpm} />
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <button
            id="run-again-btn"
            onClick={onRestart}
            className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-medium shadow-lg shadow-blue-600/25 transition-all hover:scale-[1.02] active:scale-[0.98]"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Run it again</span>
            <kbd className="hidden sm:inline-block px-1.5 py-0.5 text-[10px] font-mono bg-blue-700/60 rounded text-blue-200 border border-blue-400/30 ml-1">
              Tab
            </kbd>
          </button>

          <button
            id="next-passage-btn"
            onClick={onNextPassage}
            className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-slate-200 font-medium border border-slate-700 transition-all hover:scale-[1.02] active:scale-[0.98]"
          >
            <span>Next Passage</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <button
          id="share-btn"
          onClick={handleCopySummary}
          className="w-full sm:w-auto flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-800 text-sm font-medium transition-all"
        >
          {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Share2 className="w-4 h-4 text-slate-400" />}
          <span>{copied ? 'Summary Copied!' : 'Copy Summary'}</span>
        </button>
      </div>
    </div>
  );
}
