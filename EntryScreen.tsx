
import React from 'react';
import { Language } from '../types';

interface Props {
  lang: Language;
  onStart: () => void;
}

const EntryScreen: React.FC<Props> = ({ lang, onStart }) => {
  const isEn = lang === 'en';

  return (
    <div className="max-w-xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-6 duration-1000">
      <div className="text-center space-y-4">
        <h2 className="text-5xl font-serif font-bold text-[#2B2B2B] leading-tight">
          {isEn ? "Assess Your" : "قيم"} <br/>
          {isEn ? "Depression Level" : "مستوى الاكتئاب"}
        </h2>
        <p className="text-2xl text-[#AA1212]/80 font-serif italic">
          {isEn ? "Clinical Depression Assessment" : "تقييم الاكتئاب الإكلينيكي"}
        </p>
      </div>

      <div className="space-y-6 text-[#2B2B2B]/70 leading-relaxed text-lg text-center md:text-start">
        <p>
          {isEn 
            ? "This assessment is based on the 'Beck Depression Inventory (BDI)' developed by Dr. Aaron Beck. It is one of the most widely used instruments for measuring the severity of depression." 
            : "يعتمد هذا التقييم على 'مقياس بيك للاكتئاب (BDI)' الذي طوره الدكتور آرون بيك. ويعد أحد أكثر الأدوات استخداماً لقياس شدة أعراض الاكتئاب."}
        </p>
        <p className="italic text-sm opacity-60">
          {isEn 
            ? "Note: This is a screening tool for clinical insight, not a final medical diagnosis." 
            : "ملاحظة: هذه أداة فحص للحصول على رؤية إكلينيكية أولية، وليست تشخيصاً طبياً نهائياً."}
        </p>
      </div>

      <div className="bg-[#fdfcfb] border border-[#AA1212]/10 rounded-[2rem] p-10 space-y-6 shadow-sm">
        <h3 className="text-xl font-bold text-[#2B2B2B] flex items-center gap-3">
          <span className="w-1.5 h-1.5 bg-[#AA1212] rounded-full" />
          {isEn ? "Assessment Overview:" : "نظرة عامة على التقييم:"}
        </h3>
        <ul className="space-y-4">
          {[
            isEn ? "Accurate scoring on the clinical depression scale" : "درجة دقيقة على مقياس الاكتئاب الإكلينيكي",
            isEn ? "Identification of physical and cognitive symptoms" : "تحديد الأعراض الجسدية والمعرفية",
            isEn ? "Detailed therapeutic roadmap and professional PDF" : "خارطة طريق علاجية مفصلة وملف PDF احترافي"
          ].map((item, i) => (
            <li key={i} className="flex items-start gap-4 group">
              <span className="text-[#AA1212] font-bold text-lg">•</span>
              <span className="text-[#2B2B2B]/80 font-medium">{item}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="pt-4 text-center">
        <button
          onClick={onStart}
          className="w-full md:w-auto px-16 py-6 bg-[#AA1212] text-white rounded-[1.5rem] font-bold text-xl shadow-2xl hover:bg-[#8e0f0f] transform hover:-translate-y-1 transition-all active:scale-95"
        >
          {isEn ? "Start Assessment" : "ابدأ التقييم الآن"}
        </button>
      </div>
    </div>
  );
};

export default EntryScreen;
