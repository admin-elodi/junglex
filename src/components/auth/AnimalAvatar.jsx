import React, { useState } from 'react';
import { motion as Motion } from 'framer-motion';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import styles from './AnimalAvatar.module.css';
import lion from '@/assets/images/spirit-animals/lion.webp';
import cheetah from '@/assets/images/spirit-animals/cheetah.webp';
import elephant from '@/assets/images/spirit-animals/elephant.webp';
import giraffe from '@/assets/images/spirit-animals/giraffe.webp';
import rhino from '@/assets/images/spirit-animals/rhino.webp';

const animals = [
  {
    name: 'Lion',
    image: lion,
    lore: 'Symbol of strength and leadership, the Lion guides with courage.',
  },
  {
    name: 'Cheetah',
    image: cheetah,
    lore: 'Embodying speed and focus, the Cheetah strikes with precision.',
  },
  {
    name: 'Elephant',
    image: elephant,
    lore: 'Wise and enduring, the Elephant carries the memory of the tribe.',
  },
  {
    name: 'Giraffe',
    image: giraffe,
    lore: 'Visionary and graceful, the Giraffe sees beyond the horizon.',
  },
  {
    name: 'Rhino',
    image: rhino,
    lore: 'Resilient and protective, the Rhino stands firm in the face of danger.',
  },
];

const AnimalAvatar = ({ onSelect, selectedAnimal }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? animals.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === animals.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className={styles.carousel}>
      <button
        onClick={handlePrev}
        className={styles.arrow}
        aria-label="Previous animal"
      >
        ←
      </button>
      <Motion.div
        className={styles.animalContainer}
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.3 }}
      >
        <div className={styles.animalCard}>
          <LazyLoadImage
            src={animals[currentIndex].image}
            alt={animals[currentIndex].name}
            effect="blur"
            className={styles.animalImage}
          />
          <h3 className={styles.animalName}>{animals[currentIndex].name}</h3>
          <p className={styles.lore}>{animals[currentIndex].lore}</p>
          <Motion.button
            onClick={() => onSelect(animals[currentIndex].name)}
            className={`${styles.selectButton} ${
              selectedAnimal === animals[currentIndex].name ? styles.selected : ''
            }`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            aria-label={`Select ${animals[currentIndex].name} as your spirit animal`}
          >
            {selectedAnimal === animals[currentIndex].name ? 'Selected' : 'Select'}
          </Motion.button>
        </div>
      </Motion.div>
      <button
        onClick={handleNext}
        className={styles.arrow}
        aria-label="Next animal"
      >
        →
      </button>
    </div>
  );
};

export default React.memo(AnimalAvatar);