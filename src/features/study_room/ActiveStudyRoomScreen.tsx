import React, { useState, useEffect } from 'react';
import {
  ChevronRight,
  Hexagon,
  Sparkles,
  Play,
  Users,
  Info,
  ShieldCheck,
  Flame,
  Volume2,
} from 'lucide-react';
import { RoomMember, StudyRoom, UserProfile } from '../../types';
import { LeaderboardPanel } from './LeaderboardPanel';
import { UserProfileModal } from './UserProfileModal';
import { sampleRahaProfile } from '../../mock/mockData';
import { toPersianDigits, formatSecondsToTime } from '../../utils/persianUtils';

interface ActiveStudyRoomScreenProps {
  room: StudyRoom;
  members: RoomMember[];
  onBack: () => void;
  onStartStudy: () => void;
}

export const ActiveStudyRoomScreen: React.FC<ActiveStudyRoomScreenProps> = ({
  room,
  members,
  onBack,
  onStartStudy,
}) => {
  const [subTab, setSubTab] = useState<'leaderboard' | 'room' | 'details'>('room');
  const [selectedUser, setSelectedUser] = useState<UserProfile | null>(null);
  const [isProfileOpen, setIsProfileOpen] = useState<boolean>(false);
  const [liveMembers, setLiveMembers] = useState<RoomMember[]>(members);

  // Simulate subtle real-time seconds ticking for online study room feel
  useEffect(() => {
    const timer = setInterval(() => {
      setLiveMembers((prev) =>
        prev.map((m) =>
          m.isOnline
            ? { ...m, studyDurationSeconds: m.studyDurationSeconds + 1 }
            : m
        )
      );
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleMemberClick = (member: RoomMember) => {
    // Generate profile from member
    const profile: UserProfile = {
      ...sampleRahaProfile,
      id: member.id,
      username: member.username,
      displayName: member.displayName || member.username,
      avatarUrl: member.avatarUrl,
      totalStudyTime: formatSecondsToTime(member.studyDurationSeconds),
      totalTests: member.testsCount || 120,
    };
    setSelectedUser(profile);
    setIsProfileOpen(true);
  };

  return (
    <div className="flex-1 flex flex-col p-4 bg-[#F8FAFC] pb-24 overflow-y-auto">
      {/* Top Header Bar matching screenshot 3 & 4 */}
      <div className="flex items-center justify-between pb-3">
        {/* Hexagon Settings Icon */}
        <button
          type="button"
          className="w-9 h-9 rounded-2xl bg-white border border-slate-200/80 flex items-center justify-center text-slate-600 hover:bg-slate-50 transition-colors shadow-xs"
          title="تنظیمات اتاق"
        >
          <Hexagon className="w-5 h-5 text-slate-700 stroke-[2]" />
        </button>

        {/* Room Title */}
        <div className="flex items-center gap-1.5">
          <Sparkles className="w-4 h-4 text-orange-400" />
          <h2 className="text-sm font-bold text-slate-800 truncate max-w-[200px]">
            {room.title}
          </h2>
          <Sparkles className="w-4 h-4 text-orange-400" />
        </div>

        {/* Back Button */}
        <button
          type="button"
          onClick={onBack}
          className="w-9 h-9 rounded-2xl bg-white border border-slate-200/80 flex items-center justify-center text-slate-700 hover:bg-slate-50 transition-colors shadow-xs"
          title="بازگشت"
        >
          <ChevronRight className="w-5 h-5 stroke-[2.5]" />
        </button>
      </div>

      {/* 3-Segment Navigation Bar matching screenshots */}
      <div className="flex items-center justify-between bg-slate-200/60 p-1.5 rounded-2xl my-3 text-xs font-semibold">
        {/* Tab 1: رتبه بندی */}
        <button
          type="button"
          onClick={() => setSubTab('leaderboard')}
          className={`flex-1 py-2 rounded-xl transition-all ${
            subTab === 'leaderboard'
              ? 'bg-[#E83B67] text-white shadow-sm font-bold'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          رتبه‌بندی
        </button>

        {/* Tab 2: اتاق مطالعه */}
        <button
          type="button"
          onClick={() => setSubTab('room')}
          className={`flex-1 py-2 rounded-xl transition-all ${
            subTab === 'room'
              ? 'bg-[#E83B67] text-white shadow-sm font-bold'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          سالن مطالعه
        </button>

        {/* Tab 3: جزئیات */}
        <button
          type="button"
          onClick={() => setSubTab('details')}
          className={`flex-1 py-2 rounded-xl transition-all ${
            subTab === 'details'
              ? 'bg-[#E83B67] text-white shadow-sm font-bold'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          جزئیات
        </button>
      </div>

      {/* Tab 1: اتاق مطالعه (Study Room View matching screenshot 3) */}
      {subTab === 'room' && (
        <div className="space-y-4">
          {/* Start Study Action Strip matching screenshot 3 */}
          <div className="w-full bg-white border border-slate-200/80 rounded-2xl p-2.5 flex items-center justify-between shadow-xs">
            <div className="flex items-center gap-1.5 text-xs font-bold text-slate-700">
              <Sparkles className="w-3.5 h-3.5 text-orange-400" />
              <span>شروع زمان مطالعه</span>
            </div>

            <button
              type="button"
              onClick={onStartStudy}
              className="flex items-center gap-1.5 bg-[#E83B67] hover:bg-rose-600 text-white px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all shadow-sm shadow-rose-500/25 active:scale-95"
            >
              <div className="w-4 h-4 rounded-full bg-white/20 flex items-center justify-center">
                <Play className="w-2.5 h-2.5 fill-white text-white translate-x-0.5" />
              </div>
              <span>شروع زمان مطالعه</span>
            </button>
          </div>

          {/* Active Members Counter Badge matching screenshot 3 */}
          <div className="flex justify-end">
            <div className="bg-emerald-50 border border-emerald-200/60 text-emerald-800 text-xs px-3 py-1 rounded-2xl flex items-center gap-2 font-medium">
              <span>{toPersianDigits(room.onlineCount)} نفر در حال مطالعه</span>
              <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            </div>
          </div>

          {/* 3-Column Online Students Grid matching screenshot 3 */}
          <div className="grid grid-cols-3 gap-2.5">
            {liveMembers.map((member) => (
              <div
                key={member.id}
                onClick={() => handleMemberClick(member)}
                className="bg-white border border-slate-200/80 rounded-2xl p-2.5 flex flex-col items-center justify-center text-center hover:border-orange-300 hover:shadow-md transition-all cursor-pointer group active:scale-95"
              >
                {/* Circular Avatar with Border */}
                <div className="relative mb-2">
                  <img
                    src={member.avatarUrl}
                    alt={member.username}
                    referrerPolicy="no-referrer"
                    className="w-13 h-13 rounded-full object-cover border-2 border-slate-200 group-hover:border-orange-400 transition-colors"
                  />
                  {member.isOnline && (
                    <div className="absolute -bottom-0.5 -right-0.5 bg-emerald-500 w-3.5 h-3.5 rounded-full border-2 border-white shadow-xs" />
                  )}
                </div>

                {/* Username */}
                <span className="text-[11px] font-bold text-slate-800 font-mono truncate max-w-full dir-ltr mb-1">
                  {member.username}
                </span>

                {/* Live study stopwatch timer */}
                <div className="flex items-center gap-1 text-[10px] text-slate-600 font-mono font-medium">
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                  <span>{formatSecondsToTime(member.studyDurationSeconds)}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 2: رتبه‌بندی (Leaderboard matching screenshot 4) */}
      {subTab === 'leaderboard' && (
        <LeaderboardPanel
          members={liveMembers}
          onSelectMember={handleMemberClick}
        />
      )}

      {/* Tab 3: جزئیات اتاق */}
      {subTab === 'details' && (
        <div className="space-y-4">
          <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-xs">
            <h3 className="text-sm font-bold text-slate-800 mb-2 flex items-center gap-2">
              <Info className="w-4 h-4 text-orange-500" />
              <span>درباره سالن مطالعه هدف پلاس</span>
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed mb-3">
              این سالن رسمی مخصوص داوطلبان کنکور سراسری جهت افزایش تمرکز و انگیزه جمعی است.
              ناظران آنلاین در صورت عدم فعالیت کاربر بیش از ۳۰ دقیقه وضعیت را به حالت استراحت تغییر می‌دهند.
            </p>

            <div className="border-t border-slate-100 pt-3 space-y-2 text-xs">
              <div className="flex justify-between text-slate-600">
                <span>تعداد اعضای کل:</span>
                <span className="font-bold text-slate-800 font-mono">
                  {toPersianDigits(room.memberCount)} / {toPersianDigits(room.maxMembers)} نفر
                </span>
              </div>
              <div className="flex justify-between text-slate-600">
                <span>ناظر رسمی:</span>
                <span className="font-bold text-indigo-600">تیم مشاوره هدف پلاس</span>
              </div>
              <div className="flex justify-between text-slate-600">
                <span>قوانین حضور:</span>
                <span className="text-emerald-600 font-medium">عدم باز کردن شبکه‌های اجتماعی</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* User Profile Modal Sheet */}
      <UserProfileModal
        user={selectedUser}
        isOpen={isProfileOpen}
        onClose={() => setIsProfileOpen(false)}
      />
    </div>
  );
};
