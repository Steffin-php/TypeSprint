import { useState } from 'react';
import { Volume2, VolumeX, Trophy, Keyboard, SlidersHorizontal } from 'lucide-react';
import { Difficulty, PersonalBests, SoundType } from '../types';

interface HeaderProps {
  difficulty: Difficulty;
  personalBests: PersonalBests;
  soundType: SoundType;
  onSoundChange: (sound: SoundType) => void;
  onShowShortcuts: () => void;
}

export function Header({
  difficulty,
  personalBests,
  soundType,
  onSoundChange,
  onShowShortcuts,
}: HeaderProps) {
  const [showSoundMenu, setShowSoundMenu] = useState(false);

  const currentPB = personalBests[difficulty] || 0;

  const soundOptions: { id: SoundType; label: string }[] = [
    { id: 'mechanical', label: 'Mechanical Click' },
    { id: 'soft', label: 'Soft Tap' },
    { id: 'bubble', label: 'Bubble Pop' },
    { id: 'off', label: 'Mute Audio' },
  ];

  return (
    <header className="w-full flex items-center justify-between py-4 sm:py-6 border-b border-slate-800/60 mb-6">
      {/* Brand Title without icons or taglines */}
      <div>
        <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-white font-ui select-none">
          Type<span className="text-blue-400">Sprint</span>
        </h1>
      </div>

      {/* Right controls: PB indicator, sound picker, shortcuts */}
      <div className="flex items-center gap-2 sm:gap-3">
        {/* Personal Best Badge */}
        <div
          id="personal-best-badge"
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900/90 border border-slate-800 text-xs text-slate-300 font-mono shadow-sm"
          title={`Personal Best in ${difficulty.toUpperCase()} mode: ${currentPB} WPM`}
        >
          <Trophy className="w-3.5 h-3.5 text-yellow-400/90" />
          <span className="text-slate-400 text-[11px] hidden sm:inline">PB:</span>
          <span className="font-semibold text-yellow-400">{currentPB}</span>
          <span className="text-[10px] text-slate-500">WPM</span>
        </div>

        {/* Sound Switcher Dropdown */}
        <div className="relative">
          <button
            id="sound-toggle-btn"
            onClick={() => setShowSoundMenu(!showSoundMenu)}
            className="flex items-center gap-1.5 p-2 sm:px-3 sm:py-1.5 rounded-xl bg-slate-900/90 hover:bg-slate-800 border border-slate-800 text-slate-300 text-xs transition-colors"
            title="Audio feedback settings"
            aria-label="Sound settings"
          >
            {soundType === 'off' ? (
              <VolumeX className="w-4 h-4 text-slate-500" />
            ) : (
              <Volume2 className="w-4 h-4 text-blue-400" />
            )}
            <span className="capitalize hidden md:inline text-slate-300 text-[11px]">
              {soundType === 'off' ? 'Muted' : soundType}
            </span>
            <SlidersHorizontal className="w-3 h-3 text-slate-500 hidden sm:inline" />
          </button>

          {showSoundMenu && (
            <div className="absolute right-0 mt-2 w-44 rounded-xl bg-[#0d1017] border border-slate-800 shadow-2xl p-1.5 z-30 font-ui text-xs animate-in fade-in zoom-in-95">
              <div className="px-2 py-1 text-[10px] font-semibold uppercase text-slate-500 tracking-wider">
                Sound Theme
              </div>
              {soundOptions.map((opt) => (
                <button
                  key={opt.id}
                  onClick={() => {
                    onSoundChange(opt.id);
                    setShowSoundMenu(false);
                  }}
                  className={`w-full text-left px-2.5 py-1.5 rounded-lg text-xs flex items-center justify-between transition-colors ${
                    soundType === opt.id
                      ? 'bg-blue-600/20 text-blue-400 font-medium'
                      : 'text-slate-300 hover:bg-slate-800/60'
                  }`}
                >
                  <span>{opt.label}</span>
                  {soundType === opt.id && <span className="w-1.5 h-1.5 rounded-full bg-blue-400" />}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Keyboard Shortcuts Trigger */}
        <button
          id="keyboard-shortcuts-btn"
          onClick={onShowShortcuts}
          className="p-2 rounded-xl bg-slate-900/90 hover:bg-slate-800 border border-slate-800 text-slate-400 hover:text-slate-200 transition-colors"
          title="Keyboard shortcuts (Tab to restart)"
          aria-label="Keyboard shortcuts"
        >
          <Keyboard className="w-4 h-4" />
        </button>
      </div>
    </header>
  );
}
