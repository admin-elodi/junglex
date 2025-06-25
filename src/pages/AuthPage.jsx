// src/pages/AuthPage.jsx
import React from 'react';
import { TypeAnimation } from 'react-type-animation';
import Particles from 'react-tsparticles';
import { loadFull } from 'tsparticles';
import AuthForm from '@components/AuthForm';
import sunset from '@assets/images/king.webp'; // Optimized WebP background

// Recommendation: Add to index.html for preloading
// <link rel="preload" href="/src/assets/images/king.webp" as="image" />

const AuthPage = () => {
  // Initialize particles
  const particlesInit = async (main) => {
    await loadFull(main);
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center relative"
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
            number: { value: 50, density: { enable: true, value_area: 800 } },
            color: { value: ['#FFD700', '#00FF7F', '#FF4500'] }, // Gold, emerald, ochre
            shape: { type: 'circle' },
            opacity: { value: 0.5, random: true },
            size: { value: 3, random: true },
            move: {
              enable: true,
              speed: 0.5,
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
      <div className="text-center relative z-10">
        <h1 className="text-5xl font-bold text-white mb-4 drop-shadow-lg font-ubuntu">
          JungleX
        </h1>
        <TypeAnimation
          sequence={[
            'Sign Up with JungleX Social Media',
            2000,
            'Link your Spirit Animal & Dive In',
            2000,
          ]}
          wrapper="p"
          repeat={Infinity}
          className="text-xl text-emerald-300 mb-8 drop-shadow-md font-ubuntu"
        />
        <AuthForm />
      </div>
    </div>
  );
};

export default React.memo(AuthPage);