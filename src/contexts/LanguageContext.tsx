
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
    'Logout': 'Logout',
    'Service Guide': 'Service Guide',
    
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
    'Recording...': 'Recording...',
    'Uploaded Images': 'Uploaded Images',
    'Audio Recording': 'Audio Recording',
    'Maximum 3 images allowed': 'Maximum 3 images allowed',
    'Please allow camera access to use this feature': 'Please allow camera access to use this feature',
    'Please allow microphone access to use this feature': 'Please allow microphone access to use this feature',
    'Location captured successfully': 'Location captured successfully',
    'Unable to get location. Please enter manually.': 'Unable to get location. Please enter manually.',
    'Geolocation is not supported by this browser': 'Geolocation is not supported by this browser',
    'images': 'images',
    'audio': 'audio',
    'video': 'video',
    
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
    'Export CSV': 'Export CSV',
    'Export PDF': 'Export PDF',
    'Filters': 'Filters',
    'Filter by Status': 'Filter by Status',
    'Filter by Category': 'Filter by Category',
    'All Status': 'All Status',
    'All Categories': 'All Categories',
    'Roads': 'Roads',
    'Water': 'Water',
    'Recent Complaints': 'Recent Complaints',
    'Citizen': 'Citizen',
    
    // Emergency Support
    'Police Emergency': 'Police Emergency',
    'Medical Emergency': 'Medical Emergency',
    'Fire Emergency': 'Fire Emergency',
    'Traffic Helpline': 'Traffic Helpline',
    'For law and order emergencies': 'For law and order emergencies',
    'For medical emergencies and ambulance': 'For medical emergencies and ambulance',
    'For fire accidents and rescue operations': 'For fire accidents and rescue operations',
    'For traffic related emergencies': 'For traffic related emergencies',
    'Call Emergency': 'Call Emergency',
    'Mee Saaradhi Helpline': 'Mee Saaradhi Helpline',
    '24/7 Emergency Helplines': '24/7 Emergency Helplines',
    'Important Information': 'Important Information',
    'When to Call Emergency Services:': 'When to Call Emergency Services:',
    'Life-threatening situations': 'Life-threatening situations',
    'Accidents or injuries': 'Accidents or injuries',
    'Fire or natural disasters': 'Fire or natural disasters',
    'Crime in progress': 'Crime in progress',
    'Before Calling:': 'Before Calling:',
    'Stay calm and speak clearly': 'Stay calm and speak clearly',
    'Provide exact location details': 'Provide exact location details',
    'Describe the emergency situation': 'Describe the emergency situation',
    'Follow the operator\'s instructions': 'Follow the operator\'s instructions',
    
    // Service Guide
    'Complete guide to using Mee Saaradhi': 'Complete guide to using Mee Saaradhi',
    'How to File a Complaint': 'How to File a Complaint',
    'Choose the appropriate complaint category': 'Choose the appropriate complaint category',
    'Fill in all required information and upload media': 'Fill in all required information and upload media',
    'Submit your complaint and track its progress': 'Submit your complaint and track its progress',
    'Issues related to pension schemes and benefits': 'Issues related to pension schemes and benefits',
    'Road damages, potholes, and infrastructure issues': 'Road damages, potholes, and infrastructure issues',
    'Hospital and healthcare related complaints': 'Hospital and healthcare related complaints',
    'Frequently Asked Questions': 'Frequently Asked Questions',
    'How do I file a complaint?': 'How do I file a complaint?',
    'Click on "File New Complaint" from the dashboard, select your category, fill in the details, and submit. You will receive a complaint ID for tracking.': 'Click on "File New Complaint" from the dashboard, select your category, fill in the details, and submit. You will receive a complaint ID for tracking.',
    'How can I track my complaint status?': 'How can I track my complaint status?',
    'Use the "Track Complaints" option from the dashboard. Enter your complaint ID or search by description to see the current status.': 'Use the "Track Complaints" option from the dashboard. Enter your complaint ID or search by description to see the current status.',
    'What documents do I need?': 'What documents do I need?',
    'Depending on the complaint type, you may need Aadhaar card, relevant certificates, photos of the issue, or other supporting documents.': 'Depending on the complaint type, you may need Aadhaar card, relevant certificates, photos of the issue, or other supporting documents.',
    'How long does it take to resolve complaints?': 'How long does it take to resolve complaints?',
    'Resolution time varies by category: Emergency issues within 24 hours, general complaints within 7-15 days, and complex issues within 30 days.': 'Resolution time varies by category: Emergency issues within 24 hours, general complaints within 7-15 days, and complex issues within 30 days.',
    'Can I file complaints in Telugu?': 'Can I file complaints in Telugu?',
    'Yes, Mee Saaradhi supports both Telugu and English. Use the language toggle button to switch between languages.': 'Yes, Mee Saaradhi supports both Telugu and English. Use the language toggle button to switch between languages.',
    'What if I don\'t have internet access?': 'What if I don\'t have internet access?',
    'You can call our helpline at 1800-425-0425 for assistance or visit the nearest government office.': 'You can call our helpline at 1800-425-0425 for assistance or visit the nearest government office.',
    
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
    'Logout': 'లాగౌట్',
    'Service Guide': 'సేవా మార్గదర్శిని',
    'Emergency Support': 'అత్యవసర మద్దతు',
    'Police Emergency': 'పోలీస్ అత్యవసరం',
    'Medical Emergency': 'వైద్య అత్యవసరం',
    'Fire Emergency': 'అగ్నిమాపక అత్యవసరం',
    'Traffic Helpline': 'ట్రాఫిక్ హెల్ప్‌లైన్',
    'For law and order emergencies': 'చట్టం మరియు క్రమం అత్యవసర పరిస్థితుల కోసం',
    'For medical emergencies and ambulance': 'వైద్య అత్యవసరాలు మరియు అంబులెన్స్ కోసం',
    'For fire accidents and rescue operations': 'అగ్ని ప్రమాదాలు మరియు రక్షణ చర్యల కోసం',
    'For traffic related emergencies': 'ట్రాఫిక్ సంబంధిత అత్యావశ్యకాల కోసం',
    'Call Emergency': 'అత్యవసర కాల్',
    'Mee Saaradhi Helpline': 'మీ సారధి హెల్ప్‌లైన్',
    '24/7 Emergency Helplines': '24/7 అత్యవసర హెల్ప్‌లైన్లు',
    
    // Add other Telugu translations as needed
    'Pensions': 'పెన్షన్లు',
    'Roads & Infrastructure': 'రోడ్లు మరియు మౌలిక సదుపాయాలు',
    'Health Services': 'ఆరోగ్య సేవలు',
    'Water Supply': 'నీటి సరఫరా',
    'Electricity': 'విద్యుత్',
    'Ration & PDS': 'రేషన్ మరియు PDS',
    'File New Complaint': 'కొత్త ఫిర్యాదు దాఖలు చేయండి',
    'Report your grievance in just a few steps': 'కేవలం కొన్ని దశల్లో మీ ఫిర్యాదును నివేదించండి',
    'Start': 'ప్రారంభించు',
    'Complaint Categories': 'ఫిర్యాదు వర్గాలు',
    'Quick Actions': 'త్వరిత చర్యలు',
    'Track Complaints': 'ఫిర్యాదులను ట్రాక్ చేయండి',
    'Complaint History': 'ఫిర్యాదు చరిత్ర',
    'Admin Panel': 'అడ్మిన్ ప్యానెల్',
    'Call Now': 'ఇప్పుడే కాల్ చేయండి'
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
