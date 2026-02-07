
import React from 'react';
import { Language, SeverityLevel } from '../types';

interface Props {
  lang: Language;
  score: number;
  severity: SeverityLevel;
  onNext: () => void;
}

const FeedbackScreen: React.FC<Props> = ({ lang, score, severity, onNext }) => {
  const isEn = lang === 'en';
  // BDI max is 63
  const percentage = Math.min((score / 63) * 100, 100);

  return (
    <div className="text-center space-y-14 animate-in zoom-in-95 duration-1000 max-w-2xl mx-auto">
      <div className="space-y-4">
        <h2 className="text-4xl md:text-5xl font-serif font-bold text-[#2B2B2B]">
          {isEn ? "Depression Diagnosis" : "تشخيص الاكتئاب"}
        </h2>
        <div className="inline-block px-5 py-1.5 rounded-full bg-[#AA1212]/10 text-[#AA1212] font-bold text-xs uppercase tracking-[0.3em]">
          {isEn ? "Clinical Screening" : "الفحص الإكلينيكي"}
        </div>
      </div>

      <div className="flex flex-col items-center justify-center space-y-10">
        <div className="relative w-64 h-64 md:w-80 md:h-80">
          <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
            <circle
              cx="50" cy="50" r="45"
              fill="transparent"
              stroke="#e5e7eb"
              strokeWidth="4"
            />
            <circle
              cx="50" cy="50" r="45"
              fill="transparent"
              stroke={severity.color}
              strokeWidth="4"
              strokeDasharray="282.7"
              strokeDashoffset={282.7 - (percentage / 100) * 282.7}
              strokeLinecap="round"
              className="transition-all duration-[2000ms] ease-out"
              style={{ strokeDashoffset: 282.7 - (percentage / 100) * 282.7 }}
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-6xl md:text-8xl font-serif font-bold" style={{ color: severity.color }}>
              {score}
            </span>
            <span className="text-[10px] font-bold opacity-30 uppercase tracking-[0.4em] mt-2">
              {isEn ? "TOTAL SCORE" : "إجمالي الدرجة"}
            </span>
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-3xl md:text-4xl font-serif font-bold" style={{ color: severity.color }}>
            {isEn ? severity.labelEn : severity.labelAr}
          </h3>
          <p className="text-lg md:text-xl text-[#2B2B2B]/70 leading-relaxed px-4 italic font-serif">
            "{isEn ? severity.descriptionEn : severity.descriptionAr}"
          </p>
        </div>
      </div>

      <div className="bg-white p-8 rounded-[2rem] clinical-shadow border border-[#AA1212]/10 flex flex-col md:flex-row items-center gap-8 text-start">
        <div className="flex-shrink-0 w-16 h-16 bg-[#AA1212]/5 text-[#AA1212] rounded-full flex items-center justify-center text-2xl">📋</div>
        <div className="space-y-1">
          <p className="font-bold text-sm">
            {isEn ? "Unlock Clinical Portfolio" : "افتح الملف الإكلينيكي الكامل"}
          </p>
          <p className="text-xs opacity-50 leading-relaxed">
            {isEn 
              ? "Your final portfolio includes specialized AI-driven analysis, a breakdown of cognitive/physical domains, and a downloadable PDF for your healthcare provider." 
              : "يتضمن ملفك النهائي تحليلاً إكلينيكياً متخصصاً، وتقسيماً للمجالات المعرفية والجسدية، وملف PDF قابل للتحميل لمقدم الرعاية الصحية الخاص بك."}
          </p>
        </div>
      </div>

      <button
        onClick={onNext}
        className="group relative px-16 py-6 bg-[#AA1212] text-white rounded-[1.5rem] font-bold text-xl shadow-2xl hover:bg-[#8e0f0f] transform hover:-translate-y-1 transition-all active:scale-95"
      >
        <span className="relative z-10">{isEn ? "Generate Full Report" : "إصدار التقرير الكامل"}</span>
        <div className="absolute inset-0 rounded-[1.5rem] bg-white opacity-0 group-hover:opacity-10 transition-opacity" />
      </button>
    </div>
  );
};

export default FeedbackScreen;
