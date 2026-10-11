import React, { useState } from 'react';
import {
  Clock,
  BookOpen,
  CheckCircle2,
  AlertCircle,
  Plus,
  MoreHorizontal,
  Timer as TimerIcon,
  Play,
  Check,
  TrendingUp,
  Target,
  Download,
} from 'lucide-react';
import { StudyLogItem } from '../../types';
import { toPersianDigits } from '../../utils/persianUtils';
import { RaheKonkurLogo } from '../../components/RaheKonkurLogo';

interface DailyTrackerScreenProps {
  onOpenAddReport: () => void;
  onOpenSchedules: () => void;
  onOpenTimer: () => void;
  onOpenDownload?: () => void;
}

export const DailyTrackerScreen: React.FC<DailyTrackerScreenProps> = ({
  onOpenAddReport,
  onOpenSchedules,
  onOpenTimer,
  onOpenDownload,
}) => {
  const [selectedDay, setSelectedDay] = useState<number>(8);
  const [hasRegisteredClass, setHasRegisteredClass] = useState<boolean>(false);
  const [classTime, setClassTime] = useState<string>('۰۱:۳۰');
  const [logs, setLogs] = useState<StudyLogItem[]>([
    {
      id: 'log-1',
      title: 'فصل ۱ - تابع و دامنه',
      category: 'ریاضیات تجربی',
      notes: 'تست‌های سطح دشوار و نشان‌دار',
      durationMinutes: 120,
      testCount: 15,
      isCompleted: true,
      dateKey: '1405-07-08',
    },
    {
      id: 'log-2',
      title: 'درس ۱ - شکر نعمت و دینداری',
      category: 'دین و زندگی',
      notes: 'مرور خط به خط آیات و مفاهیم',
      durationMinutes: 120,
      testCount: 20,
      isCompleted: true,
      dateKey: '1405-07-08',
    },
  ]);

  const toggleComplete = (id: string) => {
    setLogs((prev) =>
      prev.map((log) =>
        log.id === id ? { ...log, isCompleted: !log.isCompleted } : log
      )
    );
  };

  const daysList = [
    { num: 8, name: 'شنبه' },
    { num: 9, name: 'یکشنبه' },
    { num: 10, name: 'دوشنبه' },
    { num: 11, name: 'سه‌شنبه' },
    { num: 12, name: 'چهارشنبه' },
    { num: 13, name: 'پنج‌شنبه' },
    { num: 14, name: 'جمعه' },
  ];

  const totalStudyMinutes = logs.reduce((acc, curr) => acc + (curr.isCompleted ? curr.durationMinutes : 0), 0);
  const totalStudyHours = `${toPersianDigits(Math.floor(totalStudyMinutes / 60).toString().padStart(2, '0'))}:${toPersianDigits((totalStudyMinutes % 60).toString().padStart(2, '0'))}`;
  const totalTestsCount = logs.reduce((acc, curr) => acc + (curr.isCompleted ? curr.testCount : 0), 0);

  return (
    <div className="flex-1 flex flex-col p-4 bg-[#EFF3F1] pb-24 overflow-y-auto">
      {/* Top Header */}
      <div className="flex items-center justify-between pb-2">
        <div className="text-right">
          <h2 className="text-base font-black text-slate-900">تقویم و کارنامه روزانه</h2>
          <span className="text-[11px] text-slate-500 font-medium">هفته دوم · مهرماه ۱۴۰۵</span>
        </div>
        <RaheKonkurLogo size={32} className="rounded-xl shadow-2xs" />
      </div>

      {/* Date Picker Horizontal Strip (Stylized like the answer sheet bubbles of the logo!) */}
      <div className="flex items-center gap-2 overflow-x-auto py-2.5 no-scrollbar justify-between">
        {daysList.map((day) => {
          const isActive = selectedDay === day.num;
          return (
            <button
              key={day.num}
              type="button"
              onClick={() => setSelectedDay(day.num)}
              className={`flex flex-col items-center justify-between min-w-[50px] sm:min-w-[54px] h-[80px] rounded-2xl p-1.5 transition-all flex-shrink-0 relative ${
                isActive
                  ? 'bg-white border-2 border-[#E83B67] shadow-md shadow-rose-500/15'
                  : 'bg-white/80 border border-slate-200/90 text-slate-700 hover:border-slate-300'
              }`}
            >
              {/* Answer Bubble Node matching logo */}
              <div className="relative my-auto">
                {isActive && (
                  <div className="absolute -inset-1 rounded-full border-2 border-[#F69EB5] animate-pulse" />
                )}
                <div
                  className={`w-9 h-9 rounded-full flex items-center justify-center font-bold text-xs transition-colors ${
                    isActive
                      ? 'bg-[#E83B67] text-white shadow-sm'
                      : 'border-2 border-[#A0AAB0] text-slate-700 bg-white'
                  }`}
                >
                  {toPersianDigits(day.num)}
                </div>
              </div>

              <span
                className={`text-[10px] font-medium mt-1 ${
                  isActive ? 'text-[#E83B67] font-black' : 'text-slate-500'
                }`}
              >
                {day.name}
              </span>
            </button>
          );
        })}
      </div>

      {/* Quick Download App Banner */}
      {onOpenDownload && (
        <button
          type="button"
          onClick={onOpenDownload}
          className="w-full bg-gradient-to-r from-slate-900 to-slate-800 hover:from-slate-800 hover:to-slate-700 text-white rounded-2xl p-3 my-1.5 shadow-md flex items-center justify-between border border-slate-700/80 transition-all text-right group"
        >
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-[#E83B67] group-hover:bg-rose-600 flex items-center justify-center text-white shadow-xs transition-colors">
              <Download className="w-4 h-4 animate-bounce-subtle" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-xs font-bold text-white">دانلود نسخه موبایل (APK / PWA)</span>
                <span className="text-[9px] bg-rose-500/20 text-rose-300 border border-rose-500/30 px-1.5 py-0.2 rounded-full font-mono">
                  v1.2.0
                </span>
              </div>
              <span className="text-[10px] text-slate-400 block mt-0.5">
                دانلود مستقیم پکیج اندروید، سورس‌کد و افزونه وردپرس
              </span>
            </div>
          </div>
          <span className="text-[11px] font-bold text-rose-400 bg-rose-500/10 border border-rose-500/20 px-2.5 py-1 rounded-xl">
            دانلود ←
          </span>
        </button>
      )}

      {/* Performance Summary Pill Banner */}
      <div className="w-full bg-white border border-slate-200/90 rounded-2xl p-2.5 my-2 flex items-center justify-between shadow-2xs">
        <div className="flex items-center gap-2 text-xs font-semibold text-slate-700">
          <div className="w-2 h-2 rounded-full bg-emerald-500" />
          <span>هدف روزانه: ۶ ساعت مطالعه و ۴۰ تست</span>
        </div>
        <span className="text-[10px] bg-rose-50 text-[#E83B67] px-2.5 py-0.5 rounded-full font-bold">
          ۶۶ ٪ محقق شده
        </span>
      </div>

      {/* Modern 4-Metrics Grid matching Rah-e Konkur Design System */}
      <div className="w-full bg-slate-900 rounded-3xl p-3.5 shadow-lg shadow-slate-950/20 text-white my-2 border border-slate-800">
        <div className="grid grid-cols-4 gap-2 text-center">
          {/* Col 1: ساعت بیداری */}
          <div className="flex flex-col items-center">
            <Clock className="w-4 h-4 mb-1 text-slate-400" />
            <span className="text-[10px] font-medium text-slate-300 mb-1.5 whitespace-nowrap">
              بیداری
            </span>
            <div className="w-full bg-slate-800 rounded-xl py-1 px-1 border border-slate-700">
              <span className="text-xs font-bold text-white font-mono">۰۸:۰۰</span>
            </div>
          </div>

          {/* Col 2: تعداد تست */}
          <div className="flex flex-col items-center">
            <CheckCircle2 className="w-4 h-4 mb-1 text-slate-400" />
            <span className="text-[10px] font-medium text-slate-300 mb-1.5 whitespace-nowrap">
              تعداد تست
            </span>
            <div className="w-full bg-slate-800 rounded-xl py-1 px-1 border border-slate-700">
              <span className="text-xs font-bold text-[#F69EB5] font-mono">
                {toPersianDigits(totalTestsCount)}
              </span>
            </div>
          </div>

          {/* Col 3: میزان مطالعه */}
          <div className="flex flex-col items-center">
            <TimerIcon className="w-4 h-4 mb-1 text-slate-400" />
            <span className="text-[10px] font-medium text-slate-300 mb-1.5 whitespace-nowrap">
              ساعت مطالعه
            </span>
            <div className="w-full bg-slate-800 rounded-xl py-1 px-1 border border-slate-700">
              <span className="text-xs font-bold text-white font-mono">
                {totalStudyHours}
              </span>
            </div>
          </div>

          {/* Col 4: زمان کلاس */}
          <div className="flex flex-col items-center">
            <BookOpen className="w-4 h-4 mb-1 text-slate-400" />
            <span className="text-[10px] font-medium text-slate-300 mb-1.5 whitespace-nowrap">
              زمان کلاس
            </span>
            <button
              type="button"
              onClick={() => setHasRegisteredClass(!hasRegisteredClass)}
              className="w-full bg-[#E83B67] hover:bg-rose-600 rounded-xl py-1 px-1 transition-colors text-white font-bold text-xs"
            >
              {hasRegisteredClass ? classTime : 'ثبت'}
            </button>
          </div>
        </div>
      </div>

      {/* Action Quick-Buttons: ثبت گزارش & زمان بندی مطالعه */}
      <div className="grid grid-cols-2 gap-2.5 my-2">
        <button
          type="button"
          onClick={onOpenAddReport}
          className="flex items-center justify-center gap-2 py-3 px-4 bg-white border border-rose-200/90 rounded-2xl shadow-2xs text-slate-800 hover:bg-rose-50/50 hover:border-rose-400 transition-all group active:scale-[0.98]"
        >
          <div className="w-6 h-6 rounded-xl bg-rose-100 flex items-center justify-center text-[#E83B67] group-hover:scale-105 transition-transform">
            <Plus className="w-3.5 h-3.5 stroke-[3]" />
          </div>
          <span className="text-xs font-bold">ثبت گزارش درس</span>
        </button>

        <button
          type="button"
          onClick={onOpenSchedules}
          className="flex items-center justify-center gap-2 py-3 px-4 bg-white border border-slate-200/90 rounded-2xl shadow-2xs text-slate-800 hover:bg-slate-50 transition-all group active:scale-[0.98]"
        >
          <div className="w-6 h-6 rounded-xl bg-slate-100 flex items-center justify-center text-slate-700 group-hover:scale-105 transition-transform">
            <Clock className="w-3.5 h-3.5 stroke-[2.5]" />
          </div>
          <span className="text-xs font-bold">زمان‌بندی مطالعه</span>
        </button>
      </div>

      {/* Section: لیست گزارشات امروز */}
      <div className="flex items-center justify-between mt-3 mb-2 px-1">
        <h3 className="text-xs font-bold text-slate-800">برنامه و گزارش دروس امروز</h3>
        <span className="text-[10px] text-slate-500 font-mono">
          {toPersianDigits(logs.length)} مورد
        </span>
      </div>

      {/* Logs Cards Container */}
      <div className="space-y-2.5">
        {logs.map((log) => {
          return (
            <div
              key={log.id}
              className={`w-full bg-white border rounded-2xl p-3 shadow-2xs transition-all hover:shadow-xs ${
                log.isCompleted ? 'border-slate-200/90' : 'border-dashed border-slate-300'
              }`}
            >
              <div className="flex items-center justify-between mb-1.5">
                <div className="flex items-center gap-2.5">
                  <button
                    type="button"
                    onClick={() => toggleComplete(log.id)}
                    className={`w-6 h-6 rounded-full flex items-center justify-center transition-all ${
                      log.isCompleted
                        ? 'bg-[#E83B67] text-white shadow-2xs'
                        : 'border-2 border-[#A0AAB0] text-transparent hover:border-[#E83B67]'
                    }`}
                  >
                    <Check className="w-3.5 h-3.5 stroke-[3]" />
                  </button>
                  <div>
                    <h4 className="text-xs font-bold text-slate-900">{log.title}</h4>
                    <span className="text-[10px] text-slate-400 block">{log.category}</span>
                  </div>
                </div>

                <button
                  type="button"
                  className="text-slate-400 hover:text-slate-600 p-1 rounded-lg"
                >
                  <MoreHorizontal className="w-4 h-4" />
                </button>
              </div>

              {/* Metrics Strip */}
              <div className="flex items-center justify-between border-t border-slate-100 pt-2 text-[11px] text-slate-600">
                <div className="flex items-center gap-1.5">
                  <Target className="w-3.5 h-3.5 text-rose-500" />
                  <span>تست:</span>
                  <span className="font-bold text-slate-900 font-mono">
                    {toPersianDigits(log.testCount)}
                  </span>
                </div>

                <div className="flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-slate-400" />
                  <span>مدت:</span>
                  <span className="font-bold text-slate-900 font-mono">
                    {toPersianDigits(
                      `${Math.floor(log.durationMinutes / 60)
                        .toString()
                        .padStart(2, '0')}:${(log.durationMinutes % 60)
                        .toString()
                        .padStart(2, '0')}`
                    )}{' '}
                    ساعت
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
