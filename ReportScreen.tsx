import React, { useRef, useState, useMemo } from 'react';
import { Language, SeverityLevel, LeadData, UserAnswers } from '../types';

interface Props {
  lang: Language;
  score: number;
  severity: SeverityLevel;
  lead: LeadData;
  answers: UserAnswers;
  onReset: () => void;
}

const ReportScreen: React.FC<Props> = ({ lang, score, severity, lead, answers, onReset }) => {
  const isEn = lang === 'en';
  const reportRef = useRef<HTMLDivElement>(null);
  const [isExporting, setIsExporting] = useState(false);

  // 1. OFFICIAL SCORING MAPPING
  const visualStatus = useMemo(() => {
    return {
      color: severity.color,
      labelAr: severity.labelAr,
      labelEn: severity.labelEn,
      isCritical: score >= 37,
      statusTextAr: severity.descriptionAr,
      statusTextEn: severity.descriptionEn
    };
  }, [score, severity]);

  // 2. GAUGE CALCULATIONS
  const radius = 45;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (Math.min(score, 63) / 63) * circumference;

  // 3. NORMALIZED SUB-DOMAIN RATIOS
  const getSeverityByRatio = (ratio: number) => {
    if (ratio < 15) return { color: '#22C55E', labelEn: 'Stable', labelAr: 'مستقر' };
    if (ratio <= 25) return { color: '#1abc9c', labelEn: 'Mild', labelAr: 'بسيط' };
    if (ratio <= 37) return { color: '#f1c40f', labelEn: 'Moderate', labelAr: 'متوسط' };
    if (ratio <= 57) return { color: '#e67e22', labelEn: 'Severe', labelAr: 'شديد' };
    return { color: '#c0392b', labelEn: 'Very Severe', labelAr: 'شديد جداً' };
  };

  const calculateDomain = (ids: number[]) => {
    const maxPossible = ids.length * 3;
    const sum = ids.reduce((acc, id) => acc + (answers[id] || 0), 0);
    const ratio = (sum / maxPossible) * 100;
    return { sum, ratio, ...getSeverityByRatio(ratio) };
  };

  const domainStats = useMemo(() => ({
    physical: calculateDomain([15, 16, 17, 18, 19, 20, 21]),
    emotional: calculateDomain([1, 2, 4, 10, 11, 12, 13]),
    cognitive: calculateDomain([3, 5, 6, 7, 8, 9, 14])
  }), [answers]);

  // 4. ACCUMULATOR LOGIC PATTERN (Bilingual Engine)
  const dynamicContent = useMemo(() => {
    const val = (id: number) => answers[id] || 0;

    // --- DOMAIN 1: BIOLOGICAL ENGINE ---
    const bio = { obs: [] as string[], cause: [] as string[], loophole: [] as string[], proposal: [] as string[] };
    
    // Q16: Sleep
    if (val(16) === 1) {
      bio.obs.push("تذبذب في مواعيد النوم وصعوبة في الاسترخاء.<br>Fluctuations in sleep timing and difficulty relaxing.");
      bio.cause.push("بداية اختلال في 'الساعة البيولوجية' وتأخر الميلاتونين.<br>Early Circadian Rhythm disruption and delayed Melatonin.");
      bio.loophole.push("ثغرة اضطراب الإيقاع<br>Rhythm Disruption Gap");
      bio.proposal.push("التعرض لضوء الشمس صباحاً (10 دقائق) لضبط الساعة البيولوجية.<br>Morning sunlight exposure (10 mins) to reset clock.");
      bio.proposal.push("تجنب الكافيين مساءً واستخدام نظارات حجب الضوء الأزرق.<br>Avoid evening caffeine and use blue-light blocking glasses.");
    } else if (val(16) >= 2) {
      bio.obs.push("اضطراب حاد يؤثر بوضوح على القدرة على النوم أو الاستمرار فيه.<br>Severe disturbance affecting ability to fall or stay asleep.");
      bio.cause.push("ارتفاع مستمر في هرمون التوتر (الكورتيزول) ليلاً يمنع النوم العميق.<br>Persistently elevated nighttime Cortisol preventing deep sleep.");
      bio.loophole.push("ثغرة تسريب الطاقة<br>Energy Leak Gap");
      bio.proposal.push("**تفريغ العقل:** كتابة كل المخاوف في ورقة قبل النوم لإخراجها من عقلك.<br>**Brain Dump:** Write down all worries before bed.");
      bio.proposal.push("**النظافة الضوئية:** منع الشاشات تماماً قبل النوم بساعة لدعم الميلاتونين.<br>**Light Hygiene:** No screens 1 hour before bed.");
    }

    // Q17: Fatigue (User mapped Q17 as Fatigue logic)
    if (val(17) === 1) {
      bio.obs.push("شعور بالإجهاد أسرع من المعتاد عند بذل مجهود.<br>Feeling tired faster than usual during effort.");
      bio.cause.push("نقص في النشاط البدني وتراكم نواتج التوتر في العضلات.<br>Lack of physical activity and stress buildup.");
      bio.loophole.push("ثغرة الراحة السلبية<br>Passive Rest Trap");
      bio.proposal.push("المشي لمدة 20 دقيقة لتنشيط الدورة الدموية.<br>Walk for 20 mins to boost circulation.");
    } else if (val(17) >= 2) {
      bio.obs.push("شعور مستمر بالإنهاك وثقل شديد في الجسم.<br>Constant exhaustion and severe physical heaviness.");
      bio.cause.push("استنزاف حاد في مخزون الدوبامين (وضع توفير الطاقة).<br>Severe Dopamine depletion (Energy Conservation Mode).");
      bio.loophole.push("وهم العجز<br>Learned Helplessness");
      bio.proposal.push("**قاعدة الـ 5 دقائق:** ابدأ أي نشاط لمدة 5 دقائق فقط لكسر الجمود.<br>**5-Minute Rule:** Start any activity for just 5 mins.");
      bio.proposal.push("**التقسيم:** فكك المهمة الكبيرة إلى خطوات صغيرة جداً.<br>**Micro-Tasks:** Break big tasks into tiny steps.");
    }

    // Q18: Appetite
    if (val(18) >= 1) {
      bio.obs.push("تغير ملحوظ في الشهية (فقدان تام أو شراهة).<br>Noticeable change in appetite (loss or bingeing).");
      bio.cause.push("اضطراب في السيروتونين (منظم المزاج والشبع).<br>Serotonin disruption (mood & satiety regulator).");
      bio.loophole.push("إهمال الجسد<br>Body Neglect");
      bio.proposal.push("تنظيم مواعيد الوجبات لدعم كيمياء المخ.<br>Regular meal timing to support brain chemistry.");
    }

    // --- DOMAIN 2: EMOTIONAL STABILITY ---
    const emo = { obs: [] as string[], cause: [] as string[], loophole: [] as string[], proposal: [] as string[] };
    
    // Q4: Anhedonia
    if (val(4) >= 1) {
      emo.obs.push("تراجع في القدرة على الاستمتاع والاهتمام بالأنشطة المعتادة.<br>Reduced ability to enjoy or take interest in usual activities.");
      emo.cause.push("انخفاض في مستويات الدوبامين في مراكز المكافأة بالدماغ.<br>Low dopamine levels in brain reward centers.");
      emo.loophole.push("فخ التوقعات (انتظار الرغبة)<br>Expectation Gap (Waiting for desire)");
      emo.proposal.push("**التنشيط السلوكي:** مارس الفعل آلياً وسيلحق الشعور لاحقاً.<br>**Behavioral Activation:** Act first, feeling follows.");
    }

    // Q1: Sadness
    if (val(1) >= 1) {
      emo.obs.push("سيطرة مشاعر الحزن والمزاج الهابط لفترات طويلة.<br>Dominance of sadness and low mood for extended periods.");
      emo.cause.push("نقص في السيروتونين نتيجة الضغوط المتراكمة.<br>Serotonin depletion due to accumulated stress.");
      emo.loophole.push("فخ المشاعر (تصديق المشاعر كحقائق)<br>Emotional Reasoning");
      emo.proposal.push("**الامتنان:** تدوين 3 أشياء جيدة يومياً لرفع السيروتونين.<br>**Gratitude:** Write 3 good things daily.");
    }

    // --- DOMAIN 3: COGNITIVE PROCESSING ---
    const cog = { obs: [] as string[], cause: [] as string[], loophole: [] as string[], proposal: [] as string[] };

    // Q7: Self-Criticism
    if (val(7) === 1) {
      cog.obs.push("ميل للوم النفس ومقارنتها بالآخرين بشكل سلبي.<br>Tendency to blame self and compare negatively to others.");
      cog.cause.push("معايير عالية ذاتية تسبب الإحباط المستمر.<br>Self-imposed high standards causing constant frustration.");
      cog.loophole.push("قسوة الحكم<br>Harsh Judgment");
      cog.proposal.push("المرونة: تذكير النفس أن الأخطاء فرص للتعلم.<br>Flexibility: Mistakes are learning opportunities.");
    } else if (val(7) >= 2) {
      cog.obs.push("جلد ذات مستمر وشعور عميق باللوم وعدم الاستحقاق.<br>Constant self-criticism and deep sense of blame and unworthiness.");
      cog.cause.push("نشاط زائد في شبكة التفكير التلقائي واجترار الماضي.<br>Overactivity in automatic thinking network (rumination).");
      cog.loophole.push("فخ المثالية (الكل أو لا شيء)<br>Perfectionism Trap");
      cog.proposal.push("**التعاطف مع الذات:** وجه لنفسك كلمات الدعم كما تفعل مع صديق.<br>**Self-Compassion:** Speak kindly to yourself as you would a friend.");
    }

    // Q2: Pessimism
    if (val(2) >= 1) {
      cog.obs.push("نظرة سوداوية للمستقبل وتوقع الأسوأ دائماً.<br>Pessimistic view of the future and always expecting the worst.");
      cog.cause.push("سيطرة 'المرشحات السلبية' التي تحجب رؤية الفرص والحلول.<br>Dominance of 'Negative Filtering' bias blocking opportunities.");
      cog.loophole.push("وهم اليأس<br>Illusion of Despair");
      cog.proposal.push("**إعادة التأطير:** ابحث عن دليل واحد يعاكس الفكرة السلبية.<br>**Reframing:** Find evidence against the negative thought.");
    }

    // Fallbacks if nothing accumulated
    const finalBio = bio.obs.length > 0 ? bio : { 
      obs: ["استقرار في المؤشرات الحيوية.<br>Stable biological indicators."],
      cause: ["توازن في النواقل العصبية والنشاط البدني.<br>Balanced neurotransmitters and activity."],
      loophole: ["لا توجد ثغرات نشطة.<br>No active loopholes."],
      proposal: ["استمر في الحفاظ على روتينك الصحي.<br>Continue maintaining your healthy routine."]
    };
    const finalEmo = emo.obs.length > 0 ? emo : { 
      obs: ["استقرار في الحالة المزاجية والعاطفية.<br>Emotional and mood stability."],
      cause: ["توازن هرموني وانفعالي جيد.<br>Good hormonal and emotional balance."],
      loophole: ["لا توجد فخاخ مشاعر نشطة.<br>No active emotional traps."],
      proposal: ["مارس الامتنان واليقظة للحفاظ على الاستقرار.<br>Practice gratitude and mindfulness to maintain stability."]
    };
    const finalCog = cog.obs.length > 0 ? cog : { 
      obs: ["معالجة فكرية متوازنة وواقعية.<br>Balanced and realistic cognitive processing."],
      cause: ["مرونة ذهنية وتفكير منطقي سليم.<br>Mental flexibility and sound logical thinking."],
      loophole: ["لا توجد انحيازات فكرية معطلة.<br>No disabling cognitive biases."],
      proposal: ["استمر في تحدي الأفكار التلقائية السلبية.<br>Continue challenging negative automatic thoughts."]
    };

    return { physical: finalBio, emotional: finalEmo, cognitive: finalCog };
  }, [answers]);

  // 5. STATIC ROADMAP (Severity Based)
  const recommendation = useMemo(() => {
    if (score >= 24) {
      return {
        impression: "مؤشرات قوية تتطلب التدخل / Strong indicators requiring intervention",
        actionPlan: [
          "• ضرورة اللجوء لمختص في أسرع وقت.<br>• Consult a specialist ASAP.",
          "• تفعيل 'شبكة الدعم' فوراً.<br>• Activate 'Support Network' immediately.",
          "• الالتزام ببرنامج يومي بسيط.<br>• Stick to a simple daily routine."
        ],
        nextStep: "تدخل مهني مطلوب (عاجل) / Professional Help Needed (Urgent)",
        isSevere: true
      };
    } else if (score >= 16) {
      return {
        impression: "بناءً على مقياس بيك (BDI-II)، تشير المؤشرات النيوروبيولوجية إلى أن هناك مؤشرات على اكتئاب متوسط. ينصح باستشاره مختص لتقييم الحالة بشكل أدق.<br>Based on the Beck Scale (BDI-II), neurobiological indicators suggest moderate depression. Consulting a specialist for a more accurate assessment is advised.",
        actionPlan: [
          "• العمل المكثف على تقوية المناعة النفسية.<br>• Intensive work on Mental Immunity.",
          "• خطوات لاستعادة التوازن الهرموني.<br>• Steps to restore hormonal balance.",
          "• طلب الدعم من المقربين.<br>• Seek support from loved ones."
        ],
        nextStep: "يفضل استشارة متخصص في التشخيص / Consultation with a diagnostic specialist is preferred",
        isSevere: false
      };
    } else {
      return {
        impression: "مناعة نفسية مستقرة / Stable Mental Immunity",
        actionPlan: [
          "• العمل على تقوية المناعة النفسية.<br>• Work on strengthening Mental Immunity.",
          "• الحفاظ على ممارسة الرياضة والعلاقات.<br>• Maintain exercise and relationships."
        ],
        nextStep: "استمر في المتابعة الذاتية / Continue Self-Monitoring",
        isSevere: false
      };
    }
  }, [score]);

  // 6. PDF DOWNLOADER
  const downloadPDF = async () => {
    const element = reportRef.current;
    if (!element) return;
    setIsExporting(true);
    
    const opt = {
      margin: 0,
      filename: `MI_Profile_${lead.firstName}_${lead.lastName}.pdf`,
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2, useCORS: true, letterRendering: true },
      jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
    };

    try {
      // @ts-ignore
      await html2pdf().set(opt).from(element).save();
    } catch (err) {
      console.error("PDF generation failed", err);
    } finally {
      setIsExporting(false);
    }
  };

  const today = new Date().toLocaleDateString(isEn ? 'en-US' : 'ar-EG', {
    year: 'numeric', month: 'long', day: 'numeric'
  });

  return (
    <div className="w-full space-y-12 pb-20">
      {/* UI Controls */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-6 no-print max-w-[794px] mx-auto px-4">
        <div className="space-y-1">
          <h2 className="text-2xl font-bold text-[#1a252f]">{isEn ? "Diagnostic Profile" : "ملف التشخيص الإكلينيكي"}</h2>
          <p className="text-sm font-semibold opacity-40 uppercase tracking-widest">{isEn ? "Confidential Clinical File" : "تقرير سري"}</p>
        </div>
        <div className="flex gap-4">
          <button 
            onClick={downloadPDF} 
            disabled={isExporting} 
            className="px-10 py-4 bg-[#1a252f] text-white rounded-xl font-bold shadow-xl hover:bg-black transition-all disabled:opacity-50"
          >
            {isExporting ? '...' : isEn ? "Download PDF Report" : "تحميل التقرير PDF"}
          </button>
          <button onClick={onReset} className="px-6 py-4 border-2 border-slate-200 rounded-xl font-bold text-slate-400 hover:text-black transition-all">
            {isEn ? "Reset" : "إعادة"}
          </button>
        </div>
      </div>

      {/* Main Report Body */}
      <div 
        ref={reportRef} 
        id="report-container" 
        className={`bg-white p-12 space-y-10 relative ${isEn ? 'ltr' : 'rtl'} border border-slate-100 shadow-2xl`}
      >
        {/* Letterhead with Logo */}
        <div className="flex justify-between items-start border-b-4 border-[#1a252f] pb-8">
          <div className="flex items-center gap-5">
            <div className="w-16 h-16 rounded-full border-4 border-[#1a252f] flex items-center justify-center">
              <span className="text-2xl font-black text-[#1a252f] tracking-tighter">MI</span>
            </div>
            <div className="space-y-1">
              <h1 className="text-[26px] font-bold text-[#1a252f] uppercase tracking-tight">MENTAL IMMUNITY</h1>
              <p className="text-[10px] font-bold opacity-30 tracking-[0.4em] uppercase">{isEn ? "DEPRESSION ASSESSMENT" : "تقييم الاكتئاب"}</p>
            </div>
          </div>
          <div className="text-end space-y-1">
            <p className="font-bold text-xl text-[#1a252f]">{lead.firstName} {lead.lastName}</p>
            <p className="text-xs opacity-50 uppercase tracking-widest font-bold">{today}</p>
          </div>
        </div>

        {/* 1. Gauge Section */}
        <div className="flex flex-col items-center text-center space-y-6">
          <div className="relative w-56 h-56">
            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
              <circle cx="50" cy="50" r={radius} fill="transparent" stroke="#f1f5f9" strokeWidth="8" />
              <circle cx="50" cy="50" r={radius} fill="transparent" stroke={visualStatus.color} strokeWidth="8" strokeDasharray={circumference} strokeDashoffset={strokeDashoffset} strokeLinecap="round" className="transition-all duration-1000" />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-6xl font-bold" style={{ color: visualStatus.color }}>{score}</span>
              <span className="text-[10px] font-bold opacity-30 uppercase tracking-[0.3em]">{isEn ? "Clinical Score" : "الدرجة الكلية"}</span>
            </div>
          </div>
          <h3 className="text-3xl font-bold uppercase tracking-tight" style={{ color: visualStatus.color }}>{isEn ? visualStatus.labelEn : visualStatus.labelAr}</h3>
          
          <div 
            className="w-full max-w-2xl mx-auto p-4 rounded-xl border-2 text-center transition-all duration-500"
            style={{ 
              backgroundColor: `${visualStatus.color}15`, 
              borderColor: visualStatus.color
            }}
          >
            <p className="font-bold text-lg leading-relaxed" style={{ color: visualStatus.color }}>
              {isEn ? visualStatus.statusTextEn : visualStatus.statusTextAr}
            </p>
          </div>
        </div>

        {/* 2. Detailed Card Sections (Accumulated List) */}
        <div className="space-y-8">
           {[
             { key: 'physical', labelAr: 'المحرك البيولوجي', labelEn: 'Biological Engine', stats: domainStats.physical, content: dynamicContent.physical },
             { key: 'emotional', labelAr: 'الاستقرار العاطفي', labelEn: 'Emotional Stability', stats: domainStats.emotional, content: dynamicContent.emotional },
             { key: 'cognitive', labelAr: 'المعالج الفكري', labelEn: 'Cognitive Processing', stats: domainStats.cognitive, content: dynamicContent.cognitive }
           ].map((item) => (
             <div key={item.key} className="bg-white rounded-[1.5rem] overflow-hidden border border-slate-100 border-l-[8px]" style={{ borderLeftColor: item.stats.color }}>
                <div className="p-6 pb-2 flex flex-col gap-3">
                   <div className="flex justify-between items-center">
                      <h5 className="font-bold text-[18px] uppercase text-[#1a252f]">{isEn ? item.labelEn : item.labelAr}</h5>
                      <span className="px-3 py-1 rounded-full text-[10px] font-bold text-white shadow-sm" style={{ backgroundColor: item.stats.color }}>{isEn ? item.stats.labelEn : item.stats.labelAr}</span>
                   </div>
                   <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                      <div className="h-full transition-all duration-1000" style={{ width: `${item.stats.ratio}%`, backgroundColor: item.stats.color }} />
                   </div>
                </div>
                <div className="p-6 grid md:grid-cols-2 gap-8 text-[13px] bg-slate-50/10">
                   <div className="space-y-6">
                      <div>
                         <p className="font-bold text-[#1a252f] mb-2 uppercase tracking-wider">{isEn ? "Clinical Observations" : "الملاحظات"}</p>
                         <ul className="opacity-80 leading-relaxed font-medium space-y-4 list-disc ps-4">
                            {item.content.obs.map((line, idx) => (
                              <li key={idx} dangerouslySetInnerHTML={{ __html: line }} />
                            ))}
                         </ul>
                      </div>
                      <div>
                         <p className="font-bold text-[#1a252f] mb-2 uppercase tracking-wider">{isEn ? "Likely Physiological Cause" : "السبب المحتمل"}</p>
                         <div className="opacity-70 italic leading-relaxed font-medium space-y-2">
                            {item.content.cause.map((line, idx) => (
                              <p key={idx} dangerouslySetInnerHTML={{ __html: line }} />
                            ))}
                         </div>
                      </div>
                   </div>
                   <div className="space-y-6">
                      <div>
                         <p className="font-bold text-[#1a252f] mb-2 uppercase tracking-wider">{isEn ? "Strategic Loophole" : "الثغرة"}</p>
                         <div className="font-bold text-[#c0392b] italic leading-relaxed space-y-1">
                            {item.content.loophole.map((line, idx) => (
                              <p key={idx} dangerouslySetInnerHTML={{ __html: line }} />
                            ))}
                         </div>
                      </div>
                      <div>
                         <p className="font-bold text-[#1a252f] mb-2 uppercase tracking-wider">{isEn ? "Therapeutic Proposal" : "المقترح"}</p>
                         <ul className="font-bold leading-relaxed space-y-2 text-[#1a252f] list-decimal ps-4">
                            {item.content.proposal.map((line, idx) => (
                              <li key={idx} dangerouslySetInnerHTML={{ __html: line }} />
                            ))}
                         </ul>
                      </div>
                   </div>
                </div>
             </div>
           ))}
        </div>

        {/* 3. Static Roadmap Footer */}
        <div className="bg-[#f8f9fa] p-8 rounded-xl border border-[#e2e6ea] space-y-8 relative overflow-hidden" style={{ borderTop: `5px solid ${visualStatus.color}`, pageBreakInside: 'avoid' }}>
           <h4 className="text-[14px] font-bold text-[#1a252f] uppercase tracking-wider border-b border-[#e2e6ea] pb-4">
              {isEn ? "Therapeutic Roadmap" : "خارطة الطريق والمقترحات العلاجية"}
           </h4>

           <div className="grid md:grid-cols-3 gap-8 text-[12px] leading-relaxed text-[#333]">
              <div className="space-y-3">
                 <p className="font-bold text-[#1a252f] uppercase tracking-wider text-[12px]">{isEn ? "Initial Impression" : "الانطباع المبدئي"}</p>
                 <p className="font-medium text-slate-600" dangerouslySetInnerHTML={{ __html: recommendation.impression }} />
              </div>

              <div className="space-y-3 md:border-r md:border-l border-[#e2e6ea] md:px-8">
                 <p className="font-bold text-[#1a252f] uppercase tracking-wider text-[12px]">{isEn ? "Action Plan" : "بروتوكول العمل"}</p>
                 <div className="font-bold text-[#1a252f] space-y-3">
                    {recommendation.actionPlan.map((p, i) => (
                      <p key={i} dangerouslySetInnerHTML={{ __html: p }} />
                    ))}
                 </div>
              </div>

              <div className="space-y-4 text-center md:text-start">
                 <p className="font-bold text-[#1a252f] uppercase tracking-wider text-[12px]">{isEn ? "Next Step" : "الخطوة القادمة"}</p>
                 <div 
                   className="inline-block px-5 py-2 rounded-lg font-bold text-white text-[11px] uppercase shadow-md"
                   style={{ backgroundColor: recommendation.isSevere ? '#c0392b' : visualStatus.color }}
                 >
                    {recommendation.nextStep}
                 </div>
                 <p className="text-[12px] font-bold text-[#c0392b] border-t-2 border-red-50 pt-3">
                    تنبيه هام: لا تستخدم أي علاج دوائي تماماً بدون استشارة طبيب متخصص.<br />
                    Important: Do not use any medication without consulting a specialist.
                 </p>
              </div>
           </div>
        </div>

        {/* Footer Watermark */}
        <div className="flex justify-between items-end pt-4 border-t border-gray-100 opacity-20 text-[8px] font-bold uppercase tracking-[0.3em]">
           <span>{isEn ? "BDI-II Official Protocol" : "معايير بيك الإكلينيكية"}</span>
           <span>V11.2.0-PRO</span>
        </div>
      </div>
    </div>
  );
};

export default ReportScreen;