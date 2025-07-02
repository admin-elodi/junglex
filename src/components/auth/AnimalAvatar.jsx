// src/components/auth/AnimalAvatar.jsx
import React from 'react';
import { motion as Motion } from 'framer-motion';
import lion from '@assets/images/spirit-animals/lion.webp';
import cheetah from '@assets/images/spirit-animals/cheetah.webp';
import elephant from '@assets/images/spirit-animals/elephant.webp';
import giraffe from '@assets/images/spirit-animals/giraffe.webp';
import rhino from '@assets/images/spirit-animals/rhino.webp';
import styles from './AnimalAvatar.module.css';

const animals = [
  { name: 'Lion', image: lion },
  { name: 'Cheetah', image: cheetah },
  { name: 'Elephant', image: elephant },
  { name: 'Giraffe', image: giraffe },
  { name: 'Rhino', image: rhino },
];

const AnimalAvatar = ({ onSelect, selectedAnimal }) => {
  return (
    <div className={styles.carouselContainer}>
      <div className={styles.carousel}>
        {animals.map((animal) => (
          <Motion.div
            key={animal.name}
            className={`${styles.animalItem} ${selectedAnimal === animal.name ? styles.selected : ''}`}
            onClick={() => onSelect(animal.name)}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <img
              src={animal.image}
              alt={`${animal.name} spirit animal`}
              className={styles.animalImage}
            />
            <p className="text-emerald-200 text-xs font-ubuntu mt-2">{animal.name}</p>
          </Motion.div>
        ))}
      </div>
    </div>
  );
};

export default React.memo(AnimalAvatar);