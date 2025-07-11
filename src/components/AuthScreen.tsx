
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useLanguage } from '../contexts/LanguageContext';
import { useAuth } from '../contexts/AuthContext';
import { Phone, MessageSquare, Mail, Eye, EyeOff, User } from 'lucide-react';
import SignupForm from './SignupForm';

interface AuthScreenProps {
  onAuthenticated: () => void;
}

const AuthScreen: React.FC<AuthScreenProps> = ({ onAuthenticated }) => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [otp, setOtp] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [authMode, setAuthMode] = useState<'phone' | 'email' | 'signup'>('phone');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const { language, toggleLanguage, t } = useLanguage();
  const { login } = useAuth();

  const handleSendOtp = async () => {
    if (phoneNumber.length !== 10) {
      setErrors({ phone: t('Please enter a valid 10-digit mobile number') });
      return;
    }
    
    setIsLoading(true);
    setErrors({});
    // Simulate OTP sending
    setTimeout(() => {
      setIsOtpSent(true);
      setIsLoading(false);
      alert(t('OTP sent successfully! Use 123456 for demo'));
    }, 2000);
  };

  const handleVerifyOtp = async () => {
    if (otp === '123456') {
      setIsLoading(true);
      setTimeout(() => {
        onAuthenticated();
        setIsLoading(false);
      }, 1000);
    } else {
      setErrors({ otp: t('Invalid OTP. Please try again.') });
    }
  };

  const handleEmailLogin = async () => {
    if (!email || !password) {
      setErrors({ general: t('Please fill in all fields') });
      return;
    }

    setIsLoading(true);
    setErrors({});
    
    const { error } = await login(email, password);
    
    if (error) {
      if (error.message.includes('Invalid login credentials')) {
        setErrors({ general: t('Invalid email or password') });
      } else {
        setErrors({ general: error.message });
      }
    } else {
      onAuthenticated();
    }
    
    setIsLoading(false);
  };

  if (authMode === 'signup') {
    return (
      <SignupForm 
        onBack={() => setAuthMode('phone')} 
        onSuccess={onAuthenticated}
      />
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="min-h-screen flex items-center justify-center p-4"
      style={{
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      }}
    >
      <div className="absolute inset-0 bg-white/10 backdrop-blur-sm"></div>
      
      <div className="relative w-full max-w-md">
        <div className="text-center mb-8">
          <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center shadow-lg">
            <span className="text-2xl">🏛️</span>
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">Mee Saaradhi</h1>
          <p className="text-white/80">{t('Secure Login to Continue')}</p>
        </div>

        <Card className="shadow-2xl border-0 bg-white/95 backdrop-blur-sm">
          <CardHeader className="text-center">
            <CardTitle className="text-xl text-gray-800">
              {authMode === 'phone' 
                ? (!isOtpSent ? t('Enter Mobile Number') : t('Verify OTP'))
                : t('Email Login')
              }
            </CardTitle>
          </CardHeader>
          
          <CardContent className="space-y-4">
            {errors.general && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
                {errors.general}
              </div>
            )}

            {/* Name Input Field */}
            <div className="relative">
              <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                type="text"
                placeholder={t('Enter your full name')}
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                  if (errors.name) setErrors(prev => ({ ...prev, name: '' }));
                }}
                className="pl-10 h-12 text-lg"
              />
            </div>
            {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}

            {authMode === 'phone' && !isOtpSent && (
              <>
                <div className="relative">
                  <Phone className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    type="tel"
                    placeholder={t('Enter 10-digit mobile number')}
                    value={phoneNumber}
                    onChange={(e) => {
                      setPhoneNumber(e.target.value);
                      if (errors.phone) setErrors({});
                    }}
                    className="pl-10 h-12 text-lg"
                    maxLength={10}
                  />
                </div>
                {errors.phone && <p className="text-red-500 text-sm">{errors.phone}</p>}
                <Button 
                  onClick={handleSendOtp}
                  disabled={isLoading || phoneNumber.length !== 10 || !name.trim()}
                  className="w-full h-12 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-semibold"
                >
                  {isLoading ? t('Sending OTP...') : t('Send OTP')}
                </Button>
              </>
            )}

            {authMode === 'phone' && isOtpSent && (
              <>
                <div className="relative">
                  <MessageSquare className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    type="text"
                    placeholder={t('Enter 6-digit OTP')}
                    value={otp}
                    onChange={(e) => {
                      setOtp(e.target.value);
                      if (errors.otp) setErrors({});
                    }}
                    className="pl-10 h-12 text-lg text-center tracking-widest"
                    maxLength={6}
                  />
                </div>
                {errors.otp && <p className="text-red-500 text-sm">{errors.otp}</p>}
                <Button 
                  onClick={handleVerifyOtp}
                  disabled={isLoading || otp.length !== 6}
                  className="w-full h-12 bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white font-semibold"
                >
                  {isLoading ? t('Verifying...') : t('Verify & Login')}
                </Button>
                <Button 
                  variant="ghost"
                  onClick={() => setIsOtpSent(false)}
                  className="w-full text-gray-600"
                >
                  {t('Change Mobile Number')}
                </Button>
              </>
            )}

            {authMode === 'email' && (
              <>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    type="email"
                    placeholder={t('Email Address')}
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      if (errors.general) setErrors({});
                    }}
                    className="pl-10 h-12"
                  />
                </div>
                <div className="relative">
                  <Input
                    type={showPassword ? 'text' : 'password'}
                    placeholder={t('Password')}
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                      if (errors.general) setErrors({});
                    }}
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
                <Button 
                  onClick={handleEmailLogin}
                  disabled={isLoading || !email || !password || !name.trim()}
                  className="w-full h-12 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white font-semibold"
                >
                  {isLoading ? t('Signing In...') : t('Sign In')}
                </Button>
              </>
            )}
            
            {/* Auth Mode Toggle */}
            <div className="flex gap-2">
              <Button
                variant={authMode === 'phone' ? 'default' : 'outline'}
                onClick={() => {
                  setAuthMode('phone');
                  setErrors({});
                  setIsOtpSent(false);
                }}
                className="flex-1 text-sm"
              >
                {t('Phone')}
              </Button>
              <Button
                variant={authMode === 'email' ? 'default' : 'outline'}
                onClick={() => {
                  setAuthMode('email');
                  setErrors({});
                }}
                className="flex-1 text-sm"
              >
                {t('Email')}  
              </Button>
            </div>

            {/* Sign Up Link */}
            <div className="text-center pt-2">
              <p className="text-gray-600 text-sm">
                {t("Don't have an account?")}{' '}
                <button
                  onClick={() => setAuthMode('signup')}
                  className="text-orange-500 hover:text-orange-600 font-medium"
                >
                  {t('Sign Up')}
                </button>
              </p>
            </div>
            
            <div className="text-center pt-4">
              <Button
                variant="outline"
                onClick={toggleLanguage}
                className="text-sm"
              >
                {language === 'en' ? 'తెలుగు' : 'English'}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </motion.div>
  );
};

export default AuthScreen;
