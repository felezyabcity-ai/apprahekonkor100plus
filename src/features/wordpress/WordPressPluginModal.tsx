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
} from 'lucide-react';
import { RaheKonkurLogo } from '../../components/RaheKonkurLogo';
import { WORDPRESS_PLUGIN_PHP, FLUTTER_REST_SERVICE_CODE } from './wordpressPluginCode';
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

  if (!isOpen) return null;

  const handleCopy = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2500);
  };

  const handleDownloadPhpFile = () => {
    const blob = new Blob([WORDPRESS_PLUGIN_PHP], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'rahe-konkur-connect.php';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleDownloadApk = () => {
    const demoContent = 'Rahe Konkur Mobile App APK Release Package v1.2.0';
    const blob = new Blob([demoContent], { type: 'application/vnd.android.package-archive' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'RaheKonkur-v1.2.0.apk';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
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
            apk_download_url: 'https://yoursite.com/wp-json/hadaf-plus/v1/download-apk',
            bazaar_url: 'https://cafebazaar.ir/app/ir.hadafplus.app',
            myket_url: 'https://myket.ir/app/ir.hadafplus.app',
            changelog: '• اضافه شدن سالن مطالعه آنلاین رسمی\n• بهبود کرنومتر و حالت پومودورو',
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
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-3 sm:p-6 text-slate-800">
      <div className="w-full max-w-4xl max-h-[92vh] bg-white rounded-3xl shadow-2xl flex flex-col overflow-hidden border border-slate-200 animate-in zoom-in-95 duration-150">
        {/* Header */}
        <div className="p-4 sm:p-5 bg-slate-900 text-white flex items-center justify-between border-b border-slate-800">
          <div className="flex items-center gap-3">
            <RaheKonkurLogo size={40} className="rounded-xl shadow-md shadow-rose-950/40" />
            <div>
              <h2 className="text-sm sm:text-base font-bold flex items-center gap-2">
                <span>دانلود اپلیکیشن و افزونه وردپرس ره کنکور</span>
                <span className="text-[10px] bg-rose-500/20 text-rose-400 border border-rose-500/30 px-2 py-0.5 rounded-full font-mono">
                  v1.2.0
                </span>
              </h2>
              <p className="text-xs text-slate-400">
                اتصال وب‌سایت وردپرس به اپلیکیشن، مدیریت نسخه‌ها و دانلود مستقیم APK
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
            <span>دانلود اپلیکیشن (صفحه دانلود)</span>
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
            <span>کد افزونه وردپرس (PHP)</span>
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

        {/* Content Area */}
        <div className="flex-1 p-4 sm:p-6 overflow-y-auto bg-[#EFF3F1]">
          {/* TAB 1: دانلود اپلیکیشن و لندینگ دانلود */}
          {activeTab === 'download' && (
            <div className="max-w-2xl mx-auto space-y-5">
              {/* Main Download Card */}
              <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm text-right">
                <div className="flex flex-col sm:flex-row items-center gap-5 pb-5 border-b border-slate-100">
                  {/* QR Code with Logo Badge */}
                  <div className="w-32 h-32 rounded-2xl bg-[#EFF3F1] border-2 border-dashed border-rose-300 p-2 flex flex-col items-center justify-center text-center shadow-xs">
                    <QrCode className="w-20 h-20 text-slate-800" />
                    <span className="text-[9px] text-slate-600 mt-1 font-bold">
                      اسکن جهت دانلود فوری
                    </span>
                  </div>

                  {/* App Title & Info */}
                  <div className="flex-1 space-y-1.5 text-center sm:text-right">
                    <div className="inline-flex items-center gap-1.5 bg-rose-50 text-[#E83B67] px-3 py-1 rounded-full text-xs font-bold border border-rose-100">
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>جدیدترین نسخه رسمی منتشر شده</span>
                    </div>
                    <h3 className="text-lg font-black text-slate-900 flex items-center justify-center sm:justify-start gap-2">
                      <span>اپلیکیشن ره کنکور (Rahe Konkur)</span>
                    </h3>
                    <p className="text-xs text-slate-500 leading-relaxed">
                      سالن مطالعه مجازی رقابتی، ماتریس پیگیری تسلط، کرنومتر هوشمند بدون حواس‌پرتی و زمان‌بندی روزانه کنکور سراسری.
                    </p>
                    <div className="flex flex-wrap items-center justify-center sm:justify-start gap-4 text-xs text-slate-600 pt-1 font-mono">
                      <span>نسخه: ۱.۲.۰</span>
                      <span>·</span>
                      <span>حجم: ۲۴ مگابایت</span>
                      <span>·</span>
                      <span>اندروید ۸.۰ به بالا</span>
                    </div>
                  </div>
                </div>

                {/* Direct Download Action Button */}
                <div className="pt-5 space-y-3">
                  <button
                    type="button"
                    onClick={handleDownloadApk}
                    className="w-full py-4 bg-[#E83B67] hover:bg-rose-600 text-white rounded-2xl font-bold text-sm shadow-lg shadow-rose-500/25 active:scale-[0.99] transition-all flex items-center justify-center gap-2 group"
                  >
                    <Download className="w-5 h-5 group-hover:-translate-y-0.5 transition-transform" />
                    <span>دانلود مستقیم فایل اپلیکیشن ره کنکور (APK)</span>
                  </button>

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

                  {/* Web / iOS Version */}
                  <div className="text-center pt-2">
                    <a
                      href="#"
                      onClick={(e) => {
                        e.preventDefault();
                        onClose();
                      }}
                      className="text-xs font-bold text-indigo-600 hover:text-indigo-800 transition-colors inline-flex items-center gap-1"
                    >
                      <Globe className="w-3.5 h-3.5" />
                      <span>ورود به وب‌اپلیکیشن (PWA برای آیفون / iOS بدون نیاز به نصب)</span>
                    </a>
                  </div>
                </div>
              </div>

              {/* Version Changelog */}
              <div className="bg-white rounded-2xl p-4 border border-slate-200 text-right">
                <h4 className="text-xs font-bold text-slate-800 mb-2">
                  تغییرات نسخه ۱.۲.۰:
                </h4>
                <ul className="text-xs text-slate-600 space-y-1 list-disc list-inside">
                  <li>اضافه شدن سالن مطالعه آنلاین رسمی با نمایش زنده کرنومتر اعضا</li>
                  <li>بهبود کاراکتر کارتونی تایمر و قابلیت زمان‌بندی پومودورو ۲۵ دقیقه‌ای</li>
                  <li>امکان همگام‌سازی لاگ‌های مطالعه با سایت وردپرسی آموزشگاه</li>
                  <li>رفع اشکالات جزئی و افزایش سرعت ذخیره‌سازی آفلاین</li>
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
                    فایل افزونه: hadaf-plus-connect.php
                  </h3>
                  <p className="text-[11px] text-slate-500">
                    افزونه کامل شامل شورت‌کد [hadaf_plus_download]، تنظیمات ادمین و اندپوینت‌های REST API
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={handleDownloadPhpFile}
                    className="flex items-center gap-1.5 px-3 py-1.5 bg-orange-500 hover:bg-orange-600 text-white rounded-xl text-xs font-bold shadow-sm transition-all"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>دانلود فایل hadaf-plus-connect.php</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => handleCopy(WORDPRESS_PLUGIN_PHP, 'php')}
                    className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-800 hover:bg-slate-900 text-white rounded-xl text-xs font-bold shadow-sm transition-all"
                  >
                    {copiedKey === 'php' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedKey === 'php' ? 'کپی شد!' : 'کپی کل کد'}</span>
                  </button>
                </div>
              </div>

              {/* Instructions */}
              <div className="bg-amber-50 border border-amber-200/80 rounded-2xl p-3 text-xs text-amber-900 space-y-1">
                <strong>راهنمای نصب در وردپرس:</strong>
                <ol className="list-decimal list-inside pr-1 space-y-0.5">
                  <li>فایل <code className="bg-white px-1 rounded">hadaf-plus-connect.php</code> را دانلود کنید.</li>
                  <li>آن را در پوشه <code className="bg-white px-1 rounded">wp-content/plugins/hadaf-plus-connect/</code> هاست خود قرار دهید یا زیپ کرده و از منوی افزونه‌ها بارگذاری نمایید.</li>
                  <li>افزونه را فعال کنید. منوی جدید «اپلیکیشن هدف پلاس» در پیشخوان ظاهر می‌شود.</li>
                  <li>از شورت‌کد <code className="bg-white px-1 rounded">[hadaf_plus_download]</code> در برگه دانلود اپلیکیشن سایت خود استفاده کنید.</li>
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
                  اندپوینت‌های REST API افزونه جهت ارتباط با Flutter
                </h3>
                <p className="text-xs text-slate-500">
                  می‌توانید کارکرد اندپوینت‌های وردپرس را مستقیماً تست کنید:
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-2">
                  <div className="border border-slate-200 rounded-xl p-3 flex items-center justify-between">
                    <div>
                      <span className="text-[11px] font-bold text-slate-800 block">
                        GET /wp-json/hadaf-plus/v1/check-update
                      </span>
                      <span className="text-[10px] text-slate-500">بررسی آپدیت درون‌برنامه‌ای</span>
                    </div>
                    <button
                      type="button"
                      onClick={() => runApiTest('check-update')}
                      className="px-2.5 py-1 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 text-xs font-bold rounded-lg transition-colors flex items-center gap-1"
                    >
                      <Play className="w-3 h-3" />
                      <span>تست</span>
                    </button>
                  </div>

                  <div className="border border-slate-200 rounded-xl p-3 flex items-center justify-between">
                    <div>
                      <span className="text-[11px] font-bold text-slate-800 block">
                        POST /wp-json/hadaf-plus/v1/sync-study-log
                      </span>
                      <span className="text-[10px] text-slate-500">ثبت ساعات مطالعه در وردپرس</span>
                    </div>
                    <button
                      type="button"
                      onClick={() => runApiTest('sync-log')}
                      className="px-2.5 py-1 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 text-xs font-bold rounded-lg transition-colors flex items-center gap-1"
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
                    className="flex items-center gap-1 text-xs text-indigo-600 hover:text-indigo-800 font-bold"
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
