
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
  AlertTriangle,
  Globe,
  ChevronDown
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface DashboardProps {
  onNavigate: (screen: string) => void;
}

const Dashboard: React.FC<DashboardProps> = ({ onNavigate }) => {
  const { language, setLanguage, t, availableLanguages } = useLanguage();
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
    window.location.reload();
  };

  const grievanceCategories = [
    { 
      id: 'pensions', 
      name: t('Pensions'), 
      icon: Wheat, 
      color: 'from-orange-500 to-red-500',
      image: 'https://images.unsplash.com/photo-1517022812141-23620dba5c23?w=400&h=300&fit=crop'
    },
    { 
      id: 'road', 
      name: t('Roads & Infrastructure'), 
      icon: Car, 
      color: 'from-blue-500 to-purple-500',
      image: 'https://images.unsplash.com/photo-1449157291145-7efd050a4d0e?w=400&h=300&fit=crop'
    },
    { 
      id: 'health', 
      name: t('Health Services'), 
      icon: Heart, 
      color: 'from-green-500 to-teal-500',
      image: 'https://images.unsplash.com/photo-1551838147-6ac1cbc10fca?w=400&h=300&fit=crop'
    },
    { 
      id: 'water', 
      name: t('Water Supply'), 
      icon: Droplets, 
      color: 'from-cyan-500 to-blue-500',
      image: 'https://images.unsplash.com/photo-1500375592092-40eb2168fd21?w=400&h=300&fit=crop'
    },
    { 
      id: 'power', 
      name: t('Electricity'), 
      icon: Zap, 
      color: 'from-yellow-500 to-orange-500',
      image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=400&h=300&fit=crop'
    },
    { 
      id: 'ration', 
      name: t('Ration & PDS'), 
      icon: Wheat, 
      color: 'from-green-600 to-lime-500',
      image: 'https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?w=400&h=300&fit=crop'
    }
  ];

  const quickActions = [
    { id: 'history', name: t('Complaint History'), icon: History, action: () => onNavigate('track') },
    { id: 'guide', name: t('Service Guide'), icon: HelpCircle, action: () => onNavigate('guide') },
    { id: 'emergency', name: t('Emergency Support'), icon: AlertTriangle, action: () => onNavigate('emergency') },
    { id: 'admin', name: t('Admin Panel'), icon: Settings, action: () => onNavigate('admin') }
  ];

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
        duration: 0.5
      }
    }
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      exit={{ opacity: 0 }}
      className="min-h-screen bg-gradient-to-br from-orange-50 via-red-50 to-yellow-50 p-4 relative overflow-hidden"
    >
      {/* Beautiful Background Pattern */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-full bg-[url('https://images.unsplash.com/photo-1469041797191-50ace28483c3?w=1920&h=1080&fit=crop&opacity=0.05')] bg-cover bg-center opacity-10"></div>
        <motion.div
          animate={{ y: [-10, 10, -10] }}
          transition={{ duration: 4, repeat: Infinity }}
          className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-r from-orange-200 to-red-200 rounded-full opacity-20 blur-xl"
        />
        <motion.div
          animate={{ y: [-10, 10, -10] }}
          transition={{ duration: 4, repeat: Infinity, delay: 1 }}
          className="absolute top-40 right-20 w-24 h-24 bg-gradient-to-r from-green-200 to-teal-200 rounded-full opacity-20 blur-xl"
        />
        <motion.div
          animate={{ y: [-10, 10, -10] }}
          transition={{ duration: 4, repeat: Infinity, delay: 2 }}
          className="absolute bottom-32 left-1/4 w-20 h-20 bg-gradient-to-r from-blue-200 to-purple-200 rounded-full opacity-20 blur-xl"
        />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto">
        {/* Enhanced Header */}
        <motion.div 
          variants={itemVariants}
          className="flex justify-between items-center mb-8 bg-white/90 backdrop-blur-md rounded-2xl p-6 shadow-2xl border border-white/30"
        >
          <motion.div
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 300 }}
            className="flex items-center space-x-4"
          >
            <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center shadow-lg">
              <FileText className="h-8 w-8 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
                {t('Welcome to Mee Saaradhi')}
              </h1>
              <p className="text-gray-600 mt-1 text-lg">{t('Your Digital Grievance Platform')}</p>
            </div>
          </motion.div>
          <div className="flex items-center space-x-3">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button
                    variant="outline"
                    className="bg-gradient-to-r from-blue-500 to-purple-500 text-white border-0 hover:from-blue-600 hover:to-purple-600 px-4 py-2"
                  >
                    <Globe className="mr-2 h-4 w-4" />
                    {availableLanguages.find(lang => lang.code === language)?.name}
                    <ChevronDown className="ml-2 h-4 w-4" />
                  </Button>
                </motion.div>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="bg-white/95 backdrop-blur-md border-white/30">
                {availableLanguages.map((lang) => (
                  <DropdownMenuItem
                    key={lang.code}
                    onClick={() => setLanguage(lang.code)}
                    className={`cursor-pointer ${language === lang.code ? 'bg-orange-100' : ''}`}
                  >
                    <span className="mr-2">{lang.flag}</span>
                    {lang.name}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button
                variant="outline"
                onClick={handleLogout}
                className="bg-red-500 hover:bg-red-600 text-white border-0 px-4 py-2"
              >
                <LogOut className="mr-2 h-4 w-4" />
                {t('Logout')}
              </Button>
            </motion.div>
          </div>
        </motion.div>

        {/* Enhanced File New Complaint */}
        <motion.div
          variants={itemVariants}
          className="mb-8"
        >
          <motion.div
            animate={{ scale: [1, 1.02, 1] }}
            transition={{ duration: 3, repeat: Infinity }}
            whileHover={{ scale: 1.03, y: -5 }}
            whileTap={{ scale: 0.98 }}
          >
            <Card className="bg-gradient-to-r from-orange-500 via-red-500 to-pink-500 text-white border-0 shadow-2xl hover:shadow-3xl transition-all duration-300 overflow-hidden relative">
              <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1497604401993-f2e922e5cb0a?w=1200&h=400&fit=crop')] bg-cover bg-center opacity-10"></div>
              <CardContent className="p-8 relative z-10">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <h2 className="text-2xl font-bold mb-3">{t('File New Complaint')}</h2>
                    <p className="opacity-90 text-lg mb-4">{t('Report your grievance in just a few steps')}</p>
                    <div className="flex items-center space-x-2 text-sm opacity-80">
                      <div className="w-2 h-2 bg-white rounded-full"></div>
                      <span>{t('Quick Process')}</span>
                      <div className="w-2 h-2 bg-white rounded-full"></div>
                      <span>{t('Real-time Tracking')}</span>
                      <div className="w-2 h-2 bg-white rounded-full"></div>
                      <span>{t('Fast Resolution')}</span>
                    </div>
                  </div>
                  <motion.div
                    whileHover={{ rotate: 5, scale: 1.1 }}
                    whileTap={{ rotate: -5 }}
                  >
                    <Button 
                      onClick={() => onNavigate('grievance')}
                      className="bg-white text-orange-500 hover:bg-gray-100 font-bold px-8 py-4 text-lg rounded-xl shadow-lg"
                    >
                      <FileText className="mr-3 h-6 w-6" />
                      {t('Start')}
                    </Button>
                  </motion.div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>

        {/* Enhanced Grievance Categories */}
        <motion.div
          variants={itemVariants}
          className="mb-8"
        >
          <h3 className="text-2xl font-bold text-gray-800 mb-6 text-center">{t('Complaint Categories')}</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {grievanceCategories.map((category, index) => (
              <motion.div
                key={category.id}
                variants={itemVariants}
                whileHover={{ 
                  scale: 1.05, 
                  y: -10,
                  transition: { type: "spring", stiffness: 300 }
                }}
                whileTap={{ scale: 0.95 }}
              >
                <Card 
                  className="cursor-pointer transition-all duration-300 border-0 shadow-xl hover:shadow-2xl overflow-hidden bg-white/95 backdrop-blur-sm group h-64"
                  onClick={() => onNavigate('grievance')}
                >
                  <div className="relative h-32 overflow-hidden">
                    <img 
                      src={category.image} 
                      alt={category.name} 
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                    <div className={`absolute inset-0 bg-gradient-to-t ${category.color} opacity-60`}></div>
                    <motion.div 
                      className="absolute top-4 right-4 w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center group-hover:scale-110 transition-transform duration-300"
                      whileHover={{ rotate: 15 }}
                    >
                      <category.icon className="h-6 w-6 text-white" />
                    </motion.div>
                  </div>
                  <CardContent className="p-6">
                    <h4 className="text-lg font-bold text-center text-gray-800 group-hover:text-orange-600 transition-colors duration-300">
                      {category.name}
                    </h4>
                    <p className="text-sm text-gray-600 text-center mt-2">{t('Click to file complaint')}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Enhanced Quick Actions */}
        <motion.div
          variants={itemVariants}
        >
          <h3 className="text-2xl font-bold text-gray-800 mb-6 text-center">{t('Quick Actions')}</h3>
          <div className="grid gap-4">
            {quickActions.map((action, index) => (
              <motion.div
                key={action.id}
                variants={itemVariants}
                whileHover={{ 
                  x: 10,
                  scale: 1.02,
                  transition: { type: "spring", stiffness: 300 }
                }}
                whileTap={{ scale: 0.98 }}
              >
                <Card 
                  className="cursor-pointer hover:shadow-xl transition-all duration-300 bg-white/95 backdrop-blur-sm border-0 shadow-lg group overflow-hidden"
                  onClick={action.action}
                >
                  <CardContent className="p-6">
                    <div className="flex items-center space-x-4">
                      <motion.div 
                        className="w-16 h-16 rounded-2xl bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg"
                        whileHover={{ rotate: 10 }}
                      >
                        <action.icon className="h-8 w-8 text-white" />
                      </motion.div>
                      <div className="flex-1">
                        <span className="text-xl font-bold text-gray-800 group-hover:text-blue-600 transition-colors duration-300">
                          {action.name}
                        </span>
                        <p className="text-gray-600 mt-1">{t('Access quickly from here')}</p>
                      </div>
                      <div className="text-blue-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <ChevronDown className="h-6 w-6 rotate-[-90deg]" />
                      </div>
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
