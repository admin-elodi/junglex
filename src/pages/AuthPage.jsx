import React from 'react';
import { motion as Motion } from 'framer-motion';
import { TypeAnimation } from 'react-type-animation';
import AuthForm from '@/components/auth/AuthForm';
import sunset from '@/assets/images/spirit-animals/king.webp';
import sankofa from '@/assets/icons/sankofa.webp';

// Recommendation: Add to index.html for preloading
// <link rel="preload" href="/src/assets/images/spirit-animals/king.webp" as="image" />
// <link rel="preload" href="/src/assets/icons/sankofa.webp" as="image" />

const AuthPage = () => {
  return (
    <div
      className="min-h-screen flex flex-col md:flex-row items-center justify-between bg-cover bg-center relative px-4 md:px-8 lg:px-10"
      style={{ backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${sunset})` }}
    >
      {/* Left Side: Title and TypeAnimation */}
      <Motion.div
        className="relative z-10 w-full md:w-1/2 rounded-lg max-w-md mx-auto flex flex-col items-center justify-center min-h-[50vh] md:h-[600px] text-center border-2 border-white mb-24 md:mb-0"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        <img
          src={sankofa}
          alt="Sankofa adinkra symbol"
          className="w-12 h-12 md:w-16 md:h-16 mx-auto mb-4"
          aria-hidden="true"
        />
        <div className="flex flex-col items-center">
          <Motion.h1
            className="text-4xl md:text-5xl font-bold text-white mb-4 drop-shadow-lg font-ubuntu"
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ repeat: Infinity, duration: 2 }}
          >
            JungleX
          </Motion.h1>
          <Motion.small
            className="text-white"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            The world's first Africanfuturist social media site
          </Motion.small>
          <TypeAnimation
            sequence={[
              'Login/signup to JungleX social media',
              2000,
              'Unleash your tribe',
              2000,
            ]}
            wrapper="p"
            repeat={Infinity}
            className="text-lg md:text-xl text-emerald-300 drop-shadow-md font-ubuntu mt-4"
          />
        </div>
      </Motion.div>
      {/* Right Side: Login Form */}
      <div className="relative z-10 w-full md:w-1/2 max-w-md mx-auto flex justify-center md:justify-end items-center md:h-[600px]">
        <AuthForm />
      </div>
    </div>
  );
};

export default React.memo(AuthPage);