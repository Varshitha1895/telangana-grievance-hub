
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
    if (!otp || otp.length !== 6) {
      setErrors({ otp: t('Please enter a valid 6-digit OTP') });
      return;
    }

    setIsLoading(true);
    setErrors({});

    try {
      // For demo purposes, we're simulating OTP verification
      // In production, this would connect to a real SMS/OTP service
      if (otp === '123456') {
        // Create a temporary session for demo purposes
        // In production, you'd verify the OTP with your SMS provider
        // and then create a proper Supabase session
        console.log('OTP verified successfully');
        onAuthenticated();
      } else {
        setErrors({ otp: t('Invalid OTP. Please try again.') });
      }
    } catch (error) {
      console.error('OTP verification error:', error);
      setErrors({ otp: t('Failed to verify OTP. Please try again.') });
    } finally {
      setIsLoading(false);
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
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden"
      style={{
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      }}
    >
      {/* Animated Background Elements */}
      <motion.div
        animate={{ 
          y: [-20, 20, -20],
          rotate: [0, 360],
          scale: [1, 1.2, 1]
        }}
        transition={{ duration: 20, repeat: Infinity }}
        className="absolute top-20 right-20 w-40 h-40 bg-white/10 rounded-full blur-xl"
      />
      <motion.div
        animate={{ 
          y: [20, -20, 20],
          rotate: [360, 0],
          scale: [1.2, 1, 1.2]
        }}
        transition={{ duration: 25, repeat: Infinity }}
        className="absolute bottom-20 left-20 w-32 h-32 bg-white/20 rounded-full blur-xl"
      />
      <div className="absolute inset-0 bg-white/10 backdrop-blur-sm"></div>
      
      <motion.div 
        className="relative w-full max-w-md"
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.6 }}
      >
        <motion.div 
          className="text-center mb-8"
          initial={{ y: -30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          <motion.div 
            className="w-16 h-16 mx-auto mb-4 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center shadow-lg"
            whileHover={{ scale: 1.1, rotate: 10 }}
            animate={{ 
              boxShadow: [
                "0 4px 20px rgba(0,0,0,0.2)",
                "0 8px 30px rgba(255,165,0,0.4)",
                "0 4px 20px rgba(0,0,0,0.2)"
              ]
            }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <span className="text-2xl">🏛️</span>
          </motion.div>
          <h1 className="text-3xl font-bold text-white mb-2">Mee Saaradhi</h1>
          <p className="text-white/80">{t('Secure Login to Continue')}</p>
        </motion.div>

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
      </motion.div>
    </motion.div>
  );
};

export default AuthScreen;
