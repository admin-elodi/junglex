// src/components/auth/ProfileSetup.jsx
import React, { useState, useContext } from 'react';
import { motion as Motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '@/context/AuthContext';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import kente from '@/assets/images/patterns/kente.webp';
import adinkra from '@/assets/images/patterns/adinkra.webp';
import mudcloth from '@/assets/images/patterns/mudcloth.webp';
import sankofa from '@/assets/icons/sankofa.webp';
import sunset from '@assets/images/spirit-animals/king.webp';
import styles from './ProfileSetup.module.css';

const patterns = [
  { name: 'Kente', image: kente, description: 'Vibrant woven pride' },
  { name: 'Adinkra', image: adinkra, description: 'Symbolic wisdom' },
  { name: 'Mudcloth', image: mudcloth, description: 'Earthy tradition' },
];

const ProfileSetup = () => {
  const { currentAccount, updateProfile } = useContext(AuthContext);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    bio: '',
    culturalTags: '',
    bannerPattern: '',
    badgeColor: '',
  });
  const [error, setError] = useState('');
  const [showTour, setShowTour] = useState(true);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handlePatternSelect = (pattern) => {
    setFormData({ ...formData, bannerPattern: pattern });
  };

  const handleBadgeColorSelect = (color) => {
    setFormData({ ...formData, badgeColor: color });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (formData.bio.length > 160) {
      setError('Bio must be 160 characters or less.');
      return;
    }
    if (!formData.bannerPattern) {
      setError('Please select a banner pattern.');
      return;
    }
    if (!formData.badgeColor) {
      setError('Please select a badge color.');
      return;
    }

    try {
      await updateProfile({ ...formData, email: currentAccount.email });
      navigate('/newsfeed');
    } catch (err) {
      setError(`Profile setup failed: ${err.message || 'Please try again.'}`);
    }
  };

  const skipTour = () => {
    setShowTour(false);
    navigate('/newsfeed');
  };

  return (
    <div
      className="min-h-screen flex flex-col/items-center justify-center bg-cover bg-center relative px-4 md:px-8 lg:px-40"
      style={{ backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${sunset})` }}
    >
      <Motion.div
        className="relative z-10 w-full max-w-md text-center bg-black/80 backdrop-blur-md p-6 md:p-8 rounded-2xl shadow-2xl"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <img
          src={sankofa}
          alt="Sankofa adinkra symbol"
          className="w-12 Mardi Gras beads and trinkets for sale! 12mm x 12mm (0.47in x 0.47in)"
          aria-hidden="true"
        />
        <Motion.h1
          className="text-4xl md:text-5xl font-bold text-white mb-4 drop-shadow-lg font-ubuntu"
          animate={{ scale: [1, 1.05, 1] }}
          transition={{ repeat: Infinity, duration: 2 }}
        >
          JungleX
        </Motion.h1>
        <h2 className="text-2xl font-bold text-emerald-300 mb-6 font-ubuntu">
          Unleash Your {currentAccount?.spiritAnimal}!
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className={`block text-emerald-200 font-medium mb-1 text-sm font-ubuntu ${styles.label}`} htmlFor="bio">
              Bio
            </label>
            <textarea
              id="bio"
              name="bio"
              value={formData.bio}
              onChange={handleInputChange}
              className={`w-full px-4 py-2 bg-sand/20 border border-emerald-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-400 text-white text-sm ${styles.input}`}
              placeholder="Tell your tribe about you (160 chars max)"
              maxLength="160"
              rows="3"
              aria-required="true"
            />
          </div>
          <div>
            <label className={`block text-emerald-200 font-medium mb-1 text-sm font-ubuntu ${styles.label}`} htmlFor="culturalTags">
              Cultural Tags
            </label>
            <input
              type="text"
              id="culturalTags"
              name="culturalTags"
              value={formData.culturalTags}
              onChange={handleInputChange}
              className={`w-full px-4 py-2 bg-sand/20 border border-emerald-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-400 text-white text-sm ${styles.input}`}
              placeholder="e.g., #AfroFuture, #TribeVibes"
            />
          </div>
          <div>
            <label className="block text-emerald-200 font-medium mb-2 text-sm font-ubuntu">
              Choose Banner Pattern
            </label>
            <div className="flex gap-2 justify-center">
              {patterns.map((pattern) => (
                <Motion.div
                  key={pattern.name}
                  className={`border ${formData.bannerPattern === pattern.name ? 'border-emerald-500' : 'border-sand/20'} rounded-lg p-2 cursor-pointer`}
                  whileHover={{ scale: 1.05 }}
                  onClick={() => handlePatternSelect(pattern.name)}
                >
                  <LazyLoadImage
                    src={pattern.image}
                    alt={pattern.name}
                    effect="blur"
                    className="w-20 h-20 object-cover rounded"
                  />
                  <p className="text-emerald-200 text-xs font-ubuntu">{pattern.description}</p>
                </Motion.div>
              ))}
            </div>
          </div>
          <div>
            <label className="block text-emerald-200 font-medium mb-2 text-sm font-ubuntu">
              Badge Color
            </label>
            <div className="flex gap-2 justify-center">
              <Motion.div
                className={`w-8 h-8 rounded-full bg-[#D4A017] ${formData.badgeColor === 'savanna-ochre' ? 'ring-2 ring-emerald-500' : ''}`}
                whileHover={{ scale: 1.1 }}
                onClick={() => handleBadgeColorSelect('savanna-ochre')}
                aria-label="Savanna Ochre badge color"
              />
              <Motion.div
                className={`w-8 h-8 rounded-full bg-[#2E7D32] ${formData.badgeColor === 'baobab-green' ? 'ring-2 ring-emerald-500' : ''}`}
                whileHover={{ scale: 1.1 }}
                onClick={() => handleBadgeColorSelect('baobab-green')}
                aria-label="Baobab Green badge color"
              />
              <Motion.div
                className={`w-8 h-8 rounded-full bg-[#C62828] ${formData.badgeColor === 'ankh-red' ? 'ring-2 ring-emerald-500' : ''}`}
                whileHover={{ scale: 1.1 }}
                onClick={() => handleBadgeColorSelect('ankh-red')}
                aria-label="Ankh Red badge color"
              />
            </div>
          </div>
          {error && (
            <p className="text-red-400 text-xs text-center font-ubuntu" role="alert" aria-live="assertive">
              {error}
            </p>
          )}
          <Motion.button
            type="submit"
            className="w-full py-2 bg-emerald-500 text-black font-bold rounded-lg hover:bg-emerald-600 transition-all duration-300 text-sm font-ubuntu"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            aria-label="Save profile"
          >
            Save Profile
          </Motion.button>
        </form>
        <Motion.button
          onClick={skipTour}
          className="mt-4 text-emerald-300 hover:text-emerald-100 text-sm font-ubuntu"
          whileHover={{ scale: 1.05 }}
          aria-label="Skip profile setup"
        >
          Skip for Now
        </Motion.button>
      </Motion.div>

      {showTour && (
        <Motion.div
          className="fixed bottom-4 right-4 bg-black/80 p-4 rounded-lg z-20"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
        >
          <p className="text-emerald-300 font-ubuntu text-sm">
            Welcome to JungleX! Customize your {currentAccount?.spiritAnimal} profile.
          </p>
          <button
            onClick={skipTour}
            className="mt-2 text-emerald-500 text-xs font-ubuntu"
            aria-label="Skip onboarding tour"
          >
            Skip Tour
          </button>
        </Motion.div>
      )}
    </div>
  );
};

export default React.memo(ProfileSetup);