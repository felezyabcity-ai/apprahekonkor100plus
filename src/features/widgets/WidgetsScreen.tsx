import React, { useState } from 'react';
import {
  LayoutGrid,
  Percent,
  Moon,
  Sparkles,
  Calculator,
  Calendar,
  Layers,
  Heart,
  ChevronLeft,
  Download,
} from 'lucide-react';
import { toPersianDigits } from '../../utils/persianUtils';

interface WidgetsScreenProps {
  onOpenDownload?: () => void;
}

export const WidgetsScreen: React.FC<WidgetsScreenProps> = ({ onOpenDownload }) => {
  // Test percentage calculator mini widget
  const [correct, setCorrect] = useState<number>(25);
  const [wrong, setWrong] = useState<number>(5);
  const [total, setTotal] = useState<number>(35);

  const calculatePercentage = () => {
    if (total === 0) return 0;
    const score = ((correct * 3 - wrong) / (total * 3)) * 100;
    return Math.max(0, Math.min(100, Math.round(score * 10) / 10));
  };

  return (
    <div className="flex-1 flex flex-col p-4 bg-[#F8FAFC] pb-24 overflow-y-auto">
      {/* Header */}
      <div className="flex items-center justify-between pb-3">
        <h1 className="text-base font-bold text-slate-800">جعبه ابزار هوشمند کنکوری</h1>
        <div className="w-9 h-9 rounded-2xl bg-orange-100 text-[#FF7A30] flex items-center justify-center">
          <LayoutGrid className="w-5 h-5" />
        </div>
      </div>

      {/* Interactive Widget 1: محاسبه سریع درصد آزمون */}
      <div className="bg-white border border-slate-200/80 rounded-3xl p-4 shadow-xs mb-4">
        <div className="flex items-center gap-2 mb-3">
          <div className="w-8 h-8 rounded-xl bg-rose-100 text-rose-600 flex items-center justify-center">
            <Percent className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-xs font-bold text-slate-900">محاسبه‌گر آنلاین درصد آزمون</h3>
            <span className="text-[10px] text-slate-400">با احتساب نمره منفی ۱/۳ کنکور</span>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-2 mb-3 text-center">
          <div>
            <label className="text-[10px] text-emerald-700 font-bold block mb-1">تعداد درست</label>
            <input
              type="number"
              value={correct}
              onChange={(e) => setCorrect(Number(e.target.value))}
              className="w-full text-center border border-slate-200 rounded-xl py-1.5 text-xs font-mono font-bold text-slate-800"
            />
          </div>
          <div>
            <label className="text-[10px] text-rose-700 font-bold block mb-1">تعداد نادرست</label>
            <input
              type="number"
              value={wrong}
              onChange={(e) => setWrong(Number(e.target.value))}
              className="w-full text-center border border-slate-200 rounded-xl py-1.5 text-xs font-mono font-bold text-slate-800"
            />
          </div>
          <div>
            <label className="text-[10px] text-slate-600 font-bold block mb-1">تعداد کل سوالات</label>
            <input
              type="number"
              value={total}
              onChange={(e) => setTotal(Number(e.target.value))}
              className="w-full text-center border border-slate-200 rounded-xl py-1.5 text-xs font-mono font-bold text-slate-800"
            />
          </div>
        </div>

        <div className="bg-rose-50 border border-rose-100 rounded-2xl py-2 px-3 flex items-center justify-between text-xs font-bold text-rose-800">
          <span>درصد به دست آمده:</span>
          <span className="text-sm font-mono">{toPersianDigits(calculatePercentage())} ٪</span>
        </div>
      </div>

      {/* Widget 2: تنظیم سیکل خواب */}
      <div className="bg-white border border-slate-200/80 rounded-3xl p-4 shadow-xs mb-4">
        <div className="flex items-center gap-2 mb-2">
          <div className="w-8 h-8 rounded-xl bg-indigo-100 text-indigo-600 flex items-center justify-center">
            <Moon className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-xs font-bold text-slate-900">تنظیم سیکل خواب ۹۰ دقیقه‌ای</h3>
            <span className="text-[10px] text-slate-400">ساعت پیشنهادی برای بیداری شاداب</span>
          </div>
        </div>
        <div className="p-3 bg-slate-50 rounded-2xl border border-slate-100 flex items-center justify-between text-xs">
          <span className="text-slate-600">اگر ساعت ۲۳:۳۰ بخوابید:</span>
          <span className="font-bold text-indigo-600 font-mono">ساعت ۰۵:۳۰ یا ۰۷:۰۰ صبح</span>
        </div>
      </div>

      {/* Other Quick Links */}
      <div className="space-y-2">
        {onOpenDownload && (
          <div
            onClick={onOpenDownload}
            className="bg-slate-900 border border-slate-800 rounded-2xl p-3 flex items-center justify-between text-xs font-bold text-white shadow-md hover:bg-slate-800 cursor-pointer"
          >
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-[#E83B67] text-white flex items-center justify-center">
                <Download className="w-4 h-4" />
              </div>
              <div>
                <span>دانلود مستقیم نسخه موبایل ره کنکور</span>
                <span className="block text-[10px] text-slate-400 font-normal">APK اندروید · افزونه وردپرس · نسخه PWA</span>
              </div>
            </div>
            <span className="text-[10px] bg-rose-500/20 text-rose-300 border border-rose-500/30 px-2 py-0.5 rounded-lg">
              دانلود ←
            </span>
          </div>
        )}

        <div className="bg-white border border-slate-200/80 rounded-2xl p-3 flex items-center justify-between text-xs font-bold text-slate-700 shadow-2xs hover:border-orange-300 cursor-pointer">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-teal-100 text-teal-600 flex items-center justify-center">
              <Calendar className="w-4 h-4" />
            </div>
            <span>شمارش معکوس کنکورهای سراسری و نهایی</span>
          </div>
          <ChevronLeft className="w-4 h-4 text-slate-400" />
        </div>

        <div className="bg-white border border-slate-200/80 rounded-2xl p-3 flex items-center justify-between text-xs font-bold text-slate-700 shadow-2xs hover:border-orange-300 cursor-pointer">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-pink-100 text-pink-600 flex items-center justify-center">
              <Heart className="w-4 h-4" />
            </div>
            <span>تقویم مدیریت انرژی و استراحت دوره‌ای</span>
          </div>
          <ChevronLeft className="w-4 h-4 text-slate-400" />
        </div>
      </div>
    </div>
  );
};
