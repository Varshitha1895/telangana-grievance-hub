
import React from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useLanguage } from '../contexts/LanguageContext';

const LanguageSelector: React.FC = () => {
  const { language, setLanguage, t, availableLanguages } = useLanguage();

  return (
    <Select value={language} onValueChange={setLanguage}>
      <SelectTrigger className="w-full">
        <SelectValue placeholder={t('Select Language')} />
      </SelectTrigger>
      <SelectContent className="bg-white border shadow-lg z-50">
        {availableLanguages.map((lang) => (
          <SelectItem key={lang.code} value={lang.code} className="cursor-pointer hover:bg-gray-100">
            <div className="flex items-center gap-2">
              <span>{lang.flag}</span>
              <span>{lang.name}</span>
            </div>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default LanguageSelector;
