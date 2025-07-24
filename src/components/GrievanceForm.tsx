import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useLanguage } from '../contexts/LanguageContext';
import { useGrievance } from '../contexts/GrievanceContext';
import { ArrowLeft, Camera, Mic, Video, MapPin, Upload, X, FileText } from 'lucide-react';

interface GrievanceFormProps {
  onBack: () => void;
}

const GrievanceForm: React.FC<GrievanceFormProps> = ({ onBack }) => {
  const { t } = useLanguage();
  const { submitGrievance } = useGrievance();
  const [currentStep, setCurrentStep] = useState(1);
  const [isRecording, setIsRecording] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState<{
    images: File[];
    audio: File | null;
    video: File | null;
  }>({
    images: [],
    audio: null,
    video: null
  });
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

  const requestPermission = async (type: 'camera' | 'microphone') => {
    try {
      const constraints = type === 'camera' 
        ? { video: true, audio: true }
        : { audio: true };
      
      const stream = await navigator.mediaDevices.getUserMedia(constraints);
      stream.getTracks().forEach(track => track.stop()); // Stop the stream after getting permission
      return true;
    } catch (error) {
      console.error(`Permission denied for ${type}:`, error);
      alert(t(`Please allow ${type} access to use this feature`));
      return false;
    }
  };

  const handleFileUpload = (type: 'image' | 'audio' | 'video', files: FileList | null) => {
    if (!files) return;

    const file = files[0];
    if (type === 'image') {
      if (uploadedFiles.images.length < 3) {
        setUploadedFiles(prev => ({
          ...prev,
          images: [...prev.images, file]
        }));
      } else {
        alert(t('Maximum 3 images allowed'));
      }
    } else {
      setUploadedFiles(prev => ({
        ...prev,
        [type]: file
      }));
    }
  };

  const removeFile = (type: 'image' | 'audio' | 'video', index?: number) => {
    if (type === 'image' && typeof index === 'number') {
      setUploadedFiles(prev => ({
        ...prev,
        images: prev.images.filter((_, i) => i !== index)
      }));
    } else {
      setUploadedFiles(prev => ({
        ...prev,
        [type]: null
      }));
    }
  };

  const capturePhoto = async () => {
    const hasPermission = await requestPermission('camera');
    if (!hasPermission) return;

    // In a real app, this would open the camera
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.capture = 'environment';
    input.onchange = (e) => handleFileUpload('image', (e.target as HTMLInputElement).files);
    input.click();
  };

  const recordAudio = async () => {
    const hasPermission = await requestPermission('microphone');
    if (!hasPermission) return;

    if (!isRecording) {
      setIsRecording(true);
      // In a real app, start recording
      setTimeout(() => {
        setIsRecording(false);
        // Simulate recorded audio
        const blob = new Blob([''], { type: 'audio/mp3' });
        const file = new File([blob], 'recording.mp3', { type: 'audio/mp3' });
        setUploadedFiles(prev => ({ ...prev, audio: file }));
      }, 3000);
    }
  };

  const getCurrentLocation = () => {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setFormData(prev => ({
            ...prev,
            location: `${latitude}, ${longitude}`
          }));
          alert(t('Location captured successfully'));
        },
        (error) => {
          console.error('Error getting location:', error);
          alert(t('Unable to get location. Please enter manually.'));
        }
      );
    } else {
      alert(t('Geolocation is not supported by this browser'));
    }
  };

  const handleSubmit = async () => {
    try {
      // In a real app, upload files to storage first
      const mediaUrls = {
        images: uploadedFiles.images.map(file => URL.createObjectURL(file)),
        audio: uploadedFiles.audio ? URL.createObjectURL(uploadedFiles.audio) : null,
        video: uploadedFiles.video ? URL.createObjectURL(uploadedFiles.video) : null
      };

      const submissionData = {
        ...formData,
        media: mediaUrls
      };

      await submitGrievance(submissionData);
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
      className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 p-4 relative overflow-hidden"
    >
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{ 
            y: [-20, 20, -20],
            rotate: [0, 360]
          }}
          transition={{ duration: 20, repeat: Infinity }}
          className="absolute top-20 right-20 w-40 h-40 bg-gradient-to-r from-blue-200 to-purple-200 rounded-full opacity-20 blur-xl"
        />
        <motion.div
          animate={{ 
            y: [-15, 15, -15],
            rotate: [360, 0]
          }}
          transition={{ duration: 25, repeat: Infinity }}
          className="absolute bottom-32 left-20 w-32 h-32 bg-gradient-to-r from-purple-200 to-pink-200 rounded-full opacity-20 blur-xl"
        />
      </div>
      <div className="relative z-10 max-w-2xl mx-auto">
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
              className="p-3 rounded-xl hover:bg-blue-100"
            >
              <ArrowLeft className="h-6 w-6 text-blue-600" />
            </Button>
          </motion.div>
          <motion.div
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 300 }}
            className="flex items-center space-x-4"
          >
            <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center shadow-lg">
              <FileText className="h-8 w-8 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                {t('File New Grievance')}
              </h1>
              <p className="text-gray-600 mt-1 text-lg">{t('Step')} {currentStep} {t('of')} 4</p>
            </div>
          </motion.div>
        </motion.div>

        {/* Enhanced Progress Bar */}
        <motion.div
          variants={itemVariants}
          className="mb-8"
        >
          <div className="w-full bg-gray-200 rounded-full h-3 mb-4 shadow-inner">
            <motion.div 
              className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 h-3 rounded-full shadow-lg"
              initial={{ width: 0 }}
              animate={{ width: `${(currentStep / 4) * 100}%` }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            >
              <motion.div
                className="h-full bg-white/30 rounded-full"
                animate={{ x: ["-100%", "100%"] }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              />
            </motion.div>
          </div>
          <div className="flex justify-between text-sm font-medium text-gray-600">
            {[1, 2, 3, 4].map((step) => (
              <motion.div
                key={step}
                className={`flex items-center ${currentStep >= step ? 'text-purple-600' : 'text-gray-400'}`}
                whileHover={{ scale: 1.1 }}
              >
                <div className={`w-8 h-8 rounded-full flex items-center justify-center mr-2 ${
                  currentStep >= step ? 'bg-purple-500 text-white' : 'bg-gray-300 text-gray-600'
                }`}>
                  {step}
                </div>
                <span className="hidden md:block">
                  {step === 1 && t('Category')}
                  {step === 2 && t('Details')}
                  {step === 3 && t('Media')}
                  {step === 4 && t('Review')}
                </span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div
          variants={itemVariants}
          whileHover={{ y: -2 }}
          className="mb-4"
        >
          <Card className="shadow-2xl border-0 bg-white/95 backdrop-blur-md overflow-hidden">
          <CardHeader className="bg-gradient-to-r from-blue-500 to-purple-500 text-white">
            <CardTitle className="text-center text-xl flex items-center justify-center gap-3">
              {currentStep === 1 && (
                <>
                  <span className="text-2xl">🏷️</span>
                  {t('Select Category')}
                </>
              )}
              {currentStep === 2 && (
                <>
                  <span className="text-2xl">📝</span>
                  {t('Provide Details')}
                </>
              )}
              {currentStep === 3 && (
                <>
                  <span className="text-2xl">📱</span>
                  {t('Add Media & Location')}
                </>
              )}
              {currentStep === 4 && (
                <>
                  <span className="text-2xl">✅</span>
                  {t('Review & Submit')}
                </>
              )}
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
                  <div className="grid grid-cols-3 gap-4 mb-4">
                    <Button 
                      variant="outline" 
                      className="h-20 flex-col"
                      onClick={capturePhoto}
                    >
                      <Camera className="h-6 w-6 mb-2" />
                      <span className="text-xs">{t('Photo')}</span>
                    </Button>
                    <Button 
                      variant="outline" 
                      className={`h-20 flex-col ${isRecording ? 'bg-red-100' : ''}`}
                      onClick={recordAudio}
                    >
                      <Mic className={`h-6 w-6 mb-2 ${isRecording ? 'text-red-500' : ''}`} />
                      <span className="text-xs">
                        {isRecording ? t('Recording...') : t('Audio')}
                      </span>
                    </Button>
                    <Button variant="outline" className="h-20 flex-col">
                      <Video className="h-6 w-6 mb-2" />
                      <span className="text-xs">{t('Video')}</span>
                      <input
                        type="file"
                        accept="video/*"
                        onChange={(e) => handleFileUpload('video', e.target.files)}
                        className="hidden"
                      />
                    </Button>
                  </div>

                  {/* Display uploaded files */}
                  {uploadedFiles.images.length > 0 && (
                    <div className="mb-4">
                      <p className="text-sm font-medium mb-2">{t('Uploaded Images')}:</p>
                      <div className="flex flex-wrap gap-2">
                        {uploadedFiles.images.map((file, index) => (
                          <div key={index} className="relative bg-gray-100 p-2 rounded">
                            <span className="text-xs">{file.name}</span>
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={() => removeFile('image', index)}
                              className="absolute -top-1 -right-1 h-4 w-4 p-0"
                            >
                              <X className="h-3 w-3" />
                            </Button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {uploadedFiles.audio && (
                    <div className="mb-4">
                      <p className="text-sm font-medium mb-2">{t('Audio Recording')}:</p>
                      <div className="relative bg-gray-100 p-2 rounded">
                        <span className="text-xs">{uploadedFiles.audio.name}</span>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => removeFile('audio')}
                          className="absolute -top-1 -right-1 h-4 w-4 p-0"
                        >
                          <X className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                  )}
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
                    <Button 
                      onClick={getCurrentLocation}
                      className="bg-gradient-to-r from-green-500 to-blue-500"
                    >
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
                    <p><strong>{t('Media Files')}:</strong> {uploadedFiles.images.length} {t('images')}, {uploadedFiles.audio ? '1' : '0'} {t('audio')}, {uploadedFiles.video ? '1' : '0'} {t('video')}</p>
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
        </motion.div>
      </div>
    </motion.div>
  );
};

export default GrievanceForm;
