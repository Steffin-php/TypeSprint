import React, { useEffect, useRef, useState } from 'react';
import { TestState } from '../types';

interface TypingAreaProps {
  text: string;
  userInput: string;
  testState: TestState;
  onInputChange: (value: string, keyAdded?: string, isBackspace?: boolean) => void;
  onStartTest: () => void;
  disabled?: boolean;
}

export function TypingArea({
  text,
  userInput,
  testState,
  onInputChange,
  onStartTest,
  disabled = false,
}: TypingAreaProps) {
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const activeCharRef = useRef<HTMLSpanElement>(null);
  const [isFocused, setIsFocused] = useState(true);

  // Auto focus input when mounted or test restarts
  useEffect(() => {
    if (!disabled && inputRef.current) {
      inputRef.current.focus();
      setIsFocused(true);
    }
  }, [text, disabled]);

  // Keep caret scrolled into view if long passage
  useEffect(() => {
    if (activeCharRef.current && containerRef.current) {
      const container = containerRef.current;
      const element = activeCharRef.current;

      const elementOffsetTop = element.offsetTop;
      const elementHeight = element.offsetHeight;
      const containerHeight = container.clientHeight;
      const containerScrollTop = container.scrollTop;

      // Center or keep active line visible in the middle
      if (elementOffsetTop < containerScrollTop + 40) {
        container.scrollTo({ top: Math.max(0, elementOffsetTop - 50), behavior: 'smooth' });
      } else if (elementOffsetTop + elementHeight > containerScrollTop + containerHeight - 60) {
        container.scrollTo({
          top: elementOffsetTop - containerHeight / 2 + elementHeight / 2,
          behavior: 'smooth',
        });
      }
    }
  }, [userInput]);

  const handleContainerClick = () => {
    if (!disabled && inputRef.current) {
      inputRef.current.focus();
      setIsFocused(true);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (disabled) return;

    // Start on first typing action
    if (testState === 'idle' && e.key.length === 1 && !e.ctrlKey && !e.metaKey && !e.altKey) {
      onStartTest();
    }

    // Prevent default scroll on Space
    if (e.key === ' ') {
      e.preventDefault();
      if (userInput.length < text.length) {
        onInputChange(userInput + ' ', ' ', false);
      }
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (disabled) return;
    const value = e.target.value;

    if (testState === 'idle' && value.length > 0) {
      onStartTest();
    }

    const isBackspace = value.length < userInput.length;
    const keyAdded = isBackspace ? undefined : value.slice(-1);

    // Limit typing length to passage length
    if (value.length <= text.length) {
      onInputChange(value, keyAdded, isBackspace);
    }
  };

  // Render character spans
  const characters = text.split('');
  const currentIndex = userInput.length;

  return (
    <div
      id="typing-container"
      ref={containerRef}
      onClick={handleContainerClick}
      className={`relative w-full rounded-2xl bg-[#0d1017]/90 border transition-all duration-200 cursor-text p-6 md:p-8 min-h-[220px] max-h-[340px] overflow-y-auto ${
        isFocused
          ? 'border-blue-500/40 shadow-[0_0_30px_-5px_rgba(59,130,246,0.15)] ring-1 ring-blue-500/20'
          : 'border-slate-800/80 hover:border-slate-700'
      }`}
    >
      {/* Hidden Text Area to capture keyboard and mobile touch events */}
      <textarea
        ref={inputRef}
        value={userInput}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        disabled={disabled}
        autoFocus
        autoCapitalize="none"
        autoComplete="off"
        autoCorrect="off"
        spellCheck="false"
        className="absolute inset-0 opacity-0 w-full h-full cursor-default resize-none pointer-events-none"
        aria-label="Typing input area"
      />

      {/* Unfocused overlay prompt */}
      {!isFocused && !disabled && (
        <div className="absolute inset-0 z-10 flex items-center justify-center bg-[#08090d]/75 backdrop-blur-[2px] rounded-2xl">
          <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-900 border border-blue-500/30 text-blue-400 text-sm font-medium shadow-lg animate-pulse">
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122"
              />
            </svg>
            Click or tap here to focus typing test
          </div>
        </div>
      )}

      {/* Passage text with colored characters and caret */}
      <div className="font-code text-lg sm:text-xl md:text-2xl leading-relaxed tracking-wide select-none break-words relative">
        {characters.map((char, index) => {
          const isTyped = index < currentIndex;
          const isCurrent = index === currentIndex;
          const isCorrect = isTyped && userInput[index] === char;
          const isIncorrect = isTyped && userInput[index] !== char;

          let colorClass = 'text-slate-600 transition-colors duration-100';
          if (isCorrect) {
            colorClass = 'text-slate-100 font-medium';
          } else if (isIncorrect) {
            colorClass = 'text-rose-400 bg-rose-950/70 rounded-xs border-b border-rose-500 font-medium';
          }

          return (
            <span
              key={index}
              ref={isCurrent ? activeCharRef : null}
              className={`relative inline ${colorClass}`}
            >
              {/* Dev-tool style blinking or smooth caret */}
              {isCurrent && isFocused && (
                <span className="absolute -left-[1px] top-0.5 bottom-0.5 w-[2.5px] bg-blue-400 shadow-[0_0_8px_#3b82f6] rounded-full animate-caret pointer-events-none" />
              )}
              {char === ' ' && isIncorrect ? (
                // Display visible symbol for missed space error
                <span className="text-rose-400 bg-rose-950/60 px-0.5 rounded text-xs font-sans">␣</span>
              ) : (
                char
              )}
            </span>
          );
        })}
      </div>
    </div>
  );
}
