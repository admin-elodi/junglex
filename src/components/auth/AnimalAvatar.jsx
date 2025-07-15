import React, { useState, useEffect } from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';

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
  const initialIndex = animals.findIndex(a => a.name === selectedAnimal);
  const [currentIndex, setCurrentIndex] = useState(initialIndex >= 0 ? initialIndex : 0);

  useEffect(() => {
    onSelect(animals[currentIndex].name);
  }, [currentIndex, onSelect]);

  const handleNext = () => {
    setCurrentIndex((currentIndex + 1) % animals.length);
  };

  const handlePrev = () => {
    setCurrentIndex((currentIndex - 1 + animals.length) % animals.length);
  };

  const handleSelect = (index) => {
    setCurrentIndex(index);
  };

  const currentAnimal = animals[currentIndex];

  return (
    <div className={styles.carouselContainer}>
      <div className={styles.carouselWrapper} tabIndex={0} role="listbox" aria-label="Select your spirit animal"
        onKeyDown={e => {
          if (e.key === 'ArrowRight') handleNext();
          else if (e.key === 'ArrowLeft') handlePrev();
        }}
      >
        <button
          className={styles.navButton}
          onClick={handlePrev}
          aria-label="Previous animal"
          type="button"
        >
          ←
        </button>

        {/* Only render current animal */}
        <div
          className={`${styles.animalItem} ${styles.selected}`}
          role="option"
          aria-selected="true"
          tabIndex={-1}
          onClick={() => handleSelect(currentIndex)}
        >
          <LazyLoadImage
            src={currentAnimal.image}
            alt={`${currentAnimal.name} spirit animal`}
            effect="blur"
            className={styles.animalImage}
            draggable={false}
          />
          <p className={styles.animalName}>{currentAnimal.name}</p>
        </div>

        <button
          className={styles.navButton}
          onClick={handleNext}
          aria-label="Next animal"
          type="button"
        >
          →
        </button>
      </div>

      <div className={styles.descriptionContainer}>
        <p className={styles.descriptionText}>{currentAnimal.description}</p>
      </div>
    </div>
  );
};

export default React.memo(AnimalAvatar);
