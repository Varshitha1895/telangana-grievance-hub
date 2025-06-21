
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useLanguage } from '../contexts/LanguageContext';
import { useAuth } from '../contexts/AuthContext';
import { User, Mail, Phone, Calendar, CreditCard, FileImage, Eye, EyeOff } from 'lucide-react';

interface SignupFormProps {
  onBack: () => void;
  onSuccess: () => void;
}

const SignupForm: React.FC<SignupFormProps> = ({ onBack, onSuccess }) => {
  const { t } = useLanguage();
  const { signup, signupWithGoogle, uploadProfilePhoto } = useAuth();

  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    full_name: '',
    age: '',
    phone_number: '',
    date_of_birth: '',
    aadhaar_number: '',
    pan_number: ''
  });
  const [profilePhoto, setProfilePhoto] = useState<File | null>(null);
  const [photoPreview, setPhotoPreview] = useState<string>('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setProfilePhoto(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhotoPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.email) newErrors.email = t('Email is required');
    if (!formData.password) newErrors.password = t('Password is required');
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = t('Passwords do not match');
    }
    if (!formData.full_name) newErrors.full_name = t('Full name is required');
    if (!profilePhoto) newErrors.photo = t('Profile photo is required');

    // Validate Aadhaar (12 digits)
    if (formData.aadhaar_number && !/^\d{12}$/.test(formData.aadhaar_number)) {
      newErrors.aadhaar_number = t('Aadhaar number must be 12 digits');
    }

    // Validate PAN (5 letters, 4 digits, 1 letter)
    if (formData.pan_number && !/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/.test(formData.pan_number)) {
      newErrors.pan_number = t('Invalid PAN format');
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSignup = async () => {
    if (!validateForm()) return;

    setIsLoading(true);
    try {
      let profilePhotoUrl = '';
      
      if (profilePhoto) {
        const uploadResult = await uploadProfilePhoto(profilePhoto);
        if (uploadResult.error) {
          setErrors({ photo: t('Failed to upload photo') });
          return;
        }
        profilePhotoUrl = uploadResult.url || '';
      }

      const profileData = {
        full_name: formData.full_name,
        age: formData.age ? parseInt(formData.age) : undefined,
        phone_number: formData.phone_number || undefined,
        date_of_birth: formData.date_of_birth || undefined,
        aadhaar_number: formData.aadhaar_number || undefined,
        pan_number: formData.pan_number || undefined,
        profile_photo_url: profilePhotoUrl
      };

      const { error } = await signup(formData.email, formData.password, profileData);
      
      if (error) {
        if (error.message.includes('already registered')) {
          setErrors({ email: t('Email already registered') });
        } else {
          setErrors({ general: error.message });
        }
      } else {
        onSuccess();
      }
    } catch (error) {
      console.error('Signup error:', error);
      setErrors({ general: t('An error occurred during signup') });
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignup = async () => {
    setIsLoading(true);
    try {
      const { error } = await signupWithGoogle();
      if (error) {
        setErrors({ general: error.message });
      }
    } catch (error) {
      console.error('Google signup error:', error);
      setErrors({ general: t('Google signup failed') });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="min-h-screen flex items-center justify-center p-4"
      style={{
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      }}
    >
      <div className="absolute inset-0 bg-white/10 backdrop-blur-sm"></div>
      
      <div className="relative w-full max-w-2xl">
        <Card className="shadow-2xl border-0 bg-white/95 backdrop-blur-sm">
          <CardHeader className="text-center pb-4">
            <CardTitle className="text-2xl text-gray-800 flex items-center justify-center gap-2">
              <User className="h-6 w-6 text-orange-500" />
              {t('Create Account')}
            </CardTitle>
            <p className="text-gray-600">{t('Join Mee Saaradhi Platform')}</p>
          </CardHeader>
          
          <CardContent className="space-y-4">
            {errors.general && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
                {errors.general}
              </div>
            )}

            {/* Google Signup Button */}
            <Button
              onClick={handleGoogleSignup}
              disabled={isLoading}
              className="w-full h-12 bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 font-medium"
            >
              <svg className="mr-2 h-5 w-5" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              {t('Continue with Google')}
            </Button>

            <div className="flex items-center gap-4">
              <div className="flex-1 h-px bg-gray-300"></div>
              <span className="text-gray-500 text-sm">{t('or')}</span>
              <div className="flex-1 h-px bg-gray-300"></div>
            </div>

            {/* Email and Password */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    type="email"
                    name="email"
                    placeholder={t('Email Address')}
                    value={formData.email}
                    onChange={handleInputChange}
                    className="pl-10 h-12"
                  />
                </div>
                {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
              </div>

              <div>
                <div className="relative">
                  <Input
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    placeholder={t('Password')}
                    value={formData.password}
                    onChange={handleInputChange}
                    className="pr-10 h-12"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-3 h-4 w-4 text-gray-400"
                  >
                    {showPassword ? <EyeOff /> : <Eye />}
                  </button>
                </div>
                {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
              </div>
            </div>

            <div>
              <div className="relative">
                <Input
                  type={showConfirmPassword ? 'text' : 'password'}
                  name="confirmPassword"
                  placeholder={t('Confirm Password')}
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  className="pr-10 h-12"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-3 h-4 w-4 text-gray-400"
                >
                  {showConfirmPassword ? <EyeOff /> : <Eye />}
                </button>
              </div>
              {errors.confirmPassword && <p className="text-red-500 text-sm mt-1">{errors.confirmPassword}</p>}
            </div>

            {/* Personal Information */}
            <div className="border-t pt-4">
              <h3 className="text-lg font-semibold text-gray-800 mb-3">{t('Personal Information')}</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <div className="relative">
                    <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      name="full_name"
                      placeholder={t('Full Name')}
                      value={formData.full_name}
                      onChange={handleInputChange}
                      className="pl-10 h-12"
                    />
                  </div>
                  {errors.full_name && <p className="text-red-500 text-sm mt-1">{errors.full_name}</p>}
                </div>

                <div>
                  <Input
                    type="number"
                    name="age"
                    placeholder={t('Age')}
                    value={formData.age}
                    onChange={handleInputChange}
                    className="h-12"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                <div>
                  <div className="relative">
                    <Phone className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      type="tel"
                      name="phone_number"
                      placeholder={t('Phone Number')}
                      value={formData.phone_number}
                      onChange={handleInputChange}
                      className="pl-10 h-12"
                    />
                  </div>
                </div>

                <div>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      type="date"
                      name="date_of_birth"
                      placeholder={t('Date of Birth')}
                      value={formData.date_of_birth}
                      onChange={handleInputChange}
                      className="pl-10 h-12"
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                <div>
                  <div className="relative">
                    <CreditCard className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      name="aadhaar_number"
                      placeholder={t('Aadhaar Number (12 digits)')}
                      value={formData.aadhaar_number}
                      onChange={handleInputChange}
                      className="pl-10 h-12"
                      maxLength={12}
                    />
                  </div>
                  {errors.aadhaar_number && <p className="text-red-500 text-sm mt-1">{errors.aadhaar_number}</p>}
                </div>

                <div>
                  <div className="relative">
                    <CreditCard className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      name="pan_number"
                      placeholder={t('PAN Number')}
                      value={formData.pan_number}
                      onChange={handleInputChange}
                      className="pl-10 h-12"
                      maxLength={10}
                      style={{ textTransform: 'uppercase' }}
                    />
                  </div>
                  {errors.pan_number && <p className="text-red-500 text-sm mt-1">{errors.pan_number}</p>}
                </div>
              </div>

              {/* Profile Photo Upload */}
              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {t('Profile Photo (Passport Size)')} *
                </label>
                <div className="flex items-center gap-4">
                  {photoPreview && (
                    <div className="w-20 h-24 border-2 border-gray-300 rounded overflow-hidden">
                      <img src={photoPreview} alt="Preview" className="w-full h-full object-cover" />
                    </div>
                  )}
                  <div className="flex-1">
                    <div className="relative">
                      <FileImage className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <Input
                        type="file"
                        accept="image/*"
                        onChange={handlePhotoChange}
                        className="pl-10 h-12"
                      />
                    </div>
                    {errors.photo && <p className="text-red-500 text-sm mt-1">{errors.photo}</p>}
                  </div>
                </div>
              </div>
            </div>

            <div className="flex gap-4 pt-4">
              <Button
                variant="outline"
                onClick={onBack}
                className="flex-1 h-12"
                disabled={isLoading}
              >
                {t('Back')}
              </Button>
              <Button
                onClick={handleSignup}
                disabled={isLoading}
                className="flex-1 h-12 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-semibold"
              >
                {isLoading ? t('Creating Account...') : t('Create Account')}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </motion.div>
  );
};

export default SignupForm;
