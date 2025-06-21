
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useLanguage } from '../contexts/LanguageContext';
import { useAuth } from '../contexts/AuthContext';
import { Phone, MessageSquare, Mail, Eye, EyeOff } from 'lucide-react';
import SignupForm from './SignupForm';

interface AuthScreenProps {
  onAuthenticated: () => void;
}

const AuthScreen: React.FC<AuthScreenProps> = ({ onAuthenticated }) => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [otp, setOtp] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [authMode, setAuthMode] = useState<'phone' | 'email' | 'signup'>('phone');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const { language, toggleLanguage, t } = useLanguage();
  const { login, signupWithGoogle } = useAuth();

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

  const handleGoogleSignin = async () => {
    setIsLoading(true);
    const { error } = await signupWithGoogle();
    if (error) {
      setErrors({ general: error.message });
    } else {
      // Google auth will redirect, so we don't need to call onAuthenticated here
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

            {/* Google Sign-in Button */}
            <Button
              onClick={handleGoogleSignin}
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
                  disabled={isLoading || phoneNumber.length !== 10}
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
                  disabled={isLoading || !email || !password}
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
