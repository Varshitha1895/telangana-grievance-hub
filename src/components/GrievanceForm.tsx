
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useLanguage } from '../contexts/LanguageContext';
import { useGrievance } from '../contexts/GrievanceContext';
import { ArrowLeft, Camera, Mic, Video, MapPin } from 'lucide-react';

interface GrievanceFormProps {
  onBack: () => void;
}

const GrievanceForm: React.FC<GrievanceFormProps> = ({ onBack }) => {
  const { t } = useLanguage();
  const { submitGrievance } = useGrievance();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    category: '',
    description: '',
    location: '',
    media: {
      images: [],
      audio: null,
      video: null
    },
    categorySpecific: {}
  });

  const categories = [
    { value: 'pensions', label: t('Pensions') },
    { value: 'road', label: t('Roads & Infrastructure') },
    { value: 'health', label: t('Health Services') },
    { value: 'water', label: t('Water Supply') },
    { value: 'power', label: t('Electricity') },
    { value: 'ration', label: t('Ration & PDS') }
  ];

  const handleSubmit = async () => {
    try {
      await submitGrievance(formData);
      alert(t('Grievance submitted successfully!'));
      onBack();
    } catch (error) {
      console.error('Error submitting grievance:', error);
      alert(t('Failed to submit grievance. Please try again.'));
    }
  };

  const renderCategorySpecificFields = () => {
    switch (formData.category) {
      case 'pensions':
        return (
          <div className="space-y-4">
            <Input 
              placeholder={t('Aadhaar Number')}
              onChange={(e) => setFormData({
                ...formData,
                categorySpecific: { ...formData.categorySpecific, aadhaar: e.target.value }
              })}
            />
            <Input 
              placeholder={t('Pension Type')}
              onChange={(e) => setFormData({
                ...formData,
                categorySpecific: { ...formData.categorySpecific, pensionType: e.target.value }
              })}
            />
          </div>
        );
      case 'road':
        return (
          <div className="space-y-4">
            <Input 
              placeholder={t('Road Name/Location')}
              onChange={(e) => setFormData({
                ...formData,
                categorySpecific: { ...formData.categorySpecific, roadName: e.target.value }
              })}
            />
            <Select onValueChange={(value) => setFormData({
              ...formData,
              categorySpecific: { ...formData.categorySpecific, damageType: value }
            })}>
              <SelectTrigger>
                <SelectValue placeholder={t('Type of Damage')} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="pothole">{t('Pothole')}</SelectItem>
                <SelectItem value="broken">{t('Broken Road')}</SelectItem>
                <SelectItem value="drainage">{t('Drainage Issue')}</SelectItem>
              </SelectContent>
            </Select>
          </div>
        );
      case 'health':
        return (
          <div className="space-y-4">
            <Input 
              placeholder={t('Hospital/Clinic Name')}
              onChange={(e) => setFormData({
                ...formData,
                categorySpecific: { ...formData.categorySpecific, hospitalName: e.target.value }
              })}
            />
            <Select onValueChange={(value) => setFormData({
              ...formData,
              categorySpecific: { ...formData.categorySpecific, urgency: value }
            })}>
              <SelectTrigger>
                <SelectValue placeholder={t('Urgency Level')} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="low">{t('Low')}</SelectItem>
                <SelectItem value="medium">{t('Medium')}</SelectItem>
                <SelectItem value="high">{t('High')}</SelectItem>
                <SelectItem value="emergency">{t('Emergency')}</SelectItem>
              </SelectContent>
            </Select>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 p-4"
    >
      <div className="max-w-2xl mx-auto">
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
            <h1 className="text-2xl font-bold text-gray-800">{t('File New Grievance')}</h1>
            <p className="text-gray-600">{t('Step')} {currentStep} {t('of')} 4</p>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-gray-200 rounded-full h-2 mb-8">
          <div 
            className="bg-gradient-to-r from-orange-500 to-red-500 h-2 rounded-full transition-all duration-300"
            style={{ width: `${(currentStep / 4) * 100}%` }}
          ></div>
        </div>

        <Card className="shadow-xl border-0 bg-white/90 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-center">
              {currentStep === 1 && t('Select Category')}
              {currentStep === 2 && t('Provide Details')}
              {currentStep === 3 && t('Add Media & Location')}
              {currentStep === 4 && t('Review & Submit')}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {currentStep === 1 && (
              <div className="space-y-4">
                <Select onValueChange={(value) => setFormData({ ...formData, category: value })}>
                  <SelectTrigger className="h-12">
                    <SelectValue placeholder={t('Choose complaint category')} />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map(cat => (
                      <SelectItem key={cat.value} value={cat.value}>
                        {cat.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}

            {currentStep === 2 && (
              <div className="space-y-4">
                <Textarea
                  placeholder={t('Describe your grievance in detail...')}
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="min-h-32"
                />
                {renderCategorySpecificFields()}
              </div>
            )}

            {currentStep === 3 && (
              <div className="space-y-6">
                <div>
                  <h3 className="font-semibold mb-3">{t('Add Supporting Media')}</h3>
                  <div className="grid grid-cols-3 gap-4">
                    <Button variant="outline" className="h-20 flex-col">
                      <Camera className="h-6 w-6 mb-2" />
                      <span className="text-xs">{t('Photo')}</span>
                    </Button>
                    <Button variant="outline" className="h-20 flex-col">
                      <Mic className="h-6 w-6 mb-2" />
                      <span className="text-xs">{t('Audio')}</span>
                    </Button>
                    <Button variant="outline" className="h-20 flex-col">
                      <Video className="h-6 w-6 mb-2" />
                      <span className="text-xs">{t('Video')}</span>
                    </Button>
                  </div>
                </div>
                
                <div>
                  <h3 className="font-semibold mb-3">{t('Location')}</h3>
                  <div className="flex space-x-2">
                    <Input 
                      placeholder={t('Enter location manually')}
                      value={formData.location}
                      onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                      className="flex-1"
                    />
                    <Button className="bg-gradient-to-r from-green-500 to-blue-500">
                      <MapPin className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            )}

            {currentStep === 4 && (
              <div className="space-y-4">
                <div className="bg-gray-50 rounded-lg p-4">
                  <h3 className="font-semibold mb-2">{t('Review Your Grievance')}</h3>
                  <div className="space-y-2 text-sm">
                    <p><strong>{t('Category')}:</strong> {categories.find(c => c.value === formData.category)?.label}</p>
                    <p><strong>{t('Description')}:</strong> {formData.description}</p>
                    <p><strong>{t('Location')}:</strong> {formData.location || t('Not specified')}</p>
                  </div>
                </div>
              </div>
            )}

            {/* Navigation */}
            <div className="flex justify-between pt-6">
              <Button 
                variant="outline" 
                onClick={() => setCurrentStep(Math.max(1, currentStep - 1))}
                disabled={currentStep === 1}
              >
                {t('Previous')}
              </Button>
              
              {currentStep < 4 ? (
                <Button 
                  onClick={() => setCurrentStep(Math.min(4, currentStep + 1))}
                  disabled={currentStep === 1 && !formData.category}
                  className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600"
                >
                  {t('Next')}
                </Button>
              ) : (
                <Button 
                  onClick={handleSubmit}
                  className="bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600"
                >
                  {t('Submit Grievance')}
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </motion.div>
  );
};

export default GrievanceForm;
