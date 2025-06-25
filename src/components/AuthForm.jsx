// src/components/AuthForm.jsx
import React, { useState, lazy, Suspense } from 'react';
import { motion as Motion } from 'framer-motion'; // Changed to alias for consistency

const AnimalAvatar = lazy(() => import('@components/AnimalAvatar'));

const AuthForm = () => {
  const [isSignUp, setIsSignUp] = useState(true);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    username: '',
    animal: 'Lion',
  });
  const [error, setError] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleAnimalChange = (animal) => {
    setFormData({ ...formData, animal });
  };

  const handleSubmit = (e) => {
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
    if (isSignUp && !formData.username.trim()) {
      setError('Username is required for sign-up.');
      return;
    }
    if (isSignUp && !formData.animal) {
      setError('Please select an animal avatar.');
      return;
    }

    console.log(`${isSignUp ? 'Sign Up' : 'Login'} submitted:`, formData);
    // TODO: Integrate with free auth solution (e.g., Firebase free tier)
  };

  return (
    <Motion.div
      className="border border-emerald-500 bg-black/80 backdrop-blur-md p-8 rounded-2xl shadow-2xl w-full max-w-md relative"
      style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='40' height='40' viewBox='0 0 40 40'%3E%3Cg fill='%23FFD700' fill-opacity='0.1'%3E%3Cpath d='M0 0h40v40H0z'/%3E%3Cpath d='M20 20l10-10M20 20L10 10M20 20l10 10M20 20L10 30'/%3E%3C/g%3E%3C/svg%3E")`,
      }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Motion.h2
        className="text-3xl font-bold text-emerald-300 mb-6 text-center font-ubuntu"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
      >
        {isSignUp ? 'Unleash Your Tribe' : 'Enter the Hunt'}
      </Motion.h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        {isSignUp && (
          <div>
            <label
              className="block text-emerald-200 font-medium mb-1 text-sm font-ubuntu"
              htmlFor="username"
            >
              Username
            </label>
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleInputChange}
              className="w-full px-4 py-3 bg-sand/20 border border-emerald-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:shadow-[0_0_8px_rgba(0,255,127,0.5)] transition-all duration-300 text-white text-sm"
              placeholder="Choose your username"
              aria-required="true"
              autoComplete="username"
            />
          </div>
        )}
        <div>
          <label
            className="block text-emerald-200 font-medium mb-1 text-sm font-ubuntu"
            htmlFor="email"
          >
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            className="w-full px-4 py-3 bg-sand/20 border border-emerald-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:shadow-[0_0_8px_rgba(0,255,127,0.5)] transition-all duration-300 text-white text-sm"
            placeholder="Your email address"
            aria-required="true"
            autoComplete="email"
          />
        </div>
        <div>
          <label
            className="block text-emerald-200 font-medium mb-1 text-sm font-ubuntu"
            htmlFor="password"
          >
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            className="w-full px-4 py-3 bg-sand/20 border border-emerald-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:shadow-[0_0_8px_rgba(0,255,127,0.5)] transition-all duration-300 text-white text-sm"
            placeholder="Your password"
            aria-required="true"
            autoComplete={isSignUp ? 'new-password' : 'current-password'}
          />
        </div>
        {isSignUp && (
          <div>
            <label className="block text-emerald-200 font-medium mb-2 text-sm font-ubuntu">
              Choose Your Spirit Animal
            </label>
            <Suspense fallback={<div className="text-emerald-200 text-sm text-center">Summoning spirit animals...</div>}>
              <AnimalAvatar
                selectedAnimal={formData.animal}
                setSelectedAnimal={handleAnimalChange}
              />
            </Suspense>
          </div>
        )}
        {error && (
          <p
            className="text-red-400 text-xs text-center font-ubuntu"
            role="alert"
            aria-live="assertive"
          >
            {error}
          </p>
        )}
        <Motion.button
          type="submit"
          className="w-full py-3 bg-emerald-500 text-black font-bold font-semibold rounded-lg hover:bg-emerald-600 transition-all duration-300 shadow-md text-sm font-ubuntu"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          aria-label={isSignUp ? 'Sign up for JungleX' : 'Log in to JungleX'}
        >
          {isSignUp ? 'SIGN UP' : 'Enter the Hunt'}
        </Motion.button>
      </form>
      <p className="text-emerald-200 text-center mt-4 text-base font-ubuntu">
        {isSignUp ? 'Already part of the tribe?' : 'Ready to join JungleX?'}
        <Motion.button
          onClick={() => setIsSignUp(!isSignUp)}
          className="ml-2 text-emerald-300 hover:text-emerald-100 font-medium underline"
          whileHover={{ scale: 1.05 }}
          aria-label={isSignUp ? 'Switch to login' : 'Switch to sign up'}
        >
          {isSignUp ? 'Login' : 'Sign Up'}
        </Motion.button>
      </p>
      <small className="block text-center text-emerald-300/50 text-xs mt-4">
        © {new Date().getFullYear()} Elodi Nigeria Enterprises. All rights reserved.
      </small>
    </Motion.div>
  );
};

export default React.memo(AuthForm);