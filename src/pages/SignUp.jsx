// src/pages/SignUp.jsx
import React, { useState, useEffect, useCallback } from 'react';
import { motion as Motion } from 'framer-motion';
import { TypeAnimation } from 'react-type-animation';
import { useNavigate, Link } from 'react-router-dom';
import AnimalAvatar from '@/components/auth/AnimalAvatar';
import { useAuth } from '@/context/AuthContext';
import sunset from '@assets/images/spirit-animals/sunset.webp';
import sankofa from '@assets/icons/sankofa.webp';
import lion from '@assets/images/spirit-animals/lion.webp';
import cheetah from '@assets/images/spirit-animals/cheetah.webp';
import elephant from '@assets/images/spirit-animals/elephant.webp';
import giraffe from '@assets/images/spirit-animals/giraffe.webp';
import rhino from '@assets/images/spirit-animals/rhino.webp';
import styles from './SignUp.module.css';

const animalImages = {
  Lion: lion,
  Cheetah: cheetah,
  Elephant: elephant,
  Giraffe: giraffe,
  Rhino: rhino,
};

const SignUp = () => {
  const { signUp, setSignUpSuccess } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    spiritAnimal: '',
  });
  const [error, setError] = useState('');
  const [successAnimal, setSuccessAnimal] = useState('');
  const [language, setLanguage] = useState('en');

  useEffect(() => {
    console.log('SignUp component rendered');
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleLanguageChange = (e) => {
    setLanguage(e.target.value);
  };

  const handleAnimalSelect = useCallback((animal) => {
    setFormData((prev) => ({ ...prev, spiritAnimal: animal }));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    const { username, email, password, confirmPassword, spiritAnimal } = formData;

    if (username.length < 3) return setError('Username must be at least 3 characters.');
    if (!email.includes('@') || !email.includes('.')) return setError('Enter a valid email.');
    if (password.length < 8) return setError('Password must be at least 8 characters.');
    if (password !== confirmPassword) return setError('Passwords do not match.');
    if (!spiritAnimal) return setError('Select a spirit animal.');

    try {
      await signUp({ email, password, username, spiritAnimal });
      setSuccessAnimal(spiritAnimal);
    } catch (err) {
      setError(`Sign-up failed: ${err.message || 'Please try again.'}`);
    }
  };

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-between bg-cover bg-center relative px-4 md:px-8 lg:px-40"
      style={{
        backgroundImage: `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url(${sunset})`,
      }}
    >
      {successAnimal && (
        <Motion.div
          className="fixed inset-0 flex items-center justify-center bg-black/80 backdrop-blur-md z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="text-center text-white font-ubuntu">
            <img
              src={animalImages[successAnimal]}
              alt={`${successAnimal} spirit animal`}
              className="w-24 h-24 mx-auto mb-4"
            />
            <h2 className="text-2xl font-bold text-emerald-300">
              Welcome to the JungleX Tribe, {successAnimal}!
            </h2>
            <p className="text-sahara-beige">Your roar is ready to echo!</p>
            <Motion.button
              onClick={() => {
                setSignUpSuccess(true); // Trigger success state for redirect
                navigate('/email-verification');
              }}
              className="mt-4 py-2 px-6 bg-emerald-500 text-black font-bold rounded-lg"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Continue
            </Motion.button>
          </div>
        </Motion.div>
      )}

      {/* Form Header */}
      <Motion.div
        className="relative z-10 w-full max-w-4xl text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        <img src={sankofa} alt="Sankofa symbol" className="w-12 h-12 mx-auto mb-4" />
        <Motion.h1
          className="text-4xl md:text-5xl font-bold text-white mb-4 font-ubuntu"
          animate={{ scale: [1, 1.05, 1] }}
          transition={{ repeat: Infinity, duration: 2 }}
        >
          JungleX
        </Motion.h1>
        <TypeAnimation
          sequence={[
            'Sign Up to JungleX',
            2000,
            'Choose your Spirit Animal',
            2000,
            'Unleash Your Tribe in the Jungle',
            2000,
          ]}
          wrapper="p"
          repeat={Infinity}
          className="text-lg md:text-xl text-emerald-300 mb-8 font-ubuntu"
        />

        {/* Form */}
        <Motion.form
          onSubmit={handleSubmit}
          className={`${styles.form} border border-emerald-500 bg-black/80 p-6 md:p-8 rounded-2xl shadow-2xl w-full`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-2xl font-bold text-emerald-300 text-center font-ubuntu">Sign Up</h2>
          <div className={styles.formContainer}>
            <div className={`${styles.inputGroup} text-left`}>
              {['username', 'email', 'password', 'confirmPassword'].map((field) => (
                <div key={field}>
                  <label
                    className="block text-emerald-200 font-medium mb-1 text-sm font-ubuntu"
                    htmlFor={field}
                  >
                    {field === 'confirmPassword'
                      ? 'Confirm Password'
                      : field.charAt(0).toUpperCase() + field.slice(1)}
                  </label>
                  <input
                    type={field.includes('password') ? 'password' : 'text'}
                    id={field}
                    name={field}
                    value={formData[field]}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 bg-sand/20 border border-emerald-500 rounded-lg text-white text-sm"
                    placeholder={`Your ${field}`}
                    autoComplete={field}
                  />
                </div>
              ))}
              {error && <p className="text-red-400 text-xs text-center mt-2">{error}</p>}
            </div>

            {/* Spirit Animal */}
            <div className={styles.avatarGroup}>
              <label className="block text-emerald-200 text-sm font-ubuntu text-center">
                Choose Your Spirit Animal
              </label>
              <AnimalAvatar onSelect={handleAnimalSelect} selectedAnimal={formData.spiritAnimal} />
            </div>
          </div>

          {/* Submit */}
          <div className={styles.submitGroup}>
            <Motion.button
              type="submit"
              className="w-full cursor-pointer py-2 bg-emerald-500 text-black font-bold rounded-lg hover:bg-emerald-600 transition-all duration-300 text-sm font-ubuntu"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Enter The Jungle
            </Motion.button>
          </div>
        </Motion.form>

        <Motion.div
          className="text-center mt-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <Link
            to="/"
            className="text-emerald-300 hover:text-emerald-100 text-sm font-ubuntu inline-block"
          >
            Already have an account? Log in
          </Link>
        </Motion.div>
      </Motion.div>

      {/* Footer */}
      <footer className="w-full bg-black/50 text-white py-4 mt-8">
        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center">
          <div className="flex space-x-4 mb-4 md:mb-0">
            <Link to="/about" className="text-emerald-300 hover:text-emerald-400 text-sm font-ubuntu">About</Link>
            <Link to="/privacy" className="text-emerald-300 hover:text-emerald-400 text-sm font-ubuntu">Privacy</Link>
            <Link to="/terms" className="text-emerald-300 hover:text-emerald-400 text-sm font-ubuntu">Terms</Link>
            <Link to="/contact" className="text-emerald-300 hover:text-emerald-400 text-sm font-ubuntu">Contact</Link>
          </div>

          <div className="mb-4 md:mb-0">
            <label htmlFor="language" className="sr-only">Select Language</label>
            <select
              id="language"
              value={language}
              onChange={handleLanguageChange}
              className="bg-sand/20 border border-emerald-500 text-white rounded-lg px-2 py-1 text-sm font-ubuntu focus:outline-none focus:ring-2 focus:ring-emerald-400"
            >
              <option value="en">English</option>
              <option value="yo">Yoruba</option>
              <option value="ig">Igbo</option>
              <option value="ha">Hausa</option>
            </select>
          </div>

          <p className="text-emerald-200 text-xs font-ubuntu">
            © 2025 Elodi Nigeria Enterprises. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default React.memo(SignUp);
