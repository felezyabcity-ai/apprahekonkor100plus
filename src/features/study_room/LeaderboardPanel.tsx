import React, { useState } from 'react';
import { Crown, Sparkles, Trophy, ChevronLeft } from 'lucide-react';
import { RoomMember, UserProfile } from '../../types';
import { toPersianDigits, formatSecondsToTime } from '../../utils/persianUtils';

interface LeaderboardPanelProps {
  members: RoomMember[];
  onSelectMember: (member: RoomMember) => void;
  currentUserRank?: number;
}

export const LeaderboardPanel: React.FC<LeaderboardPanelProps> = ({
  members,
  onSelectMember,
  currentUserRank = 160,
}) => {
  const [timeFilter, setTimeFilter] = useState<'today' | 'yesterday' | 'week' | 'all'>('today');

  // Sorted members
  const sorted = [...members].sort(
    (a, b) => b.studyDurationSeconds - a.studyDurationSeconds
  );

  const top1 = sorted[0]; // 1st
  const top2 = sorted[1]; // 2nd
  const top3 = sorted[2]; // 3rd
  const others = sorted.slice(3);

  return (
    <div className="w-full flex flex-col space-y-3">
      {/* Dark Slate Podium Container */}
      <div className="w-full bg-[#1E1E2D] rounded-3xl p-4 text-white shadow-xl shadow-slate-950/20">
        {/* Time Segmented Filters matching screenshot 4 */}
        <div className="flex items-center justify-between bg-slate-900/80 p-1 rounded-2xl text-xs mb-6">
          <button
            type="button"
            onClick={() => setTimeFilter('all')}
            className={`flex-1 py-1.5 rounded-xl transition-all ${
              timeFilter === 'all'
                ? 'bg-blue-600 text-white font-bold'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            کل بازه
          </button>
          <button
            type="button"
            onClick={() => setTimeFilter('week')}
            className={`flex-1 py-1.5 rounded-xl transition-all ${
              timeFilter === 'week'
                ? 'bg-blue-600 text-white font-bold'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            این هفته
          </button>
          <button
            type="button"
            onClick={() => setTimeFilter('today')}
            className={`flex-1 py-1.5 rounded-xl transition-all ${
              timeFilter === 'today'
                ? 'bg-blue-600 text-white font-bold'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            امروز
          </button>
          <button
            type="button"
            onClick={() => setTimeFilter('yesterday')}
            className={`flex-1 py-1.5 rounded-xl transition-all ${
              timeFilter === 'yesterday'
                ? 'bg-blue-600 text-white font-bold'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            دیروز
          </button>
        </div>

        {/* 3D Podium Layout matching screenshot 4 */}
        <div className="flex items-end justify-center gap-3 pt-2 pb-1 px-2">
          {/* 3rd Place (Left Column in RTL) */}
          {top3 && (
            <div
              onClick={() => onSelectMember(top3)}
              className="flex-1 flex flex-col items-center cursor-pointer group"
            >
              <span className="text-[10px] text-slate-400 mb-1 font-mono truncate max-w-[70px]">
                @{top3.username}
              </span>
              <div className="relative mb-2">
                <img
                  src={top3.avatarUrl}
                  alt={top3.username}
                  referrerPolicy="no-referrer"
                  className="w-12 h-12 rounded-full object-cover border-2 border-amber-700/80 shadow-md group-hover:scale-105 transition-transform"
                />
                <div className="absolute -bottom-1 -right-1 bg-amber-800 text-amber-200 text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center border border-white">
                  ۳
                </div>
              </div>
              {/* Podium Column */}
              <div className="w-full bg-gradient-to-t from-slate-800 to-slate-700/60 rounded-t-2xl py-3 px-1 flex flex-col items-center justify-center min-h-[70px] border-t border-slate-600">
                <span className="text-[10px] text-amber-400 font-bold">۰۳</span>
                <span className="text-[10px] font-mono text-slate-300 font-bold mt-1">
                  {formatSecondsToTime(top3.studyDurationSeconds)}
                </span>
              </div>
            </div>
          )}

          {/* 1st Place (Center Column - Tallest) */}
          {top1 && (
            <div
              onClick={() => onSelectMember(top1)}
              className="flex-1 flex flex-col items-center cursor-pointer group -translate-y-2"
            >
              <div className="text-amber-400 flex items-center gap-1 mb-0.5">
                <Crown className="w-4 h-4 fill-amber-400" />
              </div>
              <span className="text-[10px] text-amber-200 mb-1 font-mono font-bold truncate max-w-[80px]">
                @{top1.username}
              </span>
              <div className="relative mb-2">
                <img
                  src={top1.avatarUrl}
                  alt={top1.username}
                  referrerPolicy="no-referrer"
                  className="w-15 h-15 rounded-full object-cover border-2 border-amber-400 shadow-lg group-hover:scale-105 transition-transform ring-2 ring-amber-400/30"
                />
                <div className="absolute -bottom-1 -right-1 bg-amber-400 text-slate-900 text-[10px] font-black w-5 h-5 rounded-full flex items-center justify-center border-2 border-white shadow-sm">
                  ۱
                </div>
              </div>
              {/* Podium Column */}
              <div className="w-full bg-gradient-to-t from-blue-900 to-indigo-700 rounded-t-2xl py-4 px-1 flex flex-col items-center justify-center min-h-[96px] border-t-2 border-amber-400 shadow-md">
                <span className="text-xs text-amber-300 font-black">۰۱</span>
                <span className="text-xs font-mono text-white font-bold mt-1">
                  {formatSecondsToTime(top1.studyDurationSeconds)}
                </span>
              </div>
            </div>
          )}

          {/* 2nd Place (Right Column) */}
          {top2 && (
            <div
              onClick={() => onSelectMember(top2)}
              className="flex-1 flex flex-col items-center cursor-pointer group"
            >
              <span className="text-[10px] text-slate-400 mb-1 font-mono truncate max-w-[70px]">
                @{top2.username}
              </span>
              <div className="relative mb-2">
                <img
                  src={top2.avatarUrl}
                  alt={top2.username}
                  referrerPolicy="no-referrer"
                  className="w-13 h-13 rounded-full object-cover border-2 border-slate-300 shadow-md group-hover:scale-105 transition-transform"
                />
                <div className="absolute -bottom-1 -right-1 bg-slate-300 text-slate-900 text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center border border-white">
                  ۲
                </div>
              </div>
              {/* Podium Column */}
              <div className="w-full bg-gradient-to-t from-slate-800 to-slate-700/70 rounded-t-2xl py-3.5 px-1 flex flex-col items-center justify-center min-h-[82px] border-t border-slate-500">
                <span className="text-[10px] text-slate-300 font-bold">۰۲</span>
                <span className="text-[10px] font-mono text-slate-300 font-bold mt-1">
                  {formatSecondsToTime(top2.studyDurationSeconds)}
                </span>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Ranks 4+ List matching screenshot 4 */}
      <div className="space-y-2 pt-1 pb-16">
        {others.map((member, idx) => {
          const rank = idx + 4;
          return (
            <div
              key={member.id}
              onClick={() => onSelectMember(member)}
              className="w-full bg-white border border-slate-200/80 rounded-2xl p-3 flex items-center justify-between hover:bg-slate-50 transition-colors cursor-pointer shadow-xs"
            >
              <div className="flex items-center gap-3">
                {/* Rank Badge */}
                <div className="w-7 h-7 rounded-xl bg-slate-100 flex items-center justify-center text-xs font-bold font-mono text-slate-600">
                  {toPersianDigits(rank)}
                </div>

                {/* Avatar */}
                <img
                  src={member.avatarUrl}
                  alt={member.username}
                  referrerPolicy="no-referrer"
                  className="w-9 h-9 rounded-full object-cover border border-slate-200"
                />

                {/* Username */}
                <span className="text-xs font-semibold text-slate-800 font-mono dir-ltr">
                  @{member.username}
                </span>
              </div>

              {/* Study Time */}
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold font-mono text-slate-700">
                  {formatSecondsToTime(member.studyDurationSeconds)}
                </span>
                <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              </div>
            </div>
          );
        })}
      </div>

      {/* Sticky Bottom Current User Rank Bar matching screenshot 4 */}
      <div className="sticky bottom-14 left-0 right-0 bg-[#1E1E2D] text-white rounded-2xl p-3 flex items-center justify-between shadow-xl border border-slate-700/80">
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-lg bg-indigo-600 flex items-center justify-center text-xs font-bold font-mono text-white">
            {toPersianDigits(currentUserRank)}
          </div>
          <div className="w-8 h-8 rounded-full bg-orange-500 text-white flex items-center justify-center text-xs font-bold">
            امیر
          </div>
          <span className="text-xs font-bold font-mono dir-ltr">@amir4849</span>
        </div>

        <div className="text-xs font-bold font-mono text-orange-400">
          ۰۴:۰۰:۰۰
        </div>
      </div>
    </div>
  );
};
