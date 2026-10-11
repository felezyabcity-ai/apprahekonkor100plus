import React, { useState } from 'react';
import { ChevronRight, Check, Eye, Lock, ChevronDown, X } from 'lucide-react';
import { RaheKonkurLogo } from '../../components/RaheKonkurLogo';

interface OnboardingModalProps {
  isOpen: boolean;
  onClose: () => void;
  onComplete: (username: string, grade: string, isPrivate: boolean) => void;
}

export const OnboardingModal: React.FC<OnboardingModalProps> = ({
  isOpen,
  onClose,
  onComplete,
}) => {
  const [step, setStep] = useState<'stepA' | 'stepB'>('stepA');
  const [username, setUsername] = useState('amir4849');
  const [grade, setGrade] = useState('دوازدهم تجربی');
  const [isPrivate, setIsPrivate] = useState<boolean>(false);

  if (!isOpen) return null;

  const isValidUsername =
    username.length >= 3 && /^[a-zA-Z0-9_]+$/.test(username);

  const handleStepAContinue = (e: React.FormEvent) => {
    e.preventDefault();
    if (isValidUsername) {
      setStep('stepB');
    }
  };

  const handleFinish = (e: React.FormEvent) => {
    e.preventDefault();
    onComplete(username, grade, isPrivate);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-xs p-3">
      <div className="w-full max-w-sm bg-slate-900 rounded-[36px] overflow-hidden shadow-2xl flex flex-col border border-slate-800 animate-in zoom-in-95 duration-200">
        {/* Top App Branding Bar */}
        <div className="pt-6 pb-4 px-6 flex flex-col items-center justify-center relative">
          <button
            type="button"
            onClick={onClose}
            className="absolute top-4 left-4 p-1.5 text-slate-400 hover:text-white rounded-full"
            title="بستن"
          >
            <X className="w-4 h-4" />
          </button>

          {/* Rahe Konkur Logo */}
          <RaheKonkurLogo size={60} className="rounded-2xl shadow-lg mb-2" />
          <span className="text-white font-black text-sm tracking-wide">
            ره کنکور (Rahe Konkur)
          </span>

          {/* Stepper Dots Indicator */}
          <div className="flex items-center gap-1.5 mt-3">
            <div
              className={`h-1 rounded-full transition-all ${
                step === 'stepA' ? 'w-8 bg-[#E83B67]' : 'w-4 bg-[#E83B67]'
              }`}
            />
            <div
              className={`h-1 rounded-full transition-all ${
                step === 'stepB' ? 'w-8 bg-[#E83B67]' : 'w-4 bg-slate-600'
              }`}
            />
            <div className="w-4 h-1 rounded-full bg-slate-700" />
          </div>
        </div>

        {/* White Rounded Container Sheet matching screenshots */}
        <div className="bg-white rounded-t-[32px] p-6 text-slate-800 flex-1">
          {step === 'stepA' ? (
            /* Screen A: ایجاد نام کاربری */
            <form onSubmit={handleStepAContinue} className="space-y-4">
              <div className="flex items-center gap-1 text-slate-800 font-bold text-sm">
                <ChevronRight className="w-4 h-4 text-slate-600" />
                <h2>ایجاد نام کاربری</h2>
              </div>

              <div className="space-y-1">
                <label className="block text-xs font-semibold text-slate-700">
                  نام کاربری مورد نظر خود را وارد کنید
                </label>
                <p className="text-[10px] text-slate-400 leading-relaxed">
                  نام کاربری شما باید شامل ۳ تا ۱۶ کاراکتر (حداقل ۱ حرف) باشد. تنها حروف انگلیسی (کوچک و بزرگ)، اعداد و _ (underscore) مجاز هستند.
                </p>
              </div>

              {/* Input with live validation checkmark */}
              <div className="relative pt-2">
                <input
                  type="text"
                  required
                  dir="ltr"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full px-4 py-3 rounded-2xl border-2 border-orange-400 text-sm font-mono font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-orange-500/30 pl-11"
                  placeholder="e.g. amir4849"
                />
                {isValidUsername && (
                  <div className="absolute left-3.5 top-1/2 -translate-y-1/2 pt-2">
                    <div className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center">
                      <Check className="w-3.5 h-3.5 stroke-[3]" />
                    </div>
                  </div>
                )}
              </div>

              <div className="pt-4">
                <button
                  type="submit"
                  disabled={!isValidUsername}
                  className="w-full py-3.5 rounded-2xl bg-[#E83B67] hover:bg-rose-600 disabled:opacity-50 text-white font-bold text-xs shadow-md shadow-rose-500/25 active:scale-[0.98] transition-all"
                >
                  ادامه
                </button>
              </div>
            </form>
          ) : (
            /* Screen B: ورود اطلاعات & حریم خصوصی */
            <form onSubmit={handleFinish} className="space-y-4">
              <div className="flex items-center gap-1 text-slate-800 font-bold text-sm">
                <ChevronRight className="w-4 h-4 text-slate-600" />
                <h2>ورود اطلاعات</h2>
              </div>

              <p className="text-[11px] text-slate-500 leading-normal">
                لطفا پایه و رشته (در صورت نیاز) خود را در این قسمت مشخص کنید
              </p>

              {/* Grade Dropdown */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  پایه
                </label>
                <div className="relative">
                  <select
                    value={grade}
                    onChange={(e) => setGrade(e.target.value)}
                    className="w-full appearance-none px-4 py-2.5 rounded-2xl border border-slate-200 text-xs font-medium text-slate-800 bg-white focus:outline-none focus:border-rose-500"
                  >
                    <option value="دوازدهم تجربی">پایه دوازدهم تجربی</option>
                    <option value="دوازدهم ریاضی">پایه دوازدهم ریاضی</option>
                    <option value="دوازدهم انسانی">پایه دوازدهم انسانی</option>
                    <option value="یازدهم تجربی">پایه یازدهم تجربی</option>
                    <option value="یازدهم ریاضی">پایه یازدهم ریاضی</option>
                    <option value="فارغ التحصیل / پشت کنکور">فارغ التحصیل / پشت کنکور</option>
                  </select>
                  <ChevronDown className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                </div>
              </div>

              {/* Privacy Radio Cards */}
              <div className="space-y-2 pt-1">
                <span className="block text-xs font-bold text-slate-700">
                  حریم خصوصی حساب کاربری
                </span>

                {/* Option 1: عمومی */}
                <div
                  onClick={() => setIsPrivate(false)}
                  className={`p-3 rounded-2xl border-2 transition-all cursor-pointer flex items-start gap-3 ${
                    !isPrivate
                      ? 'border-[#E83B67] bg-rose-50/40'
                      : 'border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <div
                    className={`w-5 h-5 rounded-full border-2 flex items-center justify-center mt-0.5 ${
                      !isPrivate
                        ? 'border-[#E83B67] bg-white'
                        : 'border-slate-300'
                    }`}
                  >
                    {!isPrivate && (
                      <div className="w-2.5 h-2.5 rounded-full bg-[#E83B67]" />
                    )}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-[#E83B67]">
                        عمومی
                      </span>
                      <div className="w-7 h-7 rounded-xl bg-rose-100/70 text-[#E83B67] flex items-center justify-center">
                        <Eye className="w-3.5 h-3.5" />
                      </div>
                    </div>
                    <p className="text-[10px] text-slate-500 mt-1 leading-relaxed">
                      همه کاربران می‌توانند آمار مطالعه و اتاق‌های شما را مشاهده کنند
                    </p>
                  </div>
                </div>

                {/* Option 2: خصوصی */}
                <div
                  onClick={() => setIsPrivate(true)}
                  className={`p-3 rounded-2xl border-2 transition-all cursor-pointer flex items-start gap-3 ${
                    isPrivate
                      ? 'border-[#E83B67] bg-rose-50/40'
                      : 'border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <div
                    className={`w-5 h-5 rounded-full border-2 flex items-center justify-center mt-0.5 ${
                      isPrivate
                        ? 'border-[#E83B67] bg-white'
                        : 'border-slate-300'
                    }`}
                  >
                    {isPrivate && (
                      <div className="w-2.5 h-2.5 rounded-full bg-[#E83B67]" />
                    )}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-slate-700">
                        خصوصی
                      </span>
                      <div className="w-7 h-7 rounded-xl bg-slate-100 text-slate-500 flex items-center justify-center">
                        <Lock className="w-3.5 h-3.5" />
                      </div>
                    </div>
                    <p className="text-[10px] text-slate-500 mt-1 leading-relaxed">
                      تنها کاربرانی که تأیید می‌کنید امکان مشاهده فعالیت‌های شما را دارند
                    </p>
                  </div>
                </div>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-3.5 rounded-2xl bg-[#E83B67] hover:bg-rose-600 text-white font-bold text-xs shadow-md shadow-rose-500/25 active:scale-[0.98] transition-all"
                >
                  ثبت نام در ره کنکور
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
