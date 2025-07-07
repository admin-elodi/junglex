// src/components/auth/AnimalAvatar.jsx
import React, { useState, useEffect } from 'react';
import { motion as Motion } from 'framer-motion';
import lion from '@assets/images/spirit-animals/lion.webp';
import cheetah from '@assets/images/spirit-animals/cheetah.webp';
import elephant from '@assets/images/spirit-animals/elephant.webp';
import giraffe from '@assets/images/spirit-animals/giraffe.webp';
import rhino from '@assets/images/spirit-animals/rhino.webp';
import styles from './AnimalAvatar.module.css';

const animals = [
  { name: 'Lion', image: lion, description: 'Bold savanna leader' },
  { name: 'Cheetah', image: cheetah, description: 'Swift agile hunter' },
  { name: 'Elephant', image: elephant, description: 'Wise gentle giant' },
  { name: 'Giraffe', image: giraffe, description: 'Graceful tall visionary' },
  { name: 'Rhino', image: rhino, description: 'Resilient mighty force' },
];

const AnimalAvatar = ({ onSelect, selectedAnimal }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [touchStart, setTouchStart] = useState(null);
  const isMobile = window.innerWidth < 1024; // Detect mobile view

  // Update selected animal whenever currentIndex changes
  useEffect(() => {
    onSelect(animals[currentIndex].name);
  }, [currentIndex, onSelect]);

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % animals.length);
    setIsHovered(false);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + animals.length) % animals.length);
    setIsHovered(false);
  };

  const handleTouchStart = (e) => {
    setTouchStart(e.touches[0].clientX);
  };

  const handleTouchEnd = (e) => {
    if (!touchStart) return;
    const touchEnd = e.changedTouches[0].clientX;
    const diff = touchStart - touchEnd;
    if (diff > 50) handleNext(); // Swipe left
    if (diff < -50) handlePrev(); // Swipe right
    setTouchStart(null);
  };

  const currentAnimal = animals[currentIndex];

  return (
    <div className={styles.carouselContainer}>
      <div
        className={styles.carousel}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        <Motion.button
          className={styles.navButton}
          onClick={handlePrev}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          aria-label="Previous animal"
        >
          ←
        </Motion.button>
        <Motion.div
          className={`${styles.animalItem} ${selectedAnimal === currentAnimal.name ? styles.selected : ''}`}
          onMouseEnter={() => !isMobile && setIsHovered(true)}
          onMouseLeave={() => !isMobile && setIsHovered(false)}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
        >
          <img
            src={currentAnimal.image}
            alt={`${currentAnimal.name} spirit animal`}
            className={styles.animalImage}
          />
          <p className="text-emerald-200 text-xs font-ubuntu mt-2">{currentAnimal.name}</p>
          {!isMobile && isHovered && selectedAnimal !== currentAnimal.name && (
            <div className={styles.tooltip}>
              {currentAnimal.description}
            </div>
          )}
          {!isMobile && selectedAnimal === currentAnimal.name && (
            <div className={styles.tooltip}>
              {currentAnimal.description}
            </div>
          )}
        </Motion.div>
        <Motion.button
          className={styles.navButton}
          onClick={handleNext}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          aria-label="Next animal"
        >
          →
        </Motion.button>
      </div>
      <div className={styles.mobileDescription}>
        <p className={styles.descriptionText}>
          {currentAnimal.description}
        </p>
      </div>
    </div>
  );
};

export default React.memo(AnimalAvatar);