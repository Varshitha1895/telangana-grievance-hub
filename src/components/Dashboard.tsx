
import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useLanguage } from '../contexts/LanguageContext';
import { useAuth } from '../contexts/AuthContext';
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
  Wheat,
  LogOut,
  HelpCircle,
  AlertTriangle
} from 'lucide-react';

interface DashboardProps {
  onNavigate: (screen: string) => void;
}

const Dashboard: React.FC<DashboardProps> = ({ onNavigate }) => {
  const { language, toggleLanguage, t } = useLanguage();
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
    window.location.reload(); // Refresh to go back to auth screen
  };

  const grievanceCategories = [
    { id: 'pensions', name: t('Pensions'), icon: Wheat, color: 'from-orange-500 to-red-500' },
    { id: 'road', name: t('Roads & Infrastructure'), icon: Car, color: 'from-blue-500 to-purple-500' },
    { id: 'health', name: t('Health Services'), icon: Heart, color: 'from-green-500 to-teal-500' },
    { id: 'water', name: t('Water Supply'), icon: Droplets, color: 'from-cyan-500 to-blue-500' },
    { id: 'power', name: t('Electricity'), icon: Zap, color: 'from-yellow-500 to-orange-500' },
    { id: 'ration', name: t('Ration & PDS'), icon: Wheat, color: 'from-green-600 to-lime-500' }
  ];

  const quickActions = [
    { id: 'history', name: t('Complaint History & Track'), icon: History, action: () => onNavigate('track') },
    { id: 'guide', name: t('Service Guide'), icon: HelpCircle, action: () => onNavigate('guide') },
    { id: 'emergency', name: t('Emergency Support'), icon: AlertTriangle, action: () => onNavigate('emergency') },
    { id: 'admin', name: t('Admin Panel'), icon: Settings, action: () => onNavigate('admin') }
  ];

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.3,
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      exit={{ opacity: 0 }}
      className="min-h-screen bg-white p-4 relative overflow-hidden"
    >
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{ y: [-10, 10, -10] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-r from-orange-200 to-red-200 rounded-full opacity-20"
        />
        <motion.div
          animate={{ y: [-10, 10, -10] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          className="absolute top-40 right-20 w-24 h-24 bg-gradient-to-r from-green-200 to-teal-200 rounded-full opacity-20"
        />
        <motion.div
          animate={{ y: [-10, 10, -10] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          className="absolute bottom-32 left-1/4 w-20 h-20 bg-gradient-to-r from-blue-200 to-purple-200 rounded-full opacity-20"
        />
        <motion.div
          animate={{ y: [-10, 10, -10] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
          className="absolute bottom-20 right-1/3 w-28 h-28 bg-gradient-to-r from-yellow-200 to-orange-200 rounded-full opacity-20"
        />
      </div>

      <div className="relative z-10">
        {/* Header */}
        <motion.div 
          variants={itemVariants}
          className="flex justify-between items-center mb-8 bg-white/80 backdrop-blur-sm rounded-xl p-4 shadow-lg border border-white/20"
        >
          <motion.div
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <h1 className="text-2xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
              {t('Welcome to Mee Saaradhi')}
            </h1>
            <p className="text-gray-600 mt-1">{t('Your Digital Grievance Platform')}</p>
          </motion.div>
          <div className="flex items-center space-x-2">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button
                variant="outline"
                onClick={toggleLanguage}
                className="bg-gradient-to-r from-orange-500 to-red-500 text-white border-0 hover:from-orange-600 hover:to-red-600"
              >
                {language === 'en' ? 'తెలుగు' : 'English'}
              </Button>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button
                variant="outline"
                onClick={handleLogout}
                className="bg-red-500 hover:bg-red-600 text-white border-0"
              >
                <LogOut className="mr-2 h-4 w-4" />
                {t('Logout')}
              </Button>
            </motion.div>
          </div>
        </motion.div>

        {/* File New Complaint */}
        <motion.div
          variants={itemVariants}
          className="mb-8"
        >
          <motion.div
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            whileHover={{ scale: 1.02, y: -2 }}
            whileTap={{ scale: 0.98 }}
            style={{ transition: "transform 0.3s spring" }}
          >
            <Card className="bg-gradient-to-r from-orange-500 to-red-500 text-white border-0 shadow-xl hover:shadow-2xl transition-shadow duration-300">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-xl font-semibold mb-2">{t('File New Complaint')}</h2>
                    <p className="opacity-90">{t('Report your grievance in just a few steps')}</p>
                  </div>
                  <motion.div
                    whileHover={{ rotate: 5 }}
                    whileTap={{ rotate: -5 }}
                  >
                    <Button 
                      onClick={() => onNavigate('grievance')}
                      className="bg-white text-orange-500 hover:bg-gray-100 font-semibold px-6 py-3"
                    >
                      <FileText className="mr-2 h-4 w-4" />
                      {t('Start')}
                    </Button>
                  </motion.div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>

        {/* Grievance Categories */}
        <motion.div
          variants={itemVariants}
          className="mb-8"
        >
          <h3 className="text-lg font-semibold text-gray-800 mb-4">{t('Complaint Categories')}</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {grievanceCategories.map((category, index) => (
              <motion.div
                key={category.id}
                variants={itemVariants}
                whileHover={{ 
                  scale: 1.05, 
                  y: -5,
                  transition: { type: "spring", stiffness: 300 }
                }}
                whileTap={{ scale: 0.95 }}
                style={{ 
                  animationDelay: `${index * 0.1}s` 
                }}
              >
                <Card 
                  className="cursor-pointer transition-all duration-300 border-0 shadow-lg hover:shadow-xl overflow-hidden bg-white/90 backdrop-blur-sm group"
                  onClick={() => onNavigate('grievance')}
                >
                  <CardContent className="p-4">
                    <motion.div 
                      className={`w-12 h-12 rounded-full bg-gradient-to-r ${category.color} flex items-center justify-center mb-3 mx-auto group-hover:scale-110 transition-transform duration-300`}
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.6 }}
                    >
                      <category.icon className="h-6 w-6 text-white" />
                    </motion.div>
                    <h4 className="text-sm font-medium text-center text-gray-800 group-hover:text-orange-600 transition-colors duration-300">
                      {category.name}
                    </h4>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Quick Actions */}
        <motion.div
          variants={itemVariants}
        >
          <h3 className="text-lg font-semibold text-gray-800 mb-4">{t('Quick Actions')}</h3>
          <div className="grid gap-4">
            {quickActions.map((action, index) => (
              <motion.div
                key={action.id}
                variants={itemVariants}
                whileHover={{ 
                  x: 5,
                  scale: 1.02,
                  transition: { type: "spring", stiffness: 300 }
                }}
                whileTap={{ scale: 0.98 }}
                style={{ 
                  animationDelay: `${0.5 + index * 0.1}s` 
                }}
              >
                <Card 
                  className="cursor-pointer hover:shadow-lg transition-all duration-300 bg-white/90 backdrop-blur-sm border-0 shadow-md group"
                  onClick={action.action}
                >
                  <CardContent className="p-4">
                    <div className="flex items-center space-x-3">
                      <motion.div 
                        className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center group-hover:scale-110 transition-transform duration-300"
                        whileHover={{ rotate: 15 }}
                      >
                        <action.icon className="h-5 w-5 text-white" />
                      </motion.div>
                      <span className="font-medium text-gray-800 group-hover:text-blue-600 transition-colors duration-300">
                        {action.name}
                      </span>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Dashboard;
