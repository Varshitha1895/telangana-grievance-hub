
import React, { createContext, useContext, useState, ReactNode } from 'react';

interface LanguageContextType {
  language: string;
  toggleLanguage: () => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const translations = {
  en: {
    'Secure Login to Continue': 'Secure Login to Continue',
    'Please enter a valid 10-digit mobile number': 'Please enter a valid 10-digit mobile number',
    'OTP sent successfully! Use 123456 for demo': 'OTP sent successfully! Use 123456 for demo',
    'Invalid OTP. Please try again.': 'Invalid OTP. Please try again.',
    'Please fill in all fields': 'Please fill in all fields',
    'Invalid email or password': 'Invalid email or password',
    'Enter Mobile Number': 'Enter Mobile Number',
    'Verify OTP': 'Verify OTP',
    'Email Login': 'Email Login',
    'Continue with Google': 'Continue with Google',
    'or': 'or',
    'Enter 10-digit mobile number': 'Enter 10-digit mobile number',
    'Sending OTP...': 'Sending OTP...',
    'Send OTP': 'Send OTP',
    'Enter 6-digit OTP': 'Enter 6-digit OTP',
    'Verifying...': 'Verifying...',
    'Verify & Login': 'Verify & Login',
    'Change Mobile Number': 'Change Mobile Number',
    'Email Address': 'Email Address',
    'Password': 'Password',
    'Sign In...': 'Sign In...',
    'Sign In': 'Sign In',
    'Phone': 'Phone',
    "Don't have an account?": "Don't have an account?",
    'Sign Up': 'Sign Up',
    'తెలుగు': 'తెలుగు',
    'English': 'English',
    'Create Account': 'Create Account',
    'Join Mee Saaradhi Platform': 'Join Mee Saaradhi Platform',
    'Aadhaar number must be 12 digits': 'Aadhaar number must be 12 digits',
    'Invalid PAN format': 'Invalid PAN format',
    'Profile Photo (Passport Size)': 'Profile Photo (Passport Size)',
    'Back': 'Back',
    'Creating Account...': 'Creating Account...',
    'An error occurred during signup': 'An error occurred during signup',
    'Google signup failed': 'Google signup failed',
    'Email is required': 'Email is required',
    'Password is required': 'Password is required',
    'Passwords do not match': 'Passwords do not match',
    'Full name is required': 'Full name is required',
    'Profile photo is required': 'Profile photo is required',
    'Failed to upload photo': 'Failed to upload photo',
    'already registered': 'Email already registered',
    'Personal Information': 'Personal Information',
    'Full Name': 'Full Name',
    'Age': 'Age',
    'Phone Number': 'Phone Number',
    'Date of Birth': 'Date of Birth',
    'Aadhaar Number (12 digits)': 'Aadhaar Number (12 digits)',
    'PAN Number': 'PAN Number',
    'Enter your full name': 'Enter your full name',
    'Hello! How can I help you today?': 'Hello! How can I help you today?',
    'Chat Support': 'Chat Support',
    "We're here to help!": "We're here to help!",
    'Type your message...': 'Type your message...',
    'Thank you for your message. Our support team will assist you shortly.': 'Thank you for your message. Our support team will assist you shortly.',
    'Complaint History': 'Complaint History',
    'Monitor and track all your grievances': 'Monitor and track all your grievances',
    'Search by complaint ID, description, or category...': 'Search by complaint ID, description, or category...',
    'All Categories': 'All Categories',
    'All Complaints': 'All Complaints',
    'No complaints found matching the selected filters.': 'No complaints found matching the selected filters.',
    'Filter by Category': 'Filter by Category',
    'User': 'User',
    'Welcome to Mee Saaradhi': 'Welcome to Mee Saaradhi',
    'Your Digital Grievance Platform': 'Your Digital Grievance Platform',
    'Logout': 'Logout',
    'File New Complaint': 'File New Complaint',
    'Report your grievance in just a few steps': 'Report your grievance in just a few steps',
    'Start': 'Start',
    'Complaint Categories': 'Complaint Categories',
    'Quick Actions': 'Quick Actions',
    'Pensions': 'Pensions',
    'Roads & Infrastructure': 'Roads & Infrastructure',
    'Health Services': 'Health Services',
    'Water Supply': 'Water Supply',
    'Electricity': 'Electricity',
    'Ration & PDS': 'Ration & PDS',
    'Service Guide': 'Service Guide',
    'Emergency Support': 'Emergency Support',
    'Admin Panel': 'Admin Panel'
  },
  te: {
    'Secure Login to Continue': 'కొనసాగించడానికి సురక్షితంగా ప్రవేశించండి',
    'Please enter a valid 10-digit mobile number': 'దయచేసి 10 అంకెల మొబైల్ నంబర్‌ను నమోదు చేయండి',
    'OTP sent successfully! Use 123456 for demo': 'OTP విజయవంతంగా పంపబడింది! డెమో కోసం 123456 ఉపయోగించండి',
    'Invalid OTP. Please try again.': 'చెల్లని OTP. దయచేసి మళ్ళీ ప్రయత్నించండి.',
    'Please fill in all fields': 'దయచేసి అన్ని ఫీల్డ్‌లను పూరించండి',
    'Invalid email or password': 'చెల్లని ఇమెయిల్ లేదా పాస్‌వర్డ్',
    'Enter Mobile Number': 'మొబైల్ నంబర్ నమోదు చేయండి',
    'Verify OTP': 'OTPని ధృవీకరించండి',
    'Email Login': 'ఇమెయిల్ లాగిన్',
    'Continue with Google': 'Googleతో కొనసాగించండి',
    'or': 'లేదా',
    'Enter 10-digit mobile number': '10 అంకెల మొబైల్ నంబర్‌ను నమోదు చేయండి',
    'Sending OTP...': 'OTP పంపబడుతోంది...',
    'Send OTP': 'OTP పంపండి',
    'Enter 6-digit OTP': '6-అంకెల OTPని నమోదు చేయండి',
    'Verifying...': 'ధృవీకరిస్తోంది...',
    'Verify & Login': 'ధృవీకరించి లాగిన్ అవ్వండి',
    'Change Mobile Number': 'మొబైల్ నంబర్ మార్చండి',
    'Email Address': 'ఇమెయిల్ చిరునామా',
    'Password': 'పాస్‌వర్డ్',
    'Sign In...': 'సైన్ ఇన్ చేస్తోంది...',
    'Sign In': 'సైన్ ఇన్',
    'Phone': 'ఫోన్',
    "Don't have an account?": 'ఖాతా లేదా?',
    'Sign Up': 'సైన్ అప్',
    'తెలుగు': 'తెలుగు',
    'English': 'ఆంగ్ల',
    'Create Account': 'ఖాతా సృష్టించు',
    'Join Mee Saaradhi Platform': 'Mee Saaradhi వేదికలో చేరండి',
    'Aadhaar number must be 12 digits': 'ఆధార్ నంబర్ 12 అంకెలు ఉండాలి',
    'Invalid PAN format': 'చెల్లని PAN ఫార్మాట్',
    'Profile Photo (Passport Size)': 'ప్రొఫైల్ ఫోటో (పాస్‌పోర్ట్ సైజు)',
    'Back': 'వెనుకకు',
    'Creating Account...': 'ఖాతా సృష్టిస్తోంది...',
    'An error occurred during signup': 'సైన్అప్ సమయంలో లోపం జరిగింది',
    'Google signup failed': 'Google సైన్అప్ విఫలమైంది',
    'Email is required': 'ఇమెయిల్ అవసరం',
    'Password is required': 'పాస్‌వర్డ్ అవసరం',
    'Passwords do not match': 'పాస్‌వర్డ్‌లు సరిపోలడం లేదు',
    'Full name is required': 'పూర్తి పేరు అవసరం',
    'Profile photo is required': 'ప్రొఫైల్ ఫోటో అవసరం',
    'Failed to upload photo': 'ఫోటో అప్‌లోడ్ చేయడం విఫలమైంది',
    'already registered': 'ఇమెయిల్ ఇప్పటికే నమోదు చేయబడింది',
    'Personal Information': 'వ్యక్తిగత సమాచారం',
    'Full Name': 'పూర్తి పేరు',
    'Age': 'వయస్సు',
    'Phone Number': 'ఫోన్ నంబర్',
    'Date of Birth': 'పుట్టిన తేది',
    'Aadhaar Number (12 digits)': 'ఆధార్ నంబర్ (12 అంకెలు)',
    'PAN Number': 'పాన్ నంబర్',
    'Enter your full name': 'మీ పూర్తి పేరు నమోదు చేయండి',
    'Hello! How can I help you today?': 'హలో! ఈ రోజు నేను మీకు ఎలా సహాయం చేయగలను?',
    'Chat Support': 'చాట్ మద్దతు',
    "We're here to help!": 'మేము సహాయం చేయడానికి ఇక్కడ ఉన్నాము!',
    'Type your message...': 'మీ సందేశాన్ని టైప్ చేయండి...',
    'Thank you for your message. Our support team will assist you shortly.': 'మీ సందేశానికి ధన్యవాదాలు. మా మద్దతు బృందం త్వరలో మీకు సహాయం చేస్తుంది.',
    'Complaint History': 'ఫిర్యాదు చరిత్ర',
    'Monitor and track all your grievances': 'మీ అన్ని ఫిర్యాదులను పర్యవేక్షించండి మరియు ట్రాక్ చేయండి',
    'Search by complaint ID, description, or category...': 'ఫిర్యాదు ID, వివరణ లేదా వర్గం ద్వారా వెతకండి...',
    'All Categories': 'అన్ని వర్గాలు',
    'All Complaints': 'అన్ని ఫిర్యాదులు',
    'No complaints found matching the selected filters.': 'ఎంచుకున్న ఫిల్టర్‌లకు సరిపోలే ఫిర్యాదులు కనుగొనబడలేదు.',
    'Filter by Category': 'వర్గం ద్వారా ఫిల్టర్ చేయండి',
    'User': 'వినియోగదారు',
    'Welcome to Mee Saaradhi': 'Mee Saaradhi కి స్వాగతం',
    'Your Digital Grievance Platform': 'మీ డిజిటల్ ఫిర్యాదు వేదిక',
    'Logout': 'లాగ్ అవుట్',
    'File New Complaint': 'కొత్త ఫిర్యాదు దాఖలు చేయండి',
    'Report your grievance in just a few steps': 'కేవలం కొన్ని దశల్లో మీ ఫిర్యాదును నివేదించండి',
    'Start': 'ప్రారంభించండి',
    'Complaint Categories': 'ఫిర్యాదు వర్గాలు',
    'Quick Actions': 'త్వరిత చర్యలు',
    'Pensions': 'పెన్షన్లు',
    'Roads & Infrastructure': 'రోడ్లు మరియు మౌలిక వసతులు',
    'Health Services': 'ఆరోగ్య సేవలు',
    'Water Supply': 'నీటి సరఫరా',
    'Electricity': 'విద్యుత్',
    'Ration & PDS': 'రేషన్ & PDS',
    'Service Guide': 'సేవా మార్గదర్శి',
    'Emergency Support': 'అత్యవసర మద్దతు',
    'Admin Panel': 'అడ్మిన్ ప్యానెల్'
  }
};

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState('en');

  const toggleLanguage = () => {
    setLanguage(prev => (prev === 'en' ? 'te' : 'en'));
  };

  const t = (key: string): string => {
    const translation = translations[language][key];
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
    <LanguageContext.Provider value={{ language, toggleLanguage, t }}>
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
