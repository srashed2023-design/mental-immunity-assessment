
import React, { useState } from 'react';
import { Language, UserAnswers } from '../types';
import { BDI_QUESTIONS, AssessmentQuestionExtended } from '../constants';

interface Props {
  lang: Language;
  questions: AssessmentQuestionExtended[];
  answers: UserAnswers;
  onAnswer: (qId: number, val: number) => void;
  onComplete: () => void;
}

const AssessmentScreen: React.FC<Props> = ({ lang, questions, answers, onAnswer, onComplete }) => {
  const [currentIdx, setCurrentIdx] = useState(0);
  const isEn = lang === 'en';
  const question = questions[currentIdx];
  const progress = ((currentIdx + 1) / questions.length) * 100;

  const handleNext = () => {
    if (currentIdx < questions.length - 1) {
      setCurrentIdx(currentIdx + 1);
    } else {
      onComplete();
    }
  };

  const handlePrev = () => {
    if (currentIdx > 0) {
      setCurrentIdx(currentIdx - 1);
    }
  };

  const selectOption = (val: number) => {
    onAnswer(question.id, val);
    setTimeout(() => {
        if (currentIdx < questions.length - 1) handleNext();
    }, 300);
  };

  const isSelected = (val: number) => answers[question.id] === val;

  return (
    <div className="w-full max-w-3xl mx-auto space-y-10 animate-in fade-in slide-in-from-bottom-8 duration-700">
      <div className="space-y-4">
        <div className="flex justify-between items-end text-[10px] font-bold uppercase tracking-widest text-[#AA1212]">
          <span>{isEn ? `MODULE ${currentIdx + 1} of ${questions.length}` : `المرحلة ${currentIdx + 1} من ${questions.length}`}</span>
          <span className="bg-[#AA1212]/5 px-2 py-0.5 rounded">{Math.round(progress)}%</span>
        </div>
        <div className="h-1.5 w-full bg-[#AA1212]/5 rounded-full overflow-hidden">
          <div 
            className="h-full bg-[#AA1212] transition-all duration-700 ease-out shadow-[0_0_10px_rgba(170,18,18,0.3)]"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      <div className="bg-white p-10 md:p-14 rounded-[2.5rem] clinical-shadow border border-[#AA1212]/5 space-y-10 min-h-[500px] flex flex-col">
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 bg-[#AA1212]/5 text-[#AA1212] rounded-full text-[10px] font-bold uppercase tracking-widest">
              {isEn ? question.domainEn : question.domainAr}
            </span>
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#2B2B2B]/30 italic">
              — {isEn ? "INDICATOR" : "مؤشر"}
            </span>
          </div>
          <h3 className="text-3xl md:text-4xl font-serif font-bold text-[#2B2B2B] leading-tight">
            {isEn ? question.categoryEn : question.categoryAr}
          </h3>
        </div>

        <div className="grid gap-4 flex-grow">
          {question.options.map((option) => (
            <button
              key={option.value}
              onClick={() => selectOption(option.value)}
              className={`text-start p-6 rounded-2xl border-2 transition-all duration-300 flex items-center gap-5 group relative overflow-hidden
                ${isSelected(option.value) 
                  ? 'border-[#AA1212] bg-[#AA1212]/5 text-[#AA1212]' 
                  : 'border-transparent bg-[#f8f4ef]/50 hover:bg-[#f8f4ef] text-[#2B2B2B]/70'
                }`}
            >
              <div className={`w-6 h-6 rounded-full border-2 flex-shrink-0 flex items-center justify-center transition-colors
                ${isSelected(option.value) ? 'border-[#AA1212]' : 'border-[#2B2B2B]/20 group-hover:border-[#AA1212]/40'}
              `}>
                {isSelected(option.value) && <div className="w-3 h-3 bg-[#AA1212] rounded-full animate-in zoom-in duration-300" />}
              </div>
              <span className="text-lg font-medium relative z-10">{isEn ? option.labelEn : option.labelAr}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="flex justify-between items-center pt-2">
        <button
          onClick={handlePrev}
          disabled={currentIdx === 0}
          className={`px-8 py-3 rounded-xl font-bold transition-all flex items-center gap-2 ${
            currentIdx === 0 ? 'opacity-0 pointer-events-none' : 'text-[#2B2B2B]/40 hover:text-[#2B2B2B] hover:bg-[#2B2B2B]/5'
          }`}
        >
          {isEn ? "← Back" : "السابق →"}
        </button>
        {currentIdx === questions.length - 1 && answers[question.id] !== undefined && (
             <button
                onClick={onComplete}
                className="px-10 py-4 rounded-xl font-bold bg-[#AA1212] text-white hover:bg-[#8e0f0f] shadow-xl transform active:scale-95 transition-all animate-in fade-in slide-in-from-right-4"
             >
                {isEn ? "View Results" : "عرض النتائج النهائية"}
             </button>
        )}
      </div>
    </div>
  );
};

export default AssessmentScreen;
