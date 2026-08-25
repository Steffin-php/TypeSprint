import { useState } from 'react';
import { StatPoint } from '../types';

interface WpmChartProps {
  data: StatPoint[];
  avgWpm: number;
}

export function WpmChart({ data, avgWpm }: WpmChartProps) {
  const [hoveredPoint, setHoveredPoint] = useState<StatPoint | null>(null);
  const [hoverPos, setHoverPos] = useState<{ x: number; y: number } | null>(null);

  if (!data || data.length < 2) {
    return (
      <div className="w-full h-48 rounded-xl bg-slate-900/40 border border-slate-800 flex items-center justify-center text-slate-500 text-sm">
        Not enough telemetry points to display WPM graph (sprint ended quickly).
      </div>
    );
  }

  // Dimensions
  const width = 640;
  const height = 200;
  const padding = { top: 24, right: 30, bottom: 32, left: 45 };

  const graphWidth = width - padding.left - padding.right;
  const graphHeight = height - padding.top - padding.bottom;

  // Max values
  const maxSecond = Math.max(...data.map((d) => d.second), 1);
  const maxWpmValue = Math.max(...data.map((d) => Math.max(d.wpm, d.rawWpm)), 60);
  const yMax = Math.ceil((maxWpmValue + 15) / 20) * 20;

  // Coordinate scales
  const getX = (second: number) => padding.left + (second / maxSecond) * graphWidth;
  const getY = (wpm: number) => padding.top + graphHeight - (Math.max(0, wpm) / yMax) * graphHeight;

  // Generate SVG path for Net WPM
  const netPoints = data.map((d) => `${getX(d.second)},${getY(d.wpm)}`);
  const netPath = `M ${netPoints.join(' L ')}`;

  // Area path for gradient fill
  const netAreaPath = `M ${getX(data[0].second)},${getY(0)} L ${netPoints.join(' L ')} L ${getX(data[data.length - 1].second)},${getY(0)} Z`;

  // Generate SVG path for Raw WPM
  const rawPoints = data.map((d) => `${getX(d.second)},${getY(d.rawWpm)}`);
  const rawPath = `M ${rawPoints.join(' L ')}`;

  // Y-axis ticks
  const yTicks = [0, Math.round(yMax * 0.25), Math.round(yMax * 0.5), Math.round(yMax * 0.75), yMax];

  // X-axis ticks (approx 4-6 ticks)
  const xTickStep = Math.max(5, Math.ceil(maxSecond / 5));
  const xTicks: number[] = [];
  for (let s = 0; s <= maxSecond; s += xTickStep) {
    xTicks.push(s);
  }
  if (!xTicks.includes(maxSecond)) {
    xTicks.push(maxSecond);
  }

  return (
    <div className="w-full flex flex-col gap-2">
      <div className="flex items-center justify-between text-xs text-slate-400 px-1">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-0.5 bg-blue-500 rounded-full inline-block"></span>
            <span className="text-slate-300 font-medium">Net WPM</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-0.5 bg-sky-400 border-b border-dashed border-sky-400 inline-block"></span>
            <span className="text-slate-400">Raw WPM</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-rose-500 inline-block"></span>
            <span className="text-slate-400">Errors</span>
          </div>
        </div>
        <div className="text-slate-500 font-mono text-[11px]">
          Avg: <span className="text-blue-400 font-semibold">{avgWpm} WPM</span>
        </div>
      </div>

      <div className="relative w-full rounded-xl bg-[#0b0d14] border border-slate-800/80 p-2 overflow-hidden shadow-inner">
        <svg
          viewBox={`0 0 ${width} ${height}`}
          className="w-full h-auto overflow-visible select-none"
          onMouseLeave={() => {
            setHoveredPoint(null);
            setHoverPos(null);
          }}
        >
          <defs>
            <linearGradient id="netWpmGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.35" />
              <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.0" />
            </linearGradient>
            <filter id="blueGlow" x="-20%" y="-20%" width="140%" height="140%">
              <feDropShadow dx="0" dy="0" stdDeviation="3" floodColor="#3b82f6" floodOpacity="0.5" />
            </filter>
          </defs>

          {/* Grid lines (horizontal) */}
          {yTicks.map((tick) => {
            const y = getY(tick);
            return (
              <g key={`y-${tick}`}>
                <line
                  x1={padding.left}
                  y1={y}
                  x2={width - padding.right}
                  y2={y}
                  stroke="#1e293b"
                  strokeDasharray="3 3"
                  strokeWidth="1"
                />
                <text
                  x={padding.left - 8}
                  y={y + 4}
                  textAnchor="end"
                  fill="#64748b"
                  fontSize="10"
                  fontFamily="JetBrains Mono, monospace"
                >
                  {tick}
                </text>
              </g>
            );
          })}

          {/* Grid lines (vertical) */}
          {xTicks.map((sec) => {
            const x = getX(sec);
            return (
              <g key={`x-${sec}`}>
                <line
                  x1={x}
                  y1={padding.top}
                  x2={x}
                  y2={height - padding.bottom}
                  stroke="#1e293b"
                  strokeDasharray="2 4"
                  strokeWidth="1"
                />
                <text
                  x={x}
                  y={height - padding.bottom + 16}
                  textAnchor="middle"
                  fill="#64748b"
                  fontSize="10"
                  fontFamily="JetBrains Mono, monospace"
                >
                  {sec}s
                </text>
              </g>
            );
          })}

          {/* Gradient area under Net WPM */}
          <path d={netAreaPath} fill="url(#netWpmGradient)" />

          {/* Raw WPM curve (dashed) */}
          <path
            d={rawPath}
            fill="none"
            stroke="#38bdf8"
            strokeWidth="1.75"
            strokeDasharray="4 3"
            strokeOpacity="0.6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* Net WPM curve (solid) */}
          <path
            d={netPath}
            fill="none"
            stroke="#3b82f6"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            filter="url(#blueGlow)"
          />

          {/* Error markers */}
          {data.map((point, i) => {
            if (point.errors <= 0) return null;
            const cx = getX(point.second);
            const cy = getY(point.wpm);
            return (
              <g key={`err-${i}`}>
                <circle cx={cx} cy={cy} r="4" fill="#f43f5e" stroke="#08090d" strokeWidth="1.5" />
                <circle cx={cx} cy={cy} r="6" fill="none" stroke="#f43f5e" strokeOpacity="0.4" strokeWidth="1" />
              </g>
            );
          })}

          {/* Hover hit points & dots */}
          {data.map((point, i) => {
            const cx = getX(point.second);
            const cy = getY(point.wpm);
            return (
              <g
                key={`hit-${i}`}
                className="cursor-pointer"
                onMouseEnter={(e) => {
                  const rect = e.currentTarget.ownerSVGElement?.getBoundingClientRect();
                  if (rect) {
                    setHoverPos({
                      x: (cx / width) * rect.width,
                      y: (cy / height) * rect.height,
                    });
                  }
                  setHoveredPoint(point);
                }}
              >
                {/* Invisible wide hit target */}
                <rect
                  x={cx - 10}
                  y={padding.top}
                  width="20"
                  height={graphHeight}
                  fill="transparent"
                />
                {/* Data point dot */}
                <circle
                  cx={cx}
                  cy={cy}
                  r={hoveredPoint?.second === point.second ? 5 : 3}
                  fill="#60a5fa"
                  stroke="#08090d"
                  strokeWidth="1.5"
                  className="transition-all duration-150"
                />
              </g>
            );
          })}
        </svg>

        {/* Dynamic Tooltip */}
        {hoveredPoint && hoverPos && (
          <div
            className="absolute pointer-events-none z-20 bg-slate-900/95 border border-blue-500/30 rounded-lg px-2.5 py-1.5 text-xs shadow-xl backdrop-blur-sm -translate-x-1/2 -translate-y-full mb-2 font-mono"
            style={{
              left: `${hoverPos.x}px`,
              top: `${Math.max(20, hoverPos.y - 8)}px`,
            }}
          >
            <div className="text-[11px] text-slate-400 mb-0.5 border-b border-slate-800 pb-0.5 flex justify-between gap-3">
              <span>Time</span>
              <span className="text-slate-200 font-semibold">{hoveredPoint.second}s</span>
            </div>
            <div className="flex items-center justify-between gap-3 text-blue-400">
              <span>Net:</span>
              <span className="font-bold">{hoveredPoint.wpm} WPM</span>
            </div>
            <div className="flex items-center justify-between gap-3 text-sky-300 text-[11px]">
              <span>Raw:</span>
              <span>{hoveredPoint.rawWpm} WPM</span>
            </div>
            {hoveredPoint.errors > 0 && (
              <div className="flex items-center justify-between gap-3 text-rose-400 text-[11px] mt-0.5 pt-0.5 border-t border-slate-800">
                <span>Errors:</span>
                <span>{hoveredPoint.errors}</span>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
