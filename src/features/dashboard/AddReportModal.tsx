import React, { useState } from 'react';
import { X, BookOpen, Clock, CheckCircle, Save } from 'lucide-react';
import { toPersianDigits } from '../../utils/persianUtils';

interface AddReportModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (report: {
    title: string;
    category: string;
    hours: number;
    minutes: number;
    testCount: number;
    notes: string;
  }) => void;
}

export const AddReportModal: React.FC<AddReportModalProps> = ({
  isOpen,
  onClose,
  onSave,
}) => {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('زیست شناسی');
  const [hours, setHours] = useState(2);
  const [minutes, setMinutes] = useState(0);
  const [testCount, setTestCount] = useState(25);
  const [notes, setNotes] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;
    onSave({
      title,
      category,
      hours,
      minutes,
      testCount,
      notes: notes || 'توضیحات اضافه نشده',
    });
    setTitle('');
    onClose();
  };

  const categories = [
    'زیست شناسی',
    'شیمی',
    'ریاضیات',
    'فیزیک',
    'ادبیات و فارسی',
    'عربی و زبان قرآن',
    'دین و زندگی',
    'زبان انگلیسی',
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/60 backdrop-blur-xs p-0 sm:p-4">
      <div className="w-full max-w-md bg-white rounded-t-3xl sm:rounded-3xl p-5 shadow-2xl animate-in slide-in-from-bottom-6 duration-200">
        {/* Modal Header */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-orange-100 text-[#FF7A30] flex items-center justify-center">
              <BookOpen className="w-4 h-4" />
            </div>
            <h3 className="text-sm font-bold text-slate-800">ثبت گزارش مطالعه جدید</h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="mt-4 space-y-3.5">
          {/* Lesson Title */}
          <div>
            <label className="block text-xs font-medium text-slate-700 mb-1">
              عنوان درس / مبحث
            </label>
            <input
              type="text"
              required
              placeholder="مثال: فصل ۲ - گوارش و جذب مواد"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs text-slate-800 focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500"
            />
          </div>

          {/* Subject Category */}
          <div>
            <label className="block text-xs font-medium text-slate-700 mb-1">
              درس
            </label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs text-slate-800 focus:outline-none focus:border-orange-500 bg-white"
            >
              {categories.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>

          {/* Study Duration */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-medium text-slate-700 mb-1">
                ساعت مطالعه
              </label>
              <div className="flex items-center border border-slate-200 rounded-xl px-3 py-1.5">
                <input
                  type="number"
                  min="0"
                  max="24"
                  value={hours}
                  onChange={(e) => setHours(Number(e.target.value))}
                  className="w-full text-xs font-mono font-bold text-center text-slate-800 outline-none"
                />
                <span className="text-[11px] text-slate-400 mr-1">ساعت</span>
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-700 mb-1">
                دقیقه
              </label>
              <div className="flex items-center border border-slate-200 rounded-xl px-3 py-1.5">
                <input
                  type="number"
                  min="0"
                  max="59"
                  step="5"
                  value={minutes}
                  onChange={(e) => setMinutes(Number(e.target.value))}
                  className="w-full text-xs font-mono font-bold text-center text-slate-800 outline-none"
                />
                <span className="text-[11px] text-slate-400 mr-1">دقیقه</span>
              </div>
            </div>
          </div>

          {/* Test count */}
          <div>
            <label className="block text-xs font-medium text-slate-700 mb-1">
              تعداد تست حل شده
            </label>
            <div className="flex items-center border border-slate-200 rounded-xl px-3 py-1.5">
              <input
                type="number"
                min="0"
                value={testCount}
                onChange={(e) => setTestCount(Number(e.target.value))}
                className="w-full text-xs font-mono font-bold text-center text-slate-800 outline-none"
              />
              <span className="text-[11px] text-slate-400 mr-1">تست</span>
            </div>
          </div>

          {/* Notes */}
          <div>
            <label className="block text-xs font-medium text-slate-700 mb-1">
              یادداشت یا توضیحات (اختیاری)
            </label>
            <textarea
              rows={2}
              placeholder="نکات مطالعه، درصد تست، خلاصه نویسی..."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs text-slate-800 focus:outline-none focus:border-orange-500"
            />
          </div>

          {/* Submit */}
          <div className="pt-2 flex items-center gap-2">
            <button
              type="submit"
              className="flex-1 py-3 bg-[#E83B67] hover:bg-rose-600 text-white rounded-xl text-xs font-bold shadow-md shadow-rose-500/25 active:scale-[0.98] transition-all flex items-center justify-center gap-1.5"
            >
              <Save className="w-4 h-4" />
              <span>ذخیره گزارش در ره کنکور</span>
            </button>
            <button
              type="button"
              onClick={onClose}
              className="py-3 px-4 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-semibold"
            >
              انصراف
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
