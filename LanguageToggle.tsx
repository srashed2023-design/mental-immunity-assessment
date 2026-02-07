
import React from 'react';
import { Language } from '../types';

interface Props {
  lang: Language;
  onToggle: () => void;
}

const LanguageToggle: React.FC<Props> = ({ lang, onToggle }) => {
  return (
    <button
      onClick={onToggle}
      className="flex items-center gap-2 px-4 py-2 rounded-full border border-[#AA1212]/20 hover:bg-[#AA1212] hover:text-white transition-all duration-300 font-medium text-[#AA1212]"
    >
      <span className="text-sm uppercase">{lang === 'en' ? 'العربية' : 'English'}</span>
    </button>
  );
};

export default LanguageToggle;
