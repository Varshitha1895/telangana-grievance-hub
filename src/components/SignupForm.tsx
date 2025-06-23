
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useLanguage } from '../contexts/LanguageContext';
import { useAuth } from '../contexts/AuthContext';
import { User, Mail, Phone, Calendar, CreditCard, Eye, EyeOff } from 'lucide-react';

interface SignupFormProps {
  onBack: () => void;
  onSuccess: () => void;
}

const SignupForm: React.FC<SignupFormProps> = ({ onBack, onSuccess }) => {
  const { t } = useLanguage();
  const { signup } = useAuth();

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

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.email) newErrors.email = t('Email is required');
    if (!formData.password) newErrors.password = t('Password is required');
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = t('Passwords do not match');
    }
    if (!formData.full_name) newErrors.full_name = t('Full name is required');

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
      const profileData = {
        full_name: formData.full_name,
        age: formData.age ? parseInt(formData.age) : undefined,
        phone_number: formData.phone_number || undefined,
        date_of_birth: formData.date_of_birth || undefined,
        aadhaar_number: formData.aadhaar_number || undefined,
        pan_number: formData.pan_number || undefined
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
