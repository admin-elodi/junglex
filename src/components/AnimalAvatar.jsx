// src/components/AnimalAvatar.jsx
import React, { useEffect, useState } from 'react';
import { motion as Motion } from 'framer-motion';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';

// Import WebP images
import lion from '@assets/images/lion.webp';
import cheetah from '@assets/images/cheetah.webp';
import elephant from '@assets/images/elephant.webp';
import leopard from '@assets/images/leopard.webp';
import eagle from '@assets/images/eagle.webp';
import hyena from '@assets/images/hyena.webp';
import honeyb from '@assets/images/honeyb.webp';
import tiger from '@assets/images/tiger.webp';
import giraffe from '@assets/images/giraffe.webp';
import zebra from '@assets/images/zebra.webp';
import rhino from '@assets/images/rhino.webp';
import wildebeest from '@assets/images/wildebeest.webp';

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

const AnimalAvatar = ({ selectedAnimal, setSelectedAnimal }) => {
  const [loading, setLoading] = useState(true);

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

  if (loading) {
    return (
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 justify-items-center">
        {[...Array(12)].map((_, i) => (
          <div key={i} className="w-20 h-20 rounded-full bg-sand/50 animate-pulse"></div>
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
          whileHover={{ scale: 1.1, rotate: 5 }}
          whileTap={{ scale: 0.95 }}
          className={`flex flex-col items-center relative group ${
            selectedAnimal === animal.name
              ? 'border-emerald-500 shadow-[0_0_10px_rgba(0,255,127,0.7)]'
              : 'border-sand'
          }`}
          aria-label={`Select ${animal.name} as your avatar`}
        >
          <Motion.div
            className={`w-20 h-20 rounded-full overflow-hidden border-4 ${
              selectedAnimal === animal.name
                ? 'border-emerald-500 animate-pulse'
                : 'border-sand'
            }`}
            animate={selectedAnimal === animal.name ? { scale: 1.15 } : { scale: 1 }}
          >
            <LazyLoadImage
              src={animal.src}
              alt={`${animal.name} avatar`}
              className="w-full h-full object-cover"
              effect="blur"
              width={80}
              height={80}
            />
          </Motion.div>
          <span
            className={`mt-2 text-sm font-medium text-white ${
              selectedAnimal === animal.name ? 'text-emerald-300 font-bold' : 'hover:text-emerald-300'
            }`}
          >
            {animal.name}
          </span>
          <div className="absolute hidden group-hover:block group-focus:block bg-black text-white text-xs rounded p-2 -top-12 w-36 text-center z-10">
            {animal.lore}
          </div>
        </Motion.button>
      ))}
    </div>
  );
};

export default React.memo(AnimalAvatar);