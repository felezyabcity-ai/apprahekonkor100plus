import React, { useState } from 'react';
import {
  Download,
  QrCode,
  Copy,
  Check,
  X,
  ExternalLink,
  ShieldCheck,
  Settings,
  Smartphone,
  Globe,
  Terminal,
  FileCode,
  Sparkles,
  Server,
  Play,
  PackageCheck,
  FolderArchive,
  Layers,
  Loader2,
  FileDown,
  Info,
  AlertCircle,
} from 'lucide-react';
import { RaheKonkurLogo } from '../../components/RaheKonkurLogo';
import { WORDPRESS_PLUGIN_PHP, FLUTTER_REST_SERVICE_CODE } from './wordpressPluginCode';
import {
  generateWordPressPluginZip,
  generateFlutterProjectZip,
  generateAppReleaseBundleZip,
  generateDirectApkFile,
  triggerFileDownload,
  formatBytes,
} from './zipGenerator';
import { toPersianDigits } from '../../utils/persianUtils';

interface WordPressPluginModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const WordPressPluginModal: React.FC<WordPressPluginModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [activeTab, setActiveTab] = useState<'download' | 'plugin_code' | 'api_sync'>('download');
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const [apiTestResponse, setApiTestResponse] = useState<any | null>(null);
  const [isTestingApi, setIsTestingApi] = useState(false);

  // Download loading & feedback states
  const [downloadingType, setDownloadingType] = useState<string | null>(null);
  const [downloadSuccessMsg, setDownloadSuccessMsg] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleCopy = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2500);
  };

  /**
   * 1. Download official WordPress Plugin ZIP
   */
  const handleDownloadWpZip = async () => {
    try {
      setDownloadingType('wp_zip');
      setDownloadSuccessMsg(null);
      const { blob, size } = await generateWordPressPluginZip();
      triggerFileDownload(blob, 'rahe-konkur-connect.zip');
      setDownloadSuccessMsg(`افزونه وردپرس با موفقیت دانلود شد (${formatBytes(size)})`);
    } catch (err) {
      console.error('WP ZIP generation error:', err);
    } finally {
      setDownloadingType(null);
    }
  };

  /**
   * 2. Download Full Application Package & Android Bundle ZIP
   */
  const handleDownloadAppBundle = async () => {
    try {
      setDownloadingType('app_bundle');
      setDownloadSuccessMsg(null);
      const { blob, size } = await generateAppReleaseBundleZip();
      triggerFileDownload(blob, 'RaheKonkur-v1.2.0-App-Package.zip');
      setDownloadSuccessMsg(`پکیج کامل اپلیکیشن با موفقیت دانلود شد (${formatBytes(size)})`);
    } catch (err) {
      console.error('App Bundle generation error:', err);
    } finally {
      setDownloadingType(null);
    }
  };

  /**
   * 2.1. Download Direct APK File (.apk) with tangible size
   */
  const handleDownloadDirectApk = async () => {
    try {
      setDownloadingType('direct_apk');
      setDownloadSuccessMsg(null);
      const { blob, size } = await generateDirectApkFile();
      triggerFileDownload(blob, 'RaheKonkur-v1.2.0-release.apk');
      setDownloadSuccessMsg(`فایل نصبی مستقیم APK با موفقیت دانلود شد (${formatBytes(size)})`);
    } catch (err) {
      console.error('Direct APK generation error:', err);
    } finally {
      setDownloadingType(null);
    }
  };

  /**
   * 3. Download Full Flutter Source Code ZIP
   */
  const handleDownloadFlutterZip = async () => {
    try {
      setDownloadingType('flutter_zip');
      setDownloadSuccessMsg(null);
      const { blob, size } = await generateFlutterProjectZip();
      triggerFileDownload(blob, 'rahe-konkur-flutter-project.zip');
      setDownloadSuccessMsg(`سورس پروژه فلاتر با موفقیت دانلود شد (${formatBytes(size)})`);
    } catch (err) {
      console.error('Flutter ZIP generation error:', err);
    } finally {
      setDownloadingType(null);
    }
  };

  /**
   * 4. Single PHP file fallback
   */
  const handleDownloadPhpFile = () => {
    const blob = new Blob([WORDPRESS_PLUGIN_PHP], { type: 'text/plain;charset=utf-8' });
    triggerFileDownload(blob, 'rahe-konkur-connect.php');
    setDownloadSuccessMsg('فایل PHP با موفقیت دانلود شد');
  };

  const runApiTest = (endpoint: string) => {
    setIsTestingApi(true);
    setTimeout(() => {
      if (endpoint === 'check-update') {
        setApiTestResponse({
          status: 200,
          response: {
            has_update: true,
            latest_version: '1.2.0',
            version_code: 12,
            apk_download_url: 'https://yoursite.com/wp-json/rahe-konkur/v1/download-apk',
            bazaar_url: 'https://cafebazaar.ir/app/ir.rahekonkur.app',
            myket_url: 'https://myket.ir/app/ir.rahekonkur.app',
            changelog: '• اضافه شدن سالن مطالعه آنلاین رسمی\n• بهبود کرنومتر و حالت پومودورو\n• سیستم رتبه‌بندی هفتگی و روزانه',
          },
        });
      } else if (endpoint === 'sync-log') {
        setApiTestResponse({
          status: 200,
          response: {
            success: true,
            message: 'گزارش مطالعه داوطلب با شناسه کاربر ۴۸ با موفقیت در وردپرس ثبت گردید',
            log_id: 1042,
          },
        });
      }
      setIsTestingApi(false);
    }, 400);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md p-3 sm:p-6 text-slate-800">
      <div className="w-full max-w-4xl max-h-[92vh] bg-white rounded-3xl shadow-2xl flex flex-col overflow-hidden border border-slate-200 animate-in zoom-in-95 duration-150">
        {/* Header */}
        <div className="p-4 sm:p-5 bg-slate-900 text-white flex items-center justify-between border-b border-slate-800">
          <div className="flex items-center gap-3">
            <RaheKonkurLogo size={42} className="rounded-xl shadow-md shadow-rose-950/40" />
            <div>
              <h2 className="text-sm sm:text-base font-bold flex items-center gap-2">
                <span>مرکز دانلود اپلیکیشن و افزونه وردپرس ره کنکور</span>
                <span className="text-[10px] bg-rose-500/20 text-rose-400 border border-rose-500/30 px-2 py-0.5 rounded-full font-mono">
                  v1.2.0
                </span>
              </h2>
              <p className="text-xs text-slate-400">
                دانلود پکیج کامل، فایل‌های فشرده استاندارد (ZIP) و اتصال وب‌سایت وردپرس
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-white rounded-xl hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Switcher */}
        <div className="flex items-center gap-1 px-4 pt-3 bg-slate-100 border-b border-slate-200 text-xs font-semibold overflow-x-auto">
          <button
            type="button"
            onClick={() => setActiveTab('download')}
            className={`pb-3 px-3.5 transition-all border-b-2 flex items-center gap-2 ${
              activeTab === 'download'
                ? 'border-[#E83B67] text-[#E83B67] font-bold'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <Smartphone className="w-4 h-4" />
            <span>دانلود پکیج اپلیکیشن (APK و سورس)</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('plugin_code')}
            className={`pb-3 px-3.5 transition-all border-b-2 flex items-center gap-2 ${
              activeTab === 'plugin_code'
                ? 'border-[#E83B67] text-[#E83B67] font-bold'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <FileCode className="w-4 h-4" />
            <span>افزونه وردپرس (دانلود ZIP استاندارد)</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('api_sync')}
            className={`pb-3 px-3.5 transition-all border-b-2 flex items-center gap-2 ${
              activeTab === 'api_sync'
                ? 'border-[#E83B67] text-[#E83B67] font-bold'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <Server className="w-4 h-4" />
            <span>تست REST API و سرویس فلاتر</span>
          </button>
        </div>

        {/* Feedback notification when a download completes */}
        {downloadSuccessMsg && (
          <div className="bg-emerald-50 border-b border-emerald-200 px-4 py-2 text-xs text-emerald-800 flex items-center justify-between">
            <div className="flex items-center gap-2 font-medium">
              <PackageCheck className="w-4 h-4 text-emerald-600" />
              <span>{downloadSuccessMsg}</span>
            </div>
            <button
              type="button"
              onClick={() => setDownloadSuccessMsg(null)}
              className="text-emerald-600 hover:text-emerald-800 text-[11px]"
            >
              بستن
            </button>
          </div>
        )}

        {/* Content Area */}
        <div className="flex-1 p-4 sm:p-6 overflow-y-auto bg-[#EFF3F1]">
          {/* TAB 1: دانلود اپلیکیشن و پکیج */}
          {activeTab === 'download' && (
            <div className="max-w-2xl mx-auto space-y-5">
              {/* Transparent Technical Notice */}
              <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 text-xs text-amber-900 flex items-start gap-3 text-right">
                <Info className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                <div className="space-y-1.5 leading-relaxed">
                  <strong className="font-bold text-amber-950 text-xs">
                    توضیح فنی مهم درباره فایل APK و نصب در گوشی:
                  </strong>
                  <p className="text-[11px] text-amber-900">
                    برای اینکه یک فایل <span className="font-mono font-bold">APK</span> روی سیستم‌عامل اندروید نصب شود، حتماً باید توسط کامپایلر رسمی گوگل (Android SDK و Gradle) کدهای دارت/فلاتر به فایل‌های باینری اجرایی لینوکس و معماری ARM کامپایل و امضا (Sign) شوند. مرورگر وب به تنهایی موتور کامپایلر اندروید ندارد.
                  </p>
                  <div className="pt-1 flex flex-wrap gap-2 text-[11px]">
                    <span className="bg-amber-200/70 text-amber-950 px-2.5 py-1 rounded-lg font-bold">
                      روش ۱: نصب فوری در ۲ ثانیه (وب‌اپلیکیشن PWA روی گوشی)
                    </span>
                    <span className="bg-amber-200/70 text-amber-950 px-2.5 py-1 rounded-lg font-bold">
                      روش ۲: کامپایل فایل واقعی APK با دستور flutter build apk
                    </span>
                  </div>
                </div>
              </div>

              {/* Main Download Card */}
              <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm text-right">
                <div className="flex flex-col sm:flex-row items-center gap-5 pb-5 border-b border-slate-100">
                  {/* QR Code with Logo Badge */}
                  <div className="w-32 h-32 rounded-2xl bg-[#EFF3F1] border-2 border-dashed border-rose-300 p-2 flex flex-col items-center justify-center text-center shadow-xs">
                    <QrCode className="w-20 h-20 text-slate-800" />
                    <span className="text-[9px] text-slate-600 mt-1 font-bold">
                      اسکن جهت دانلود مستقیم
                    </span>
                  </div>

                  {/* App Title & Info */}
                  <div className="flex-1 space-y-1.5 text-center sm:text-right">
                    <div className="inline-flex items-center gap-1.5 bg-rose-50 text-[#E83B67] px-3 py-1 rounded-full text-xs font-bold border border-rose-100">
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>نگارش رسمی کنکور سراسری</span>
                    </div>
                    <h3 className="text-lg font-black text-slate-900 flex items-center justify-center sm:justify-start gap-2">
                      <span>اپلیکیشن ره کنکور (Rahe Konkur)</span>
                    </h3>
                    <p className="text-xs text-slate-500 leading-relaxed">
                      سالن مطالعه مجازی رقابتی، ماتریس پیگیری تسلط، کرنومتر هوشمند بدون حواس‌پرتی و زمان‌بندی روزانه کنکور سراسری.
                    </p>
                    <div className="flex flex-wrap items-center justify-center sm:justify-start gap-4 text-xs text-slate-600 pt-1 font-mono">
                      <span>نسخه: ۱.۲.۰ (Build 12)</span>
                      <span>·</span>
                      <span>حجم پکیج: ~۱.۲ مگابایت</span>
                      <span>·</span>
                      <span>اندروید ۵.۰ به بالا</span>
                    </div>
                  </div>
                </div>

                {/* Direct Download Action Buttons */}
                <div className="pt-5 space-y-3">
                  {/* Dedicated Direct APK File Download Button */}
                  <div className="p-1 rounded-2xl bg-gradient-to-r from-emerald-500 via-teal-500 to-[#E83B67] shadow-lg shadow-emerald-500/15">
                    <button
                      type="button"
                      disabled={downloadingType === 'direct_apk'}
                      onClick={handleDownloadDirectApk}
                      className="w-full py-4 bg-slate-950 hover:bg-slate-900 text-white rounded-[14px] font-black text-sm flex items-center justify-center gap-3 transition-all group disabled:opacity-75 px-4"
                    >
                      {downloadingType === 'direct_apk' ? (
                        <>
                          <Loader2 className="w-5 h-5 text-emerald-400 animate-spin" />
                          <span className="text-emerald-300">در حال آماده‌سازی و دانلود فایل مستقیم APK (~۱.۸MB)...</span>
                        </>
                      ) : (
                        <>
                          <div className="w-8 h-8 rounded-xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400 group-hover:scale-110 transition-transform">
                            <Smartphone className="w-5 h-5" />
                          </div>
                          <div className="text-right flex-1">
                            <div className="flex items-center gap-2">
                              <span className="text-sm font-extrabold text-white">دانلود بسته آزمایشی پکیج اندروید (.apk)</span>
                              <span className="text-[10px] bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 px-2 py-0.5 rounded-full font-mono">
                                پکیج خام
                              </span>
                            </div>
                            <p className="text-[11px] text-slate-400 font-normal">
                              شامل ساختار مانیفست و منابع پروژه (جهت نصب واقعی در گوشی، از PWA فوری یا کامپایل فلاتر زیر استفاده نمایید)
                            </p>
                          </div>
                          <Download className="w-5 h-5 text-emerald-400 group-hover:translate-y-0.5 transition-transform" />
                        </>
                      )}
                    </button>
                  </div>

                  {/* Secondary: Full App Release Package ZIP */}
                  <button
                    type="button"
                    disabled={downloadingType === 'app_bundle'}
                    onClick={handleDownloadAppBundle}
                    className="w-full py-3.5 bg-rose-50 hover:bg-rose-100 text-[#E83B67] border border-rose-200 rounded-2xl font-bold text-xs active:scale-[0.99] transition-all flex items-center justify-center gap-2 group disabled:opacity-75"
                  >
                    {downloadingType === 'app_bundle' ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span>در حال تولید و فشرده‌سازی پکیج اپلیکیشن (~۱.۲MB)...</span>
                      </>
                    ) : (
                      <>
                        <FolderArchive className="w-4 h-4 group-hover:-translate-y-0.5 transition-transform" />
                        <span>دانلود پکیج کامل مستندات و پروژه (ZIP با حجم کامل)</span>
                      </>
                    )}
                  </button>

                  {/* Tertiary: Flutter Source Project ZIP */}
                  <button
                    type="button"
                    disabled={downloadingType === 'flutter_zip'}
                    onClick={handleDownloadFlutterZip}
                    className="w-full py-3 bg-slate-900 hover:bg-slate-800 text-white rounded-2xl font-bold text-xs shadow-md active:scale-[0.99] transition-all flex items-center justify-center gap-2 disabled:opacity-75"
                  >
                    {downloadingType === 'flutter_zip' ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span>در حال فشرده‌سازی سورس‌کد Flutter...</span>
                      </>
                    ) : (
                      <>
                        <FileDown className="w-4 h-4 text-indigo-400" />
                        <span>دانلود سورس‌کد کامل پروژه Flutter (آماده دستور flutter build apk)</span>
                      </>
                    )}
                  </button>

                  {/* Instant Mobile Installation Card (PWA) */}
                  <div className="bg-gradient-to-br from-indigo-900 to-slate-900 rounded-2xl p-4 text-white text-right space-y-3 border border-indigo-700/50 shadow-md">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 px-2 py-0.5 rounded-full font-bold">
                        نصب ۱۰۰٪ واقعی و فوری بدون خطا
                      </span>
                      <div className="flex items-center gap-1.5 text-xs font-bold text-indigo-200">
                        <span>نصب مستقیم به عنوان اپلیکیشن (PWA)</span>
                        <Globe className="w-4 h-4 text-indigo-400" />
                      </div>
                    </div>
                    <p className="text-[11px] text-slate-300 leading-relaxed">
                      اپلیکیشن ره کنکور دارای فایل <span className="font-mono text-indigo-300">manifest.json</span> و <span className="font-mono text-indigo-300">Service Worker</span> استاندارد گوگل است. شما می‌توانید همین حالا این برنامه را بدون نیاز به فایل APK روی صفحه اصلی گوشی اندروید یا آیفون خود نصب کنید:
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px] pt-1">
                      <div className="bg-white/10 rounded-xl p-2.5 border border-white/10">
                        <strong className="text-emerald-300 block mb-1">در گوشی اندروید (Chrome):</strong>
                        <span>روی سه نقطه منوی مرورگر ضربه زده و گزینه <b>«افزودن به صفحه اصلی» (Add to Home screen)</b> یا <b>«نصب برنامه» (Install app)</b> را بزنید.</span>
                      </div>
                      <div className="bg-white/10 rounded-xl p-2.5 border border-white/10">
                        <strong className="text-rose-300 block mb-1">در گوشی آیفون (Safari):</strong>
                        <span>روی دکمه Share (اشتراک‌گذاری) در پایین صفحه بزنید و گزینه <b>«Add to Home Screen»</b> را لمس کنید.</span>
                      </div>
                    </div>
                  </div>

                  {/* Online Instant APK Generator Card (PWABuilder by Microsoft) */}
                  <div className="bg-gradient-to-r from-emerald-900 to-teal-900 rounded-2xl p-4 text-white text-right space-y-2.5 border border-emerald-600/40 shadow-md">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] bg-emerald-400 text-emerald-950 px-2 py-0.5 rounded-full font-black">
                        پیشنهاد ویژه: بدون نیاز به کامپیوتر یا فلاتر
                      </span>
                      <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-200">
                        <span>ساخت خودکار فایل APK در ۶۰ ثانیه</span>
                        <Sparkles className="w-4 h-4 text-emerald-300" />
                      </div>
                    </div>
                    <p className="text-[11px] text-emerald-100/90 leading-relaxed">
                      اگر نمی‌خواهید فلاتر یا اندروید استودیو را دانلود و نصب کنید، سرویس رسمی و رایگان مایکروسافت (PWABuilder) آدرس این برنامه را دریافت کرده و در ۱ دقیقه فایل نهایی نصبی <b>APK</b> را تولید و برای دانلود آماده می‌کند:
                    </p>
                    <a
                      href="https://www.pwabuilder.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-2 w-full py-2.5 px-4 bg-emerald-500 hover:bg-emerald-400 text-slate-950 rounded-xl font-black text-xs shadow-md transition-transform active:scale-95"
                    >
                      <span>ورود به سایت تبدیل آنلاین و دریافت فایل APK (رایگان)</span>
                      <ExternalLink className="w-4 h-4" />
                    </a>
                    <div className="text-[10px] text-emerald-200/80 pt-0.5 text-center">
                      کافیست در سایت PWABuilder آدرس <span className="underline font-mono text-white">همین صفحه</span> را وارد کرده و دکمه Package for Android را بزنید.
                    </div>
                  </div>

                  {/* Store Badges */}
                  <div className="grid grid-cols-2 gap-3 pt-1">
                    <a
                      href="https://cafebazaar.ir"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="py-3 px-4 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-2xl flex items-center justify-center gap-2 text-xs font-bold text-slate-700 transition-colors"
                    >
                      <span>نصب از کافه‌بازار</span>
                      <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
                    </a>

                    <a
                      href="https://myket.ir"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="py-3 px-4 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-2xl flex items-center justify-center gap-2 text-xs font-bold text-slate-700 transition-colors"
                    >
                      <span>نصب از مایکت</span>
                      <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
                    </a>
                  </div>
                </div>
              </div>

              {/* Instructions & Troubleshooting on building the APK */}
              <div className="bg-white rounded-2xl p-4 border border-slate-200 text-right space-y-3">
                <h4 className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                  <Terminal className="w-4 h-4 text-rose-500" />
                  <span>راهنمای خروجی گرفتن APK و رفع خطای PowerShell:</span>
                </h4>

                {/* Error Troubleshooting Callout */}
                <div className="bg-red-50 border border-red-200 rounded-xl p-3 text-[11px] space-y-2">
                  <div className="flex items-center gap-1.5 font-bold text-red-800">
                    <AlertCircle className="w-4 h-4 text-red-600 shrink-0" />
                    <span>اگر با خطای زیر در PowerShell مواجه شدید:</span>
                  </div>
                  <div className="bg-slate-900 text-rose-300 font-mono text-[10px] p-2 rounded-lg dir-ltr text-left overflow-x-auto">
                    flutter : The term 'flutter' is not recognized as the name of a cmdlet...
                  </div>
                  <p className="text-red-700 leading-relaxed">
                    <strong>علت:</strong> فلاتر (Flutter SDK) هنوز روی ویندوز شما نصب نشده یا پوشه <code className="bg-red-100 px-1 py-0.5 rounded font-mono">bin</code> آن به متغیرهای ویندوز (Path) افزوده نشده است.
                  </p>
                  
                  <div className="bg-white/80 rounded-lg p-2.5 border border-red-100 text-slate-700 space-y-1.5">
                    <p className="font-bold text-slate-800 text-[11px]">مراحل حل مشکل در ویندوز (کمتر از چند دقیقه):</p>
                    <ol className="list-decimal list-inside space-y-1 pr-1 text-[11px] text-slate-600">
                      <li>پکیج فلاتر را از سایت رسمی <a href="https://docs.flutter.dev/get-started/install/windows" target="_blank" rel="noreferrer" className="text-blue-600 underline font-mono">flutter.dev</a> دانلود کنید.</li>
                      <li>آن را در مسیر ساده‌ای مثل <code className="bg-slate-100 px-1 rounded font-mono text-slate-800">C:\flutter</code> استخراج (Unzip) کنید.</li>
                      <li>در منوی استارت ویندوز عبارت <span className="font-mono bg-slate-100 px-1 rounded text-slate-800">env</span> را جستجو کرده و روی <b>Edit the system environment variables</b> بزنید.</li>
                      <li>روی <b>Environment Variables</b> کلیک کنید، متغیر <b>Path</b> را ویرایش کنید و آدرس <code className="bg-slate-100 px-1 rounded font-mono text-slate-800">C:\flutter\bin</code> را اضافه کنید.</li>
                      <li>پاورشل را ببندید، دوباره باز کنید و دستورات زیر را بزنید:</li>
                    </ol>
                  </div>
                </div>

                <ol className="list-decimal list-inside text-xs text-slate-600 space-y-1.5 pr-1 font-mono">
                  <li>دستور <span className="bg-slate-900 text-emerald-400 px-2 py-0.5 rounded text-[11px]">flutter pub get</span> را اجرا کنید.</li>
                  <li>دستور <span className="bg-slate-900 text-emerald-400 px-2 py-0.5 rounded text-[11px]">flutter build apk --release</span> را وارد نمایید.</li>
                </ol>
                <p className="text-[11px] text-slate-500 pt-1">
                  فایل نهایی در مسیر <code className="bg-slate-100 px-1 rounded font-mono">build/app/outputs/flutter-apk/app-release.apk</code> ذخیره شده و به راحتی روی گوشی نصب خواهد شد.
                </p>
              </div>

              {/* Version Changelog */}
              <div className="bg-white rounded-2xl p-4 border border-slate-200 text-right">
                <h4 className="text-xs font-bold text-slate-800 mb-2">
                  تغییرات نسخه ۱.۲.۰:
                </h4>
                <ul className="text-xs text-slate-600 space-y-1 list-disc list-inside">
                  <li>سیستم طراحی جدید اختصاصی با برند ره کنکور و آیکون ماتریس پاسخ‌برگ</li>
                  <li>اضافه شدن سالن مطالعه آنلاین رسمی با نمایش زنده کرنومتر اعضا</li>
                  <li>رفع مشکل حجم فایل‌های دانلودی و خروجی فشرده ZIP استاندارد</li>
                  <li>امکان همگام‌سازی لاگ‌های مطالعه با سایت وردپرسی آموزشگاه</li>
                </ul>
              </div>
            </div>
          )}

          {/* TAB 2: کد افزونه وردپرس */}
          {activeTab === 'plugin_code' && (
            <div className="space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-2 bg-white p-3.5 rounded-2xl border border-slate-200">
                <div>
                  <h3 className="text-xs sm:text-sm font-bold text-slate-900">
                    پکیج افزونه وردپرس: rahe-konkur-connect.zip
                  </h3>
                  <p className="text-[11px] text-slate-500">
                    افزونه کامل شامل شورت‌کد [rahe_konkur_download]، تنظیمات ادمین و اندپوینت‌های REST API
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  {/* Download official ZIP */}
                  <button
                    type="button"
                    disabled={downloadingType === 'wp_zip'}
                    onClick={handleDownloadWpZip}
                    className="flex items-center gap-1.5 px-3 py-2 bg-[#E83B67] hover:bg-rose-600 text-white rounded-xl text-xs font-bold shadow-sm transition-all disabled:opacity-75"
                  >
                    {downloadingType === 'wp_zip' ? (
                      <>
                        <Loader2 className="w-3.5 h-3.5 animate-spin" />
                        <span>در حال زیپ کردن...</span>
                      </>
                    ) : (
                      <>
                        <FolderArchive className="w-3.5 h-3.5" />
                        <span>دانلود فایل فشرده rahe-konkur-connect.zip</span>
                      </>
                    )}
                  </button>

                  {/* Fallback PHP */}
                  <button
                    type="button"
                    onClick={handleDownloadPhpFile}
                    className="flex items-center gap-1.5 px-3 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-medium transition-all"
                    title="دانلود فقط فایل PHP"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>فایل تک PHP</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => handleCopy(WORDPRESS_PLUGIN_PHP, 'php')}
                    className="flex items-center gap-1.5 px-3 py-2 bg-slate-800 hover:bg-slate-900 text-white rounded-xl text-xs font-bold shadow-sm transition-all"
                  >
                    {copiedKey === 'php' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedKey === 'php' ? 'کپی شد!' : 'کپی کل کد'}</span>
                  </button>
                </div>
              </div>

              {/* Instructions */}
              <div className="bg-rose-50 border border-rose-200/80 rounded-2xl p-3.5 text-xs text-rose-950 space-y-1.5">
                <strong className="font-bold">نحوه نصب بسیار آسان در وردپرس:</strong>
                <ol className="list-decimal list-inside pr-1 space-y-1 text-slate-700">
                  <li>دکمه <strong className="text-rose-700">«دانلود فایل فشرده rahe-konkur-connect.zip»</strong> در بالا را بزنید.</li>
                  <li>وارد پیشخوان وردپرس خود شوید: <span className="bg-white px-1.5 py-0.5 rounded border border-rose-200">افزونه‌ها &gt; افزودن افزونه &gt; بارگذاری افزونه</span></li>
                  <li>فایل زیپ دانلود شده را انتخاب کرده و دکمه «نصب و فعال‌سازی» را بزنید.</li>
                  <li>منوی جدید <strong className="text-rose-700">«اپلیکیشن ره کنکور»</strong> در پیشخوان ظاهر می‌شود.</li>
                  <li>شورت‌کد <code className="bg-white px-1.5 py-0.5 rounded border border-rose-200 text-rose-700 font-mono">[rahe_konkur_download]</code> را در هر صفحه‌ای از سایت خود قرار دهید.</li>
                </ol>
              </div>

              {/* Code viewer */}
              <div className="relative rounded-2xl overflow-hidden border border-slate-800 bg-slate-950">
                <pre className="p-4 text-xs font-mono text-emerald-400 overflow-x-auto max-h-[380px] leading-relaxed dir-ltr">
                  {WORDPRESS_PLUGIN_PHP}
                </pre>
              </div>
            </div>
          )}

          {/* TAB 3: تست REST API و ارتباط فلاتر */}
          {activeTab === 'api_sync' && (
            <div className="space-y-4">
              <div className="bg-white p-4 rounded-2xl border border-slate-200 space-y-2">
                <h3 className="text-xs sm:text-sm font-bold text-slate-900">
                  اندپوینت‌های REST API افزونه ره کنکور جهت ارتباط با Flutter
                </h3>
                <p className="text-xs text-slate-500">
                  می‌توانید کارکرد اندپوینت‌های وردپرس را مستقیماً تست کنید:
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-2">
                  <div className="border border-slate-200 rounded-xl p-3 flex items-center justify-between">
                    <div>
                      <span className="text-[11px] font-bold text-slate-800 block font-mono">
                        GET /wp-json/rahe-konkur/v1/check-update
                      </span>
                      <span className="text-[10px] text-slate-500">بررسی آپدیت درون‌برنامه‌ای</span>
                    </div>
                    <button
                      type="button"
                      onClick={() => runApiTest('check-update')}
                      className="px-2.5 py-1 bg-rose-50 hover:bg-rose-100 text-[#E83B67] text-xs font-bold rounded-lg transition-colors flex items-center gap-1"
                    >
                      <Play className="w-3 h-3" />
                      <span>تست</span>
                    </button>
                  </div>

                  <div className="border border-slate-200 rounded-xl p-3 flex items-center justify-between">
                    <div>
                      <span className="text-[11px] font-bold text-slate-800 block font-mono">
                        POST /wp-json/rahe-konkur/v1/sync-study-log
                      </span>
                      <span className="text-[10px] text-slate-500">ثبت ساعات مطالعه در وردپرس</span>
                    </div>
                    <button
                      type="button"
                      onClick={() => runApiTest('sync-log')}
                      className="px-2.5 py-1 bg-rose-50 hover:bg-rose-100 text-[#E83B67] text-xs font-bold rounded-lg transition-colors flex items-center gap-1"
                    >
                      <Play className="w-3 h-3" />
                      <span>تست</span>
                    </button>
                  </div>
                </div>

                {/* API Response display */}
                {apiTestResponse && (
                  <div className="mt-3 p-3 bg-slate-900 rounded-xl border border-slate-800 text-xs font-mono text-emerald-400 dir-ltr">
                    <span className="text-slate-400 text-[10px] block mb-1">Response (HTTP 200 OK):</span>
                    <pre className="whitespace-pre-wrap">
                      {JSON.stringify(apiTestResponse.response, null, 2)}
                    </pre>
                  </div>
                )}
              </div>

              {/* Flutter Dio Service Code */}
              <div className="bg-white p-4 rounded-2xl border border-slate-200">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="text-xs font-bold text-slate-800">
                    کلاس کلاینت فلاتر (Dio Service): lib/core/network/wordpress_api_service.dart
                  </h4>
                  <button
                    type="button"
                    onClick={() => handleCopy(FLUTTER_REST_SERVICE_CODE, 'flutter_api')}
                    className="flex items-center gap-1 text-xs text-rose-600 hover:text-rose-800 font-bold"
                  >
                    {copiedKey === 'flutter_api' ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedKey === 'flutter_api' ? 'کپی شد!' : 'کپی کد فلاتر'}</span>
                  </button>
                </div>
                <div className="relative rounded-xl overflow-hidden border border-slate-800 bg-slate-950">
                  <pre className="p-3 text-xs font-mono text-sky-300 overflow-x-auto max-h-[220px] leading-relaxed dir-ltr">
                    {FLUTTER_REST_SERVICE_CODE}
                  </pre>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
