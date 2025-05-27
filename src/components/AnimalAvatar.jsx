import React, { useEffect, useState } from 'react';
import { motion as Motion } from 'framer-motion';

// Import animal images (with .jpg extension)
import lion from '@assets/images/lion.jpg';
import cheetah from '@assets/images/cheetah.jpg';
import elephant from '@assets/images/elephant.jpg';
import leopard from '@assets/images/leopard.jpg';
import eagle from '@assets/images/eagle.jpg';
import hyena from '@assets/images/hyena.jpg';
import honeyb from '@assets/images/honeyb.jpg';
import tiger from '@assets/images/tiger.jpg';
import giraffe from '@assets/images/honeyb.jpg';      // intentional duplicate?
import zebra from '@assets/images/eagle.jpg';         // intentional duplicate?
import rhino from '@assets/images/elephant.jpg';      // intentional duplicate?
import wildebeest from '@assets/images/cheetah.jpg';  // intentional duplicate?

// Hardcoded animal data
const animals = [
  { name: 'Lion', imageKey: 'lion', lore: 'King of the jungle', src: lion },
  { name: 'Cheetah', imageKey: 'cheetah', lore: 'Fastest land animal', src: cheetah },
  { name: 'Elephant', imageKey: 'elephant', lore: 'Gentle giant', src: elephant },
  { name: 'Leopard', imageKey: 'leopard', lore: 'Stealthy predator', src: leopard },
  { name: 'Eagle', imageKey: 'eagle', lore: 'Sharp-eyed flyer', src: eagle },
  { name: 'Hyena', imageKey: 'hyena', lore: 'Clever and tough', src: hyena },
  { name: 'Honey Badger', imageKey: 'honeyb', lore: 'Fearless survivor', src: honeyb },
  { name: 'Tiger', imageKey: 'tiger', lore: 'Ferocious hunter', src: tiger },
  { name: 'Giraffe', imageKey: 'giraffe', lore: 'Tallest land animal', src: giraffe },
  { name: 'Zebra', imageKey: 'zebra', lore: 'Striped wonder', src: zebra },
  { name: 'Rhino', imageKey: 'rhino', lore: 'Armored tank', src: rhino },
  { name: 'Wildebeest', imageKey: 'wildebeest', lore: 'Migrating master', src: wildebeest },
];

const AnimalAvatar = ({ selectedAnimal, setSelectedAnimal }) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Preload all animal images
    animals.forEach((animal) => {
      const img = new Image();
      img.src = animal.src;
    });
    setLoading(false);
  }, []);

  if (loading) {
    return (
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 justify-items-center">
        {[...Array(12)].map((_, i) => (
          <div key={i} className="w-16 h-16 rounded-full bg-sand/50 animate-pulse"></div>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 justify-items-center">
      {animals.map((animal) => (
        <Motion.button
          key={animal.name}
          onClick={() => setSelectedAnimal(animal.name)}
          onFocus={() => setSelectedAnimal(animal.name)}
          whileHover={{ scale: 1.05, transition: { type: 'spring', stiffness: 300 } }}
          whileTap={{ scale: 0.95 }}
          animate={selectedAnimal === animal.name ? { scale: 1.1 } : { scale: 1 }}
          className={`flex flex-col items-center relative group will-change-transform ${
            selectedAnimal === animal.name ? 'border-ochre shadow-lg' : 'border-sand'
          }`}
          aria-label={`Select ${animal.name} as your avatar`}
        >
          <div
            className={`w-16 h-16 rounded-full overflow-hidden border-4 ${
              selectedAnimal === animal.name ? 'border-ochre shadow-lg' : 'border-sand'
            }`}
          >
            <img
              src={animal.src}
              alt={`${animal.name} avatar`}
              className="w-full h-full object-cover"
              loading="lazy"
            />
          </div>
          <span
            className={`mt-1 text-xs font-medium text-white ${
              selectedAnimal === animal.name ? 'text-ochre font-bold' : 'hover:text-ochre'
            }`}
          >
            {animal.name}
          </span>
          <div className="absolute hidden group-hover:block group-focus:block bg-baobab/80 text-sand text-xs rounded p-2 -top-10 w-32 text-center z-10">
            {animal.lore}
          </div>
        </Motion.button>
      ))}
    </div>
  );
};

export default AnimalAvatar;
