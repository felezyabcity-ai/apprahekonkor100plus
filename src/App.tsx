import React, { useState } from 'react';
import { MainTabType, StudyRoom } from './types';
import { PhoneFrame } from './components/PhoneFrame';
import { BottomNavBar } from './components/BottomNavBar';
import { HomeScreen } from './features/home/HomeScreen';
import { DailyTrackerScreen } from './features/dashboard/DailyTrackerScreen';
import { AddReportModal } from './features/dashboard/AddReportModal';
import { MinimalStudyTimer } from './features/timer/MinimalStudyTimer';
import { StudyRoomHubScreen } from './features/study_room/StudyRoomHubScreen';
import { ActiveStudyRoomScreen } from './features/study_room/ActiveStudyRoomScreen';
import { StudySchedulesScreen } from './features/schedules/StudySchedulesScreen';
import { CounselingScreen } from './features/counseling/CounselingScreen';
import { WidgetsScreen } from './features/widgets/WidgetsScreen';
import { OnboardingModal } from './features/auth/OnboardingModal';
import { FlutterCodeViewer } from './features/flutter_code/FlutterCodeViewer';
import { WordPressPluginModal } from './features/wordpress/WordPressPluginModal';
import { officialStudyRoom, roomMembersList } from './mock/mockData';
import { UserPlus, Sparkles, Download } from 'lucide-react';

export default function App() {
  const [currentTab, setCurrentTab] = useState<MainTabType>('calendar'); // Defaults to daily tracker matching screenshot 1
  const [activeSubView, setActiveSubView] = useState<'main' | 'timer' | 'schedules' | 'room_active'>('main');
  const [activeRoom, setActiveRoom] = useState<StudyRoom>(officialStudyRoom);

  // Modals
  const [isAddReportOpen, setIsAddReportOpen] = useState(false);
  const [isOnboardingOpen, setIsOnboardingOpen] = useState(false);
  const [isFlutterCodeOpen, setIsFlutterCodeOpen] = useState(false);
  const [isWordPressModalOpen, setIsWordPressModalOpen] = useState(false);

  // User state
  const [username, setUsername] = useState('amir4849');
  const [grade, setGrade] = useState('دوازدهم تجربی');
  const [isPrivate, setIsPrivate] = useState(false);

  const handleTabChange = (tab: MainTabType) => {
    setCurrentTab(tab);
    setActiveSubView('main');
  };

  const handleSelectRoom = (room: StudyRoom) => {
    setActiveRoom(room);
    setActiveSubView('room_active');
  };

  const handleSaveReport = (report: any) => {
    // Report saved
  };

  const handleOnboardingComplete = (newUsername: string, newGrade: string, newIsPrivate: boolean) => {
    setUsername(newUsername);
    setGrade(newGrade);
    setIsPrivate(newIsPrivate);
  };

  // Render view depending on subview or tab
  const renderContent = () => {
    if (activeSubView === 'timer') {
      return (
        <MinimalStudyTimer
          onBack={() => setActiveSubView('main')}
          onFinishStudy={(sec) => {
            setActiveSubView('main');
            setCurrentTab('calendar');
          }}
        />
      );
    }

    if (activeSubView === 'schedules') {
      return (
        <StudySchedulesScreen
          onBack={() => setActiveSubView('main')}
          onApplySchedule={(category, hours) => {
            // Apply schedule
          }}
        />
      );
    }

    if (activeSubView === 'room_active') {
      return (
        <ActiveStudyRoomScreen
          room={activeRoom}
          members={roomMembersList}
          onBack={() => setActiveSubView('main')}
          onStartStudy={() => setActiveSubView('timer')}
        />
      );
    }

    switch (currentTab) {
      case 'home':
        return (
          <HomeScreen
            userName="امیر مرادی"
            onOpenTimer={() => setActiveSubView('timer')}
            onOpenSchedules={() => setActiveSubView('schedules')}
            onOpenCounseling={() => setCurrentTab('counseling')}
            onOpenStudyRoom={() => {
              setCurrentTab('study_room');
              setActiveSubView('main');
            }}
            onOpenCalendar={() => setCurrentTab('calendar')}
            onOpenDownload={() => setIsWordPressModalOpen(true)}
          />
        );
      case 'calendar':
        return (
          <DailyTrackerScreen
            onOpenAddReport={() => setIsAddReportOpen(true)}
            onOpenSchedules={() => setActiveSubView('schedules')}
            onOpenTimer={() => setActiveSubView('timer')}
            onOpenDownload={() => setIsWordPressModalOpen(true)}
          />
        );
      case 'study_room':
        return (
          <StudyRoomHubScreen
            onSelectRoom={handleSelectRoom}
          />
        );
      case 'counseling':
        return <CounselingScreen />;
      case 'widgets':
        return <WidgetsScreen onOpenDownload={() => setIsWordPressModalOpen(true)} />;
      default:
        return (
          <DailyTrackerScreen
            onOpenAddReport={() => setIsAddReportOpen(true)}
            onOpenSchedules={() => setActiveSubView('schedules')}
            onOpenTimer={() => setActiveSubView('timer')}
            onOpenDownload={() => setIsWordPressModalOpen(true)}
          />
        );
    }
  };

  return (
    <PhoneFrame
      onOpenCodeInspector={() => setIsFlutterCodeOpen(true)}
      isCodeInspectorOpen={isFlutterCodeOpen}
      onOpenWordPressModal={() => setIsWordPressModalOpen(true)}
      isWordPressModalOpen={isWordPressModalOpen}
    >
      {/* Top floating test pill */}
      <div className="px-4 pt-2 pb-1 flex items-center justify-between text-[11px] bg-slate-100/70 border-b border-slate-200/60">
        <span className="text-slate-500 font-medium truncate">
          کاربر فعال: <strong className="text-slate-800 font-mono">@{username}</strong> ({grade})
        </span>
        <div className="flex items-center gap-1.5">
          <button
            type="button"
            onClick={() => setIsWordPressModalOpen(true)}
            className="flex items-center gap-1 text-[#E83B67] hover:text-rose-700 font-bold bg-rose-50 px-2 py-0.5 rounded-lg border border-rose-200/80"
            title="دانلود فایل اپلیکیشن و افزونه وردپرس"
          >
            <Download className="w-3 h-3" />
            <span>دانلود اپ / افزونه</span>
          </button>
          <button
            type="button"
            onClick={() => setIsOnboardingOpen(true)}
            className="flex items-center gap-1 text-slate-700 hover:text-slate-900 font-bold bg-white px-2 py-0.5 rounded-lg border border-slate-200"
          >
            <UserPlus className="w-3 h-3" />
            <span>آنبوردینگ</span>
          </button>
        </div>
      </div>

      {/* Main View Area */}
      <div className="flex-1 flex flex-col relative overflow-hidden">
        {renderContent()}
      </div>

      {/* Persistent Floating Mobile Download FAB (Always accessible on phone screen) */}
      {activeSubView !== 'timer' && (
        <button
          type="button"
          onClick={() => setIsWordPressModalOpen(true)}
          className="absolute bottom-18 left-3 z-30 flex items-center gap-1.5 bg-gradient-to-r from-emerald-600 to-[#E83B67] hover:brightness-110 active:scale-95 text-white px-3.5 py-2 rounded-2xl shadow-xl shadow-black/30 text-xs font-bold transition-all border border-white/20 group"
          title="دانلود مستقیم فایل APK و اپلیکیشن موبایل"
        >
          <div className="w-5 h-5 rounded-lg bg-white/20 flex items-center justify-center">
            <Download className="w-3.5 h-3.5 text-white" />
          </div>
          <span className="flex items-center gap-1">
            <span>دانلود مستقیم فایل APK</span>
            <span className="text-[10px] bg-white/20 px-1 rounded-sm font-mono">اندروید</span>
          </span>
        </button>
      )}

      {/* Bottom Navigation (Only visible when not in standalone distraction-free timer) */}
      {activeSubView !== 'timer' && (
        <BottomNavBar
          currentTab={currentTab}
          onTabChange={handleTabChange}
        />
      )}

      {/* Add Report Modal */}
      <AddReportModal
        isOpen={isAddReportOpen}
        onClose={() => setIsAddReportOpen(false)}
        onSave={handleSaveReport}
      />

      {/* Onboarding Flow Screen A & B Modal */}
      <OnboardingModal
        isOpen={isOnboardingOpen}
        onClose={() => setIsOnboardingOpen(false)}
        onComplete={handleOnboardingComplete}
      />

      {/* Flutter Architecture & Code Inspector Drawer */}
      <FlutterCodeViewer
        isOpen={isFlutterCodeOpen}
        onClose={() => setIsFlutterCodeOpen(false)}
      />

      {/* WordPress Plugin & App Download Modal */}
      <WordPressPluginModal
        isOpen={isWordPressModalOpen}
        onClose={() => setIsWordPressModalOpen(false)}
      />
    </PhoneFrame>
  );
}
