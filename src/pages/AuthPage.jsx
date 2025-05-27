// src/pages/AuthPage.jsx
import React from 'react';
import AuthForm from '@components/AuthForm';
import sunset from '@assets/images/sunset.jpg';

const AuthPage = () => {
  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center"
      style={{ backgroundImage: `url(${sunset})` }}
    >
      <div className="text-center">
        <h1 className="text-5xl font-bold text-white mb-8 drop-shadow-lg">
          JungleX
        </h1>
        <AuthForm />
      </div>
    </div>
  );
};

export default AuthPage;