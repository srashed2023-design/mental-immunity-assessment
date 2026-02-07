import React, { useState, useMemo } from 'react';
import { Language, Phase, UserAnswers, LeadData } from './types';
import { BDI_QUESTIONS, SEVERITY_LEVELS } from './constants';
import EntryScreen from './components/EntryScreen';
import AssessmentScreen from './components/AssessmentScreen';
import FeedbackScreen from './components/FeedbackScreen';
import LeadScreen from './components/LeadScreen';
import ReportScreen from './components/ReportScreen';

const App: React.FC = () => {
  const [lang, setLang] = useState<Language>('en');
  const [phase, setPhase] = useState<Phase>('entry');
  const [answers, setAnswers] = useState<UserAnswers>({});
  const [lead, setLead] = useState<LeadData | null>(null);

  const totalScore = useMemo(() => {
    const vals = Object.values(answers) as number[];
    return vals.reduce((acc, curr) => acc + curr, 0);
  }, [answers]);

  const severity = useMemo(() => {
    return SEVERITY_LEVELS.find(s => totalScore >= s.min && totalScore <= s.max) || SEVERITY_LEVELS[0];
  }, [totalScore]);

  const toggleLanguage = () => setLang(prev => (prev === 'en' ? 'ar' : 'en'));

  const handleAnswer = (questionId: number, value: number) => {
    setAnswers(prev => ({ ...prev, [questionId]: value }));
  };

  const isRtl = lang === 'ar';

  return (
    <div className={`min-h-screen transition-all duration-300 ${isRtl ? 'rtl' : 'ltr'}`}>
      <header className="fixed top-0 w-full z-50 px-6 py-4 glass-header">
        <div className="max-w-5xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full border-4 border-[#AA1212] flex items-center justify-center text-[#AA1212] font-black text-xl shadow-sm">
               MI
            </div>
            <div>
              <h1 className="font-serif text-lg font-bold text-[#2B2B2B] leading-none uppercase tracking-tight">
                {lang === 'en' ? 'Mental Immunity' : 'المناعة النفسية'}
              </h1>
              <p className="text-[10px] uppercase tracking-widest opacity-40 font-bold">
                {lang === 'en' ? 'Depression Assessment' : 'تقييم الاكتئاب'}
              </p>
            </div>
          </div>
          <button
            onClick={toggleLanguage}
            className="px-4 py-2 rounded-lg border border-[#AA1212]/10 hover:bg-[#AA1212] hover:text-white transition-all duration-300 font-bold text-[#AA1212] text-xs uppercase"
          >
            {lang === 'en' ? 'العربية' : 'English'}
          </button>
        </div>
      </header>

      <main className="pt-28 pb-16 px-4 max-w-5xl mx-auto min-h-screen flex flex-col items-center justify-center">
        {phase === 'entry' && (
          <EntryScreen lang={lang} onStart={() => setPhase('evaluation')} />
        )}
        
        {phase === 'evaluation' && (
          <AssessmentScreen 
            lang={lang} 
            questions={BDI_QUESTIONS} 
            answers={answers} 
            onAnswer={handleAnswer} 
            onComplete={() => setPhase('feedback')} 
          />
        )}

        {phase === 'feedback' && (
          <FeedbackScreen 
            lang={lang} 
            score={totalScore} 
            severity={severity} 
            onNext={() => setPhase('lead')} 
          />
        )}

        {phase === 'lead' && (
          <LeadScreen 
            lang={lang} 
            onSubmit={(data) => {
              setLead(data);
              setPhase('report');
            }} 
          />
        )}

        {phase === 'report' && lead && (
          <ReportScreen 
            lang={lang} 
            score={totalScore} 
            severity={severity} 
            lead={lead}
            answers={answers}
            onReset={() => {
              setAnswers({});
              setLead(null);
              setPhase('entry');
            }}
          />
        )}
      </main>

      <footer className="py-10 bg-[#2B2B2B] text-white/50 text-center text-xs px-6">
        <div className="max-w-4xl mx-auto space-y-4">
          <p dir="ltr" className="font-bold tracking-widest uppercase">© {new Date().getFullYear()} Clinical Screening Protocol</p>
          <p className="max-w-2xl mx-auto leading-relaxed opacity-70">
            {lang === 'en' 
              ? "Disclaimer: This instrument is for informational screening based on the BDI-II scale. It is NOT a clinical diagnosis. If you are experiencing an immediate crisis, please contact local emergency services immediately."
              : "إخلاء مسؤولية: هذه الأداة مخصصة للفحص المعلوماتي بناءً على مقياس بيك (BDI-II). إنها ليست تشخيصاً طبياً نهائياً. إذا كنت تمر بأزمة نفسية فورية، يرجى الاتصال بخدمات الطوارئ المحلية فوراً."
            }
          </p>
        </div>
      </footer>
    </div>
  );
};

export default App;