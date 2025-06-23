
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useLanguage } from '../contexts/LanguageContext';
import { useGrievance } from '../contexts/GrievanceContext';
import { ArrowLeft, Heart, Upload, MapPin, AlertCircle, Stethoscope, Activity, Pill, Ambulance } from 'lucide-react';

interface HealthServicesComplaintProps {
  onBack: () => void;
  onSubmit: () => void;
}

const HealthServicesComplaint: React.FC<HealthServicesComplaintProps> = ({ onBack, onSubmit }) => {
  const { t } = useLanguage();
  const { submitGrievance } = useGrievance();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    location: '',
    priority: 'medium',
    subCategory: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const healthSubCategories = [
    { value: 'hospital_services', label: t('Hospital Services') },
    { value: 'medicine_availability', label: t('Medicine Availability') },
    { value: 'doctor_availability', label: t('Doctor Availability') },
    { value: 'ambulance_services', label: t('Ambulance Services') },
    { value: 'health_schemes', label: t('Health Schemes') },
    { value: 'vaccination', label: t('Vaccination Programs') }
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await submitGrievance({
        category: 'health',
        title: formData.title,
        description: formData.description,
        location: formData.location,
        priority: formData.priority as 'low' | 'medium' | 'high',
        subCategory: formData.subCategory
      });
      onSubmit();
    } catch (error) {
      console.error('Error submitting health complaint:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50 p-4 relative overflow-hidden"
    >
      {/* Enhanced Animated Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Medical themed images */}
        <motion.div
          animate={{ 
            x: [0, 100, 0], 
            y: [0, -80, 0],
            rotate: [0, 15, 0],
            scale: [1, 1.3, 1]
          }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
          className="absolute top-10 left-10 w-48 h-48 rounded-full opacity-10 shadow-2xl"
          style={{
            backgroundImage: 'url(https://images.unsplash.com/photo-1551838147-6ac1cbc10fca?w=500&h=500&fit=crop)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            filter: 'blur(2px)'
          }}
        />
        <motion.div
          animate={{ 
            x: [0, -80, 0], 
            y: [0, 100, 0],
            rotate: [0, -20, 0],
            scale: [1, 1.4, 1]
          }}
          transition={{ duration: 35, repeat: Infinity, ease: "linear" }}
          className="absolute top-60 right-20 w-40 h-40 rounded-full opacity-15 shadow-xl"
          style={{
            backgroundImage: 'url(https://images.unsplash.com/photo-1582562124811-c09040d0a901?w=400&h=400&fit=crop)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            filter: 'blur(1px)'
          }}
        />
        <motion.div
          animate={{ 
            x: [0, 80, 0], 
            y: [0, -60, 0],
            scale: [1, 1.5, 1],
            rotate: [0, 25, 0]
          }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className="absolute bottom-40 left-1/4 w-36 h-36 rounded-full opacity-20 shadow-lg"
          style={{
            backgroundImage: 'url(https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?w=400&h=400&fit=crop)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            filter: 'blur(1px)'
          }}
        />
        <motion.div
          animate={{ 
            x: [0, -100, 0], 
            y: [0, 70, 0],
            rotate: [0, 30, 0],
            scale: [1, 1.2, 1]
          }}
          transition={{ duration: 28, repeat: Infinity, ease: "linear" }}
          className="absolute bottom-20 right-1/3 w-44 h-44 rounded-full opacity-12 shadow-xl"
          style={{
            backgroundImage: 'url(https://images.unsplash.com/photo-1466442929976-97f336a657be?w=500&h=500&fit=crop)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            filter: 'blur(2px)'
          }}
        />
        
        {/* Floating Medical Icons */}
        <motion.div
          animate={{ 
            y: [0, -30, 0],
            rotate: [0, 360, 0],
            scale: [1, 1.2, 1]
          }}
          transition={{ duration: 12, repeat: Infinity }}
          className="absolute top-80 left-20 text-8xl opacity-15"
        >
          🏥
        </motion.div>
        <motion.div
          animate={{ 
            y: [0, 25, 0],
            x: [0, 15, 0],
            rotate: [0, -180, 0]
          }}
          transition={{ duration: 8, repeat: Infinity }}
          className="absolute top-96 right-40 text-7xl opacity-20"
        >
          🩺
        </motion.div>
        <motion.div
          animate={{ 
            y: [0, -35, 0],
            rotate: [0, -360, 0],
            scale: [1, 1.3, 1]
          }}
          transition={{ duration: 15, repeat: Infinity }}
          className="absolute bottom-80 left-1/2 text-6xl opacity-25"
        >
          💊
        </motion.div>
        <motion.div
          animate={{ 
            y: [0, 20, 0],
            x: [0, -20, 0],
            scale: [1, 1.1, 1]
          }}
          transition={{ duration: 10, repeat: Infinity }}
          className="absolute top-1/3 right-10 text-5xl opacity-18"
        >
          🚑
        </motion.div>
        <motion.div
          animate={{ 
            y: [0, -15, 0],
            rotate: [0, 180, 0]
          }}
          transition={{ duration: 7, repeat: Infinity }}
          className="absolute bottom-1/3 left-10 text-6xl opacity-22"
        >
          ⚕️
        </motion.div>

        {/* Gradient Overlays */}
        <motion.div
          animate={{ 
            opacity: [0.1, 0.3, 0.1],
            scale: [1, 1.1, 1]
          }}
          transition={{ duration: 8, repeat: Infinity }}
          className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-br from-green-200 to-transparent rounded-full blur-3xl"
        />
        <motion.div
          animate={{ 
            opacity: [0.2, 0.4, 0.2],
            scale: [1.1, 1, 1.1]
          }}
          transition={{ duration: 10, repeat: Infinity }}
          className="absolute bottom-0 right-0 w-80 h-80 bg-gradient-to-tl from-teal-200 to-transparent rounded-full blur-3xl"
        />
      </div>

      <div className="max-w-4xl mx-auto relative z-10">
        {/* Enhanced Header */}
        <motion.div 
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="flex items-center mb-8"
        >
          <motion.div
            whileHover={{ scale: 1.1, rotate: -5 }}
            whileTap={{ scale: 0.9 }}
          >
            <Button 
              variant="ghost" 
              onClick={onBack}
              className="mr-4 p-2 hover:bg-white/70 rounded-full shadow-lg"
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
          </motion.div>
          <div className="flex items-center">
            <motion.div
              animate={{ 
                boxShadow: [
                  '0 0 20px rgba(34, 197, 94, 0.3)',
                  '0 0 40px rgba(34, 197, 94, 0.6)',
                  '0 0 20px rgba(34, 197, 94, 0.3)'
                ]
              }}
              transition={{ duration: 3, repeat: Infinity }}
              className="w-16 h-16 bg-gradient-to-br from-green-500 to-teal-500 rounded-full flex items-center justify-center mr-4 shadow-2xl"
            >
              <Heart className="h-8 w-8 text-white" />
            </motion.div>
            <div>
              <motion.h1 
                initial={{ x: -30, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.8 }}
                className="text-3xl font-bold text-gray-800"
              >
                {t('Health Services Complaint')}
              </motion.h1>
              <motion.p 
                initial={{ x: -30, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.8 }}
                className="text-gray-600"
              >
                {t('Report health service related issues')}
              </motion.p>
            </div>
          </div>
        </motion.div>

        {/* Enhanced Main Form */}
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.8 }}
        >
          <Card className="shadow-2xl border-0 bg-white/95 backdrop-blur-md overflow-hidden">
            <motion.div
              initial={{ height: 0 }}
              animate={{ height: 'auto' }}
              transition={{ delay: 0.6, duration: 0.8 }}
            >
              <CardHeader className="bg-gradient-to-r from-green-500 via-emerald-500 to-teal-500 text-white rounded-t-lg relative overflow-hidden">
                <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1551838147-6ac1cbc10fca?w=1200&h=200&fit=crop')] bg-cover bg-center opacity-20"></div>
                <CardTitle className="text-2xl flex items-center relative z-10">
                  <motion.div
                    animate={{ rotate: [0, 5, -5, 0] }}
                    transition={{ duration: 4, repeat: Infinity }}
                    className="mr-3"
                  >
                    <Heart className="h-6 w-6" />
                  </motion.div>
                  {t('File Health Services Complaint')}
                </CardTitle>
              </CardHeader>
            </motion.div>
            <CardContent className="p-8">
              <form onSubmit={handleSubmit} className="space-y-8">
                {/* Sub Category Selection */}
                <motion.div
                  initial={{ x: -30, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.8, duration: 0.6 }}
                  className="space-y-3"
                >
                  <label className="text-sm font-semibold text-gray-700 flex items-center">
                    <Stethoscope className="mr-2 h-4 w-4 text-green-500" />
                    {t('Health Service Type')}
                  </label>
                  <Select value={formData.subCategory} onValueChange={(value) => setFormData(prev => ({ ...prev, subCategory: value }))}>
                    <SelectTrigger className="h-14 bg-gradient-to-r from-green-50 to-teal-50 border-green-200 hover:border-green-300 transition-colors">
                      <SelectValue placeholder={t('Select health service type')} />
                    </SelectTrigger>
                    <SelectContent>
                      {healthSubCategories.map((category) => (
                        <SelectItem key={category.value} value={category.value}>
                          {category.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </motion.div>

                {/* Title */}
                <motion.div
                  initial={{ x: 30, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 1.0, duration: 0.6 }}
                  className="space-y-3"
                >
                  <label className="text-sm font-semibold text-gray-700 flex items-center">
                    <Activity className="mr-2 h-4 w-4 text-green-500" />
                    {t('Complaint Title')}
                  </label>
                  <Input
                    value={formData.title}
                    onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                    placeholder={t('Brief title for your health complaint')}
                    className="h-14 bg-gradient-to-r from-green-50 to-teal-50 border-green-200 hover:border-green-300 focus:border-green-400 transition-colors"
                    required
                  />
                </motion.div>

                {/* Description */}
                <motion.div
                  initial={{ x: -30, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 1.2, duration: 0.6 }}
                  className="space-y-3"
                >
                  <label className="text-sm font-semibold text-gray-700">{t('Detailed Description')}</label>
                  <Textarea
                    value={formData.description}
                    onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                    placeholder={t('Describe your health service issue in detail...')}
                    className="min-h-36 bg-gradient-to-r from-green-50 to-teal-50 border-green-200 hover:border-green-300 focus:border-green-400 transition-colors"
                    required
                  />
                </motion.div>

                {/* Location */}
                <motion.div
                  initial={{ x: 30, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 1.4, duration: 0.6 }}
                  className="space-y-3"
                >
                  <label className="text-sm font-semibold text-gray-700 flex items-center">
                    <MapPin className="mr-2 h-4 w-4 text-green-500" />
                    {t('Location')}
                  </label>
                  <div className="relative">
                    <MapPin className="absolute left-4 top-4 h-5 w-5 text-gray-400" />
                    <Input
                      value={formData.location}
                      onChange={(e) => setFormData(prev => ({ ...prev, location: e.target.value }))}
                      placeholder={t('Hospital/Clinic name and location')}
                      className="pl-12 h-14 bg-gradient-to-r from-green-50 to-teal-50 border-green-200 hover:border-green-300 focus:border-green-400 transition-colors"
                      required
                    />
                  </div>
                </motion.div>

                {/* Priority */}
                <motion.div
                  initial={{ x: -30, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 1.6, duration: 0.6 }}
                  className="space-y-3"
                >
                  <label className="text-sm font-semibold text-gray-700 flex items-center">
                    <AlertCircle className="mr-2 h-4 w-4 text-green-500" />
                    {t('Priority Level')}
                  </label>
                  <Select value={formData.priority} onValueChange={(value) => setFormData(prev => ({ ...prev, priority: value }))}>
                    <SelectTrigger className="h-14 bg-gradient-to-r from-green-50 to-teal-50 border-green-200 hover:border-green-300 transition-colors">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="low" className="text-green-600">
                        <div className="flex items-center">
                          <div className="w-3 h-3 bg-green-500 rounded-full mr-3"></div>
                          {t('Low Priority')}
                        </div>
                      </SelectItem>
                      <SelectItem value="medium" className="text-yellow-600">
                        <div className="flex items-center">
                          <div className="w-3 h-3 bg-yellow-500 rounded-full mr-3"></div>
                          {t('Medium Priority')}
                        </div>
                      </SelectItem>
                      <SelectItem value="high" className="text-red-600">
                        <div className="flex items-center">
                          <div className="w-3 h-3 bg-red-500 rounded-full mr-3"></div>
                          {t('High Priority')}
                        </div>
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </motion.div>

                {/* File Upload */}
                <motion.div
                  initial={{ y: 30, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 1.8, duration: 0.6 }}
                  className="space-y-3"
                >
                  <label className="text-sm font-semibold text-gray-700 flex items-center">
                    <Upload className="mr-2 h-4 w-4 text-green-500" />
                    {t('Attach Evidence (Optional)')}
                  </label>
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    className="border-2 border-dashed border-green-300 rounded-xl p-8 text-center hover:border-green-400 transition-colors bg-gradient-to-br from-green-50 to-teal-50"
                  >
                    <Upload className="h-12 w-12 text-green-400 mx-auto mb-4" />
                    <p className="text-gray-600 text-lg font-medium">{t('Click to upload photos, documents, or medical reports')}</p>
                    <p className="text-sm text-gray-500 mt-2">{t('Supported formats: JPG, PNG, PDF (Max 10MB)')}</p>
                  </motion.div>
                </motion.div>

                {/* Submit Button */}
                <motion.div
                  initial={{ y: 30, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 2.0, duration: 0.6 }}
                  className="flex gap-6 pt-6"
                >
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex-1"
                  >
                    <Button
                      type="button"
                      variant="outline"
                      onClick={onBack}
                      className="w-full h-14 text-lg border-2 border-gray-300 hover:border-gray-400 hover:bg-gray-50"
                    >
                      {t('Cancel')}
                    </Button>
                  </motion.div>
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex-1"
                  >
                    <Button
                      type="submit"
                      disabled={isSubmitting || !formData.title || !formData.description || !formData.location}
                      className="w-full h-14 text-lg bg-gradient-to-r from-green-500 via-emerald-500 to-teal-500 hover:from-green-600 hover:via-emerald-600 hover:to-teal-600 text-white font-bold shadow-xl"
                    >
                      {isSubmitting ? (
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                          className="mr-2"
                        >
                          ⚕️
                        </motion.div>
                      ) : (
                        <Heart className="mr-2 h-5 w-5" />
                      )}
                      {isSubmitting ? t('Submitting...') : t('Submit Complaint')}
                    </Button>
                  </motion.div>
                </motion.div>
              </form>
            </CardContent>
          </Card>
        </motion.div>

        {/* Enhanced Important Notice */}
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 2.2, duration: 0.8 }}
        >
          <Card className="mt-8 bg-gradient-to-r from-orange-50 to-red-50 border-2 border-orange-200 shadow-lg">
            <CardContent className="p-6">
              <motion.div
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
                transition={{ delay: 2.4, duration: 0.6 }}
                className="flex items-start space-x-4"
              >
                <motion.div
                  animate={{ 
                    scale: [1, 1.1, 1],
                    rotate: [0, 5, -5, 0]
                  }}
                  transition={{ duration: 4, repeat: Infinity }}
                >
                  <AlertCircle className="h-8 w-8 text-orange-500 mt-1" />
                </motion.div>
                <div>
                  <h4 className="font-bold text-xl text-orange-800 mb-2">{t('Important Notice')}</h4>
                  <p className="text-orange-700 text-lg leading-relaxed">
                    {t('For medical emergencies, please call 108 immediately. This complaint system is for non-emergency health service issues.')}
                  </p>
                </div>
              </motion.div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default HealthServicesComplaint;
