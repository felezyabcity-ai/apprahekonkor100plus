import React, { useState } from 'react';
import {
  Headphones,
  Bell,
  Sparkles,
  PhoneCall,
  GraduationCap,
  ChevronLeft,
  CheckCircle,
  Gem,
  Award,
} from 'lucide-react';
import { consultantsList, acceptancesList } from '../../mock/mockData';
import { toPersianDigits } from '../../utils/persianUtils';

export const CounselingScreen: React.FC = () => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [registered, setRegistered] = useState(false);

  const handleCallbackSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!phoneNumber.trim()) return;
    setRegistered(true);
    setTimeout(() => {
      setRegistered(false);
      setPhoneNumber('');
    }, 4000);
  };

  return (
    <div className="flex-1 flex flex-col p-4 bg-[#F8FAFC] pb-24 overflow-y-auto">
      {/* Top Header matching screenshot 10 */}
      <div className="flex items-center justify-between pb-3">
        <div className="flex items-center gap-2">
          <button
            type="button"
            className="w-10 h-10 rounded-2xl bg-white border border-slate-200/80 flex items-center justify-center text-slate-700 hover:bg-slate-50 transition-colors shadow-xs"
          >
            <Headphones className="w-5 h-5 stroke-[2]" />
          </button>
        </div>

        <h1 className="text-base font-bold text-slate-800">مشاوره و برنامه‌ریزی</h1>
      </div>

      {/* Consultant Story Avatars Strip matching screenshot 10 */}
      <div className="flex items-center gap-3 overflow-x-auto pb-3 pt-1 no-scrollbar justify-start">
        {consultantsList.map((c) => (
          <div
            key={c.id}
            className="flex flex-col items-center flex-shrink-0 cursor-pointer group"
          >
            <div className="relative">
              <img
                src={c.avatarUrl}
                alt={c.name}
                referrerPolicy="no-referrer"
                className="w-16 h-16 rounded-full object-cover border-2 border-orange-400 p-0.5 shadow-sm group-hover:scale-105 transition-transform"
              />
              <div className="absolute -bottom-1 -right-1 bg-emerald-500 w-3.5 h-3.5 rounded-full border-2 border-white" />
            </div>
            <span className="text-[11px] font-bold text-slate-700 mt-1.5 text-center">
              {c.name}
            </span>
          </div>
        ))}
      </div>

      {/* Callback Bar matching screenshot 10 */}
      <form
        onSubmit={handleCallbackSubmit}
        className="w-full bg-white border border-orange-200 rounded-2xl p-2 my-3 flex items-center justify-between shadow-xs"
      >
        <button
          type="submit"
          className="bg-[#FF7A30] hover:bg-orange-600 text-white p-2.5 rounded-xl transition-all shadow-sm flex items-center justify-center flex-shrink-0"
          title="ارسال درخواست تماس"
        >
          <PhoneCall className="w-4 h-4" />
        </button>

        <input
          type="text"
          placeholder={registered ? 'درخواست شما ثبت شد، به زودی تماس می‌گیریم!' : 'برای ثبت نام مشاوره سوالی داری؟ شمارتو بذار تما...'}
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
          className="flex-1 px-3 text-xs text-slate-700 placeholder-slate-400 outline-none text-right"
        />
      </form>

      {/* Section: لیست قبولی‌ها matching screenshot 10 */}
      <div className="flex items-center justify-between mt-3 mb-2">
        <div className="flex items-center gap-1.5 text-xs font-bold text-slate-800">
          <Sparkles className="w-4 h-4 text-orange-400" />
          <span>لیست قبولی‌ها</span>
        </div>
      </div>

      {/* 2-Column Acceptances Grid matching screenshot 10 */}
      <div className="grid grid-cols-2 gap-2.5 mb-4">
        {acceptancesList.map((item) => (
          <div
            key={item.id}
            className="bg-white border border-slate-200/80 rounded-2xl p-3 shadow-xs hover:border-orange-300 transition-colors flex flex-col justify-between"
          >
            <div className="flex items-center justify-between mb-1.5">
              <ChevronLeft className="w-3.5 h-3.5 text-slate-400" />
              <h4 className="text-xs font-bold text-slate-800">{item.studentName}</h4>
            </div>
            <div className="flex items-center justify-between text-[10px] text-slate-500 border-t border-slate-100 pt-1.5">
              <span className="truncate max-w-[90px]">{item.university}</span>
              <span className="font-bold text-indigo-600">{item.major}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Section: طرح‌های مشاوره matching screenshot 10 */}
      <div className="flex items-center justify-between mt-2 mb-2">
        <div className="flex items-center gap-1.5 text-xs font-bold text-slate-800">
          <Sparkles className="w-4 h-4 text-orange-400" />
          <span>طرح‌های مشاوره</span>
        </div>
      </div>

      {/* VIP Card matching screenshot 10 */}
      <div className="w-full bg-gradient-to-r from-sky-50/70 via-indigo-50/50 to-white border border-sky-100 rounded-3xl p-4 shadow-xs relative overflow-hidden mb-3">
        <div className="flex items-start justify-between">
          <div className="space-y-1 pr-2">
            <h3 className="text-xs font-black text-sky-800 flex items-center gap-1">
              <span>طرح VIP هدف پلاس</span>
            </h3>
            <p className="text-[11px] text-slate-600 leading-relaxed">
              مشاوره، برنامه‌ریزی، آزمون و پیگیری روزانه
            </p>
          </div>

          <div className="w-10 h-10 rounded-2xl bg-sky-100 text-sky-600 flex items-center justify-center flex-shrink-0">
            <Gem className="w-5 h-5" />
          </div>
        </div>

        <div className="mt-3 pt-2 border-t border-sky-100/80 flex items-center justify-between">
          <button
            type="button"
            className="flex items-center gap-1 text-xs font-bold text-sky-700 hover:text-sky-900 border border-sky-200 bg-white px-3 py-1.5 rounded-xl shadow-2xs"
          >
            <ChevronLeft className="w-3.5 h-3.5" />
            <span>مشاهده جزئیات</span>
          </button>
          <span className="text-[10px] font-bold text-slate-500">ظرفیت محدود</span>
        </div>
      </div>

      {/* Basic Package Card matching screenshot 10 */}
      <div className="w-full bg-gradient-to-r from-orange-50/70 via-amber-50/50 to-white border border-orange-100 rounded-3xl p-4 shadow-xs relative overflow-hidden">
        <div className="flex items-start justify-between">
          <div className="space-y-1 pr-2">
            <h3 className="text-xs font-black text-orange-800">طرح پایه هدف پلاس</h3>
            <p className="text-[11px] text-slate-600 leading-relaxed">
              برنامه‌ریزی هفتگی، آزمون‌های آزمایشی و مشاوره ماهانه
            </p>
          </div>

          <div className="w-10 h-10 rounded-2xl bg-orange-100 text-[#FF7A30] flex items-center justify-center flex-shrink-0">
            <Award className="w-5 h-5" />
          </div>
        </div>

        <div className="mt-3 pt-2 border-t border-orange-100/80 flex items-center justify-between">
          <button
            type="button"
            className="flex items-center gap-1 text-xs font-bold text-orange-700 hover:text-orange-900 border border-orange-200 bg-white px-3 py-1.5 rounded-xl shadow-2xs"
          >
            <ChevronLeft className="w-3.5 h-3.5" />
            <span>مشاهده جزئیات</span>
          </button>
          <span className="text-[10px] font-bold text-slate-500">پشتیبانی آنلاین</span>
        </div>
      </div>
    </div>
  );
};
