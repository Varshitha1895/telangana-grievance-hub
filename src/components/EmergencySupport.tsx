
import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useLanguage } from '../contexts/LanguageContext';
import { ArrowLeft, Phone, AlertTriangle, Heart, Shield, Car } from 'lucide-react';

interface EmergencySupportProps {
  onBack: () => void;
}

const EmergencySupport: React.FC<EmergencySupportProps> = ({ onBack }) => {
  const { t } = useLanguage();

  const emergencyServices = [
    {
      name: t('Police Emergency'),
      number: '100',
      icon: Shield,
      color: 'from-red-500 to-red-600',
      description: t('For law and order emergencies')
    },
    {
      name: t('Medical Emergency'),
      number: '108',
      icon: Heart,
      color: 'from-green-500 to-green-600',
      description: t('For medical emergencies and ambulance')
    },
    {
      name: t('Fire Emergency'),
      number: '101',
      icon: AlertTriangle,
      color: 'from-orange-500 to-orange-600',
      description: t('For fire accidents and rescue operations')
    },
    {
      name: t('Traffic Helpline'),
      number: '103',
      icon: Car,
      color: 'from-blue-500 to-blue-600',
      description: t('For traffic related emergencies')
    }
  ];

  const handleCall = (number: string) => {
    window.open(`tel:${number}`, '_self');
  };

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
      className="min-h-screen bg-gradient-to-br from-red-50 via-orange-50 to-yellow-50 p-4 relative overflow-hidden"
    >
      {/* Emergency Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [0.1, 0.3, 0.1]
          }}
          transition={{ duration: 3, repeat: Infinity }}
          className="absolute top-20 right-20 w-40 h-40 bg-gradient-to-r from-red-300 to-orange-300 rounded-full blur-2xl"
        />
        <motion.div
          animate={{ 
            scale: [1.2, 1, 1.2],
            opacity: [0.2, 0.4, 0.2]
          }}
          transition={{ duration: 4, repeat: Infinity }}
          className="absolute bottom-40 left-20 w-32 h-32 bg-gradient-to-r from-orange-300 to-yellow-300 rounded-full blur-2xl"
        />
      </div>
      <div className="relative z-10 max-w-4xl mx-auto">
        {/* Enhanced Header */}
        <motion.div 
          variants={itemVariants}
          className="flex items-center mb-8 bg-white/90 backdrop-blur-md rounded-2xl p-6 shadow-2xl border border-white/30"
        >
          <motion.div
            whileHover={{ scale: 1.1, rotate: -5 }}
            whileTap={{ scale: 0.9 }}
            className="mr-4"
          >
            <Button 
              variant="ghost" 
              onClick={onBack}
              className="p-3 rounded-xl hover:bg-red-100"
            >
              <ArrowLeft className="h-6 w-6 text-red-600" />
            </Button>
          </motion.div>
          <motion.div
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 300 }}
            className="flex items-center space-x-4"
          >
            <motion.div 
              animate={{ 
                boxShadow: [
                  "0 0 0 rgba(239, 68, 68, 0.4)",
                  "0 0 30px rgba(239, 68, 68, 0.6)",
                  "0 0 0 rgba(239, 68, 68, 0.4)"
                ]
              }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-16 h-16 bg-gradient-to-r from-red-500 to-orange-500 rounded-full flex items-center justify-center shadow-lg"
            >
              <AlertTriangle className="h-8 w-8 text-white" />
            </motion.div>
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-red-600 to-orange-600 bg-clip-text text-transparent">
                {t('Emergency Support')}
              </h1>
              <p className="text-gray-600 mt-1 text-lg">{t('24/7 Emergency Helplines')}</p>
            </div>
          </motion.div>
        </motion.div>

        {/* Enhanced Main Helpline */}
        <motion.div
          variants={itemVariants}
          whileHover={{ scale: 1.02, y: -5 }}
          className="mb-8"
        >
          <Card className="shadow-2xl border-0 bg-gradient-to-r from-red-500 via-orange-500 to-red-600 text-white overflow-hidden relative">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-50"></div>
            <CardContent className="p-8 relative z-10">
              <div className="text-center">
                <motion.div
                  animate={{ 
                    rotate: [0, 10, -10, 0],
                    scale: [1, 1.1, 1]
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="mb-6"
                >
                  <AlertTriangle className="h-16 w-16 mx-auto text-white drop-shadow-lg" />
                </motion.div>
                <h2 className="text-2xl font-bold mb-3">{t('Mee Saaradhi Helpline')}</h2>
                <motion.p 
                  className="text-2xl font-bold mb-6"
                  animate={{ textShadow: ["0 0 10px rgba(255,255,255,0.5)", "0 0 20px rgba(255,255,255,0.8)", "0 0 10px rgba(255,255,255,0.5)"] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  1800-425-0425
                </motion.p>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button 
                    onClick={() => handleCall('18004250425')}
                    className="bg-white text-red-500 hover:bg-gray-100 font-bold px-10 py-4 text-lg rounded-xl shadow-2xl"
                  >
                    <Phone className="mr-3 h-6 w-6" />
                    {t('Call Now')}
                  </Button>
                </motion.div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Enhanced Emergency Services */}
        <motion.div
          variants={itemVariants}
          className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8"
        >
          {emergencyServices.map((service, index) => (
            <motion.div
              key={service.name}
              variants={itemVariants}
              whileHover={{ 
                scale: 1.05, 
                y: -10,
                transition: { type: "spring", stiffness: 300 }
              }}
              whileTap={{ scale: 0.95 }}
            >
              <Card className="shadow-2xl border-0 h-full bg-white/95 backdrop-blur-sm overflow-hidden group">
                <CardContent className="p-8">
                  <motion.div 
                    className={`w-20 h-20 rounded-full bg-gradient-to-r ${service.color} flex items-center justify-center mb-6 mx-auto shadow-lg group-hover:scale-110 transition-transform duration-300`}
                    whileHover={{ rotate: 15 }}
                    animate={{ 
                      boxShadow: [
                        "0 4px 20px rgba(0,0,0,0.1)",
                        "0 8px 30px rgba(0,0,0,0.2)",
                        "0 4px 20px rgba(0,0,0,0.1)"
                      ]
                    }}
                    transition={{ duration: 2, repeat: Infinity, delay: index * 0.3 }}
                  >
                    <service.icon className="h-10 w-10 text-white" />
                  </motion.div>
                  <h3 className="text-xl font-bold text-center mb-3 group-hover:text-gray-700 transition-colors duration-300">
                    {service.name}
                  </h3>
                  <p className="text-gray-600 text-center mb-6">{service.description}</p>
                  <div className="text-center">
                    <motion.p 
                      className="text-3xl font-bold text-gray-800 mb-4"
                      animate={{ scale: [1, 1.05, 1] }}
                      transition={{ duration: 1.5, repeat: Infinity, delay: index * 0.2 }}
                    >
                      {service.number}
                    </motion.p>
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Button 
                        onClick={() => handleCall(service.number)}
                        className={`bg-gradient-to-r ${service.color} hover:opacity-90 text-white w-full py-3 text-lg font-semibold rounded-xl shadow-lg`}
                      >
                        <Phone className="mr-3 h-5 w-5" />
                        {t('Call Emergency')}
                      </Button>
                    </motion.div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* Additional Information */}
        <Card className="shadow-lg border-0">
          <CardHeader>
            <CardTitle>{t('Important Information')}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <h4 className="font-semibold text-gray-800 mb-2">{t('When to Call Emergency Services:')}</h4>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• {t('Life-threatening situations')}</li>
                  <li>• {t('Accidents or injuries')}</li>
                  <li>• {t('Fire or natural disasters')}</li>
                  <li>• {t('Crime in progress')}</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-gray-800 mb-2">{t('Before Calling:')}</h4>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• {t('Stay calm and speak clearly')}</li>
                  <li>• {t('Provide exact location details')}</li>
                  <li>• {t('Describe the emergency situation')}</li>
                  <li>• {t('Follow the operator\'s instructions')}</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </motion.div>
  );
};

export default EmergencySupport;
