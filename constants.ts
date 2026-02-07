
import { AssessmentQuestion, SeverityLevel } from './types';

export interface AssessmentQuestionExtended extends AssessmentQuestion {
  domainEn: string;
  domainAr: string;
}

export const BDI_QUESTIONS: AssessmentQuestionExtended[] = [
  {
    id: 1, categoryEn: "Sadness", categoryAr: "الحزن", domainEn: "Emotional", domainAr: "عاطفي",
    options: [
      { value: 0, labelEn: "I do not feel sad.", labelAr: "لا أشعر بالحزن." },
      { value: 1, labelEn: "I feel sad much of the time.", labelAr: "أشعر بالحزن أغلب الوقت." },
      { value: 2, labelEn: "I am sad all the time and I can't snap out of it.", labelAr: "أنا حزين طوال الوقت ولا أستطيع الخروج من هذه الحالة." },
      { value: 3, labelEn: "I am so sad or unhappy that I can't stand it.", labelAr: "أنا حزين جداً لدرجة أنني لا أستطيع الاحتمال." }
    ]
  },
  {
    id: 2, categoryEn: "Pessimism", categoryAr: "التشاؤم", domainEn: "Emotional", domainAr: "عاطفي",
    options: [
      { value: 0, labelEn: "I am not discouraged about my future.", labelAr: "لست محبطاً بشأن مستقبلي." },
      { value: 1, labelEn: "I feel more discouraged about my future than I used to be.", labelAr: "أشعر بإحباط تجاه مستقبلي أكثر من ذي قبل." },
      { value: 2, labelEn: "I do not expect things to work out for me.", labelAr: "لا أتوقع أن تتحسن الأمور بالنسبة لي." },
      { value: 3, labelEn: "I feel my future is hopeless and will only get worse.", labelAr: "أشعر أن مستقبلي ميؤوس منه وسيزداد سوءاً." }
    ]
  },
  {
    id: 3, categoryEn: "Past Failure", categoryAr: "الفشل السابق", domainEn: "Cognitive", domainAr: "معرفي",
    options: [
      { value: 0, labelEn: "I do not feel like a failure.", labelAr: "لا أشعر أنني فاشل." },
      { value: 1, labelEn: "I have failed more than I should have.", labelAr: "لقد فشلت أكثر مما ينبغي." },
      { value: 2, labelEn: "As I look back, I see a lot of failures.", labelAr: "عندما أنظر للماضي، أرى الكثير من الإخفاقات." },
      { value: 3, labelEn: "I feel I am a total failure as a person.", labelAr: "أشعر أنني فاشل تماماً كإنسان." }
    ]
  },
  {
    id: 4, categoryEn: "Loss of Pleasure", categoryAr: "فقدان المتعة", domainEn: "Emotional", domainAr: "عاطفي",
    options: [
      { value: 0, labelEn: "I get as much pleasure as I ever did from the things I enjoy.", labelAr: "أحصل على نفس القدر من المتعة كالمعتاد." },
      { value: 1, labelEn: "I don't enjoy things as much as I used to.", labelAr: "لا أستمتع بالأشياء كما كنت في السابق." },
      { value: 2, labelEn: "I get very little pleasure from the things I used to enjoy.", labelAr: "أحصل على قدر ضئيل جداً من المتعة من الأشياء التي كنت أحبها." },
      { value: 3, labelEn: "I can't get any pleasure from the things I used to enjoy.", labelAr: "لا أستطيع الحصول على أي متعة على الإطلاق." }
    ]
  },
  {
    id: 5, categoryEn: "Guilty Feelings", categoryAr: "الشعور بالذنب", domainEn: "Cognitive", domainAr: "معرفي",
    options: [
      { value: 0, labelEn: "I don't feel particularly guilty.", labelAr: "لا أشعر بالذنب بشكل خاص." },
      { value: 1, labelEn: "I feel guilty over many things I have done or should have done.", labelAr: "أشعر بالذنب تجاه أشياء كثيرة فعلتها أو كان يجب فعلها." },
      { value: 2, labelEn: "I feel quite guilty most of the time.", labelAr: "أشعر بالذنب الشديد معظم الوقت." },
      { value: 3, labelEn: "I feel guilty all of the time.", labelAr: "أشعر بالذنب طوال الوقت." }
    ]
  },
  {
    id: 6, categoryEn: "Punishment Feelings", categoryAr: "الشعور بالعقاب", domainEn: "Cognitive", domainAr: "معرفي",
    options: [
      { value: 0, labelEn: "I don't feel I am being punished.", labelAr: "لا أشعر بأنني أتلقى عقاباً." },
      { value: 1, labelEn: "I feel I may be punished.", labelAr: "أشعر أنني قد أُعاقب." },
      { value: 2, labelEn: "I expect to be punished.", labelAr: "أتوقع أن أُعاقب." },
      { value: 3, labelEn: "I feel I am being punished.", labelAr: "أشعر أنني أُعاقب الآن." }
    ]
  },
  {
    id: 7, categoryEn: "Self-Dislike", categoryAr: "عدم الرضا عن الذات", domainEn: "Cognitive", domainAr: "معرفي",
    options: [
      { value: 0, labelEn: "I feel the same about myself as ever.", labelAr: "أشعر تجاه نفسي كما كنت دائماً." },
      { value: 1, labelEn: "I have lost confidence in myself.", labelAr: "لقد فقدت الثقة في نفسي." },
      { value: 2, labelEn: "I am disappointed in myself.", labelAr: "أنا محبط من نفسي." },
      { value: 3, labelEn: "I dislike myself.", labelAr: "أنا أكره نفسي." }
    ]
  },
  {
    id: 8, categoryEn: "Self-Criticalness", categoryAr: "نقد الذات", domainEn: "Cognitive", domainAr: "معرفي",
    options: [
      { value: 0, labelEn: "I don't criticize or blame myself more than usual.", labelAr: "لا أنتقد أو ألوم نفسي أكثر من المعتاد." },
      { value: 1, labelEn: "I am more critical of myself than I used to be.", labelAr: "أنا أنتقد نفسي أكثر مما كنت أفعل." },
      { value: 2, labelEn: "I criticize myself for all of my faults.", labelAr: "أنا أنتقد نفسي على كل أخطائي." },
      { value: 3, labelEn: "I blame myself for everything bad that happens.", labelAr: "ألوم نفسي على كل شيء سيء يحدث." }
    ]
  },
  {
    id: 9, categoryEn: "Suicidal Thoughts", categoryAr: "الأفكار الانتحارية", domainEn: "Cognitive", domainAr: "معرفي",
    options: [
      { value: 0, labelEn: "I don't have any thoughts of killing myself.", labelAr: "ليس لدي أي أفكار حول قتل نفسي." },
      { value: 1, labelEn: "I have thoughts of killing myself, but I would not carry them out.", labelAr: "لدي أفكار حول قتل نفسي، لكني لن أفعل ذلك." },
      { value: 2, labelEn: "I would like to kill myself.", labelAr: "أود أن أقتل نفسي." },
      { value: 3, labelEn: "I would kill myself if I had the chance.", labelAr: "سأقتل نفسي إذا أتيحت لي الفرصة." }
    ]
  },
  {
    id: 10, categoryEn: "Crying", categoryAr: "البكاء", domainEn: "Emotional", domainAr: "عاطفي",
    options: [
      { value: 0, labelEn: "I don't cry anymore than I used to.", labelAr: "لا أبكي أكثر مما كنت أفعل." },
      { value: 1, labelEn: "I cry more than I used to.", labelAr: "أبكي أكثر من المعتاد." },
      { value: 2, labelEn: "I cry over every little thing.", labelAr: "أبكي على كل شيء صغير." },
      { value: 3, labelEn: "I feel like crying, but I can't.", labelAr: "أشعر برغبة في البكاء، لكني لا أستطيع." }
    ]
  },
  {
    id: 11, categoryEn: "Agitation", categoryAr: "الهياج أو القلق", domainEn: "Emotional", domainAr: "عاطفي",
    options: [
      { value: 0, labelEn: "I am no more restless or wound up than usual.", labelAr: "لست قلقاً أو متوتراً أكثر من المعتاد." },
      { value: 1, labelEn: "I feel more restless or wound up than usual.", labelAr: "أشعر بتوتر أو قلق أكثر من المعتاد." },
      { value: 2, labelEn: "I am so restless or agitated that it's hard to stay still.", labelAr: "أنا قلق جداً لدرجة يصعب معها البقاء ساكناً." },
      { value: 3, labelEn: "I am so restless or agitated that I have to keep moving.", labelAr: "أنا قلق جداً لدرجة أنني يجب أن أبقى متحركاً باستمرار." }
    ]
  },
  {
    id: 12, categoryEn: "Loss of Interest", categoryAr: "فقدان الاهتمام", domainEn: "Emotional", domainAr: "عاطفي",
    options: [
      { value: 0, labelEn: "I have not lost interest in other people or activities.", labelAr: "لم أفقد الاهتمام بالآخرين أو بالأنشطة." },
      { value: 1, labelEn: "I am less interested in other people or things than I used to be.", labelAr: "أنا أقل اهتماماً بالآخرين أو بالأشياء مما كنت." },
      { value: 2, labelEn: "I have lost most of my interest in other people or things.", labelAr: "لقد فقدت معظم اهتمامي بالآخرين أو بالأشياء." },
      { value: 3, labelEn: "It's hard to get interested in anything.", labelAr: "من الصعب الاهتمام بأي شيء على الإطلاق." }
    ]
  },
  {
    id: 13, categoryEn: "Indecisiveness", categoryAr: "التردد", domainEn: "Emotional", domainAr: "عاطفي",
    options: [
      { value: 0, labelEn: "I make decisions about as well as ever.", labelAr: "أتخذ قراراتي بشكل جيد كالمعتاد." },
      { value: 1, labelEn: "I find it more difficult to make decisions than usual.", labelAr: "أجد صعوبة في اتخاذ القرارات أكثر من المعتاد." },
      { value: 2, labelEn: "I have much greater difficulty in making decisions than I used to.", labelAr: "أجد صعوبة كبيرة جداً في اتخاذ القرارات مقارنة بالسابق." },
      { value: 3, labelEn: "I have trouble making any decisions.", labelAr: "أواجه مشكلة كبيرة في اتخاذ أي قرار." }
    ]
  },
  {
    id: 14, categoryEn: "Worthlessness", categoryAr: "عدم القيمة", domainEn: "Cognitive", domainAr: "معرفي",
    options: [
      { value: 0, labelEn: "I do not feel I am worthless.", labelAr: "لا أشعر أنني بلا قيمة." },
      { value: 1, labelEn: "I don't consider myself as worthwhile and useful as I used to be.", labelAr: "لا أعتبر نفسي مفيداً وذا قيمة كما كنت." },
      { value: 2, labelEn: "I feel more worthless as compared to other people.", labelAr: "أشعر أنني أقل قيمة مقارنة بالآخرين." },
      { value: 3, labelEn: "I feel utterly worthless.", labelAr: "أشعر أنني عديم القيمة تماماً." }
    ]
  },
  {
    id: 15, categoryEn: "Loss of Energy", categoryAr: "فقدان الطاقة", domainEn: "Physical", domainAr: "جسدي",
    options: [
      { value: 0, labelEn: "I have as much energy as ever.", labelAr: "لدي نفس القدر من الطاقة كالمعتاد." },
      { value: 1, labelEn: "I have less energy than I used to have.", labelAr: "لدي طاقة أقل مما كان لدي في السابق." },
      { value: 2, labelEn: "I don't have enough energy to do very much.", labelAr: "ليس لدي طاقة كافية لفعل الكثير من الأشياء." },
      { value: 3, labelEn: "I don't have enough energy to do anything.", labelAr: "ليس لدي طاقة لفعل أي شيء." }
    ]
  },
  {
    id: 16, categoryEn: "Sleep Changes", categoryAr: "تغيرات النوم", domainEn: "Physical", domainAr: "جسدي",
    options: [
      { value: 0, labelEn: "I have not experienced any change in my sleep.", labelAr: "لم أواجه أي تغير في نمط نومي." },
      { value: 1, labelEn: "I sleep a bit more/less than usual.", labelAr: "أنام أكثر أو أقل من المعتاد بقليل." },
      { value: 2, labelEn: "I sleep a lot more/less than usual.", labelAr: "أنام أكثر أو أقل من المعتاد بكثير." },
      { value: 3, labelEn: "I sleep most of the day / I wake up too early.", labelAr: "أنام معظم اليوم / أو أستيقظ مبكراً جداً ولا أستطيع العودة للنوم." }
    ]
  },
  {
    id: 17, categoryEn: "Irritability", categoryAr: "سرعة الانفعال", domainEn: "Physical", domainAr: "جسدي",
    options: [
      { value: 0, labelEn: "I am no more irritable than usual.", labelAr: "لست سريع الانفعال أكثر من المعتاد." },
      { value: 1, labelEn: "I am more irritable than usual.", labelAr: "أنا سريع الانفعال أكثر من المعتاد." },
      { value: 2, labelEn: "I am much more irritable than usual.", labelAr: "أنا سريع الانفعال بشكل ملحوظ مقارنة بالسابق." },
      { value: 3, labelEn: "I am irritable all the time.", labelAr: "أنا سريع الانفعال طوال الوقت." }
    ]
  },
  {
    id: 18, categoryEn: "Appetite Changes", categoryAr: "تغيرات الشهية", domainEn: "Physical", domainAr: "جسدي",
    options: [
      { value: 0, labelEn: "I have not experienced any change in my appetite.", labelAr: "لم أواجه أي تغير في شهيتي." },
      { value: 1, labelEn: "My appetite is somewhat less/greater than usual.", labelAr: "شهيتي أقل أو أكثر من المعتاد بقليل." },
      { value: 2, labelEn: "My appetite is much less/greater than usual.", labelAr: "شهيتي أقل أو أكثر من المعتاد بكثير." },
      { value: 3, labelEn: "I have no appetite at all / I want to eat all the time.", labelAr: "ليس لدي شهية على الإطلاق / أو أريد الأكل طوال الوقت." }
    ]
  },
  {
    id: 19, categoryEn: "Concentration Difficulty", categoryAr: "صعوبة التركيز", domainEn: "Physical", domainAr: "جسدي",
    options: [
      { value: 0, labelEn: "I can concentrate as well as ever.", labelAr: "أستطيع التركيز كما كنت دائماً." },
      { value: 1, labelEn: "I can't concentrate as well as usual.", labelAr: "لا أستطيع التركيز كما هو المعتاد." },
      { value: 2, labelEn: "It's hard to keep my mind on anything for very long.", labelAr: "من الصعب التركيز على أي شيء لفترة طويلة." },
      { value: 3, labelEn: "I find I can't concentrate on anything.", labelAr: "أجد أنني لا أستطيع التركيز على أي شيء." }
    ]
  },
  {
    id: 20, categoryEn: "Tiredness or Fatigue", categoryAr: "التعب أو الإرهاق", domainEn: "Physical", domainAr: "جسدي",
    options: [
      { value: 0, labelEn: "I am no more tired or fatigued than usual.", labelAr: "لست متعباً أكثر من المعتاد." },
      { value: 1, labelEn: "I get tired or fatigued more easily than usual.", labelAr: "أشعر بالتعب بسهولة أكبر من المعتاد." },
      { value: 2, labelEn: "I am too tired or fatigued to do things I used to do.", labelAr: "أنا متعب جداً لدرجة لا أستطيع معها فعل الكثير مما كنت أفعل." },
      { value: 3, labelEn: "I am too tired or fatigued to do anything.", labelAr: "أنا متعب جداً لدرجة لا أستطيع فعل أي شيء." }
    ]
  },
  {
    id: 21, categoryEn: "Interest in Sex", categoryAr: "الاهتمام بالجنس", domainEn: "Physical", domainAr: "جسدي",
    options: [
      { value: 0, labelEn: "I have not noticed any change in my interest in sex.", labelAr: "لم ألاحظ أي تغير في اهتمامي بالجنس." },
      { value: 1, labelEn: "I am less interested in sex than I used to be.", labelAr: "أنا أقل اهتماماً بالجنس مما كنت عليه." },
      { value: 2, labelEn: "I am much less interested in sex now.", labelAr: "أنا أقل اهتماماً بالجنس بشكل ملحوظ الآن." },
      { value: 3, labelEn: "I have lost interest in sex completely.", labelAr: "لقد فقدت الاهتمام بالجنس تماماً." }
    ]
  }
];

export const SEVERITY_LEVELS: SeverityLevel[] = [
  {
    min: 0, max: 9, labelEn: "No Depression", labelAr: "لا يوجد اكتئاب",
    color: "#22C55E", 
    descriptionEn: "Your score suggests minimal emotional fluctuations. You have strong mental immunity.",
    descriptionAr: "حالتك مستقرة. تشير النتائج إلى أنك لا تعاني من أعراض اكتئاب حالياً.",
    adviceEn: "Continue your healthy routines and mindfulness practices.",
    adviceAr: "استمر في روتينك الصحي وممارسة اليقظة الذهنية."
  },
  {
    min: 10, max: 15, labelEn: "Mild Depression", labelAr: "اكتئاب بسيط",
    color: "#1abc9c", 
    descriptionEn: "Mild depressive symptoms detected. Your 'mental battery' might need recharging.",
    descriptionAr: "تعاني من أعراض اكتئاب بسيطة. ينصح بالمتابعة الذاتية والاهتمام بالصحة النفسية.",
    adviceEn: "Prioritize self-care, quality sleep, and social connections.",
    adviceAr: "أعطِ الأولوية للرعاية الذاتية والروابط الاجتماعية."
  },
  {
    min: 16, max: 23, labelEn: "Moderate Depression", labelAr: "اكتئاب متوسط",
    color: "#f1c40f", 
    descriptionEn: "Significant depressive symptoms detected. Professional guidance is advised.",
    descriptionAr: "هناك مؤشرات على اكتئاب متوسط. ينصح بشدة بالمتابعة مع مختص لتقييم الحالة بشكل أدق.",
    adviceEn: "Consider talking to a counselor to prevent further decline.",
    adviceAr: "فكر في التحدث إلى مستشار نفسي لمنع تدهور الحالة."
  },
  {
    min: 24, max: 36, labelEn: "Severe Depression", labelAr: "اكتئاب شديد",
    color: "#e67e22", 
    descriptionEn: "High severity depressive symptoms. Professional consultation is strongly recommended.",
    descriptionAr: "تعاني من أعراض اكتئاب شديدة. ينصح بضرورة مراجعة مختص نفسي في أقرب وقت.",
    adviceEn: "Reach out to a psychologist for a structured therapeutic plan.",
    adviceAr: "تواصل مع أخصائي نفسي لوضع خطة علاجية منظمة."
  },
  {
    min: 37, max: 63, labelEn: "Very Severe Depression", labelAr: "اكتئاب شديد جداً",
    color: "#c0392b", 
    descriptionEn: "Immediate clinical support is strongly advised. Extreme severity detected.",
    descriptionAr: "تحذير: النتائج تشير إلى أعراض حادة جداً. التدخل المهني الفوري ضروري جداً.",
    adviceEn: "Seek professional medical help immediately.",
    adviceAr: "اطلب المساعدة الطبية المهنية فوراً."
  }
];
