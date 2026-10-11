import React, { useState } from 'react';
import {
  FileCode,
  FolderTree,
  Copy,
  Check,
  X,
  Layers,
  Sparkles,
  Download,
  Terminal,
  FolderArchive,
  Loader2,
} from 'lucide-react';
import {
  generateFlutterProjectZip,
  triggerFileDownload,
  formatBytes,
} from '../wordpress/zipGenerator';

interface FlutterCodeViewerProps {
  isOpen: boolean;
  onClose: () => void;
}

export const FlutterCodeViewer: React.FC<FlutterCodeViewerProps> = ({
  isOpen,
  onClose,
}) => {
  const [activeTab, setActiveTab] = useState<'structure' | 'pubspec' | 'riverpod_code'>('structure');
  const [copied, setCopied] = useState<string | null>(null);
  const [isDownloading, setIsDownloading] = useState(false);
  const [downloadMsg, setDownloadMsg] = useState<string | null>(null);

  const handleDownloadProjectZip = async () => {
    try {
      setIsDownloading(true);
      setDownloadMsg(null);
      const { blob, size } = await generateFlutterProjectZip();
      triggerFileDownload(blob, 'rahe-konkur-flutter-project.zip');
      setDownloadMsg(`پروژه فلاتر دانلود شد (${formatBytes(size)})`);
      setTimeout(() => setDownloadMsg(null), 4000);
    } catch (e) {
      console.error(e);
    } finally {
      setIsDownloading(false);
    }
  };

  if (!isOpen) return null;

  const handleCopy = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopied(key);
    setTimeout(() => setCopied(null), 2500);
  };

  const folderStructureText = `rahe_konkur/
├── pubspec.yaml
├── analysis_options.yaml
├── assets/
│   ├── fonts/
│   │   ├── Vazirmatn-Regular.ttf
│   │   ├── Vazirmatn-Medium.ttf
│   │   ├── Vazirmatn-Bold.ttf
│   │   └── Vazirmatn-Black.ttf
│   ├── icons/
│   │   ├── rahe_konkur_logo.svg        # 4x4 answer sheet matrix logo
│   │   ├── timer_dynamic.svg
│   │   └── podium_crown.svg
│   └── images/
│       ├── focus_matrix.svg
│       └── schedule_banners/
├── lib/
│   ├── main.dart
│   ├── app.dart
│   │
│   ├── core/
│   │   ├── constants/
│   │   │   ├── app_colors.dart         # #E83B67 (Rose), #0F172A (Deep Slate), #EFF3F1 (Canvas)
│   │   │   ├── app_dimensions.dart
│   │   │   └── app_typography.dart     # Persian Vazirmatn text styles
│   │   ├── network/
│   │   │   ├── api_client.dart
│   │   │   └── websocket_client.dart   # Live study room socket
│   │   ├── theme/
│   │   │   ├── app_theme.dart          # Light / Dark RTL themes
│   │   │   └── theme_provider.dart
│   │   └── utils/
│   │       ├── persian_number_formatter.dart  # 0-9 to ۰-۹
│   │       └── jalali_date_helper.dart        # Shamsi calendar strip
│   │
│   ├── features/
│   │   ├── auth/                       # [Screen 1: Onboarding Flow]
│   │   │   ├── models/
│   │   │   │   └── user_registration_model.dart
│   │   │   ├── providers/
│   │   │   │   └── auth_state_provider.dart
│   │   │   └── views/
│   │   │       ├── username_setup_screen.dart   # Screen A
│   │   │       └── grade_privacy_screen.dart    # Screen B (عمومی vs خصوصی)
│   │   │
│   │   ├── dashboard/                  # [Screen 2: Daily Study Tracker & Home]
│   │   │   ├── models/
│   │   │   │   ├── study_log_model.dart
│   │   │   │   └── daily_summary_model.dart
│   │   │   ├── providers/
│   │   │   │   └── daily_tracker_provider.dart
│   │   │   └── views/
│   │   │       ├── home_screen.dart
│   │   │       ├── daily_calendar_tracker_screen.dart  # Horizontal date strip & metrics
│   │   │       ├── add_study_report_modal.dart
│   │   │       └── widgets/
│   │   │           ├── metric_gradient_card.dart
│   │   │           └── horizontal_jalali_strip.dart
│   │   │
│   │   ├── timer/                      # [Screen 3: Minimalist Study Timer]
│   │   │   ├── models/
│   │   │   │   └── timer_session_model.dart
│   │   │   ├── providers/
│   │   │   │   └── study_timer_provider.dart    # StateNotifier: tick, pause, reset
│   │   │   └── views/
│   │   │       ├── minimal_study_timer_screen.dart
│   │   │       └── widgets/
│   │   │           ├── cute_study_blob_widget.dart
│   │   │           └── digital_clock_display.dart
│   │   │
│   │   ├── study_room/                 # [Screen 4: Virtual Study Rooms & Social Hub]
│   │   │   ├── models/
│   │   │   │   ├── study_room_model.dart
│   │   │   │   └── room_member_model.dart
│   │   │   ├── providers/
│   │   │   │   ├── active_room_provider.dart
│   │   │   │   └── leaderboard_provider.dart
│   │   │   └── views/
│   │   │       ├── study_room_hub_screen.dart   # Search & Featured room
│   │   │       ├── active_study_room_screen.dart # 3-segment tabs (اتاق، رتبه، جزئیات)
│   │   │       ├── leaderboard_podium_panel.dart # Dark Slate podium layout
│   │   │       └── user_profile_bottom_sheet.dart # Student stats modal
│   │   │
│   │   └── schedules/                  # [Screen 6: Preset Schedule Templates]
│   │       ├── models/
│   │       │   └── schedule_preset_model.dart
│   │       ├── providers/
│   │       │   └── schedule_selection_provider.dart
│   │       └── views/
│   │           ├── schedule_categories_screen.dart # 2-column cards grid
│   │           └── schedule_detail_picker_screen.dart # 6-13 hours routine cards
│   │
│   └── shared_widgets/
│       ├── custom_bottom_nav_bar.dart
│       ├── custom_app_bar.dart
│       └── persian_text.dart`;

  const pubspecText = `name: rahe_konkur
description: "اپلیکیشن اختصاصی مطالعه دانش‌آموزی و سالن مطالعه آنلاین ره کنکور"
publish_to: 'none'
version: 1.0.0+1

environment:
  sdk: '>=3.3.0 <4.0.0'
  flutter: '>=3.19.0'

dependencies:
  flutter:
    sdk: flutter
  flutter_localizations:
    sdk: flutter

  # State Management & Dependency Injection
  flutter_riverpod: ^2.5.1
  riverpod_annotation: ^2.3.5

  # UI, Icons, Typography & Animations
  flutter_svg: ^2.0.10+1
  google_fonts: ^6.2.1
  lucide_icons: ^0.254.0
  shamsi_date: ^1.0.3          # Shamsi (Jalali) Iranian calendar
  cached_network_image: ^3.3.1
  intl: ^0.19.0
  animate_do: ^3.3.4           # Subtle spring & fade transitions
  flutter_staggered_grid_view: ^0.7.0

  # Sound & Haptics for Study Timer
  audioplayers: ^6.0.0
  vibration: ^2.0.1

  # Local Persistence & Storage
  hive_flutter: ^1.1.0
  shared_preferences: ^2.2.3

  # Networking & Realtime Room
  dio: ^5.4.3+1
  web_socket_channel: ^2.4.5

dev_dependencies:
  flutter_test:
    sdk: flutter
  flutter_lints: ^3.0.0
  build_runner: ^2.4.9
  riverpod_generator: ^2.4.0

flutter:
  uses-material-design: true
  generate: true

  assets:
    - assets/images/
    - assets/icons/

  fonts:
    - family: Vazirmatn
      fonts:
        - asset: assets/fonts/Vazirmatn-Regular.ttf
          weight: 400
        - asset: assets/fonts/Vazirmatn-Medium.ttf
          weight: 500
        - asset: assets/fonts/Vazirmatn-Bold.ttf
          weight: 700
        - asset: assets/fonts/Vazirmatn-Black.ttf
          weight: 900`;

  const riverpodCodeText = `// lib/features/timer/providers/study_timer_provider.dart
import 'dart:async';
import 'package:flutter_riverpod/flutter_riverpod.dart';

class TimerState {
  final int elapsedSeconds;
  final bool isRunning;
  final bool isPomodoro;
  final int pomodoroRemainingSeconds;

  const TimerState({
    required this.elapsedSeconds,
    required this.isRunning,
    this.isPomodoro = false,
    this.pomodoroRemainingSeconds = 25 * 60,
  });

  TimerState copyWith({
    int? elapsedSeconds,
    bool? isRunning,
    bool? isPomodoro,
    int? pomodoroRemainingSeconds,
  }) {
    return TimerState(
      elapsedSeconds: elapsedSeconds ?? this.elapsedSeconds,
      isRunning: isRunning ?? this.isRunning,
      isPomodoro: isPomodoro ?? this.isPomodoro,
      pomodoroRemainingSeconds: pomodoroRemainingSeconds ?? this.pomodoroRemainingSeconds,
    );
  }
}

class StudyTimerNotifier extends StateNotifier<TimerState> {
  Timer? _ticker;

  StudyTimerNotifier() : super(const TimerState(elapsedSeconds: 6, isRunning: false));

  void start() {
    if (state.isRunning) return;
    state = state.copyWith(isRunning: true);
    _ticker = Timer.periodic(const Duration(seconds: 1), (_) {
      if (state.isPomodoro) {
        if (state.pomodoroRemainingSeconds > 0) {
          state = state.copyWith(pomodoroRemainingSeconds: state.pomodoroRemainingSeconds - 1);
        } else {
          stop();
        }
      } else {
        state = state.copyWith(elapsedSeconds: state.elapsedSeconds + 1);
      }
    });
  }

  void pause() {
    _ticker?.cancel();
    state = state.copyWith(isRunning: false);
  }

  void reset() {
    _ticker?.cancel();
    state = state.copyWith(
      isRunning: false,
      elapsedSeconds: 0,
      pomodoroRemainingSeconds: 25 * 60,
    );
  }

  @override
  void dispose() {
    _ticker?.cancel();
    super.dispose();
  }
}

final studyTimerProvider = StateNotifierProvider<StudyTimerNotifier, TimerState>((ref) {
  return StudyTimerNotifier();
});`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-3 sm:p-6 text-slate-100">
      <div className="w-full max-w-4xl max-h-[90vh] bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl flex flex-col overflow-hidden animate-in zoom-in-95 duration-150">
        {/* Header */}
        <div className="p-4 sm:p-5 bg-slate-950 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-indigo-600/20 text-indigo-400 border border-indigo-500/30 flex items-center justify-center">
              <FolderTree className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-sm sm:text-base font-bold text-white flex items-center gap-2">
                <span>معماری و کد منبع پروژه Flutter (Riverpod)</span>
                <span className="text-xs bg-orange-500/20 text-orange-400 border border-orange-500/30 px-2 py-0.5 rounded-full font-mono">
                  Dart 3.3+
                </span>
              </h2>
              <p className="text-xs text-slate-400">
                پروژه سازمان‌یافته با Clean Architecture و Feature-First
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              disabled={isDownloading}
              onClick={handleDownloadProjectZip}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-[#E83B67] hover:bg-rose-600 text-white rounded-xl text-xs font-bold transition-all disabled:opacity-70 shadow-sm"
            >
              {isDownloading ? (
                <>
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                  <span>در حال فشرده‌سازی...</span>
                </>
              ) : (
                <>
                  <FolderArchive className="w-3.5 h-3.5" />
                  <span>دانلود کل پروژه Flutter (ZIP)</span>
                </>
              )}
            </button>

            <button
              type="button"
              onClick={onClose}
              className="p-2 text-slate-400 hover:text-white rounded-xl hover:bg-slate-800"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {downloadMsg && (
          <div className="bg-emerald-950/80 border-b border-emerald-800/80 px-4 py-2 text-xs text-emerald-300 flex items-center justify-between">
            <span>{downloadMsg}</span>
            <button
              type="button"
              onClick={() => setDownloadMsg(null)}
              className="text-emerald-400 hover:text-emerald-200"
            >
              ×
            </button>
          </div>
        )}

        {/* Tab Navigation */}
        <div className="flex items-center gap-2 px-5 pt-3 bg-slate-950/60 border-b border-slate-800 text-xs">
          <button
            type="button"
            onClick={() => setActiveTab('structure')}
            className={`pb-3 px-3 font-semibold transition-all border-b-2 flex items-center gap-2 ${
              activeTab === 'structure'
                ? 'border-orange-500 text-orange-400'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <FolderTree className="w-4 h-4" />
            <span>ساختار پوشه‌ها (Folder Architecture)</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('pubspec')}
            className={`pb-3 px-3 font-semibold transition-all border-b-2 flex items-center gap-2 ${
              activeTab === 'pubspec'
                ? 'border-orange-500 text-orange-400'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <Terminal className="w-4 h-4" />
            <span>pubspec.yaml</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('riverpod_code')}
            className={`pb-3 px-3 font-semibold transition-all border-b-2 flex items-center gap-2 ${
              activeTab === 'riverpod_code'
                ? 'border-orange-500 text-orange-400'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <FileCode className="w-4 h-4" />
            <span>نمونه کد Riverpod State</span>
          </button>
        </div>

        {/* Code Content */}
        <div className="flex-1 p-5 overflow-y-auto bg-slate-950/90 font-mono text-xs text-slate-300 relative">
          {activeTab === 'structure' && (
            <div>
              <div className="flex justify-between items-center mb-3">
                <span className="text-slate-400 text-[11px]">
                  ساختار پیشنهادی تمیز بر اساس اصول رسمی Flutter و Riverpod 2.x
                </span>
                <button
                  type="button"
                  onClick={() => handleCopy(folderStructureText, 'structure')}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 text-slate-200 hover:bg-slate-700 text-xs font-sans transition-colors"
                >
                  {copied === 'structure' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copied === 'structure' ? 'کپی شد!' : 'کپی ساختار'}</span>
                </button>
              </div>
              <pre className="text-emerald-400 whitespace-pre font-mono text-xs leading-relaxed bg-slate-900 p-4 rounded-2xl border border-slate-800 overflow-x-auto dir-ltr">
                {folderStructureText}
              </pre>
            </div>
          )}

          {activeTab === 'pubspec' && (
            <div>
              <div className="flex justify-between items-center mb-3">
                <span className="text-slate-400 text-[11px]">
                  پکیج‌های کامل شامل Riverpod، تقویم جلالی (shamsi_date)، SVG و Vazirmatn
                </span>
                <button
                  type="button"
                  onClick={() => handleCopy(pubspecText, 'pubspec')}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 text-slate-200 hover:bg-slate-700 text-xs font-sans transition-colors"
                >
                  {copied === 'pubspec' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copied === 'pubspec' ? 'کپی شد!' : 'کپی pubspec.yaml'}</span>
                </button>
              </div>
              <pre className="text-amber-300 whitespace-pre font-mono text-xs leading-relaxed bg-slate-900 p-4 rounded-2xl border border-slate-800 overflow-x-auto dir-ltr">
                {pubspecText}
              </pre>
            </div>
          )}

          {activeTab === 'riverpod_code' && (
            <div>
              <div className="flex justify-between items-center mb-3">
                <span className="text-slate-400 text-[11px]">
                  StateNotifier برای مدیریت تایمر مطالعه و حالت پومودورو
                </span>
                <button
                  type="button"
                  onClick={() => handleCopy(riverpodCodeText, 'riverpod')}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 text-slate-200 hover:bg-slate-700 text-xs font-sans transition-colors"
                >
                  {copied === 'riverpod' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copied === 'riverpod' ? 'کپی شد!' : 'کپی کد'}</span>
                </button>
              </div>
              <pre className="text-sky-300 whitespace-pre font-mono text-xs leading-relaxed bg-slate-900 p-4 rounded-2xl border border-slate-800 overflow-x-auto dir-ltr">
                {riverpodCodeText}
              </pre>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
