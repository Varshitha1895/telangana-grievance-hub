
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useLanguage } from '../contexts/LanguageContext';
import { Phone, MessageSquare } from 'lucide-react';

interface AuthScreenProps {
  onAuthenticated: () => void;
}

const AuthScreen: React.FC<AuthScreenProps> = ({ onAuthenticated }) => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [otp, setOtp] = useState('');
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { language, toggleLanguage, t } = useLanguage();

  const handleSendOtp = async () => {
    if (phoneNumber.length !== 10) {
      alert(t('Please enter a valid 10-digit mobile number'));
      return;
    }
    
    setIsLoading(true);
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
      alert(t('Invalid OTP. Please try again.'));
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-blue-50 to-indigo-100"
    >
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center shadow-lg">
            <span className="text-2xl">🏛️</span>
          </div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Mee Saaradhi</h1>
          <p className="text-gray-600">{t('Secure Login to Continue')}</p>
        </div>

        <Card className="shadow-xl border-0 bg-white/80 backdrop-blur-sm">
          <CardHeader className="text-center">
            <CardTitle className="text-xl text-gray-800">
              {!isOtpSent ? t('Enter Mobile Number') : t('Verify OTP')}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {!isOtpSent ? (
              <>
                <div className="relative">
                  <Phone className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    type="tel"
                    placeholder={t('Enter 10-digit mobile number')}
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    className="pl-10 h-12 text-lg"
                    maxLength={10}
                  />
                </div>
                <Button 
                  onClick={handleSendOtp}
                  disabled={isLoading || phoneNumber.length !== 10}
                  className="w-full h-12 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-semibold"
                >
                  {isLoading ? t('Sending OTP...') : t('Send OTP')}
                </Button>
              </>
            ) : (
              <>
                <div className="relative">
                  <MessageSquare className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    type="text"
                    placeholder={t('Enter 6-digit OTP')}
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    className="pl-10 h-12 text-lg text-center tracking-widest"
                    maxLength={6}
                  />
                </div>
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
