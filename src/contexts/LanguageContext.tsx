
import React, { createContext, useContext, useState, ReactNode } from 'react';

interface LanguageContextType {
  language: string;
  setLanguage: (lang: string) => void;
  toggleLanguage: () => void;
  t: (key: string) => string;
  availableLanguages: Array<{code: string, name: string, flag: string}>;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const translations = {
  en: {
    'Secure Login to Continue': 'Secure Login to Continue',
    'Please enter a valid 10-digit mobile number': 'Please enter a valid 10-digit mobile number',
    'Please fill in all fields': 'Please fill in all fields',
    'Invalid email or password': 'Invalid email or password',
    'Login with Mobile': 'Login with Mobile',
    'Login with Email': 'Login with Email',
    'Enter 10-digit mobile number': 'Enter 10-digit mobile number',
    'Login': 'Login',
    'Signing In...': 'Signing In...',
    'Enter your full name': 'Enter your full name',
    'Email Address': 'Email Address',
    'Password': 'Password',
    'Sign In': 'Sign In',
    'Phone': 'Phone',
    'Email': 'Email',
    "Don't have an account?": "Don't have an account?",
    'Sign Up': 'Sign Up',
    'Select Language': 'Select Language',
    'Processing...': 'Processing...',
    'Login failed. Please try again.': 'Login failed. Please try again.',
    'Full name is required': 'Full name is required'
  },
  te: {
    'Secure Login to Continue': 'కొనసాగించడానికి సురక్షితంగా ప్రవేశించండి',
    'Please enter a valid 10-digit mobile number': 'దయచేసి చెల్లుబాటు అయ్యే 10 అంకెల మొబైల్ నంబర్‌ను నమోదు చేయండి',
    'Please fill in all fields': 'దయచేసి అన్ని ఫీల్డ్‌లను పూరించండి',
    'Invalid email or password': 'చెల్లని ఇమెయిల్ లేదా పాస్‌వర్డ్',
    'Login with Mobile': 'మొబైల్‌తో లాగిన్',
    'Login with Email': 'ఇమెయిల్‌తో లాగిన్',
    'Enter 10-digit mobile number': '10 అంకెల మొబైల్ నంబర్‌ను నమోదు చేయండి',
    'Login': 'లాగిన్',
    'Signing In...': 'సైన్ ఇన్ చేస్తోంది...',
    'Enter your full name': 'మీ పూర్తి పేరు నమోదు చేయండి',
    'Email Address': 'ఇమెయిల్ చిరునామా',
    'Password': 'పాస్‌వర్డ్',
    'Sign In': 'సైన్ ఇన్',
    'Phone': 'ఫోన్',
    'Email': 'ఇమెయిల్',
    "Don't have an account?": 'ఖాతా లేదా?',
    'Sign Up': 'సైన్ అప్',
    'Select Language': 'భాష ఎంచుకోండి',
    'Processing...': 'ప్రాసెస్ చేస్తోంది...',
    'Login failed. Please try again.': 'లాగిన్ విఫలమైంది. దయచేసి మళ్ళీ ప్రయత్నించండి.',
    'Full name is required': 'పూర్తి పేరు అవసరం'
  },
  hi: {
    'Secure Login to Continue': 'जारी रखने के लिए सुरक्षित लॉगिन',
    'Please enter a valid 10-digit mobile number': 'कृपया एक मान्य 10-अंकीय मोबाइल नंबर दर्ज करें',
    'Please fill in all fields': 'कृपया सभी फ़ील्ड भरें',
    'Invalid email or password': 'अमान्य ईमेल या पासवर्ड',
    'Login with Mobile': 'मोबाइल से लॉगिन',
    'Login with Email': 'ईमेल से लॉगिन',
    'Enter 10-digit mobile number': '10-अंकीय मोबाइल नंबर दर्ज करें',
    'Login': 'लॉगिन',
    'Signing In...': 'साइन इन हो रहा है...',
    'Enter your full name': 'अपना पूरा नाम दर्ज करें',
    'Email Address': 'ईमेल पता',
    'Password': 'पासवर्ड',
    'Sign In': 'साइन इन',
    'Phone': 'फोन',
    'Email': 'ईमेल',
    "Don't have an account?": 'खाता नहीं है?',
    'Sign Up': 'साइन अप',
    'Select Language': 'भाषा चुनें',
    'Processing...': 'प्रोसेसिंग...',
    'Login failed. Please try again.': 'लॉगिन विफल। कृपया पुनः प्रयास करें।',
    'Full name is required': 'पूरा नाम आवश्यक है'
  },
  ta: {
    'Secure Login to Continue': 'தொடர பாதுகாப்பான உள்நுழைவு',
    'Please enter a valid 10-digit mobile number': 'தயவுசெய்து சரியான 10 இலக்க மொபைல் எண்ணை உள்ளிடவும்',
    'Please fill in all fields': 'தயவுசெய்து அனைத்து புலங்களையும் நிரப்பவும்',
    'Invalid email or password': 'தவறான ईमेल் அல்லது கடவுச்சொல்',
    'Login with Mobile': 'மொபைலில் உள்நுழைய',
    'Login with Email': 'ईमेல் மூலம் உள்நுழைய',
    'Enter 10-digit mobile number': '10 இலக்க மொபைல் எண்ணை உள்ளிடவும்',
    'Login': 'உள்நுழைய',
    'Signing In...': 'உள்நுழைகிறது...',
    'Enter your full name': 'உங்கள் முழுப் பெயரை உள்ளிடவும்',
    'Email Address': 'மின்னஞ்சல் முகவரி',
    'Password': 'கடவுச்சொல்',
    'Sign In': 'உள்நுழைய',
    'Phone': 'ফোন',
    'Email': 'மின்னஞ்சல்',
    "Don't have an account?": 'கணக்கு இல்லையா?',
    'Sign Up': 'பதிவு செய்க',
    'Select Language': 'மொழியைத் தேர்ந்தெடுக்கவும்',
    'Processing...': 'செயலாக்கம்...',
    'Login failed. Please try again.': 'உள்நুழைவு தோல்வியுற்றது. மீண்டும் முயற்சிக்கவும்.',
    'Full name is required': 'முழுப் பெயர் தேவை'
  },
  kn: {
    'Secure Login to Continue': 'ಮುಂದುವರಿಸಲು ಸುರಕ್ಷಿತ ಲಾಗಿನ್',
    'Please enter a valid 10-digit mobile number': 'ದಯವಿಟ್ಟು ಮಾನ್ಯವಾದ 10-ಅಂಕಿಯ ಮೊಬೈಲ್ ಸಂಖ್ಯೆಯನ್ನು ನಮೂದಿಸಿ',
    'Please fill in all fields': 'ದಯವಿಟ್ಟು ಎಲ್ಲಾ ಕ್ಷೇತ್ರಗಳನ್ನು ಭರ್ತಿ ಮಾಡಿ',
    'Invalid email or password': 'ಅಮಾನ್ಯ ಇಮೇಲ್ ಅಥವಾ ಪಾಸ್‌ವರ್ಡ್',
    'Login with Mobile': 'ಮೊಬೈಲ್‌ನೊಂದಿಗೆ ಲಾಗಿನ್',
    'Login with Email': 'ಇಮೇಲ್‌ನೊಂದಿಗೆ ಲಾಗಿನ್',
    'Enter 10-digit mobile number': '10-ಅಂಕಿಯ ಮೊಬೈಲ್ ಸಂಖ್ಯೆಯನ್ನು ನಮೂದಿಸಿ',
    'Login': 'ಲಾಗಿನ್',
    'Signing In...': 'ಸೈನ್ ಇನ್ ಮಾಡಲಾಗುತ್ತಿದೆ...',
    'Enter your full name': 'ನಿಮ್ಮ ಪೂರ್ಣ ಹೆಸರನ್ನು ನಮೂದಿಸಿ',
    'Email Address': 'ಇಮೇಲ್ ವಿಳಾಸ',
    'Password': 'ಪಾಸ್‌ವರ್ಡ್',
    'Sign In': 'ಸೈನ್ ಇನ್',
    'Phone': 'ಫೋನ್',
    'Email': 'ಇಮೇಲ್',
    "Don't have an account?": 'ಖಾತೆ ಇಲ್ಲವೇ?',
    'Sign Up': 'ಸೈನ್ ಅಪ್',
    'Select Language': 'ಭಾಷೆ ಆಯ್ಕೆಮಾಡಿ',
    'Processing...': 'ಸಂಸ್ಕರಿಸಲಾಗುತ್ತಿದೆ...',
    'Login failed. Please try again.': 'ಲಾಗಿನ್ ವಿಫಲವಾಗಿದೆ. ದಯವಿಟ್ಟು ಮತ್ತೆ ಪ್ರಯತ್ನಿಸಿ.',
    'Full name is required': 'ಪೂರ್ಣ ಹೆಸರು ಅಗತ್ಯವಿದೆ'
  },
  ml: {
    'Secure Login to Continue': 'തുടരാൻ സുരക്ഷിത ലോഗിൻ',
    'Please enter a valid 10-digit mobile number': 'ദയവായി സാധുവായ 10 അക്ക മൊബൈൽ നമ്പർ നൽകുക',
    'Please fill in all fields': 'ദയവായി എല്ലാ ഫീൽഡുകളും പൂരിപ്പിക്കുക',
    'Invalid email or password': 'അസാധുവായ ഇമെയിൽ അല്ലെങ്കിൽ പാസ്‌വേഡ്',
    'Login with Mobile': 'മൊബൈൽ ഉപയോഗിച്ച് ലോഗിൻ',
    'Login with Email': 'ഇമെയിൽ ഉപയോഗിച്ച് ലോഗിൻ',
    'Enter 10-digit mobile number': '10 അക്ക മൊബൈൽ നമ്പർ നൽകുക',
    'Login': 'ലോഗിൻ',
    'Signing In...': 'സൈൻ ഇൻ ചെയ്യുന്നു...',
    'Enter your full name': 'നിങ്ങളുടെ പൂർണ്ണ നാമം നൽകുക',
    'Email Address': 'ഇമെയിൽ വിലാസം',
    'Password': 'പാസ്‌വേഡ്',
    'Sign In': 'സൈൻ ഇൻ',
    'Phone': 'ഫോൺ',
    'Email': 'ഇമെയിൽ',
    "Don't have an account?": 'അക്കൗണ്ട് ഇല്ലേ?',
    'Sign Up': 'സൈൻ അപ്പ്',
    'Select Language': 'ഭാഷ തിരഞ്ഞെടുക്കുക',
    'Processing...': 'പ്രോസസ്സിംഗ്...',
    'Login failed. Please try again.': 'ലോഗിൻ പരാജയപ്പെട്ടു. ദയവായി വീണ്ടും ശ്രമിക്കുക.',
    'Full name is required': 'പൂർണ്ണ നാമം ആവശ്യമാണ്'
  },
  gu: {
    'Secure Login to Continue': 'ચાલુ રાખવા માટે સુરક્ષિત લોગિન',
    'Please enter a valid 10-digit mobile number': 'કૃપા કરીને માન્ય 10-અંકનો મોબાઇલ નંબર દાખલ કરો',
    'Please fill in all fields': 'કૃપા કરીને બધા ક્ષેત્રો ભરો',
    'Invalid email or password': 'અમાન્ય ઇમેઇલ અથવા પાસવર્ડ',
    'Login with Mobile': 'મોબાઇલ સાથે લોગિન',
    'Login with Email': 'ઇમેઇલ સાથે લોગિન',
    'Enter 10-digit mobile number': '10-અંકનો મોબાઇલ નંબર દાખલ કરો',
    'Login': 'લોગિન',
    'Signing In...': 'સાઇન ઇન થઈ રહ્યું છે...',
    'Enter your full name': 'તમારું પૂરું નામ દાખલ કરો',
    'Email Address': 'ઇમેઇલ સરનામું',
    'Password': 'પાસવર્ડ',
    'Sign In': 'સાઇન ઇન',
    'Phone': 'ફોન',
    'Email': 'ઇમેઇલ',
    "Don't have an account?": 'એકાઉન્ટ નથી?',
    'Sign Up': 'સાઇન અપ',
    'Select Language': 'ભાષા પસંદ કરો',
    'Processing...': 'પ્રોસેસિંગ...',
    'Login failed. Please try again.': 'લોગિન નિષ્ફળ. કૃપા કરીને ફરી પ્રયાસ કરો.',
    'Full name is required': 'પૂરું નામ જરૂરી છે'
  },
  mr: {
    'Secure Login to Continue': 'सुरू ठेवण्यासाठी सुरक्षित लॉगिन',
    'Please enter a valid 10-digit mobile number': 'कृपया वैध 10-अंकी मोबाइल नंबर प्रविष्ट करा',
    'Please fill in all fields': 'कृपया सर्व फील्ड भरा',
    'Invalid email or password': 'अवैध ईमेल किंवा पासवर्ड',
    'Login with Mobile': 'मोबाइलसह लॉगिन',
    'Login with Email': 'ईमेलसह लॉगिन',
    'Enter 10-digit mobile number': '10-अंकी मोबाइल नंबर प्रविष्ट करा',
    'Login': 'लॉगिन',
    'Signing In...': 'साइन इन करत आहे...',
    'Enter your full name': 'तुमचे पूर्ण नाव प्रविष्ट करा',
    'Email Address': 'ईमेल पत्ता',
    'Password': 'पासवर्ड',
    'Sign In': 'साइन इन',
    'Phone': 'फोन',
    'Email': 'ईमेल',
    "Don't have an account?": 'खाते नाही?',
    'Sign Up': 'साइन अप',
    'Select Language': 'भाषा निवडा',
    'Processing...': 'प्रक्रिया करत आहे...',
    'Login failed. Please try again.': 'लॉगिन अयशस्वी. कृपया पुन्हा प्रयत्न करा.',
    'Full name is required': 'पूर्ण नाव आवश्यक आहे'
  },
  bn: {
    'Secure Login to Continue': 'চালিয়ে যেতে নিরাপদ লগইন',
    'Please enter a valid 10-digit mobile number': 'অনুগ্রহ করে একটি বৈধ ১০-সংখ্যার মোবাইল নম্বর লিখুন',
    'Please fill in all fields': 'অনুগ্রহ করে সব ক্ষেত্র পূরণ করুন',
    'Invalid email or password': 'অবৈধ ইমেইল বা পাসওয়ার্ড',
    'Login with Mobile': 'মোবাইল দিয়ে লগইন',
    'Login with Email': 'ইমেইল দিয়ে লগইন',
    'Enter 10-digit mobile number': '১০-সংখ্যার মোবাইল নম্বর লিখুন',
    'Login': 'লগইন',
    'Signing In...': 'সাইন ইন হচ্ছে...',
    'Enter your full name': 'আপনার পূর্ণ নাম লিখুন',
    'Email Address': 'ইমেইল ঠিকানা',
    'Password': 'পাসওয়ার্ড',
    'Sign In': 'সাইন ইন',
    'Phone': 'ফোন',
    'Email': 'ইমেইল',
    "Don't have an account?": 'অ্যাকাউন্ট নেই?',
    'Sign Up': 'সাইন আপ',
    'Select Language': 'ভাষা নির্বাচন করুন',
    'Processing...': 'প্রক্রিয়াকরণ...',
    'Login failed. Please try again.': 'লগইন ব্যর্থ। অনুগ্রহ করে আবার চেষ্টা করুন।',
    'Full name is required': 'পূর্ণ নাম প্রয়োজন'
  }
};

const availableLanguages = [
  { code: 'en', name: 'English', flag: '🇺🇸' },
  { code: 'te', name: 'తెలుగు', flag: '🇮🇳' },
  { code: 'hi', name: 'हिंदी', flag: '🇮🇳' },
  { code: 'ta', name: 'தமிழ்', flag: '🇮🇳' },
  { code: 'kn', name: 'ಕನ್ನಡ', flag: '🇮🇳' },
  { code: 'ml', name: 'മലയാളം', flag: '🇮🇳' },
  { code: 'gu', name: 'ગુજરાતી', flag: '🇮🇳' },
  { code: 'mr', name: 'मराठी', flag: '🇮🇳' },
  { code: 'bn', name: 'বাংলা', flag: '🇧🇩' }
];

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState('en');

  const toggleLanguage = () => {
    setLanguage(prev => (prev === 'en' ? 'te' : 'en'));
  };

  const t = (key: string): string => {
    const translation = translations[language as keyof typeof translations]?.[key];
    if (typeof translation === 'string') {
      return translation;
    }
    // Fallback to English if current language translation is not found
    const fallback = translations['en'][key];
    if (typeof fallback === 'string') {
      return fallback;
    }
    // Return key if no translation found
    return key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, toggleLanguage, t, availableLanguages }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
