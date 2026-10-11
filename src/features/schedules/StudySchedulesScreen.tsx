import React, { useState } from 'react';
import {
  ChevronRight,
  ChevronLeft,
  Info,
  CalendarCheck,
  CheckCircle,
  Sun,
  Moon,
  Clock,
  Sparkles,
  BookMarked,
  HeartPulse,
  AlarmClock,
  Check,
} from 'lucide-react';
import { scheduleCategories, holidayHourOptions } from '../../mock/mockData';
import { SchedulePresetCategory } from '../../types';
import { toPersianDigits } from '../../utils/persianUtils';

interface StudySchedulesScreenProps {
  onBack: () => void;
  onApplySchedule?: (categoryTitle: string, hours: number) => void;
}

export const StudySchedulesScreen: React.FC<StudySchedulesScreenProps> = ({
  onBack,
  onApplySchedule,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<SchedulePresetCategory | null>(null);
  const [selectedRoutineHour, setSelectedRoutineHour] = useState<number | null>(null);
  const [appliedNotice, setAppliedNotice] = useState<string | null>(null);

  const handleApplyHour = (hours: number, routineTitle: string) => {
    setSelectedRoutineHour(hours);
    const msg = `برنامه ${routineTitle} (هدف: ${toPersianDigits(hours)} ساعت) برای امروز فعال شد!`;
    setAppliedNotice(msg);
    if (onApplySchedule && selectedCategory) {
      onApplySchedule(selectedCategory.title, hours);
    }
    setTimeout(() => {
      setAppliedNotice(null);
    }, 4000);
  };

  // View B: Detail Plan Picker matching screenshot 7
  if (selectedCategory) {
    return (
      <div className="flex-1 flex flex-col p-4 bg-[#F8FAFC] pb-24 overflow-y-auto">
        {/* Header matching screenshot 7 */}
        <div className="flex items-center justify-between pb-3">
          <div className="w-8" />
          <h2 className="text-sm font-bold text-slate-800">{selectedCategory.title}</h2>
          <button
            type="button"
            onClick={() => setSelectedCategory(null)}
            className="w-9 h-9 rounded-2xl bg-white border border-slate-200/80 flex items-center justify-center text-slate-700 hover:bg-slate-50 transition-colors shadow-xs"
          >
            <ChevronRight className="w-5 h-5 stroke-[2.5]" />
          </button>
        </div>

        {/* Subtitle matching screenshot 7 */}
        <div className="text-center my-3 text-xs text-slate-500 font-medium">
          زمانبندی مناسب با شرایط و هدف امروزت رو انتخاب کن
        </div>

        {/* Success toast */}
        {appliedNotice && (
          <div className="mb-3 p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-2xl text-xs flex items-center gap-2">
            <Check className="w-4 h-4 text-emerald-600 flex-shrink-0" />
            <span>{appliedNotice}</span>
          </div>
        )}

        {/* 2-Column Grid of 8 Cards matching screenshot 7 */}
        <div className="grid grid-cols-2 gap-3 mt-1">
          {holidayHourOptions.map((opt) => {
            const isApplied = selectedRoutineHour === opt.targetHours;
            return (
              <div
                key={opt.id}
                onClick={() => handleApplyHour(opt.targetHours, opt.title)}
                className={`bg-white border rounded-2xl overflow-hidden shadow-xs hover:shadow-md transition-all cursor-pointer flex flex-col justify-between ${
                  isApplied ? 'border-[#E83B67] ring-2 ring-rose-400/30' : 'border-slate-200 hover:border-rose-300'
                }`}
              >
                {/* Upper container */}
                <div className="p-3 flex items-start justify-between min-h-[75px]">
                  <div className="w-6 h-6 rounded-full bg-rose-50 flex items-center justify-center text-[#E83B67] flex-shrink-0">
                    <ChevronLeft className="w-3.5 h-3.5" />
                  </div>
                  <h4 className="text-xs font-bold text-slate-800 text-right pr-1 leading-snug">
                    {opt.title}
                  </h4>
                </div>

                {/* Bottom Target Hour Bar */}
                <div
                  className={`py-2 px-2.5 text-center text-xs font-bold border-t transition-colors ${
                    isApplied
                      ? 'bg-[#E83B67] text-white border-[#E83B67]'
                      : 'bg-slate-50 text-slate-700 border-slate-200'
                  }`}
                >
                  هدف مطالعه: {toPersianDigits(opt.targetHours)} ساعت
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  // View A: Category Grid matching screenshot 8
  return (
    <div className="flex-1 flex flex-col p-4 bg-[#F8FAFC] pb-24 overflow-y-auto">
      {/* Top Header matching screenshot 8 */}
      <div className="flex items-center justify-between pb-2">
        <button
          type="button"
          className="w-9 h-9 rounded-2xl bg-white border border-slate-200/80 flex items-center justify-center text-slate-600 hover:bg-slate-50 transition-colors shadow-xs"
        >
          <Info className="w-5 h-5" />
        </button>

        <h1 className="text-sm font-bold text-slate-800">زمان‌بندی مطالعه</h1>

        <button
          type="button"
          onClick={onBack}
          className="w-9 h-9 rounded-2xl bg-white border border-slate-200/80 flex items-center justify-center text-slate-700 hover:bg-slate-50 transition-colors shadow-xs"
        >
          <ChevronRight className="w-5 h-5 stroke-[2.5]" />
        </button>
      </div>

      {/* Top Illustration Card matching screenshot 8 */}
      <div className="w-full bg-white border border-slate-200/80 rounded-3xl p-4 my-2 flex items-center justify-between shadow-xs">
        <div className="text-right pr-2">
          <p className="text-xs font-bold text-slate-800 leading-relaxed">
            با زمان‌بندی متناسب
            <br />
            با شرایط هر روزت مطالعه کن
          </p>
        </div>

        {/* 3D Check Document Graphic */}
        <div className="relative w-16 h-16 flex items-center justify-center">
          <div className="w-12 h-14 bg-sky-100 rounded-xl border border-sky-300 shadow-sm flex flex-col items-center justify-center p-1.5 rotate-6">
            <div className="w-full h-1 bg-sky-300 rounded-full mb-1" />
            <div className="w-4/5 h-1 bg-sky-300 rounded-full mb-1" />
            <div className="w-3/5 h-1 bg-sky-300 rounded-full" />
          </div>
          <div className="absolute -bottom-1 -left-1 w-7 h-7 bg-emerald-500 rounded-full flex items-center justify-center text-white shadow-md border-2 border-white">
            <Check className="w-4 h-4 stroke-[3]" />
          </div>
        </div>
      </div>

      {/* Section Subtitle matching screenshot 8 */}
      <div className="text-center my-3 text-xs text-slate-600 font-semibold">
        دسته زمان بندی هماهنگ با شرایط امروزت رو انتخاب کن
      </div>

      {/* 2-Column Categories Grid matching screenshot 8 */}
      <div className="grid grid-cols-2 gap-3 mt-1">
        {scheduleCategories.map((cat) => {
          return (
            <div
              key={cat.id}
              onClick={() => setSelectedCategory(cat)}
              className="group relative bg-slate-900 rounded-2xl overflow-hidden p-3 min-h-[175px] flex flex-col justify-between text-white shadow-md hover:shadow-xl transition-all cursor-pointer border border-slate-800 active:scale-95"
            >
              {/* Background gradient & decorative lighting */}
              <div
                className={`absolute inset-0 bg-gradient-to-b ${cat.bgGradient} opacity-90 group-hover:opacity-100 transition-opacity`}
              />

              {/* Upper Section */}
              <div className="relative z-10 flex items-center justify-between">
                <div className="w-6 h-6 rounded-full bg-white/20 backdrop-blur-xs flex items-center justify-center text-white group-hover:translate-x-0.5 transition-transform">
                  <ChevronLeft className="w-3.5 h-3.5" />
                </div>
                <span className="text-[10px] text-slate-300 font-medium">
                  {cat.badge}
                </span>
              </div>

              {/* Lower Section with Title and Description */}
              <div className="relative z-10 mt-auto pt-4 text-right">
                <h3 className="text-xs font-bold text-white mb-1.5 leading-snug">
                  {cat.title}
                </h3>
                <p className="text-[10px] text-slate-300 leading-normal line-clamp-3 font-normal opacity-90">
                  {cat.subtitle}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
