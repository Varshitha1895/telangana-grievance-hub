
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

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="min-h-screen bg-gradient-to-br from-red-50 to-orange-50 p-4"
    >
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center mb-6">
          <Button 
            variant="ghost" 
            onClick={onBack}
            className="mr-4 p-2"
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div>
            <h1 className="text-2xl font-bold text-gray-800">{t('Emergency Support')}</h1>
            <p className="text-gray-600">{t('24/7 Emergency Helplines')}</p>
          </div>
        </div>

        {/* Main Helpline */}
        <Card className="mb-6 shadow-xl border-0 bg-gradient-to-r from-red-500 to-orange-500 text-white">
          <CardContent className="p-6">
            <div className="text-center">
              <AlertTriangle className="h-12 w-12 mx-auto mb-4" />
              <h2 className="text-xl font-bold mb-2">{t('Mee Saaradhi Helpline')}</h2>
              <p className="text-lg mb-4">1800-425-0425</p>
              <Button 
                onClick={() => handleCall('18004250425')}
                className="bg-white text-red-500 hover:bg-gray-100 font-semibold px-8 py-3"
              >
                <Phone className="mr-2 h-5 w-5" />
                {t('Call Now')}
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Emergency Services */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          {emergencyServices.map((service, index) => (
            <motion.div
              key={service.name}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="shadow-lg border-0 h-full">
                <CardContent className="p-6">
                  <div className={`w-16 h-16 rounded-full bg-gradient-to-r ${service.color} flex items-center justify-center mb-4 mx-auto`}>
                    <service.icon className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold text-center mb-2">{service.name}</h3>
                  <p className="text-gray-600 text-center text-sm mb-4">{service.description}</p>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-gray-800 mb-3">{service.number}</p>
                    <Button 
                      onClick={() => handleCall(service.number)}
                      className={`bg-gradient-to-r ${service.color} hover:opacity-90 text-white w-full`}
                    >
                      <Phone className="mr-2 h-4 w-4" />
                      {t('Call Emergency')}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

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
