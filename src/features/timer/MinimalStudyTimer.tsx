import React, { useState, useEffect } from 'react';
import { ChevronRight, Play, Pause, RotateCcw, Timer, Sparkles, Check, Flame } from 'lucide-react';
import { CuteStudyBlob } from '../../components/CuteStudyBlob';
import { RaheKonkurLogo } from '../../components/RaheKonkurLogo';
import { formatSecondsToDigitalLarge, toPersianDigits } from '../../utils/persianUtils';

interface MinimalStudyTimerProps {
  onBack: () => void;
  onFinishStudy?: (seconds: number) => void;
}

export const MinimalStudyTimer: React.FC<MinimalStudyTimerProps> = ({
  onBack,
  onFinishStudy,
}) => {
  const [seconds, setSeconds] = useState<number>(6);
  const [isRunning, setIsRunning] = useState<boolean>(true);
  const [isPomodoro, setIsPomodoro] = useState<boolean>(false);
  const [pomodoroLeft, setPomodoroLeft] = useState<number>(25 * 60);
  const [visualMode, setVisualMode] = useState<'matrix' | 'blob'>('matrix');

  useEffect(() => {
    let interval: any = null;
    if (isRunning) {
      interval = setInterval(() => {
        if (isPomodoro) {
          setPomodoroLeft((prev) => (prev > 0 ? prev - 1 : 0));
        } else {
          setSeconds((prev) => prev + 1);
        }
      }, 1000);
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isRunning, isPomodoro]);

  const handleReset = () => {
    setIsRunning(false);
    if (isPomodoro) {
      setPomodoroLeft(25 * 60);
    } else {
      setSeconds(0);
    }
  };

  const handleFinish = () => {
    setIsRunning(false);
    if (onFinishStudy) {
      onFinishStudy(isPomodoro ? 25 * 60 - pomodoroLeft : seconds);
    }
  };

  const displayTime = isPomodoro
    ? formatSecondsToDigitalLarge(pomodoroLeft)
    : formatSecondsToDigitalLarge(seconds);

  const topPillFormatted = isPomodoro
    ? `${toPersianDigits(Math.floor(pomodoroLeft / 60).toString().padStart(2, '0'))}:${toPersianDigits((pomodoroLeft % 60).toString().padStart(2, '0'))}`
    : `${toPersianDigits(Math.floor(seconds / 3600).toString().padStart(2, '0'))}:${toPersianDigits(Math.floor((seconds % 3600) / 60).toString().padStart(2, '0'))}:${toPersianDigits((seconds % 60).toString().padStart(2, '0'))}`;

  return (
    <div className="flex-1 flex flex-col justify-between items-center bg-[#EFF3F1] px-6 py-4 select-none relative h-full">
      {/* Top Header Bar */}
      <div className="w-full flex items-center justify-between z-10 pt-1">
        <div className="flex items-center gap-1.5">
          <RaheKonkurLogo size={28} className="rounded-lg shadow-2xs" />
          <span className="text-xs font-black text-slate-800">ره کنکور</span>
        </div>

        {/* Dynamic Island Capsule */}
        <div className="bg-slate-900 text-white px-3.5 py-1.5 rounded-full flex items-center gap-2 shadow-md border border-slate-800">
          <div className="w-2 h-2 rounded-full bg-[#E83B67] animate-pulse" />
          <span className="font-mono text-xs font-bold tracking-wider">
            {topPillFormatted}
          </span>
          <Timer className="w-3.5 h-3.5 text-rose-400 stroke-[2.5]" />
        </div>

        {/* Back button */}
        <button
          type="button"
          onClick={onBack}
          className="w-9 h-9 rounded-2xl bg-white border border-slate-200/80 flex items-center justify-center text-slate-700 hover:bg-slate-50 transition-colors shadow-2xs"
          title="بازگشت"
        >
          <ChevronRight className="w-5 h-5 stroke-[2.5]" />
        </button>
      </div>

      {/* Mode Switches */}
      <div className="flex items-center gap-1 bg-white border border-slate-200/80 p-1 rounded-2xl text-xs font-semibold mt-3 shadow-2xs">
        <button
          type="button"
          onClick={() => setIsPomodoro(false)}
          className={`px-3 py-1.5 rounded-xl transition-all ${
            !isPomodoro ? 'bg-slate-900 text-white font-bold shadow-xs' : 'text-slate-500 hover:text-slate-900'
          }`}
        >
          کرنومتر پیوسته
        </button>
        <button
          type="button"
          onClick={() => setIsPomodoro(true)}
          className={`px-3 py-1.5 rounded-xl transition-all ${
            isPomodoro ? 'bg-[#E83B67] text-white font-bold shadow-xs' : 'text-slate-500 hover:text-slate-900'
          }`}
        >
          پومودورو (۲۵ دقیقه)
        </button>
      </div>

      {/* Main Visual Display: Animated Rahe Konkur Matrix or Cute Study Blob */}
      <div className="flex-1 flex flex-col items-center justify-center my-auto relative">
        {visualMode === 'matrix' ? (
          <div className="relative flex flex-col items-center justify-center py-4">
            {/* Concentric subtle focus ripples */}
            <div className={`absolute w-64 h-64 rounded-full border border-rose-200/60 ${isRunning ? 'animate-ping' : ''} pointer-events-none`} />
            <div className="relative p-6 bg-white rounded-3xl border border-slate-200 shadow-lg shadow-rose-950/5">
              <RaheKonkurLogo size={180} animated={isRunning} className="rounded-2xl" />
            </div>

            <div className="mt-3 flex items-center gap-1.5 text-xs text-slate-500 font-medium">
              <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>ماتریس تمرکز فعال است</span>
              <button
                type="button"
                onClick={() => setVisualMode('blob')}
                className="text-[10px] text-[#E83B67] underline mr-2"
              >
                (نمایش کاراکتر)
              </button>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center">
            <CuteStudyBlob isStudying={isRunning} />
            <button
              type="button"
              onClick={() => setVisualMode('matrix')}
              className="text-[10px] text-[#E83B67] underline mt-1"
            >
              (نمایش ماتریس لوگو)
            </button>
          </div>
        )}
      </div>

      {/* Bottom Area: Large Digital Display & Floating Controls */}
      <div className="w-full flex flex-col items-center pb-8">
        {/* Large Digital Typography */}
        <div className="text-4xl sm:text-5xl font-black text-slate-900 font-mono tracking-tight mb-6">
          {displayTime}
        </div>

        {/* Floating Action Controls */}
        <div className="flex items-center justify-center gap-5">
          {/* Pause / Play Button */}
          <button
            type="button"
            onClick={() => setIsRunning(!isRunning)}
            className="w-16 h-16 rounded-2xl bg-[#E83B67] hover:bg-rose-600 text-white flex items-center justify-center shadow-xl shadow-rose-500/25 active:scale-95 transition-all"
            title={isRunning ? 'توقف موقت' : 'شروع'}
          >
            {isRunning ? (
              <Pause className="w-7 h-7 stroke-[2.5] fill-current" />
            ) : (
              <Play className="w-7 h-7 stroke-[2.5] fill-current translate-x-0.5" />
            )}
          </button>

          {/* Reset Button */}
          <button
            type="button"
            onClick={handleReset}
            className="w-16 h-16 rounded-2xl bg-slate-900 hover:bg-slate-800 text-white flex items-center justify-center shadow-xl shadow-slate-900/20 active:scale-95 transition-all"
            title="ریست"
          >
            <RotateCcw className="w-6 h-6 stroke-[2.5]" />
          </button>
        </div>

        {/* Save Session CTA */}
        {seconds > 10 && (
          <button
            type="button"
            onClick={handleFinish}
            className="mt-5 flex items-center gap-1.5 text-xs font-bold text-[#E83B67] hover:text-rose-700 bg-white border border-rose-200 px-4 py-2 rounded-xl shadow-2xs transition-all"
          >
            <Check className="w-4 h-4" />
            <span>ثبت این زمان در کارنامه روزانه ره کنکور</span>
          </button>
        )}
      </div>
    </div>
  );
};
