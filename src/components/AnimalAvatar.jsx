import React, { useEffect, useState } from 'react';
import { motion as Motion } from 'framer-motion'; // Rename motion to Motion
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import styles from './auth/AnimalAvatar.module.css';
import lionBackground from '@/assets/images/spirit-animals/king.webp';
import kentePattern from '@/assets/images/spirit-animals/king.webp';

// Import WebP images
import lion from '@/assets/images/spirit-animals/king.webp';
import cheetah from '@/assets/images/spirit-animals/cheetah.webp';
import elephant from '@/assets/images/spirit-animals/elephant.webp';
import leopard from '@/assets/images/spirit-animals/leopard.webp';
import eagle from '@/assets/images/spirit-animals/eagle.webp';
import hyena from '@/assets/images/spirit-animals/hyena.webp';
import honeyb from '@/assets/images/spirit-animals/honeyb.webp';
import tiger from '@/assets/images/spirit-animals/tiger.webp';
import giraffe from '@/assets/images/spirit-animals/giraffe.webp';
import zebra from '@/assets/images/spirit-animals/zebra.webp';
import rhino from '@/assets/images/spirit-animals/rhino.webp';
import wildebeest from '@/assets/images/spirit-animals/wildebeest.webp';



const animals = [
  { name: 'Lion', imageKey: 'lion', lore: 'Cosmic Monarch, ruler of the starlit savanna', src: lion },
  { name: 'Cheetah', imageKey: 'cheetah', lore: 'Quantum Sprinter, slicing through time', src: cheetah },
  { name: 'Elephant', imageKey: 'elephant', lore: 'Ancient Sage, keeper of ancestral wisdom', src: elephant },
  { name: 'Leopard', imageKey: 'leopard', lore: 'Shadow Stalker, master of hidden realms', src: leopard },
  { name: 'Eagle', imageKey: 'eagle', lore: 'Celestial Seer, soaring beyond the horizon', src: eagle },
  { name: 'Hyena', imageKey: 'hyena', lore: 'Trickster Alchemist, weaving chaos into order', src: hyena },
  { name: 'Honey Badger', imageKey: 'honeyb', lore: 'Indomitable Spirit, defying all odds', src: honeyb },
  { name: 'Tiger', imageKey: 'tiger', lore: 'Primal Fury, ignited by cosmic fire', src: tiger },
  { name: 'Giraffe', imageKey: 'giraffe', lore: 'Stellar Voyager, touching the stars', src: giraffe },
  { name: 'Zebra', imageKey: 'zebra', lore: 'Binary Wanderer, dancing in duality', src: zebra },
  { name: 'Rhino', imageKey: 'rhino', lore: 'Iron Sentinel, guardian of the future', src: rhino },
  { name: 'Wildebeest', imageKey: 'wildebeest', lore: 'Galactic Nomad, leading the great migration', src: wildebeest },
];

// Animation variants for carousel slide
const slideVariants = {
  enter: (direction) => ({
    x: direction > 0 ? 100 : -100,
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
    transition: { duration: 0.3 },
  },
  exit: (direction) => ({
    x: direction > 0 ? -100 : 100,
    opacity: 0,
    transition: { duration: 0.3 },
  }),
};

const AnimalAvatar = ({ selectedAnimal, setSelectedAnimal }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [direction, setDirection] = useState(0);

  // Preload images
  useEffect(() => {
    const preloadImages = async () => {
      const imagePromises = animals.map((animal) => {
        return new Promise((resolve) => {
          const img = new Image();
          img.src = animal.src;
          img.onload = resolve;
          img.onerror = resolve;
        });
      });
      await Promise.all(imagePromises);
      setLoading(false);
    };
    preloadImages();
  }, []);

  // Handle carousel navigation
  const handleNext = () => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % animals.length);
  };

  const handlePrev = () => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + animals.length) % animals.length);
  };

  // Handle animal selection
  const handleSelect = () => {
    setSelectedAnimal(animals[currentIndex].name);
  };

  // Loading state
  if (loading) {
    return (
      <div className={styles.container}>
        <div className={styles.loading}>
          <div className={styles.spinner} aria-label="Loading spirit animals" />
        </div>
      </div>
    );
  }

  const currentAnimal = animals[currentIndex];

  // Main carousel
  return (
    <div
      className={styles.container}
      style={{
        backgroundImage: `url(${lionBackground}), url(${kentePattern})`,
        backgroundBlendMode: 'overlay',
      }}
      role="region"
      aria-label="Spirit animal selection carousel"
    >
      <div className={styles.carousel}>
        <button
          onClick={handlePrev}
          className={styles.navButton}
          aria-label="Previous spirit animal"
        >
          ←
        </button>
        <Motion.div
          key={currentIndex}
          custom={direction}
          variants={slideVariants}
          initial="enter"
          animate="center"
          exit="exit"
          className={styles.animalCard}
        >
          <Motion.button
            onClick={handleSelect}
            whileHover={{ scale: 1.1, rotate: 5 }}
            whileTap={{ scale: 0.95 }}
            className={`${styles.animalButton} ${selectedAnimal === currentAnimal.name ? styles.selected : ''}`}
            aria-label={`Select ${currentAnimal.name} as your spirit animal`}
          >
            <Motion.div
              className={styles.imageWrapper}
              animate={selectedAnimal === currentAnimal.name ? { scale: 1.15 } : { scale: 1 }}
            >
              <LazyLoadImage
                src={currentAnimal.src}
                alt={`${currentAnimal.name} spirit animal`}
                className={styles.animalImage}
                effect="blur"
                width={120}
                height={120}
              />
            </Motion.div>
            <span className={styles.animalName}>{currentAnimal.name}</span>
            <div className={styles.loreTooltip}>{currentAnimal.lore}</div>
          </Motion.button>
        </Motion.div>
        <button
          onClick={handleNext}
          className={styles.navButton}
          aria-label="Next spirit animal"
        >
          →
        </button>
      </div>
    </div>
  );
};

export default React.memo(AnimalAvatar);