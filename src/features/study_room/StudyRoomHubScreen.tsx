import React, { useState } from 'react';
import {
  Headphones,
  Bell,
  Search,
  Sparkles,
  HelpCircle,
  Users,
  ChevronLeft,
  CheckCircle,
} from 'lucide-react';
import { StudyRoom } from '../../types';
import { officialStudyRoom } from '../../mock/mockData';
import { toPersianDigits } from '../../utils/persianUtils';
import { RaheKonkurLogo } from '../../components/RaheKonkurLogo';

interface StudyRoomHubScreenProps {
  onSelectRoom: (room: StudyRoom) => void;
  onOpenInfo?: () => void;
}

export const StudyRoomHubScreen: React.FC<StudyRoomHubScreenProps> = ({
  onSelectRoom,
}) => {
  const [filter, setFilter] = useState<'all' | 'my'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <div className="flex-1 flex flex-col p-4 bg-[#F8FAFC] pb-24 overflow-y-auto">
      {/* Top Header Bar matching screenshot 5 */}
      <div className="flex items-center justify-between pb-3">
        <div className="flex items-center gap-2">
          {/* Headphones Icon */}
          <button
            type="button"
            className="w-10 h-10 rounded-2xl bg-white border border-slate-200/80 flex items-center justify-center text-slate-700 hover:bg-slate-50 transition-colors shadow-xs"
            title="اتاق گفتگوی صوتی و موسیقی تمرکز"
          >
            <Headphones className="w-5 h-5 stroke-[2]" />
          </button>
          {/* Notification Bell */}
          <button
            type="button"
            className="w-10 h-10 rounded-2xl bg-rose-50 border border-rose-200/70 flex items-center justify-center text-[#E83B67] hover:bg-rose-100 transition-colors shadow-2xs relative"
            title="اعلان‌ها"
          >
            <Bell className="w-5 h-5 stroke-[2]" />
            <div className="absolute top-2 right-2 w-2 h-2 rounded-full bg-[#E83B67]" />
          </button>
        </div>

        <h1 className="text-base font-black text-slate-900">سالن‌های مطالعه ره کنکور</h1>
      </div>

      {/* Search Bar */}
      <div className="relative my-2">
        <input
          type="text"
          placeholder="جستجوی سالن، سازنده..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full bg-white border border-slate-200 rounded-2xl py-3 pr-10 pl-4 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-rose-500 shadow-2xs"
        />
        <Search className="w-4 h-4 text-slate-400 absolute right-3.5 top-1/2 -translate-y-1/2" />
      </div>

      {/* Filter Segmented Buttons */}
      <div className="grid grid-cols-2 gap-2.5 my-3">
        {/* همه سالن‌ها */}
        <button
          type="button"
          onClick={() => setFilter('all')}
          className={`py-2.5 px-4 rounded-2xl text-xs font-bold transition-all flex items-center justify-center gap-2 border shadow-2xs ${
            filter === 'all'
              ? 'bg-[#E83B67] text-white border-rose-600 shadow-rose-500/20'
              : 'bg-white text-slate-700 border-slate-200/80 hover:bg-slate-50'
          }`}
        >
          <span>همه‌ی سالن‌ها</span>
        </button>

        {/* سالن‌های من */}
        <button
          type="button"
          onClick={() => setFilter('my')}
          className={`py-2.5 px-4 rounded-2xl text-xs font-bold transition-all flex items-center justify-center gap-2 border shadow-2xs ${
            filter === 'my'
              ? 'bg-[#E83B67] text-white border-rose-600 shadow-rose-500/20'
              : 'bg-white text-slate-700 border-slate-200/80 hover:bg-slate-50'
          }`}
        >
          <span>سالن‌های من</span>
        </button>
      </div>

      {/* Motivational Info Card */}
      <div className="w-full bg-slate-900 rounded-2xl p-4 text-white my-2 shadow-md relative overflow-hidden border border-slate-800">
        <div className="relative z-10">
          <div className="flex items-center gap-2 text-xs font-bold text-rose-400 mb-1">
            <div className="w-4 h-4 rounded-full bg-rose-500/20 flex items-center justify-center text-rose-300">
              ?
            </div>
            <span>چطور در سالن‌های مطالعه ره کنکور رقابت کنیم؟</span>
          </div>
          <p className="text-[11px] text-slate-300 pr-6 leading-relaxed">
            مطالعه همگام با داوطلبان برتر کنکور، ثبت رتبه روزانه و رقابت بدون حواس‌پرتی در سالن‌های زنده.
          </p>
        </div>
      </div>

      {/* Section Heading: سالن های رسمی ره کنکور */}
      <div className="flex items-center justify-between mt-5 mb-3">
        <div className="flex items-center gap-1.5 text-xs font-bold text-slate-800">
          <Sparkles className="w-4 h-4 text-rose-500" />
          <span>سالن مطالعه مرکزی و رسمی ره کنکور</span>
        </div>
      </div>

      {/* Featured Room Card */}
      <div
        onClick={() => onSelectRoom(officialStudyRoom)}
        className="w-full bg-slate-900 rounded-3xl p-4 shadow-xl border border-slate-800 text-white cursor-pointer hover:border-rose-500/50 transition-all group active:scale-[0.99]"
      >
        {/* Top 3 Avatars Preview Podium */}
        <div className="flex items-end justify-center gap-4 pt-2 pb-5">
          {/* Rank 2 */}
          <div className="flex flex-col items-center">
            <span className="text-[9px] text-slate-400 font-mono mb-1">@2bahar12_32</span>
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80"
                alt="member"
                className="w-11 h-11 rounded-full object-cover border-2 border-slate-400 shadow-md"
              />
              <div className="absolute -bottom-1 -right-1 bg-slate-300 text-slate-900 text-[8px] font-bold w-3.5 h-3.5 rounded-full flex items-center justify-center">
                ۲
              </div>
            </div>
          </div>

          {/* Rank 1 - Center Tallest */}
          <div className="flex flex-col items-center -translate-y-2">
            <span className="text-[9px] text-amber-300 font-mono font-bold mb-1">@kania1</span>
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&auto=format&fit=crop&q=80"
                alt="member"
                className="w-13 h-13 rounded-full object-cover border-2 border-amber-400 shadow-lg ring-2 ring-amber-400/40"
              />
              <div className="absolute -bottom-1 -right-1 bg-amber-400 text-slate-900 text-[9px] font-black w-4 h-4 rounded-full flex items-center justify-center">
                ۱
              </div>
            </div>
          </div>

          {/* Rank 3 */}
          <div className="flex flex-col items-center">
            <span className="text-[9px] text-slate-400 font-mono mb-1">@Raha2026</span>
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1517841905240-472988babdf9?w=100&auto=format&fit=crop&q=80"
                alt="member"
                className="w-11 h-11 rounded-full object-cover border-2 border-amber-700 shadow-md"
              />
              <div className="absolute -bottom-1 -right-1 bg-amber-800 text-amber-200 text-[8px] font-bold w-3.5 h-3.5 rounded-full flex items-center justify-center">
                ۳
              </div>
            </div>
          </div>
        </div>

        {/* Bottom White Container matching screenshot 5 */}
        <div className="w-full bg-white rounded-2xl p-3 text-slate-800 flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <RaheKonkurLogo size={36} className="rounded-xl shadow-2xs" />
              <div>
                <h3 className="text-xs font-bold text-slate-900 group-hover:text-[#E83B67] transition-colors">
                  {officialStudyRoom.title}
                </h3>
                <span className="text-[10px] text-rose-600 font-mono flex items-center gap-1">
                  <span>@RaheKonkur</span>
                  <CheckCircle className="w-3 h-3 text-rose-500 fill-rose-100 inline" />
                </span>
              </div>
            </div>

            <ChevronLeft className="w-4 h-4 text-slate-400 group-hover:text-orange-500 transition-colors" />
          </div>

          <div className="flex items-center justify-between border-t border-slate-100 pt-2 text-xs">
            {/* Online counter */}
            <div className="flex items-center gap-1.5 bg-emerald-50 text-emerald-800 px-2 py-0.5 rounded-full text-[11px] font-medium">
              <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>{toPersianDigits(57)} نفر در حال مطالعه</span>
            </div>

            {/* Capacity */}
            <div className="text-[11px] text-slate-500 font-mono">
              <span>{toPersianDigits(300)} | {toPersianDigits(300)} عضو</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
