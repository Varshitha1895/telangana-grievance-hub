
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useLanguage } from '../contexts/LanguageContext';
import { useGrievance } from '../contexts/GrievanceContext';
import { ArrowLeft, Heart, Upload, MapPin, AlertCircle } from 'lucide-react';

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
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="min-h-screen bg-gradient-to-br from-green-50 via-teal-50 to-blue-50 p-4 relative overflow-hidden"
    >
      {/* Beautiful Animated Background Images */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{ 
            x: [0, 80, 0], 
            y: [0, -60, 0],
            rotate: [0, 10, 0],
            scale: [1, 1.2, 1]
          }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className="absolute top-10 left-10 w-40 h-40 rounded-full opacity-15"
          style={{
            backgroundImage: 'url(https://images.unsplash.com/photo-1551838147-6ac1cbc10fca?w=400&h=400&fit=crop)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            filter: 'blur(1px)'
          }}
        />
        <motion.div
          animate={{ 
            x: [0, -50, 0], 
            y: [0, 70, 0],
            rotate: [0, -15, 0]
          }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
          className="absolute top-40 right-20 w-32 h-32 rounded-full opacity-20"
          style={{
            backgroundImage: 'url(https://images.unsplash.com/photo-1582562124811-c09040d0a901?w=400&h=400&fit=crop)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            filter: 'blur(1px)'
          }}
        />
        <motion.div
          animate={{ 
            x: [0, 60, 0], 
            y: [0, -40, 0],
            scale: [1, 1.3, 1]
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute bottom-32 left-1/4 w-28 h-28 rounded-full opacity-25"
          style={{
            backgroundImage: 'url(https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?w=400&h=400&fit=crop)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            filter: 'blur(1px)'
          }}
        />
        <motion.div
          animate={{ 
            x: [0, -70, 0], 
            y: [0, 50, 0],
            rotate: [0, 25, 0]
          }}
          transition={{ duration: 22, repeat: Infinity, ease: "linear" }}
          className="absolute bottom-10 right-1/3 w-36 h-36 rounded-full opacity-15"
          style={{
            backgroundImage: 'url(https://images.unsplash.com/photo-1466442929976-97f336a657be?w=400&h=400&fit=crop)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            filter: 'blur(1px)'
          }}
        />
        
        {/* Medical themed floating elements */}
        <motion.div
          animate={{ 
            y: [0, -20, 0],
            rotate: [0, 360, 0]
          }}
          transition={{ duration: 8, repeat: Infinity }}
          className="absolute top-60 left-20 text-6xl opacity-10"
        >
          🏥
        </motion.div>
        <motion.div
          animate={{ 
            y: [0, 15, 0],
            x: [0, 10, 0]
          }}
          transition={{ duration: 6, repeat: Infinity }}
          className="absolute top-80 right-40 text-5xl opacity-15"
        >
          🩺
        </motion.div>
        <motion.div
          animate={{ 
            y: [0, -25, 0],
            rotate: [0, -180, 0]
          }}
          transition={{ duration: 10, repeat: Infinity }}
          className="absolute bottom-60 left-1/2 text-4xl opacity-20"
        >
          💊
        </motion.div>
      </div>

      <div className="max-w-4xl mx-auto relative z-10">
        {/* Header */}
        <div className="flex items-center mb-6">
          <Button 
            variant="ghost" 
            onClick={onBack}
            className="mr-4 p-2 hover:bg-white/50"
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div className="flex items-center">
            <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-teal-500 rounded-full flex items-center justify-center mr-4 shadow-lg">
              <Heart className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-800">{t('Health Services Complaint')}</h1>
              <p className="text-gray-600">{t('Report health service related issues')}</p>
            </div>
          </div>
        </div>

        {/* Main Form */}
        <Card className="shadow-2xl border-0 bg-white/95 backdrop-blur-sm">
          <CardHeader className="bg-gradient-to-r from-green-500 to-teal-500 text-white rounded-t-lg">
            <CardTitle className="text-xl flex items-center">
              <Heart className="mr-2 h-5 w-5" />
              {t('File Health Services Complaint')}
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Sub Category Selection */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">{t('Health Service Type')}</label>
                <Select value={formData.subCategory} onValueChange={(value) => setFormData(prev => ({ ...prev, subCategory: value }))}>
                  <SelectTrigger className="h-12">
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
              </div>

              {/* Title */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">{t('Complaint Title')}</label>
                <Input
                  value={formData.title}
                  onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                  placeholder={t('Brief title for your health complaint')}
                  className="h-12"
                  required
                />
              </div>

              {/* Description */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">{t('Detailed Description')}</label>
                <Textarea
                  value={formData.description}
                  onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                  placeholder={t('Describe your health service issue in detail...')}
                  className="min-h-32"
                  required
                />
              </div>

              {/* Location */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">{t('Location')}</label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    value={formData.location}
                    onChange={(e) => setFormData(prev => ({ ...prev, location: e.target.value }))}
                    placeholder={t('Hospital/Clinic name and location')}
                    className="pl-10 h-12"
                    required
                  />
                </div>
              </div>

              {/* Priority */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">{t('Priority Level')}</label>
                <Select value={formData.priority} onValueChange={(value) => setFormData(prev => ({ ...prev, priority: value }))}>
                  <SelectTrigger className="h-12">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="low" className="text-green-600">
                      <div className="flex items-center">
                        <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                        {t('Low Priority')}
                      </div>
                    </SelectItem>
                    <SelectItem value="medium" className="text-yellow-600">
                      <div className="flex items-center">
                        <div className="w-2 h-2 bg-yellow-500 rounded-full mr-2"></div>
                        {t('Medium Priority')}
                      </div>
                    </SelectItem>
                    <SelectItem value="high" className="text-red-600">
                      <div className="flex items-center">
                        <div className="w-2 h-2 bg-red-500 rounded-full mr-2"></div>
                        {t('High Priority')}
                      </div>
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* File Upload */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">{t('Attach Evidence (Optional)')}</label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-green-400 transition-colors">
                  <Upload className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                  <p className="text-gray-600">{t('Click to upload photos, documents, or medical reports')}</p>
                  <p className="text-xs text-gray-500 mt-1">{t('Supported formats: JPG, PNG, PDF (Max 10MB)')}</p>
                </div>
              </div>

              {/* Submit Button */}
              <div className="flex gap-4 pt-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={onBack}
                  className="flex-1 h-12"
                >
                  {t('Cancel')}
                </Button>
                <Button
                  type="submit"
                  disabled={isSubmitting || !formData.title || !formData.description || !formData.location}
                  className="flex-1 h-12 bg-gradient-to-r from-green-500 to-teal-500 hover:from-green-600 hover:to-teal-600 text-white font-semibold"
                >
                  {isSubmitting ? t('Submitting...') : t('Submit Complaint')}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>

        {/* Important Notice */}
        <Card className="mt-6 bg-orange-50 border-orange-200">
          <CardContent className="p-4">
            <div className="flex items-start space-x-3">
              <AlertCircle className="h-5 w-5 text-orange-500 mt-0.5" />
              <div>
                <h4 className="font-semibold text-orange-800">{t('Important Notice')}</h4>
                <p className="text-sm text-orange-700 mt-1">
                  {t('For medical emergencies, please call 108 immediately. This complaint system is for non-emergency health service issues.')}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </motion.div>
  );
};

export default HealthServicesComplaint;
