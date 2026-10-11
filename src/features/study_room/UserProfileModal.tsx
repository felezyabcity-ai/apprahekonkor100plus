import React, { useState } from 'react';
import { X, Sparkles, Clock, CheckCircle2, Moon, Award } from 'lucide-react';
import { UserProfile } from '../../types';
import { toPersianDigits } from '../../utils/persianUtils';

interface UserProfileModalProps {
  user: UserProfile | null;
  isOpen: boolean;
  onClose: () => void;
}

export const UserProfileModal: React.FC<UserProfileModalProps> = ({
  user,
  isOpen,
  onClose,
}) => {
  const [activeTab, setActiveTab] = useState<'thisWeek' | 'lastWeek' | 'thisMonth' | 'lastMonth'>('thisWeek');

  if (!isOpen || !user) return null;

  const daysData = [
    { name: 'شنبه', time: user.dailyBreakdown.saturday },
    { name: 'یکشنبه', time: user.dailyBreakdown.sunday },
    { name: 'دوشنبه', time: user.dailyBreakdown.monday },
    { name: 'سه شنبه', time: user.dailyBreakdown.tuesday },
    { name: 'چهارشنبه', time: user.dailyBreakdown.wednesday },
    { name: 'پنجشنبه', time: user.dailyBreakdown.thursday },
    { name: 'جمعه', time: user.dailyBreakdown.friday },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/60 backdrop-blur-xs p-0 sm:p-4">
      <div className="w-full max-w-md bg-white rounded-t-3xl sm:rounded-3xl p-5 shadow-2xl animate-in slide-in-from-bottom-8 duration-200">
        {/* Drag handle */}
        <div className="w-12 h-1 bg-slate-200 rounded-full mx-auto mb-3 sm:hidden" />

        {/* Modal Close button */}
        <div className="flex justify-between items-center mb-2">
          <div className="flex items-center gap-1.5 text-xs text-orange-600 font-bold bg-orange-50 px-2.5 py-1 rounded-full">
            <Award className="w-3.5 h-3.5" />
            <span>پروفایل تحصیلی دانش‌آموز</span>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1 rounded-full text-slate-400 hover:text-slate-600 hover:bg-slate-100"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* User Header matching screenshot 6 */}
        <div className="flex flex-col items-center justify-center my-3">
          <div className="relative">
            <img
              src={user.avatarUrl}
              alt={user.displayName}
              referrerPolicy="no-referrer"
              className="w-18 h-18 rounded-full object-cover border-2 border-rose-400 shadow-md p-0.5"
            />
            <div className="absolute -bottom-1 -right-1 bg-emerald-500 w-4 h-4 rounded-full border-2 border-white" />
          </div>

          <div className="flex items-center gap-1.5 mt-2.5">
            <Sparkles className="w-4 h-4 text-purple-400 fill-purple-300" />
            <h3 className="text-base font-bold text-slate-800 dir-ltr font-mono">
              @{user.username}
            </h3>
            <Sparkles className="w-4 h-4 text-purple-400 fill-purple-300" />
          </div>
          <span className="text-xs text-slate-500 mt-0.5">{user.grade}</span>
        </div>

        {/* Filter Tabs matching screenshot 6 */}
        <div className="flex items-center justify-between bg-slate-100/80 p-1 rounded-2xl my-3 text-xs">
          <button
            type="button"
            onClick={() => setActiveTab('thisWeek')}
            className={`flex-1 py-1.5 rounded-xl transition-all font-medium ${
              activeTab === 'thisWeek'
                ? 'bg-white text-slate-800 shadow-xs font-bold'
                : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            این هفته
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('lastWeek')}
            className={`flex-1 py-1.5 rounded-xl transition-all font-medium ${
              activeTab === 'lastWeek'
                ? 'bg-white text-slate-800 shadow-xs font-bold'
                : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            هفته قبل
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('thisMonth')}
            className={`flex-1 py-1.5 rounded-xl transition-all font-medium ${
              activeTab === 'thisMonth'
                ? 'bg-white text-slate-800 shadow-xs font-bold'
                : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            این ماه
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('lastMonth')}
            className={`flex-1 py-1.5 rounded-xl transition-all font-medium ${
              activeTab === 'lastMonth'
                ? 'bg-white text-slate-800 shadow-xs font-bold'
                : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            ماه قبل
          </button>
        </div>

        {/* Summary Stat Pills matching screenshot 6 */}
        <div className="grid grid-cols-3 gap-2 my-3 text-center">
          <div className="bg-purple-50/70 border border-purple-100 rounded-2xl py-2 px-1">
            <span className="block text-[10px] text-purple-700 font-medium">ساعت بیداری</span>
            <span className="text-xs font-bold text-slate-800 font-mono mt-0.5 block">
              {toPersianDigits(user.averageWakeTime)}
            </span>
          </div>

          <div className="bg-blue-50/70 border border-blue-100 rounded-2xl py-2 px-1">
            <span className="block text-[10px] text-blue-700 font-medium">تعداد تست</span>
            <span className="text-xs font-bold text-slate-800 font-mono mt-0.5 block">
              {toPersianDigits(user.totalTests)}
            </span>
          </div>

          <div className="bg-orange-50/70 border border-orange-100 rounded-2xl py-2 px-1">
            <span className="block text-[10px] text-orange-700 font-medium">میزان مطالعه</span>
            <span className="text-xs font-bold text-slate-800 font-mono mt-0.5 block">
              {toPersianDigits(user.totalStudyTime)}
            </span>
          </div>
        </div>

        {/* Days Grid Breakdown matching screenshot 6 */}
        <div className="mt-4">
          <div className="text-xs font-bold text-slate-700 mb-2">کارکرد روزهای هفته</div>
          <div className="grid grid-cols-4 gap-2">
            {daysData.map((d, idx) => {
              const hasStudy = d.time !== '۰۰:۰۰:۰۰';
              return (
                <div
                  key={idx}
                  className={`rounded-2xl p-2 text-center border transition-all ${
                    hasStudy
                      ? 'bg-blue-500 text-white border-blue-600 shadow-sm'
                      : 'bg-slate-50 text-slate-700 border-slate-200/80'
                  }`}
                >
                  <span className={`block text-[10px] font-medium ${hasStudy ? 'text-white/90' : 'text-slate-500'}`}>
                    {d.name}
                  </span>
                  <span className={`block text-[11px] font-bold font-mono mt-1 ${hasStudy ? 'text-white' : 'text-slate-400'}`}>
                    {toPersianDigits(d.time.slice(0, 5))}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
