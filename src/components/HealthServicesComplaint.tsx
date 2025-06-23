import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useLanguage } from '../contexts/LanguageContext';
import { Heart } from 'lucide-react';
import HealthServicesIllustration from './HealthServicesIllustration';

interface HealthServicesComplaintProps {
  onBack: () => void;
  onSubmit: () => void;
}

const HealthServicesComplaint: React.FC<HealthServicesComplaintProps> = ({ onBack, onSubmit }) => {
  const { t } = useLanguage();
  const [complaintDetails, setComplaintDetails] = useState({
    patientName: '',
    hospitalName: '',
    complaintType: '',
    description: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setComplaintDetails(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    // Handle complaint submission logic here
    console.log('Complaint submitted:', complaintDetails);
    onSubmit();
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-gradient-to-br from-blue-50 via-green-50 to-white p-4 relative overflow-hidden"
    >
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        <motion.div
          animate={{
            rotate: [0, 360],
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.6, 0.3]
          }}
          transition={{ duration: 8, repeat: Infinity }}
          className="absolute top-10 left-10 w-32 h-32 rounded-full bg-white/20 blur-xl"
        />
        <motion.div
          animate={{
            rotate: [360, 0],
            scale: [1.2, 1, 1.2],
            opacity: [0.4, 0.7, 0.4]
          }}
          transition={{ duration: 6, repeat: Infinity }}
          className="absolute top-40 right-20 w-24 h-24 rounded-full bg-pink-300/30 blur-lg"
        />
        <motion.div
          animate={{
            y: [-20, 20, -20],
            x: [-10, 10, -10],
            opacity: [0.2, 0.5, 0.2]
          }}
          transition={{ duration: 4, repeat: Infinity }}
          className="absolute bottom-32 left-1/4 w-20 h-20 rounded-full bg-blue-300/40 blur-lg"
        />
        <motion.div
          animate={{
            scale: [1, 1.3, 1],
            rotate: [0, 180, 360],
            opacity: [0.3, 0.6, 0.3]
          }}
          transition={{ duration: 10, repeat: Infinity }}
          className="absolute bottom-20 right-1/3 w-28 h-28 rounded-full bg-yellow-300/30 blur-xl"
        />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto">
        {/* Enhanced Header with Illustration */}
        <motion.div
          initial={{ y: -30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-8"
        >
          <motion.div
            whileHover={{ scale: 1.02 }}
            className="bg-white/90 backdrop-blur-md rounded-3xl p-8 shadow-2xl border border-white/30 mb-6"
          >
            <div className="flex items-center justify-center space-x-3 mb-6">
              <motion.div
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="w-16 h-16 bg-gradient-to-r from-green-500 to-blue-500 rounded-full flex items-center justify-center shadow-lg"
              >
                <Heart className="h-8 w-8 text-white" />
              </motion.div>
              <div>
                <h1 className="text-4xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
                  {t('Health Services Complaint')}
                </h1>
                <p className="text-gray-600 text-lg mt-2">{t('Quality Healthcare for All Citizens')}</p>
              </div>
            </div>
            
            {/* Add the beautiful health services illustration */}
            <HealthServicesIllustration />
          </motion.div>
        </motion.div>

        {/* Complaint Form */}
        <Card className="bg-white/95 backdrop-blur-md border-0 shadow-xl">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl text-gray-800">{t('Complaint Form')}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Patient Name */}
            <div>
              <Input
                type="text"
                name="patientName"
                placeholder={t('Patient Name')}
                value={complaintDetails.patientName}
                onChange={handleInputChange}
                className="h-12"
              />
            </div>

            {/* Hospital Name */}
            <div>
              <Input
                type="text"
                name="hospitalName"
                placeholder={t('Hospital Name')}
                value={complaintDetails.hospitalName}
                onChange={handleInputChange}
                className="h-12"
              />
            </div>

            {/* Complaint Type */}
            <div>
              <Input
                type="text"
                name="complaintType"
                placeholder={t('Complaint Type')}
                value={complaintDetails.complaintType}
                onChange={handleInputChange}
                className="h-12"
              />
            </div>

            {/* Description */}
            <div>
              <Textarea
                name="description"
                placeholder={t('Description')}
                value={complaintDetails.description}
                onChange={handleInputChange}
                className="h-24"
              />
            </div>

            {/* Actions */}
            <div className="flex gap-4">
              <Button variant="outline" onClick={onBack} className="flex-1 h-12">
                {t('Back')}
              </Button>
              <Button onClick={handleSubmit} className="flex-1 h-12 bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white font-semibold">
                {t('Submit')}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </motion.div>
  );
};

export default HealthServicesComplaint;
