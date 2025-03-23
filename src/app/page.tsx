'use client';
import { useState } from 'react';
import LoginForm from '../components/auth/LoginForm';
import AuthImage from '../components/auth/AuthImage';
import RegistrationInfoForm from '../components/auth/RegistrationInfoForm';
import SuccessRegistration from '../components/auth/SuccessRegistration';

const LoginPage = () => {
  const [registrationStep, setRegistrationStep] = useState(1);

  return (
    <div className="min-h-screen text-black flex justify-center">
      <div className="max-w-screen-xl m-0 sm:m-20 bg-white shadow sm:rounded-lg flex justify-center flex-1">
        <AuthImage />
        {registrationStep === 1 && (
          <LoginForm setRegistrationStep={setRegistrationStep} />
        )}
        {registrationStep === 2 && (
          <RegistrationInfoForm setRegistrationStep={setRegistrationStep} />
        )}
        {registrationStep === 3 && <SuccessRegistration />}
      </div>
    </div>
  );
};



export default LoginPage;
