// src/pages/Login.jsx
import React, { useState, useContext } from 'react';
import { motion as Motion } from 'framer-motion';
import { TypeAnimation } from 'react-type-animation';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '@/context/AuthContext';
import sunset from '@/assets/images/spirit-animals/king.webp';
import sankofa from '@/assets/icons/sankofa.webp';

const Login = () => {
  const { signIn } = useContext(AuthContext);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState('');
  const [language, setLanguage] = useState('en'); // Default to English

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleLanguageChange = (e) => {
    setLanguage(e.target.value);
    // Add logic to handle language change (e.g., update i18n or context)
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!formData.email.includes('@') || !formData.email.includes('.')) {
      setError('Please enter a valid email address (e.g., user@domain.com).');
      return;
    }
    if (formData.password.length < 8) {
      setError('Password must be at least 8 characters long.');
      return;
    }

    try {
      await signIn(formData);
      navigate('/dashboard');
    } catch (err) {
      setError(`Login failed: ${err.message}`);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-between bg-cover bg-center relative px-4 md:px-8 lg:px-10" style={{ backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${sunset})` }}>
      {/* Left Side */}
      <Motion.div
        className="relative z-10 w-full md:w-1/2 rounded-xl max-w-md mx-auto flex flex-col items-center justify-between h-auto py-2 md:py-4 text-center mb-12 md:mb-0"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        <img
          src={sankofa}
          alt="Sankofa adinkra symbol"
          className="w-12 h-12 md:w-16 md:h-16 mx-auto mt-2"
          aria-hidden="true"
        />
        <div className="flex flex-col items-center">
          <Motion.h1
            className="text-4xl md:text-5xl font-bold text-white my-4 drop-shadow-lg font-ubuntu"
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
              'Unleash your tribe in the jungle',
              2000,
            ]}
            wrapper="p"
            repeat={Infinity}
            className="text-lg md:text-xl text-emerald-300 drop-shadow-md font-ubuntu mb-2"
          />
        </div>
      </Motion.div>

      {/* Right Side: Login Form */}
      <Motion.div
        className="z-10 w-full md:w-1/2 max-w-md mx-auto flex justify-center md:justify-end items-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div
          className="border border-emerald-500 bg-black/50 p-8 rounded-xl shadow-2xl w-full relative"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='40' height='40' viewBox='0 0 40 40'%3E%3Cg fill='%23FFD700' fill-opacity='0.1'%3E%3Cpath d='M0 0h40v40H0z'/%3E%3Cpath d='M20 20l10-10M20 20L10 10M20 20l10 10M20 20L10 30'/%3E%3C/g%3E%3C/svg%3E")`,
          }}
        >
          <h2 className="text-3xl font-bold text-emerald-300 mb-6 text-center font-ubuntu">Login</h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-emerald-200 font-medium mb-1 text-sm font-ubuntu" htmlFor="email">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full px-4 py-2 bg-sand/20 border border-emerald-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-400 text-white text-sm"
                placeholder="Your email address"
                aria-required="true"
                autoComplete="email"
              />
            </div>
            <div>
              <label className="block text-emerald-200 font-medium mb-1 text-sm font-ubuntu" htmlFor="password">
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                className="w-full px-4 py-2 bg-sand/20 border border-emerald-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-400 text-white text-sm"
                placeholder="Your password"
                aria-required="true"
                autoComplete="current-password"
              />
            </div>
            {error && (
              <p className="text-red-400 text-xs text-center font-ubuntu" role="alert">
                {error}
              </p>
            )}
            <Motion.button
              type="submit"
              className="w-full py-2 bg-emerald-500 text-black font-bold rounded-lg hover:bg-emerald-600 transition-all duration-300 text-sm font-ubuntu"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              aria-label="Log in to JungleX"
            >
              Login
            </Motion.button>
          </form>
          <div className="mt-4 text-center">
            <Link
              to="/signup"
              className="inline-block px-6 bg-sand text-emerald-500 font-bold rounded-lg hover:bg-sand/80 transition-all duration-300 text-sm font-ubuntu"
            >
              Create New Account
            </Link>
          </div>
        </div>
      </Motion.div>

      {/* Footer with Quicklinks, Language Selection, and Copyright */}
      <footer className="w-full bg-black/50 text-white py-4 mt-8">
        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center">
          {/* Quicklinks */}
          <div className="flex space-x-4 mb-4 md:mb-0">
            <Link to="/" className="text-emerald-300 hover:text-emerald-400 text-sm font-ubuntu">Home</Link>
            <Link to="/about" className="text-emerald-300 hover:text-emerald-400 text-sm font-ubuntu">About</Link>
            <Link to="/contact" className="text-emerald-300 hover:text-emerald-400 text-sm font-ubuntu">Contact</Link>
            <Link to="/privacy" className="text-emerald-300 hover:text-emerald-400 text-sm font-ubuntu">Privacy Policy</Link>
          </div>

          {/* Language Selection */}
          <div className="mb-4 md:mb-0">
            <label htmlFor="language" className="sr-only">Select Language</label>
            <select
              id="language"
              value={language}
              onChange={handleLanguageChange}
              className="bg-black border border-emerald-500 text-white rounded-lg px-2 py-1 text-sm font-ubuntu focus:outline-none focus:ring-2 focus:ring-emerald-400"
            >
              <option value="en">English</option>
              <option value="yo">Yoruba</option>
              <option value="ig">Igbo</option>
              <option value="ha">Hausa</option>
              <option value="sw">Swahili</option>
            </select>
          </div>

          {/* Copyright Statement */}
          <p className="text-emerald-200 text-xs font-ubuntu">
            &copy; 2025 Elodi Nigeria Enterprises. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default React.memo(Login);