
export type Language = 'en' | 'ar';

export interface AssessmentOption {
  value: number;
  labelEn: string;
  labelAr: string;
}

export interface AssessmentQuestion {
  id: number;
  categoryEn: string;
  categoryAr: string;
  options: AssessmentOption[];
}

export interface UserAnswers {
  [key: number]: number;
}

export interface LeadData {
  firstName: string;
  lastName: string;
  age: string;
  email: string;
  occupation: string;
  agreedToTerms: boolean;
}

export type Phase = 'entry' | 'evaluation' | 'feedback' | 'lead' | 'report';

export interface SeverityLevel {
  min: number;
  max: number;
  labelEn: string;
  labelAr: string;
  color: string;
  descriptionEn: string;
  descriptionAr: string;
  adviceEn: string;
  adviceAr: string;
}
