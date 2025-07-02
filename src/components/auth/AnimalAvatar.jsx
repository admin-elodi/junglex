// src/components/auth/AnimalAvatar.jsx
import React, { useState } from 'react';
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
  const [tappedAnimal, setTappedAnimal] = useState(null);
  const [isHovered, setIsHovered] = useState(false);

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % animals.length);
    setIsHovered(false);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + animals.length) % animals.length);
    setIsHovered(false);
  };

  const handleSelect = (animalName) => {
    console.log('Tapped animal:', animalName); // Debug state
    setTappedAnimal(animalName === tappedAnimal ? null : animalName);
    onSelect(animalName);
  };

  const currentAnimal = animals[currentIndex];

  return (
    <div className={styles.carouselContainer}>
      <div className={styles.carousel}>
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
          onClick={() => handleSelect(currentAnimal.name)}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
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
          {isHovered && selectedAnimal !== currentAnimal.name && (
            <div className={styles.tooltip}>
              {currentAnimal.description}
            </div>
          )}
          {selectedAnimal === currentAnimal.name && (
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
      {tappedAnimal && (
        <div className={styles.mobileDescription}>
          <p className="text-white text-sm font-ubuntu text-center">
            {animals.find((animal) => animal.name === tappedAnimal)?.description}
          </p>
        </div>
      )}
    </div>
  );
};

export default React.memo(AnimalAvatar);