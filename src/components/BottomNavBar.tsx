import React from 'react';
import { LayoutGrid, GraduationCap, Home, Calendar, Users } from 'lucide-react';
import { MainTabType } from '../types';

interface BottomNavBarProps {
  currentTab: MainTabType;
  onTabChange: (tab: MainTabType) => void;
  onlineStudyCount?: number;
}

export const BottomNavBar: React.FC<BottomNavBarProps> = ({
  currentTab,
  onTabChange,
}) => {
  const tabs = [
    {
      id: 'study_room' as MainTabType,
      label: 'سالن مطالعه',
      icon: Users,
    },
    {
      id: 'calendar' as MainTabType,
      label: 'تقویم',
      icon: Calendar,
    },
    {
      id: 'home' as MainTabType,
      label: 'خانه',
      icon: Home,
    },
    {
      id: 'counseling' as MainTabType,
      label: 'مشاوره',
      icon: GraduationCap,
    },
    {
      id: 'widgets' as MainTabType,
      label: 'ابزارک‌ها',
      icon: LayoutGrid,
    },
  ];

  return (
    <nav className="absolute bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-200/80 px-2 py-1 shadow-lg shadow-slate-900/5">
      <div className="flex items-center justify-around h-14 max-w-lg mx-auto">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = currentTab === tab.id;

          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => onTabChange(tab.id)}
              className={`flex-1 flex flex-col items-center justify-center py-1 transition-all group relative ${
                isActive ? 'text-[#FF7A30]' : 'text-slate-400 hover:text-slate-600'
              }`}
            >
              {/* Active pill background or icon glow */}
              <div
                className={`relative p-1.5 rounded-2xl transition-all duration-200 ${
                  isActive
                    ? 'bg-rose-50 text-[#E83B67] transform -translate-y-1 shadow-sm'
                    : 'text-slate-400'
                }`}
              >
                <Icon className={`w-5 h-5 transition-transform ${isActive ? 'stroke-[2.5px]' : 'stroke-2'}`} />
                {isActive && (
                  <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-[#E83B67]" />
                )}
              </div>
              <span
                className={`text-[10px] font-medium transition-colors mt-0.5 ${
                  isActive ? 'text-[#E83B67] font-bold' : 'text-slate-500'
                }`}
              >
                {tab.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};
