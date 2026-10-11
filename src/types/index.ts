export interface UserProfile {
  id: string;
  username: string;
  displayName: string;
  avatarUrl: string;
  grade: string; // e.g. دوازدهم تجربی
  isPrivate: boolean;
  totalStudyTime: string; // "18:42:00"
  totalTests: number;
  averageWakeTime: string; // "07:31"
  streakDays: number;
  dailyBreakdown: {
    saturday: string;
    sunday: string;
    monday: string;
    tuesday: string;
    wednesday: string;
    thursday: string;
    friday: string;
  };
}

export interface StudyLogItem {
  id: string;
  title: string; // e.g. فصل ۱ - تابع
  category: string; // ریاضی، زیست، دینی...
  notes?: string;
  durationMinutes: number; // e.g. 120
  testCount: number; // e.g. 10
  isCompleted: boolean;
  dateKey: string; // "1405-07-19"
}

export interface RoomMember {
  id: string;
  username: string;
  displayName?: string;
  avatarUrl: string;
  isOnline: boolean;
  studyDurationSeconds: number;
  rank?: number;
  testsCount?: number;
}

export interface StudyRoom {
  id: string;
  title: string;
  handle: string; // e.g. @HadafPlus
  description: string;
  memberCount: number;
  maxMembers: number;
  onlineCount: number;
  isOfficial: boolean;
  coverImage?: string;
  topAvatars: string[];
}

export interface SchedulePresetCategory {
  id: string;
  title: string;
  subtitle: string;
  iconType: 'holiday' | 'school' | 'pms' | 'night' | 'early' | 'late';
  badge: string;
  color: string;
  bgGradient: string;
}

export interface ScheduleRoutineDetail {
  id: string;
  title: string;
  targetHours: number;
  description: string;
  recommendedWake: string;
  recommendedSleep: string;
  blocks: {
    time: string;
    activity: string;
    type: 'study' | 'rest' | 'class' | 'meal';
  }[];
}

export interface Consultant {
  id: string;
  name: string;
  university: string;
  major: string;
  rankYear: string;
  avatarUrl: string;
}

export interface AcceptanceStory {
  id: string;
  studentName: string;
  major: string;
  university: string;
  category: 'تجربی' | 'ریاضی' | 'انسانی';
}

export type MainTabType = 'widgets' | 'counseling' | 'home' | 'calendar' | 'study_room';
