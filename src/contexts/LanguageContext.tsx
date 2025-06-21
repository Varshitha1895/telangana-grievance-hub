import React, { createContext, useContext, useState, ReactNode } from 'react';

interface LanguageContextType {
  language: 'en' | 'te';
  toggleLanguage: () => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const translations = {
  en: {
    // Common
    'Welcome to Mee Saaradhi': 'Welcome to Mee Saaradhi',
    'Your Digital Grievance Platform': 'Your Digital Grievance Platform',
    'Secure Login to Continue': 'Secure Login to Continue',
    'Enter Mobile Number': 'Enter Mobile Number',
    'Verify OTP': 'Verify OTP',
    'Enter 10-digit mobile number': 'Enter 10-digit mobile number',
    'Enter 6-digit OTP': 'Enter 6-digit OTP',
    'Send OTP': 'Send OTP',
    'Verify & Login': 'Verify & Login',
    'Sending OTP...': 'Sending OTP...',
    'Verifying...': 'Verifying...',
    'Change Mobile Number': 'Change Mobile Number',
    'Please enter a valid 10-digit mobile number': 'Please enter a valid 10-digit mobile number',
    'OTP sent successfully! Use 123456 for demo': 'OTP sent successfully! Use 123456 for demo',
    'Invalid OTP. Please try again.': 'Invalid OTP. Please try again.',
    
    // Categories
    'Pensions': 'Pensions',
    'Roads & Infrastructure': 'Roads & Infrastructure',
    'Health Services': 'Health Services',
    'Water Supply': 'Water Supply',
    'Electricity': 'Electricity',
    'Ration & PDS': 'Ration & PDS',
    
    // Dashboard
    'File New Complaint': 'File New Complaint',
    'Report your grievance in just a few steps': 'Report your grievance in just a few steps',
    'Start': 'Start',
    'Complaint Categories': 'Complaint Categories',
    'Quick Actions': 'Quick Actions',
    'Track Complaints': 'Track Complaints',
    'Complaint History': 'Complaint History',
    'Admin Panel': 'Admin Panel',
    'Emergency Support': 'Emergency Support',
    '24/7 Helpline Available': '24/7 Helpline Available',
    'Call Now': 'Call Now',
    
    // Form
    'File New Grievance': 'File New Grievance',
    'Step': 'Step',
    'of': 'of',
    'Select Category': 'Select Category',
    'Provide Details': 'Provide Details',
    'Add Media & Location': 'Add Media & Location',
    'Review & Submit': 'Review & Submit',
    'Choose complaint category': 'Choose complaint category',
    'Describe your grievance in detail...': 'Describe your grievance in detail...',
    'Add Supporting Media': 'Add Supporting Media',
    'Photo': 'Photo',
    'Audio': 'Audio',
    'Video': 'Video',
    'Location': 'Location',
    'Enter location manually': 'Enter location manually',
    'Review Your Grievance': 'Review Your Grievance',
    'Category': 'Category',
    'Description': 'Description',
    'Not specified': 'Not specified',
    'Previous': 'Previous',
    'Next': 'Next',
    'Submit Grievance': 'Submit Grievance',
    'Grievance submitted successfully!': 'Grievance submitted successfully!',
    'Failed to submit grievance. Please try again.': 'Failed to submit grievance. Please try again.',
    
    // Tracking
    'Track Your Complaints': 'Track Your Complaints',
    'Monitor the status of your grievances': 'Monitor the status of your grievances',
    'Search by complaint ID or description...': 'Search by complaint ID or description...',
    'Total Complaints': 'Total Complaints',
    'In Progress': 'In Progress',
    'Resolved': 'Resolved',
    'Pending': 'Pending',
    'Date': 'Date',
    'Progress Timeline': 'Progress Timeline',
    'Complaint Submitted': 'Complaint Submitted',
    'Under Review': 'Under Review',
    'Issue Resolved': 'Issue Resolved',
    'No complaints found': 'No complaints found',
    'Try adjusting your search terms': 'Try adjusting your search terms',
    'You haven\'t filed any complaints yet': 'You haven\'t filed any complaints yet',
    
    // Admin
    'Admin Dashboard': 'Admin Dashboard',
    'Manage grievances and monitor performance': 'Manage grievances and monitor performance',
    'Export Data': 'Export Data',
    'Filters': 'Filters',
    'Filter by Status': 'Filter by Status',
    'Filter by Category': 'Filter by Category',
    'All Status': 'All Status',
    'All Categories': 'All Categories',
    'Roads': 'Roads',
    'Water': 'Water',
    'Recent Complaints': 'Recent Complaints',
    'Citizen': 'Citizen',
    
    // Chat
    'Chat Support': 'Chat Support',
    'We\'re here to help!': 'We\'re here to help!',
    'Hello! How can I help you today?': 'Hello! How can I help you today?',
    'Thank you for your message. Our support team will assist you shortly.': 'Thank you for your message. Our support team will assist you shortly.',
    'Type your message...': 'Type your message...',
    
    // Form fields
    'Aadhaar Number': 'Aadhaar Number',
    'Pension Type': 'Pension Type',
    'Road Name/Location': 'Road Name/Location',
    'Type of Damage': 'Type of Damage',
    'Pothole': 'Pothole',
    'Broken Road': 'Broken Road',
    'Drainage Issue': 'Drainage Issue',
    'Hospital/Clinic Name': 'Hospital/Clinic Name',
    'Urgency Level': 'Urgency Level',
    'Low': 'Low',
    'Medium': 'Medium',
    'High': 'High',
    'Emergency': 'Emergency'
  },
  te: {
    // Common
    'Welcome to Mee Saaradhi': 'మీ సారధికి స్వాగతం',
    'Your Digital Grievance Platform': 'మీ డిజిటల్ ఫిర్యాదు వేదిక',
    'Secure Login to Continue': 'కొనసాగించడానికి సురక్షిత లాగిన్',
    'Enter Mobile Number': 'మొబైల్ నంబర్ నమోదు చేయండి',
    'Verify OTP': 'OTP ధృవీకరించండి',
    'Enter 10-digit mobile number': '10-అంకెల మొబైల్ నంబర్ నమోదు చేయండి',
    'Enter 6-digit OTP': '6-అంకెల OTP నమోదు చేయండి',
    'Send OTP': 'OTP పంపు',
    'Verify & Login': 'ధృవీకరించి లాగిన్ చేయండి',
    'Sending OTP...': 'OTP పంపుతున్నాము...',
    'Verifying...': 'ధృవీకరిస్తున్నాము...',
    'Change Mobile Number': 'మొబైల్ నంబర్ మార్చండి',
    'Please enter a valid 10-digit mobile number': 'దయచేసి చెల్లుబాటు అయ్యే 10-అంకెల మొబైల్ నంబర్ నమోదు చేయండి',
    'OTP sent successfully! Use 123456 for demo': 'OTP విజయవంతంగా పంపబడింది! డెమో కోసం 123456 ఉపయోగించండి',
    'Invalid OTP. Please try again.': 'చెల్లని OTP. దయచేసి మళ్లీ ప్రయత్నించండి.',
    
    // Categories
    'Pensions': 'పెన్షన్లు',
    'Roads & Infrastructure': 'రోడ్లు మరియు మౌలిక సదుపాయాలు',
    'Health Services': 'ఆరోగ్య సేవలు',
    'Water Supply': 'నీటి సరఫరా',
    'Electricity': 'విద్యుత్',
    'Ration & PDS': 'రేషన్ మరియు PDS',
    
    // Dashboard
    'File New Complaint': 'కొత్త ఫిర్యాదు దాఖలు చేయండి',
    'Report your grievance in just a few steps': 'కేవలం కొన్ని దశల్లో మీ ఫిర్యాదును నివేదించండి',
    'Start': 'ప్రారంభించు',
    'Complaint Categories': 'ఫిర్యాదు వర్గాలు',
    'Quick Actions': 'త్వరిత చర్యలు',
    'Track Complaints': 'ఫిర్యాదులను ట్రాక్ చేయండి',
    'Complaint History': 'ఫిర్యాదు చరిత్ర',
    'Admin Panel': 'అడ్మిన్ ప్యానెల్',
    'Emergency Support': 'అత్యవసర మద్దతు',
    '24/7 Helpline Available': '24/7 హెల్ప్‌లైన్ అందుబాటులో',
    'Call Now': 'ఇప్పుడే కాల్ చేయండి',
    
    // Form
    'File New Grievance': 'కొత్త ఫిర్యాదు దాఖలు చేయండి',
    'Step': 'దశ',
    'of': 'లో',
    'Select Category': 'వర్గం ఎంచుకోండి',
    'Provide Details': 'వివరాలు అందించండి',
    'Add Media & Location': 'మీడియా మరియు స్థానం జోడించండి',
    'Review & Submit': 'సమీక్షించి సమర్పించండి',
    'Choose complaint category': 'ఫిర్యాదు వర్గం ఎంచుకోండి',
    'Describe your grievance in detail...': 'మీ ఫిర్యాదును వివరంగా వర్ణించండి...',
    'Add Supporting Media': 'మద్దతు మీడియా జోడించండి',
    'Photo': 'ఫోటో',
    'Audio': 'ఆడియో',
    'Video': 'వీడియో',
    'Location': 'స్థానం',
    'Enter location manually': 'స్థానాన్ని మాన్యువల్‌గా నమోదు చేయండి',
    'Review Your Grievance': 'మీ ఫిర్యాదును సమీక్షించండి',
    'Category': 'వర్గం',
    'Description': 'వర్ణన',
    'Not specified': 'పేర్కొనలేదు',
    'Previous': 'మునుపటి',
    'Next': 'తదుపరి',
    'Submit Grievance': 'ఫిర్యాదు సమర్పించండి',
    'Grievance submitted successfully!': 'ఫిర్యాదు విజయవంతంగా సమర్పించబడింది!',
    'Failed to submit grievance. Please try again.': 'ఫిర్యాదు సమర్పించడంలో విఫలమైంది. దయచేసి మళ్లీ ప్రయత్నించండి.',
    
    // Tracking
    'Track Your Complaints': 'మీ ఫిర్యాదులను ట్రాక్ చేయండి',
    'Monitor the status of your grievances': 'మీ ఫిర్యాదుల స్థితిని పర్యవేక్షించండి',
    'Search by complaint ID or description...': 'ఫిర్యాదు ID లేదా వర్ణన ద్వారా శోధించండి...',
    'Total Complaints': 'మొత్తం ఫిర్యాదులు',
    'In Progress': 'ప్రగతిలో',
    'Resolved': 'పరిష్కరించబడింది',
    'Pending': 'పెండింగ్',
    'Date': 'తేదీ',
    'Progress Timeline': 'ప్రగతి టైమ్‌లైన్',
    'Complaint Submitted': 'ఫిర్యాదు సమర్పించబడింది',
    'Under Review': 'సమీక్షలో',
    'Issue Resolved': 'సమస్య పరిష్కరించబడింది',
    'No complaints found': 'ఫిర్యాదులు కనుగొనబడలేదు',
    'Try adjusting your search terms': 'మీ వెతుకులాట పదాలను సర్దుబాటు చేయండి',
    'You haven\'t filed any complaints yet': 'మీరు ఇంకా ఎలాంటి ఫిర్యాదులు దాఖలు చేయలేదు',
    
    // Admin
    'Admin Dashboard': 'అడ్మిన్ డ్యాష్‌బోర్డ్',
    'Manage grievances and monitor performance': 'ఫిర్యాదులను నిర్వహించండి మరియు పనితీరును పర్యవేక్షించండి',
    'Export Data': 'డేటా ఎగుమతి చేయండి',
    'Filters': 'ఫిల్టర్లు',
    'Filter by Status': 'స్థితి ద్వారా ఫిల్టర్ చేయండి',
    'Filter by Category': 'వర్గం ద్వారా ఫిల్టర్ చేయండి',
    'All Status': 'అన్ని స్థితులు',
    'All Categories': 'అన్ని వర్గాలు',
    'Roads': 'రోడ్లు',
    'Water': 'నీరు',
    'Recent Complaints': 'ఇటీవలి ఫిర్యాదులు',
    'Citizen': 'పౌరుడు',
    
    // Chat
    'Chat Support': 'చాట్ మద్దతు',
    'We\'re here to help!': 'మేము సహాయం చేయడానికి ఇక్కడ ఉన్నాము!',
    'Hello! How can I help you today?': 'హలో! ఈరోజు నేను మీకు ఎలా సహాయపడగలను?',
    'Thank you for your message. Our support team will assist you shortly.': 'మీ సందేశానికి ధన్యవాదాలు. మా మద్దతు బృందం త్వరలో మీకు సహాయం చేస్తుంది.',
    'Type your message...': 'మీ సందేశాన్ని టైప్ చేయండి...',
    
    // Form fields
    'Aadhaar Number': 'ఆధార్ నంబర్',
    'Pension Type': 'పెన్షన్ రకం',
    'Road Name/Location': 'రోడ్ పేరు/స్థానం',
    'Type of Damage': 'నష్టం రకం',
    'Pothole': 'గుంట',
    'Broken Road': 'విరిగిన రోడ్',
    'Drainage Issue': 'డ్రైనేజీ సమస్య',
    'Hospital/Clinic Name': 'ఆసుపత్రి/క్లినిక్ పేరు',
    'Urgency Level': 'అత్యవసర స్థాయి',
    'Low': 'తక్కువ',
    'Medium': 'మధ్యస్థ',
    'High': 'అధిక',
    'Emergency': 'అత్యవసరం'
  }
};

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<'en' | 'te'>('en');

  const toggleLanguage = () => {
    setLanguage(prev => prev === 'en' ? 'te' : 'en');
  };

  const t = (key: string): string => {
    return translations[language][key] || key;
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
