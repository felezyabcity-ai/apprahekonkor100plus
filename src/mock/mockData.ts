import {
  UserProfile,
  StudyLogItem,
  RoomMember,
  StudyRoom,
  SchedulePresetCategory,
  Consultant,
  AcceptanceStory,
} from '../types';

export const currentUser: UserProfile = {
  id: 'user_current',
  username: 'amir4849',
  displayName: 'امیر مرادی',
  avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
  grade: 'دوازدهم تجربی',
  isPrivate: false,
  totalStudyTime: '۰۴:۰۰:۰۰',
  totalTests: 30,
  averageWakeTime: '۰۸:۰۰',
  streakDays: 8,
  dailyBreakdown: {
    saturday: '۰۴:۰۰:۰۰',
    sunday: '۰۳:۴۵:۰۰',
    monday: '۰۵:۱۰:۰۰',
    tuesday: '۰۲:۳۰:۰۰',
    wednesday: '۰۰:۰۰:۰۰',
    thursday: '۰۰:۰۰:۰۰',
    friday: '۰۰:۰۰:۰۰',
  },
};

export const sampleRahaProfile: UserProfile = {
  id: 'user_raha',
  username: 'Raha2026',
  displayName: 'رها صادقی',
  avatarUrl: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop&q=80',
  grade: 'دوازدهم ریاضی',
  isPrivate: false,
  totalStudyTime: '۱۸:۴۲:۰۰',
  totalTests: 240,
  averageWakeTime: '۰۷:۳۱',
  streakDays: 19,
  dailyBreakdown: {
    saturday: '۰۰:۰۰:۰۰',
    sunday: '۰۷:۰۰:۵۹',
    monday: '۱۰:۰۱:۴۰',
    tuesday: '۰۱:۳۹:۳۶',
    wednesday: '۰۰:۰۰:۰۰',
    thursday: '۰۰:۰۰:۰۰',
    friday: '۰۰:۰۰:۰۰',
  },
};

export const initialStudyLogs: StudyLogItem[] = [
  {
    id: 'log_1',
    title: 'فصل ۱ - تابع',
    category: 'ریاضیات تجربی',
    notes: 'توضیحات اضافه نشده',
    durationMinutes: 120, // 02:00
    testCount: 10,
    isCompleted: true,
    dateKey: '1405-07-08',
  },
  {
    id: 'log_2',
    title: 'درس ۱ - شکر نعمت',
    category: 'دین و زندگی',
    notes: 'توضیحات اضافه نشده',
    durationMinutes: 120, // 02:00
    testCount: 20,
    isCompleted: true,
    dateKey: '1405-07-08',
  },
];

export const officialStudyRoom: StudyRoom = {
  id: 'official_rahe_konkur',
  title: 'سالن مطالعه مرکزی ره کنکور',
  handle: '@RaheKonkur',
  description: 'سالن مطالعه رسمی داوطلبان ره کنکور با نظارت ناظران و رتبه‌بندی زنده کشوری',
  memberCount: 300,
  maxMembers: 300,
  onlineCount: 57,
  isOfficial: true,
  topAvatars: [
    'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80',
  ],
};

export const roomMembersList: RoomMember[] = [
  {
    id: 'm_1',
    username: 'btsrealmadrid7',
    avatarUrl: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=150&auto=format&fit=crop&q=80',
    isOnline: true,
    studyDurationSeconds: 37319, // 10:21:59
    rank: 1,
    testsCount: 180,
  },
  {
    id: 'm_2',
    username: 'Huhvash',
    avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
    isOnline: true,
    studyDurationSeconds: 36815, // 10:13:35
    rank: 2,
    testsCount: 155,
  },
  {
    id: 'm_3',
    username: 'neg8r',
    avatarUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80',
    isOnline: true,
    studyDurationSeconds: 36241, // 10:04:01
    rank: 3,
    testsCount: 140,
  },
  {
    id: 'm_4',
    username: '_tikal_',
    avatarUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&auto=format&fit=crop&q=80',
    isOnline: true,
    studyDurationSeconds: 31508, // 08:45:08
    rank: 4,
    testsCount: 110,
  },
  {
    id: 'm_5',
    username: 'Ssta_tira',
    avatarUrl: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&auto=format&fit=crop&q=80',
    isOnline: true,
    studyDurationSeconds: 30877, // 08:34:37
    rank: 5,
    testsCount: 95,
  },
  {
    id: 'm_6',
    username: 'kania1',
    avatarUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80',
    isOnline: true,
    studyDurationSeconds: 29098, // 08:04:58
    rank: 6,
    testsCount: 120,
  },
  {
    id: 'm_7',
    username: 'Younes135',
    avatarUrl: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&auto=format&fit=crop&q=80',
    isOnline: true,
    studyDurationSeconds: 26979, // 07:29:39
    rank: 7,
    testsCount: 85,
  },
  {
    id: 'm_8',
    username: 'salii87',
    avatarUrl: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80',
    isOnline: true,
    studyDurationSeconds: 25555, // 07:05:55
    rank: 8,
    testsCount: 75,
  },
  {
    id: 'm_9',
    username: 'Negar1387',
    avatarUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
    isOnline: true,
    studyDurationSeconds: 25250, // 07:00:50
    rank: 9,
    testsCount: 90,
  },
  {
    id: 'm_10',
    username: 'Patroun_',
    avatarUrl: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150&auto=format&fit=crop&q=80',
    isOnline: true,
    studyDurationSeconds: 25218, // 07:00:18
    rank: 10,
    testsCount: 65,
  },
  {
    id: 'm_11',
    username: 'parmispey86',
    avatarUrl: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop&q=80',
    isOnline: true,
    studyDurationSeconds: 24643, // 06:50:43
    rank: 11,
    testsCount: 60,
  },
  {
    id: 'm_12',
    username: 'Fatemeh6',
    avatarUrl: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=150&auto=format&fit=crop&q=80',
    isOnline: true,
    studyDurationSeconds: 24063, // 06:41:03
    rank: 12,
    testsCount: 80,
  },
];

export const scheduleCategories: SchedulePresetCategory[] = [
  {
    id: 'cat_holiday',
    title: 'ویژه روز های تعطیل',
    subtitle: 'اگه روزی مدرسه یا کلاس نداری میتونی با این زمان بندی ها بخونی',
    iconType: 'holiday',
    badge: 'زمان بندی مطالعه',
    color: '#0284c7',
    bgGradient: 'from-sky-900/90 to-slate-900',
  },
  {
    id: 'cat_school',
    title: 'ویژه روز های مدرسه',
    subtitle: 'روز های مدرسه و یا روز های پر از کلاس میتونی با این زمان بندی ها بخونی',
    iconType: 'school',
    badge: 'زمان بندی مطالعه',
    color: '#d97706',
    bgGradient: 'from-amber-950/90 to-stone-900',
  },
  {
    id: 'cat_pms',
    title: 'ویژه دوران پریود، PMS، بیماری و ...',
    subtitle: 'اگه تو دوره بیماری یا در سیکل قاعدگی قرار داری میتونی با این زمان بندی ها بخونی',
    iconType: 'pms',
    badge: 'زمان بندی مطالعه',
    color: '#be123c',
    bgGradient: 'from-rose-950/90 to-zinc-900',
  },
  {
    id: 'cat_night',
    title: 'ویژه افراد شب خوان',
    subtitle: 'اگه میخوای شب ها بیشتر بخونی یا فقط شب تا صبح درس بخونی با این زمان بندی ها بخون',
    iconType: 'night',
    badge: 'زمان بندی مطالعه',
    color: '#4338ca',
    bgGradient: 'from-indigo-950/90 to-slate-950',
  },
  {
    id: 'cat_early',
    title: 'ویژه افراد سحرخیز',
    subtitle: 'اگه سحرخیزی و میتونی ۵ صبح بیدار شی با این زمان بندی ها بخون',
    iconType: 'early',
    badge: 'زمان بندی مطالعه',
    color: '#0f766e',
    bgGradient: 'from-teal-950/90 to-neutral-900',
  },
  {
    id: 'cat_late',
    title: 'با شروع بعد از ۱۰ صبح!',
    subtitle: 'اگه یه روز خواب موندی و دیر بیدار شدی با این زمان بندی ها بعد از ۱۰ صبح تازه شروع کن',
    iconType: 'late',
    badge: 'زمان بندی مطالعه',
    color: '#334155',
    bgGradient: 'from-slate-800 to-slate-950',
  },
];

export const holidayHourOptions = [
  { id: 'h_1', title: 'زمان بندی ۱ ویژه روز های تعطیل', targetHours: 13 },
  { id: 'h_2', title: 'زمان بندی ۲ ویژه روز های تعطیل', targetHours: 12 },
  { id: 'h_3', title: 'زمان بندی ۳ ویژه روز های تعطیل', targetHours: 11 },
  { id: 'h_4', title: 'زمان بندی ۴ ویژه روز های تعطیل', targetHours: 10 },
  { id: 'h_5', title: 'زمان بندی ۵ ویژه روز های تعطیل', targetHours: 9 },
  { id: 'h_6', title: 'زمان بندی ۶ ویژه روز های تعطیل', targetHours: 8 },
  { id: 'h_7', title: 'زمان بندی ۷ ویژه روز های تعطیل', targetHours: 7 },
  { id: 'h_8', title: 'زمان بندی ۸ ویژه روز های تعطیل', targetHours: 6 },
];

export const consultantsList: Consultant[] = [
  {
    id: 'c_1',
    name: 'آیدا بهادر',
    university: 'دانشگاه علوم پزشکی تهران',
    major: 'پزشکی',
    rankYear: 'رتبه ۱۲ کنکور تجربی',
    avatarUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80',
  },
  {
    id: 'c_2',
    name: 'ملینا نورصالحی',
    university: 'دانشگاه علوم پزشکی شهید بهشتی',
    major: 'دندانپزشکی',
    rankYear: 'رتبه ۲۸ کنکور تجربی',
    avatarUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
  },
  {
    id: 'c_3',
    name: 'نگاه آزادگان',
    university: 'دانشگاه تهران',
    major: 'روانشناسی و مشاوره تحصیلی',
    rankYear: 'مشاور ارشد هدف پلاس',
    avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
  },
  {
    id: 'c_4',
    name: 'طوبی عابدی',
    university: 'دانشگاه صنعتی شریف',
    major: 'مهندسی کامپیوتر',
    rankYear: 'رتبه ۱۵ کنکور ریاضی',
    avatarUrl: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop&q=80',
  },
];

export const acceptancesList: AcceptanceStory[] = [
  {
    id: 'acc_1',
    studentName: 'علی تاجیک',
    major: 'داروسازی',
    university: 'دانشگاه علوم پزشکی رشت',
    category: 'تجربی',
  },
  {
    id: 'acc_2',
    studentName: 'امیرمحمد رحمتی',
    major: 'پزشکی',
    university: 'دانشگاه علوم پزشکی ایران',
    category: 'تجربی',
  },
  {
    id: 'acc_3',
    studentName: 'زهرا خدامی',
    major: 'حقوق',
    university: 'دانشگاه تهران',
    category: 'انسانی',
  },
  {
    id: 'acc_4',
    studentName: 'نگین فعال عراقی نژاد',
    major: 'پزشکی',
    university: 'دانشگاه علوم پزشکی تبریز',
    category: 'تجربی',
  },
];
