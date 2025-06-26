import React from 'react';
import { motion as Motion } from 'framer-motion';
import { TypeAnimation } from 'react-type-animation';
import Particles from 'react-tsparticles';
import { loadFull } from 'tsparticles';
import AuthForm from '@components/AuthForm';
import sunset from '@assets/images/spirit-animals/king.webp';
import sankofa from '@assets/icons/sankofa.webp'; // New adinkra symbol

// Recommendation: Add to index.html for preloading
// <link rel="preload" href="/src/assets/images/spirit-animals/king.webp" as="image" />
// <link rel="preload" href="/src/assets/images/icons/sankofa.webp" as="image" />

const AuthPage = () => {
  // Initialize particles
  const particlesInit = async (main) => {
    await loadFull(main);
  };

  return (
    <div
      className="min-h-screen flex flex-col md:flex-row items-center justify-between bg-cover bg-center relative px-4 md:px-8 lg:px-40"
      style={{ backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${sunset})` }}
    >
      {/* Particle Background */}
      <Particles
        id="tsparticles"
        init={particlesInit}
        options={{
          background: { color: { value: 'transparent' } },
          fpsLimit: 60,
          particles: {
            number: { value: 30, density: { enable: true, value_area: 800 } },
            color: { value: ['#FFD700', '#00FF7F', '#FF4500'] }, // Gold, emerald, ochre
            shape: { type: 'circle' },
            opacity: { value: 0.5, random: true },
            size: { value: 3, random: true },
            move: {
              enable: true,
              speed: 0.3,
              direction: 'none',
              random: true,
              out_mode: 'out',
            },
          },
          interactivity: {
            events: { onhover: { enable: true, mode: 'repulse' } },
            modes: { repulse: { distance: 100, duration: 0.4 } },
          },
        }}
        className="absolute inset-0 z-0"
      />
      {/* Left Side: Title and TypeAnimation */}
      <Motion.div
        className="relative z-10 w-full md:w-1/2 text-center md:text-left mb-8 md:mb-0 flex items-center"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
      >
        <img
          src={sankofa}
          alt="Sankofa adinkra symbol"
          className="w-12 h-12 md:w-16 md:h-16 mr-4"
          aria-hidden="true"
        />
        <div>
          <Motion.h1
            className="text-4xl md:text-5xl font-bold text-white mb-4 drop-shadow-lg font-ubuntu"
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ repeat: Infinity, duration: 2 }}
          >
            JungleX
          </Motion.h1>
          <Motion.small className="text-white">
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
      <div className="relative z-10 w-full md:w-1/2 flex justify-center md:justify-end">
        <AuthForm />
      </div>
    </div>
  );
};

export default React.memo(AuthPage);