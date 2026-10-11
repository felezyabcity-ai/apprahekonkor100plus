import React, { useState } from 'react';
import {
  Sparkles,
  Timer,
  Users,
  Compass,
  LineChart,
  CalendarDays,
  Percent,
  Layers,
  ChevronLeft,
  Flame,
  Award,
  BookOpen,
  Bell,
  ArrowUpRight,
  TrendingUp,
  Download,
} from 'lucide-react';
import { RaheKonkurLogo } from '../../components/RaheKonkurLogo';
import { toPersianDigits } from '../../utils/persianUtils';

interface HomeScreenProps {
  onOpenTimer: () => void;
  onOpenSchedules: () => void;
  onOpenCounseling: () => void;
  onOpenStudyRoom: () => void;
  onOpenCalendar: () => void;
  onOpenDownload?: () => void;
  userName?: string;
}

export const HomeScreen: React.FC<HomeScreenProps> = ({
  onOpenTimer,
  onOpenSchedules,
  onOpenCounseling,
  onOpenStudyRoom,
  onOpenCalendar,
  onOpenDownload,
  userName = 'امیر مرادی',
}) => {
  // 4x4 Matrix Interactive State (representing the 16 daily study/question milestones)
  const [completedNodes, setCompletedNodes] = useState<number[]>([0, 5, 10]); // default diagonal path matching logo!

  const toggleNode = (index: number) => {
    setCompletedNodes((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

  return (
    <div className="flex-1 flex flex-col p-4 bg-[#EFF3F1] pb-24 overflow-y-auto">
      {/* Top Header Bar with new Rahe Konkur Logo */}
      <div className="flex items-center justify-between pb-3 pt-1">
        <div className="flex items-center gap-2.5">
          <button
            type="button"
            className="w-10 h-10 rounded-2xl bg-white border border-slate-200/90 flex items-center justify-center text-slate-700 hover:bg-slate-50 transition-colors shadow-2xs relative"
            title="اعلان‌ها"
          >
            <Bell className="w-4 h-4 text-slate-600" />
            <div className="absolute top-2.5 right-2.5 w-2 h-2 rounded-full bg-[#E83B67]" />
          </button>
        </div>

        {/* User Identity & App Brand */}
        <div className="flex items-center gap-2.5">
          <div className="text-right">
            <div className="flex items-center gap-1 justify-end">
              <span className="text-sm font-black text-slate-900">{userName}</span>
              <span className="text-xs">👋</span>
            </div>
            <span className="text-[10px] text-slate-500 font-medium block">
              داوطلب تجربی · هدف: پزشکی تهران
            </span>
          </div>
          <RaheKonkurLogo size={40} className="rounded-2xl shadow-sm" />
        </div>
      </div>

      {/* Signature "مسیر امروز من" (The 4x4 Answer Matrix Pathway Card) */}
      <div className="w-full bg-white border border-slate-200/80 rounded-3xl p-4 my-2 shadow-xs relative overflow-hidden">
        <div className="flex items-start justify-between mb-3">
          <div className="text-right">
            <div className="flex items-center gap-1.5 text-xs font-black text-slate-900">
              <div className="w-2 h-2 rounded-full bg-[#E83B67] animate-pulse" />
              <span>ماتریس روزانه «ره کنکور»</span>
            </div>
            <p className="text-[11px] text-slate-500 mt-0.5">
              مسیر پیشرفت تسلط: {toPersianDigits(completedNodes.length)} از ۱۶ خانه کلید خورده
            </p>
          </div>

          <span className="text-[10px] font-bold text-[#E83B67] bg-rose-50 px-2.5 py-1 rounded-full border border-rose-100">
            {toPersianDigits(Math.round((completedNodes.length / 16) * 100))} ٪ تکمیل مسیر
          </span>
        </div>

        {/* The 4x4 Matrix Interactive Visual (Directly echoing the app logo!) */}
        <div className="bg-[#EFF3F1] p-3 rounded-2xl flex items-center justify-center">
          <div className="grid grid-cols-4 gap-3">
            {Array.from({ length: 16 }).map((_, idx) => {
              const isDiagonal = idx === 0 || idx === 5 || idx === 10 || idx === 15;
              const isChecked = completedNodes.includes(idx);
              const isLead = idx === 0;

              return (
                <button
                  key={idx}
                  type="button"
                  onClick={() => toggleNode(idx)}
                  className={`relative w-8 h-8 rounded-full flex items-center justify-center transition-all ${
                    isChecked
                      ? 'bg-[#E83B67] text-white shadow-sm shadow-rose-500/30 scale-105'
                      : isDiagonal
                      ? 'border-2 border-[#A0AAB0] bg-transparent hover:border-[#E83B67]'
                      : 'border-2 border-[#CBD5E1] bg-white/60 hover:border-slate-400'
                  }`}
                  title={`خانه ${idx + 1}`}
                >
                  {isLead && isChecked && (
                    <div className="absolute -inset-1.5 rounded-full border-2 border-[#F69EB5] pointer-events-none animate-pulse" />
                  )}
                  {isChecked && <div className="w-2 h-2 rounded-full bg-white" />}
                </button>
              );
            })}
          </div>
        </div>

        <div className="flex items-center justify-between pt-2.5 mt-2 border-t border-slate-100 text-[10px] text-slate-500">
          <span>روی دایره‌ها کلیک کنید تا ایستگاه‌های مطالعه ثبت شوند</span>
          <span className="font-bold text-[#E83B67]">مسیر طلایی ↗</span>
        </div>
      </div>

      {/* Modern Konkur Countdown & Live Students Strip */}
      <div className="grid grid-cols-2 gap-2.5 my-1.5">
        {/* Countdown */}
        <div
          onClick={onOpenCalendar}
          className="bg-slate-900 text-white rounded-3xl p-3.5 flex flex-col justify-between shadow-md cursor-pointer hover:bg-slate-800 transition-all border border-slate-800"
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-[10px] text-slate-400 font-medium">شمارش معکوس کنکور</span>
            <div className="w-6 h-6 rounded-full bg-rose-500/20 text-[#E83B67] flex items-center justify-center text-xs font-bold">
              🔥
            </div>
          </div>
          <div className="text-right">
            <div className="text-xl font-black font-mono tracking-tight text-white">
              {toPersianDigits(262)} <span className="text-xs font-sans text-rose-300">روز</span>
            </div>
            <span className="text-[10px] text-slate-400 block mt-0.5">
              یکشنبه ۱۹ مهر ۱۴۰۵
            </span>
          </div>
        </div>

        {/* Live Online Study Room counter */}
        <div
          onClick={onOpenStudyRoom}
          className="bg-white border border-slate-200/90 rounded-3xl p-3.5 flex flex-col justify-between shadow-xs cursor-pointer hover:border-emerald-300 transition-all"
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-[10px] text-emerald-700 font-bold">سالن مطالعه زنده</span>
            <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
          </div>
          <div className="text-right">
            <div className="text-lg font-black font-mono text-slate-900">
              {toPersianDigits('۷,۷۷۲')} <span className="text-xs font-sans text-slate-500">نفر</span>
            </div>
            <span className="text-[10px] text-slate-500 block mt-0.5">
              در حال مطالعه هم‌اکنون
            </span>
          </div>
        </div>
      </div>

      {/* Featured Primary CTA: Minimalist Study Timer Banner */}
      <div
        onClick={onOpenTimer}
        className="w-full bg-gradient-to-r from-rose-500 to-[#E83B67] text-white rounded-3xl p-4 my-2.5 shadow-lg shadow-rose-500/20 cursor-pointer hover:opacity-95 transition-all flex items-center justify-between relative overflow-hidden group"
      >
        <div className="relative z-10 text-right pr-2">
          <div className="inline-flex items-center gap-1 bg-white/20 px-2 py-0.5 rounded-full text-[10px] font-bold mb-1 backdrop-blur-xs">
            <Sparkles className="w-3 h-3 text-amber-200" />
            <span>کرنومتر بدون حواس‌پرتی</span>
          </div>
          <h3 className="text-sm font-black leading-snug">
            شروع مطالعه با تایمر ره کنکور
          </h3>
          <p className="text-[11px] text-rose-100 mt-0.5">
            ثبت خودکار ساعت و رسم نمودار در کارنامه روزانه
          </p>
        </div>

        <div className="w-12 h-12 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center text-white group-hover:scale-105 transition-transform flex-shrink-0">
          <Timer className="w-6 h-6 stroke-[2.5]" />
        </div>
      </div>

      {/* Download Mobile App (APK & PWA) Banner */}
      {onOpenDownload && (
        <div
          onClick={onOpenDownload}
          className="w-full bg-slate-900 hover:bg-slate-800 text-white rounded-3xl p-4 my-2 border border-slate-800 shadow-md cursor-pointer transition-all flex items-center justify-between group text-right"
        >
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-[#E83B67] group-hover:bg-rose-600 flex items-center justify-center text-white shadow-md shadow-rose-950/40 transition-colors">
              <Download className="w-5 h-5 animate-bounce-subtle" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <h4 className="text-xs font-black text-white">دانلود نسخه موبایل ره کنکور</h4>
                <span className="text-[9px] bg-rose-500/20 text-rose-300 border border-rose-500/30 px-1.5 py-0.5 rounded-full font-mono">
                  v1.2.0
                </span>
              </div>
              <p className="text-[11px] text-slate-400 mt-0.5">
                دانلود مستقیم فایل APK اندروید · سورس فلاتر · افزونه وردپرس
              </p>
            </div>
          </div>
          <span className="text-xs font-bold text-rose-400 bg-rose-500/10 border border-rose-500/20 px-3 py-1.5 rounded-xl group-hover:bg-rose-500/20 transition-colors">
            دانلود فوری ←
          </span>
        </div>
      )}

      {/* Modern Bento Feature Grid */}
      <div className="my-2">
        <div className="flex items-center justify-between mb-2 px-1">
          <h4 className="text-xs font-bold text-slate-800">امکانات و ابزارهای تحصیلی</h4>
          <span className="text-[10px] text-slate-400">سامانه جامع ره کنکور</span>
        </div>

        <div className="grid grid-cols-4 gap-2.5 text-center">
          {/* 1. تقویم و گزارش */}
          <div
            onClick={onOpenCalendar}
            className="bg-white border border-slate-200/80 rounded-2xl p-2.5 flex flex-col items-center justify-center hover:border-rose-300 transition-all cursor-pointer shadow-2xs group"
          >
            <div className="w-10 h-10 rounded-xl bg-rose-50 text-[#E83B67] flex items-center justify-center group-hover:scale-105 transition-transform">
              <CalendarDays className="w-5 h-5 stroke-[2]" />
            </div>
            <span className="text-[10px] font-bold text-slate-700 mt-1.5">
              تقویم مطالعه
            </span>
          </div>

          {/* 2. سالن مطالعه */}
          <div
            onClick={onOpenStudyRoom}
            className="bg-white border border-slate-200/80 rounded-2xl p-2.5 flex flex-col items-center justify-center hover:border-rose-300 transition-all cursor-pointer shadow-2xs group"
          >
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center group-hover:scale-105 transition-transform">
              <Users className="w-5 h-5 stroke-[2]" />
            </div>
            <span className="text-[10px] font-bold text-slate-700 mt-1.5">
              سالن مطالعه
            </span>
          </div>

          {/* 3. زمان‌بندی */}
          <div
            onClick={onOpenSchedules}
            className="bg-white border border-slate-200/80 rounded-2xl p-2.5 flex flex-col items-center justify-center hover:border-rose-300 transition-all cursor-pointer shadow-2xs group"
          >
            <div className="w-10 h-10 rounded-xl bg-sky-50 text-sky-600 flex items-center justify-center group-hover:scale-105 transition-transform">
              <Compass className="w-5 h-5 stroke-[2]" />
            </div>
            <span className="text-[10px] font-bold text-slate-700 mt-1.5">
              زمان‌بندی
            </span>
          </div>

          {/* 4. مشاوره و قبولی */}
          <div
            onClick={onOpenCounseling}
            className="bg-white border border-slate-200/80 rounded-2xl p-2.5 flex flex-col items-center justify-center hover:border-rose-300 transition-all cursor-pointer shadow-2xs group"
          >
            <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center group-hover:scale-105 transition-transform">
              <Award className="w-5 h-5 stroke-[2]" />
            </div>
            <span className="text-[10px] font-bold text-slate-700 mt-1.5">
              طرح مشاوره
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
