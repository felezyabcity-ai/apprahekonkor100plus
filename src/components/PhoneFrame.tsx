import React, { useState } from 'react';
import { Smartphone, Monitor, Code2, Volume2, VolumeX } from 'lucide-react';
import { RaheKonkurLogo } from './RaheKonkurLogo';

interface PhoneFrameProps {
  children: React.ReactNode;
  activeScreenTitle?: string;
  onOpenCodeInspector?: () => void;
  isCodeInspectorOpen?: boolean;
  onOpenWordPressModal?: () => void;
  isWordPressModalOpen?: boolean;
}

export const PhoneFrame: React.FC<PhoneFrameProps> = ({
  children,
  onOpenCodeInspector,
  isCodeInspectorOpen,
  onOpenWordPressModal,
  isWordPressModalOpen,
}) => {
  const [isPhoneMode, setIsPhoneMode] = useState<boolean>(true);
  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-start text-slate-800">
      {/* Top developer toolbar / Switcher */}
      <header className="w-full bg-slate-950/90 backdrop-blur-md border-b border-slate-800 py-2.5 px-4 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3">
          {/* Brand & project badge */}
          <div className="flex items-center gap-3">
            <RaheKonkurLogo size={36} className="rounded-xl shadow-md shadow-rose-950/50" />
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-sm font-bold text-white">ره کنکور (Rahe Konkur)</h1>
                <span className="text-[10px] bg-rose-500/20 text-rose-400 border border-rose-500/30 px-2 py-0.5 rounded-full font-medium">
                  سیستم طراحی جدید اختصاصی
                </span>
              </div>
              <p className="text-[11px] text-slate-400">
                سامانه هوشمند برنامه‌ریزی، رهگیری مطالعه و سالن مطالعه آنلاین
              </p>
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex items-center gap-2">
            {/* View Mode Toggle */}
            <div className="flex items-center bg-slate-900 border border-slate-800 rounded-lg p-0.5 text-xs">
              <button
                type="button"
                onClick={() => setIsPhoneMode(true)}
                className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-md transition-all ${
                  isPhoneMode
                    ? 'bg-orange-500 text-white font-medium shadow-sm'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
                title="نمای شبیه‌ساز گوشی موبایل"
              >
                <Smartphone className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">قاب گوشی</span>
              </button>
              <button
                type="button"
                onClick={() => setIsPhoneMode(false)}
                className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-md transition-all ${
                  !isPhoneMode
                    ? 'bg-orange-500 text-white font-medium shadow-sm'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
                title="نمای عریض دسکتاپ و تبلت"
              >
                <Monitor className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">نمای تمام‌صفحه</span>
              </button>
            </div>

            {/* WordPress Plugin & Download App Trigger */}
            <button
              type="button"
              onClick={onOpenWordPressModal}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold border transition-all ${
                isWordPressModalOpen
                  ? 'bg-orange-500 text-white border-orange-400 shadow-sm'
                  : 'bg-slate-800 text-orange-400 border-orange-500/40 hover:bg-slate-700'
              }`}
            >
              <Smartphone className="w-3.5 h-3.5 text-orange-400" />
              <span>دانلود اپ و افزونه وردپرس</span>
            </button>

            {/* Flutter Code Inspector Trigger */}
            <button
              type="button"
              onClick={onOpenCodeInspector}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium border transition-all ${
                isCodeInspectorOpen
                  ? 'bg-indigo-600 text-white border-indigo-500 shadow-sm'
                  : 'bg-slate-800 text-indigo-300 border-indigo-500/40 hover:bg-slate-700'
              }`}
            >
              <Code2 className="w-3.5 h-3.5 text-indigo-400" />
              <span>کدها و معماری Flutter</span>
            </button>

            {/* Sound toggle */}
            <button
              type="button"
              onClick={() => setSoundEnabled(!soundEnabled)}
              className="p-1.5 rounded-lg text-slate-400 hover:text-slate-200 bg-slate-800 border border-slate-700/60 transition-colors"
              title={soundEnabled ? 'صدا فعال است' : 'صدا غیرفعال است'}
            >
              {soundEnabled ? <Volume2 className="w-3.5 h-3.5" /> : <VolumeX className="w-3.5 h-3.5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="w-full flex-1 flex items-center justify-center p-2 sm:p-6 overflow-x-hidden">
        {isPhoneMode ? (
          /* Phone Frame Mockup */
          <div className="relative w-full max-w-[420px] aspect-[9/19.5] max-h-[920px] min-h-[760px] bg-slate-950 rounded-[48px] p-3 shadow-2xl shadow-black/80 ring-1 ring-slate-800 flex flex-col my-auto transition-all">
            {/* Outer phone buttons */}
            <div className="absolute -left-[5px] top-28 w-[3px] h-10 bg-slate-700 rounded-l-sm" />
            <div className="absolute -left-[5px] top-44 w-[3px] h-12 bg-slate-700 rounded-l-sm" />
            <div className="absolute -left-[5px] top-60 w-[3px] h-12 bg-slate-700 rounded-l-sm" />
            <div className="absolute -right-[5px] top-36 w-[3px] h-16 bg-slate-700 rounded-r-sm" />

            {/* Screen Inner */}
            <div className="relative w-full h-full bg-[#F8FAFC] rounded-[38px] overflow-hidden flex flex-col text-slate-800 shadow-inner">
              {/* iOS / Modern Android Status Bar */}
              <div className="w-full h-10 px-6 pt-2 flex items-center justify-between text-xs font-semibold text-slate-800 z-30 select-none">
                <span className="font-mono text-xs">8:46</span>
                {/* Dynamic Island / Notch */}
                <div className="w-24 h-5 bg-black rounded-full flex items-center justify-center">
                  <div className="w-2.5 h-2.5 rounded-full bg-slate-900 border border-slate-700" />
                </div>
                <div className="flex items-center gap-1.5 text-[10px] font-mono">
                  <span>5G</span>
                  <div className="w-5 h-2.5 border border-slate-800 rounded-xs p-[1px] flex items-center">
                    <div className="w-3.5 h-full bg-slate-800 rounded-2xs" />
                  </div>
                </div>
              </div>

              {/* Viewport Content */}
              <div className="flex-1 w-full overflow-y-auto relative flex flex-col pb-16">
                {children}
              </div>

              {/* Mobile Home Gesture Bar */}
              <div className="absolute bottom-1.5 left-1/2 -translate-x-1/2 w-32 h-1 bg-slate-400/80 rounded-full z-40 pointer-events-none" />
            </div>
          </div>
        ) : (
          /* Fullscreen / Tablet Canvas */
          <div className="w-full max-w-5xl bg-[#F8FAFC] rounded-3xl shadow-2xl border border-slate-800/80 overflow-hidden flex flex-col min-h-[820px] transition-all">
            <div className="flex-1 w-full overflow-y-auto relative flex flex-col pb-20">
              {children}
            </div>
          </div>
        )}
      </main>
    </div>
  );
};
