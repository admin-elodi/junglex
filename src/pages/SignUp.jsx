// src/components/auth/SignUp.jsx
import React, { useState, useContext } from 'react';
import { motion as Motion } from 'framer-motion';
import { TypeAnimation } from 'react-type-animation';
import { Link, useNavigate } from 'react-router-dom';
import AnimalAvatar from '@/components/auth/AnimalAvatar';
import { AuthContext } from '@/context/AuthContext';
import sunset from '@assets/images/spirit-animals/king.webp';
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
  const { signUp, signUpSuccess } = useContext(AuthContext);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    spiritAnimal: '',
  });
  const [error, setError] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleAnimalSelect = (animal) => {
    setFormData({ ...formData, spiritAnimal: animal });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (formData.username.length < 3) {
      setError('Username must be at least 3 characters long.');
      return;
    }
    if (!formData.email.includes('@') || !formData.email.includes('.')) {
      setError('Please enter a valid email address (e.g., user@domain.com).');
      return;
    }
    if (formData.password.length < 8) {
      setError('Password must be at least 8 characters long.');
      return;
    }
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match.');
      return;
    }
    if (!formData.spiritAnimal) {
      setError('Please select a spirit animal.');
      return;
    }

    try {
      await signUp(formData);
      setTimeout(() => navigate('/email-verification'), 3000);
    } catch (err) {
      setError(`Sign-up failed: ${err.message || 'Please try again.'}`);
    }
  };

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center bg-cover bg-center relative px-4 md:px-8 lg:px-40"
      style={{ backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${sunset})` }}
    >
      {signUpSuccess && (
        <Motion.div
          className="fixed inset-0 flex items-center justify-center bg-black/80 backdrop-blur-md z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="text-center text-white font-ubuntu">
            <img
              src={animalImages[formData.spiritAnimal]}
              alt={`${formData.spiritAnimal} spirit animal`}
              className="w-24 h-24 mx-auto mb-4"
            />
            <h2 className="text-2xl font-bold text-emerald-300">
              Welcome to the JungleX Tribe, {formData.spiritAnimal}!
            </h2>
            <p className="text-sahara-beige">Your roar is ready to echo!</p>
            <Motion.button
              onClick={() => navigate('/email-verification')}
              className="mt-4 py-2 px-6 bg-emerald-500 text-black font-bold rounded-lg"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Continue
            </Motion.button>
          </div>
        </Motion.div>
      )}
      <Motion.div
        className="relative z-10 w-full max-w-4xl text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        <img
          src={sankofa}
          alt="Sankofa adinkra symbol"
          className="w-12 h-12 mx-auto mb-4"
          aria-hidden="true"
        />
        <Motion.h1
          className="text-4xl md:text-5xl font-bold text-white mb-4 drop-shadow-lg font-ubuntu"
          animate={{ scale: [1, 1.05, 1] }}
          transition={{ repeat: Infinity, duration: 2 }}
        >
          JungleX
        </Motion.h1>
        <TypeAnimation
          sequence={[
            'Choose Your Spirit Animal',
            2000,
            'Join the JungleX Tribe',
            2000,
            'Unleash Your Story',
            2000,
          ]}
          wrapper="p"
          repeat={Infinity}
          className="text-lg md:text-xl text-emerald-300 drop-shadow-md font-ubuntu mb-8"
        />
        <Motion.form
          onSubmit={handleSubmit}
          className={`${styles.form} border border-emerald-500 bg-black/80 backdrop-blur-md p-6 md:p-8 rounded-2xl shadow-2xl w-full`}
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='40' height='40' viewBox='0 0 40 40'%3E%3Cg fill='%23FFD700' fill-opacity='0.1'%3E%3Cpath d='M0 0h40v40H0z'/%3E%3Cpath d='M20 20l10-10M20 20L10 10M20 20l10 10M20 20L10 30'/%3E%3C/g%3E%3C/svg%3E")`,
          }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-2xl md:text-3xl font-bold text-emerald-300 mb-6 text-center font-ubuntu">
            Join the Tribe
          </h2>
          <div className={styles.formContainer}>
            <div className={styles.inputGroup}>
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
                  className="w-full px-4 py-2 bg-sand/20 border border-emerald-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-400 text-white text-sm"
                  placeholder="Your username"
                  aria-required="true"
                  autoComplete="username"
                />
              </div>
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
                  className="w-full px-4 py-2 bg-sand/20 border border-emerald-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-400 text-white text-sm"
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
                  className="w-full px-4 py-2 bg-sand/20 border border-emerald-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-400 text-white text-sm"
                  placeholder="Your password"
                  aria-required="true"
                  autoComplete="new-password"
                />
              </div>
              <div>
                <label
                  className="block text-emerald-200 font-medium mb-1 text-sm font-ubuntu"
                  htmlFor="confirmPassword"
                >
                  Confirm Password
                </label>
                <input
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 bg-sand/20 border border-emerald-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-400 text-white text-sm"
                  placeholder="Confirm your password"
                  aria-required="true"
                  autoComplete="new-password"
                />
              </div>
              {error && (
                <p
                  className="text-red-400 text-xs text-center font-ubuntu"
                  role="alert"
                  aria-live="assertive"
                >
                  {error}
                </p>
              )}
            </div>
            <div className={styles.avatarGroup}>
              <label className="block text-emerald-200 font-medium mb-2 text-sm font-ubuntu text-center">
                Choose Your Spirit Animal
              </label>
              <AnimalAvatar onSelect={handleAnimalSelect} selectedAnimal={formData.spiritAnimal} />
            </div>
          </div>
          <div className={styles.submitGroup}>
            <Motion.button
              type="submit"
              className="w-full py-2 bg-emerald-500 text-black font-bold rounded-lg hover:bg-emerald-600 transition-all duration-300 text-sm font-ubuntu"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              aria-label="Sign up for JungleX"
            >
              Join the Tribe
            </Motion.button>
            <Link
              to="/"
              className="text-emerald-300 hover:text-emerald-100 text-sm font-ubuntu mt-4 inline-block"
              aria-label="Back to login"
            >
              Already have an account? Log in
            </Link>
          </div>
        </Motion.form>
        <footer className="mt-6 pt-4 border-t border-emerald-500/30">
          <div className="text-center">
            <h3 className="text-emerald-200 font-medium mb-2 text-sm font-ubuntu">
              Quick Links
            </h3>
            <ul className="space-y-2 text-sm font-ubuntu">
              <li>
                <a
                  href="/about"
                  className="text-emerald-300 hover:text-emerald-100 transition-colors"
                  aria-label="Learn more about JungleX"
                >
                  About JungleX
                </a>
              </li>
              <li>
                <a
                  href="/privacy"
                  className="text-emerald-300 hover:text-emerald-100 transition-colors"
                  aria-label="JungleX Privacy Policy"
                >
                  Privacy Policy
                </a>
              </li>
              <li>
                <a
                  href="/terms"
                  className="text-emerald-300 hover:text-emerald-100 transition-colors"
                  aria-label="JungleX Terms of Service"
                >
                  Terms of Service
                </a>
              </li>
              <li>
                <a
                  href="/contact"
                  className="text-emerald-300 hover:text-emerald-100 transition-colors"
                  aria-label="Contact JungleX support"
                >
                  Contact Us
                </a>
              </li>
            </ul>
          </div>
          <small className="block text-center text-emerald-300/50 text-xs mt-4 font-ubuntu">
            © {new Date().getFullYear()} Elodi Nigeria Enterprises. All rights reserved.
          </small>
        </footer>
      </Motion.div>
    </div>
  );
};

export default React.memo(SignUp);