
import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useLanguage } from '../contexts/LanguageContext';
import { 
  FileText, 
  Search, 
  History, 
  Settings, 
  Phone, 
  Zap, 
  Droplets,
  Car,
  Heart,
  Wheat
} from 'lucide-react';

interface DashboardProps {
  onNavigate: (screen: string) => void;
}

const Dashboard: React.FC<DashboardProps> = ({ onNavigate }) => {
  const { language, toggleLanguage, t } = useLanguage();

  const grievanceCategories = [
    { id: 'pensions', name: t('Pensions'), icon: Wheat, color: 'from-orange-500 to-red-500' },
    { id: 'road', name: t('Roads & Infrastructure'), icon: Car, color: 'from-blue-500 to-purple-500' },
    { id: 'health', name: t('Health Services'), icon: Heart, color: 'from-green-500 to-teal-500' },
    { id: 'water', name: t('Water Supply'), icon: Droplets, color: 'from-cyan-500 to-blue-500' },
    { id: 'power', name: t('Electricity'), icon: Zap, color: 'from-yellow-500 to-orange-500' },
    { id: 'ration', name: t('Ration & PDS'), icon: Wheat, color: 'from-green-600 to-lime-500' }
  ];

  const quickActions = [
    { id: 'track', name: t('Track Complaints'), icon: Search, action: () => onNavigate('track') },
    { id: 'history', name: t('Complaint History'), icon: History, action: () => onNavigate('track') },
    { id: 'admin', name: t('Admin Panel'), icon: Settings, action: () => onNavigate('admin') }
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-gradient-to-br from-orange-50 to-green-50 p-4"
    >
      {/* Header */}
      <div className="flex justify-between items-center mb-8 bg-white rounded-xl p-4 shadow-lg">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">
            {t('Welcome to Mee Saaradhi')}
          </h1>
          <p className="text-gray-600 mt-1">{t('Your Digital Grievance Platform')}</p>
        </div>
        <Button
          variant="outline"
          onClick={toggleLanguage}
          className="bg-gradient-to-r from-orange-500 to-red-500 text-white border-0"
        >
          {language === 'en' ? 'తెలుగు' : 'English'}
        </Button>
      </div>

      {/* File New Complaint */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.1 }}
        className="mb-8"
      >
        <Card className="bg-gradient-to-r from-orange-500 to-red-500 text-white border-0 shadow-xl">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-semibold mb-2">{t('File New Complaint')}</h2>
                <p className="opacity-90">{t('Report your grievance in just a few steps')}</p>
              </div>
              <Button 
                onClick={() => onNavigate('grievance')}
                className="bg-white text-orange-500 hover:bg-gray-100 font-semibold px-6 py-3"
              >
                <FileText className="mr-2 h-4 w-4" />
                {t('Start')}
              </Button>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Grievance Categories */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="mb-8"
      >
        <h3 className="text-lg font-semibold text-gray-800 mb-4">{t('Complaint Categories')}</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {grievanceCategories.map((category, index) => (
            <motion.div
              key={category.id}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.3 + index * 0.1 }}
            >
              <Card 
                className="cursor-pointer hover:scale-105 transition-transform duration-200 border-0 shadow-lg overflow-hidden"
                onClick={() => onNavigate('grievance')}
              >
                <CardContent className="p-4">
                  <div className={`w-12 h-12 rounded-full bg-gradient-to-r ${category.color} flex items-center justify-center mb-3 mx-auto`}>
                    <category.icon className="h-6 w-6 text-white" />
                  </div>
                  <h4 className="text-sm font-medium text-center text-gray-800">{category.name}</h4>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Quick Actions */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.4 }}
      >
        <h3 className="text-lg font-semibold text-gray-800 mb-4">{t('Quick Actions')}</h3>
        <div className="grid gap-4">
          {quickActions.map((action, index) => (
            <motion.div
              key={action.id}
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.5 + index * 0.1 }}
            >
              <Card 
                className="cursor-pointer hover:shadow-lg transition-shadow duration-200 bg-white border-0 shadow-md"
                onClick={action.action}
              >
                <CardContent className="p-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center">
                      <action.icon className="h-5 w-5 text-white" />
                    </div>
                    <span className="font-medium text-gray-800">{action.name}</span>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Emergency Contact */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="mt-8"
      >
        <Card className="bg-red-50 border-red-200 shadow-lg">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-semibold text-red-800">{t('Emergency Support')}</h4>
                <p className="text-sm text-red-600">{t('24/7 Helpline Available')}</p>
              </div>
              <Button className="bg-red-500 hover:bg-red-600 text-white">
                <Phone className="mr-2 h-4 w-4" />
                {t('Call Now')}
              </Button>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  );
};

export default Dashboard;
