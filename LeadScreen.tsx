import React, { useState } from 'react';
import { Language, LeadData } from '../types';

interface Props {
  lang: Language;
  onSubmit: (data: LeadData) => void;
}

const LeadScreen: React.FC<Props> = ({ lang, onSubmit }) => {
  const isEn = lang === 'en';
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState<LeadData>({
    firstName: '',
    lastName: '',
    age: '',
    email: '',
    occupation: '',
    agreedToTerms: false
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (formData.firstName && formData.lastName && formData.email && formData.agreedToTerms) {
      setIsSubmitting(true);

      // --- VERIFIED NEW URL HANDSHAKE ---
      const SHEETS_URL = "https://script.google.com/macros/s/AKfycbxCr9KIP3jBLF4Xj4ZFZ-Nyex600dz0yO565_7ECYPacYfgXgjyT6kwy-BYrZzNuEwNiA/exec";

      try {
        const payload = {
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          age: formData.age,
          occupation: formData.occupation
        };

        // Execution of the data push
        await fetch(SHEETS_URL, {
          method: 'POST',
          mode: 'no-cors', 
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        });
      } catch (error) {
        console.error("Database sync delayed. Moving to report finalization.");
      }

      // Finalizing the mobilization phase
      onSubmit(formData);
    }
  };

  return (
    <div className="max-w-xl mx-auto space-y-10 animate-in slide-in-from-right-12 duration-700">
      <div className="text-center space-y-4">
        <div className="w-16 h-16 bg-[#AA1212]/10 text-[#AA1212] rounded-full flex items-center justify-center mx-auto text-2xl mb-4">
          🩺
        </div>
        <h2 className="text-3xl md:text-4xl font-serif font-bold text-[#2B2B2B]">
          {isEn ? "Patient Intake" : "بيانات المراجع"}
        </h2>
        <p className="text-[#2B2B2B]/60 italic font-serif">
          {isEn
            ? "Enter your details to finalize your clinical portfolio."
            : "أدخل بياناتك لاستكمال إصدار ملفك الإكلينيكي."}
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="bg-white p-10 md:p-12 rounded-[2.5rem] clinical-shadow border border-[#AA1212]/5 space-y-8"
      >
        <div className="grid grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="block text-[10px] font-bold opacity-30 uppercase tracking-widest">
              {isEn ? "First Name" : "الاسم الأول"}
            </label>
            <input
              type="text"
              required
              disabled={isSubmitting}
              value={formData.firstName}
              onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
              className="w-full px-6 py-4 bg-[#f8f4ef] rounded-xl border-2 border-transparent focus:border-[#AA1212]/20 focus:bg-white outline-none transition-all"
              placeholder={isEn ? "John" : "مثال: أحمد"}
            />
          </div>
          <div className="space-y-2">
            <label className="block text-[10px] font-bold opacity-30 uppercase tracking-widest">
              {isEn ? "Last Name" : "الاسم الأخير"}
            </label>
            <input
              type="text"
              required
              disabled={isSubmitting}
              value={formData.lastName}
              onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
              className="w-full px-6 py-4 bg-[#f8f4ef] rounded-xl border-2 border-transparent focus:border-[#AA1212]/20 focus:bg-white outline-none transition-all"
              placeholder={isEn ? "Doe" : "مثال: محمود"}
            />
          </div>
        </div>

        <div className="grid grid-cols-3 gap-6">
          <div className="col-span-1 space-y-2">
            <label className="block text-[10px] font-bold opacity-30 uppercase tracking-widest">
              {isEn ? "Age" : "العمر"}
            </label>
            <input
              type="number"
              required
              min="13"
              max="100"
              disabled={isSubmitting}
              value={formData.age}
              onChange={(e) => setFormData({ ...formData, age: e.target.value })}
              className="w-full px-6 py-4 bg-[#f8f4ef] rounded-xl border-2 border-transparent focus:border-[#AA1212]/20 focus:bg-white outline-none transition-all"
            />
          </div>
          <div className="col-span-2 space-y-2">
            <label className="block text-[10px] font-bold opacity-30 uppercase tracking-widest">
              {isEn ? "Occupation" : "المهنة"}
            </label>
            <input
              type="text"
              disabled={isSubmitting}
              value={formData.occupation}
              onChange={(e) => setFormData({ ...formData, occupation: e.target.value })}
              className="w-full px-6 py-4 bg-[#f8f4ef] rounded-xl border-2 border-transparent focus:border-[#AA1212]/20 focus:bg-white outline-none transition-all"
              placeholder={isEn ? "Teacher" : "مثال: معلم"}
            />
          </div>
        </div>

        <div className="space-y-4">
          <div className="space-y-2">
            <label className="block text-[10px] font-bold opacity-30 uppercase tracking-widest">
              {isEn ? "Email" : "البريد الإلكتروني"}
            </label>
            <input
              type="email"
              required
              disabled={isSubmitting}
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full px-6 py-4 bg-[#f8f4ef] rounded-xl border-2 border-transparent focus:border-[#AA1212]/20 focus:bg-white outline-none transition-all"
              placeholder="name@example.com"
            />
          </div>

          <div className="flex items-start gap-4 pt-2">
            <input
              type="checkbox"
              id="legal-consent"
              required
              disabled={isSubmitting}
              checked={formData.agreedToTerms}
              onChange={(e) => setFormData({ ...formData, agreedToTerms: e.target.checked })}
              className="mt-1 w-5 h-5 rounded accent-[#AA1212] cursor-pointer flex-shrink-0"
            />
            <label
              htmlFor="legal-consent"
              className="text-[11px] text-[#2B2B2B]/60 leading-relaxed cursor-pointer select-none"
            >
              {isEn
                ? "I agree that my personal details may be used for marketing and follow-up purposes. I understand that my assessment answers are strictly confidential and will never be shared."
                : "أوافق على استخدام بياناتي الشخصية لأغراض التسويق والمتابعة، مع العلم اليقين بأن إجابات الاختبار ونتائجي هي بيانات سرية تماماً ولن يتم مشاركتها مع أي طرف ثالث."}
            </label>
          </div>
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full py-5 bg-[#2B2B2B] text-white rounded-2xl font-bold text-xl shadow-xl hover:bg-[#1a1a1a] transition-all transform active:scale-95 flex items-center justify-center gap-3 disabled:opacity-50"
        >
          <span>{isSubmitting ? (isEn ? "Processing..." : "جاري المعالجة...") : (isEn ? "Finalize Report" : "إتمام التقرير")}</span>
          {!isSubmitting && <span className="opacity-30">→</span>}
        </button>
      </form>
    </div>
  );
};

export default LeadScreen;