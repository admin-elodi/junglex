// src/components/newsfeed/PostCreate.jsx
import React, { useState, useContext } from 'react';
import { motion as Motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '@/context/AuthContext';
import sunset from '@assets/images/spirit-animals/king.webp';
import styles from './PostCreate.module.css';

const PostCreate = () => {
  const { currentAccount } = useContext(AuthContext);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    content: `I’m a ${currentAccount?.spiritAnimal} joining the JungleX Tribe! #UnleashYourTribe`,
    tags: '#AfroFuture, #TribeVibes',
    image: null,
  });
  const [error, setError] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file && file.size > 200 * 1024) {
      setError('Image must be less than 200KB.');
      return;
    }
    setFormData({ ...formData, image: file });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!formData.content) {
      setError('Post content cannot be empty.');
      return;
    }

    try {
      // Mock API call to save post
      console.log('Post submitted:', { ...formData, user: currentAccount });
      navigate('/newsfeed');
    } catch (err) {
      setError(`Post creation failed: ${err.message || 'Please try again.'}`);
    }
  };

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center bg-cover bg-center relative px-4 md:px-8 lg:px-40"
      style={{ backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${sunset})` }}
    >
      <Motion.div
        className="relative z-10 w-full max-w-md text-center bg-black/80 backdrop-blur-md p-6 md:p-8 rounded-2xl shadow-2xl"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl font-bold text-emerald-300 mb-6 font-ubuntu">
          Share Your Roar, {currentAccount?.spiritAnimal}!
        </h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className={`block text-emerald-200 font-medium mb-1 text-sm font-ubuntu ${styles.label}`} htmlFor="content">
              Post Content
            </label>
            <textarea
              id="content"
              name="content"
              value={formData.content}
              onChange={handleInputChange}
              className={`w-full px-4 py-2 bg-sand/20 border border-emerald-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-400 text-white text-sm ${styles.input}`}
              placeholder="What's on your mind?"
              maxLength="280"
              rows="4"
              aria-required="true"
            />
          </div>
          <div>
            <label className={`block text-emerald-200 font-medium mb-1 text-sm font-ubuntu ${styles.label}`} htmlFor="tags">
              Cultural Tags
            </label>
            <input
              type="text"
              id="tags"
              name="tags"
              value={formData.tags}
              onChange={handleInputChange}
              className={`w-full px-4 py-2 bg-sand/20 border border-emerald-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-400 text-white text-sm ${styles.input}`}
              placeholder="e.g., #AfroFuture, #TribeVibes"
            />
          </div>
          <div>
            <label className={`block text-emerald-200 font-medium mb-1 text-sm font-ubuntu ${styles.label}`} htmlFor="image">
              Add Image (optional)
            </label>
            <input
              type="file"
              id="image"
              name="image"
              accept="image/*"
              onChange={handleImageChange}
              className="w-full px-4 py-2 bg-sand/20 border border-emerald-500 rounded-lg text-white text-sm"
            />
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
            aria-label="Share post"
          >
            Roar Now
          </Motion.button>
        </form>
        <Motion.button
          onClick={() => navigate('/newsfeed')}
          className="mt-4 text-emerald-300 hover:text-emerald-100 text-sm font-ubuntu"
          whileHover={{ scale: 1.05 }}
          aria-label="Cancel post creation"
        >
          Cancel
        </Motion.button>
      </Motion.div>
    </div>
  );
};

export default React.memo(PostCreate);