// src/components/auth/AnimalAvatar.jsx
import React, { useState } from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import Confetti from 'react-confetti';
import { Dialog } from '@headlessui/react';

import lion from '@assets/images/spirit-animals/lion.webp';
import cheetah from '@assets/images/spirit-animals/cheetah.webp';
import elephant from '@assets/images/spirit-animals/elephant.webp';
import giraffe from '@assets/images/spirit-animals/giraffe.webp';
import rhino from '@assets/images/spirit-animals/rhino.webp';

const animals = [
  {
    name: 'Lion',
    image: lion,
    description: 'Bold savanna leader',
    symbolism: 'Represents courage, nobility, and fierce protection of one\'s tribe.',
  },
  {
    name: 'Cheetah',
    image: cheetah,
    description: 'Swift agile hunter',
    symbolism: 'Symbol of speed, clarity, and fast breakthrough into destiny.',
  },
  {
    name: 'Elephant',
    image: elephant,
    description: 'Wise gentle giant',
    symbolism: 'Wisdom, memory, and quiet strength that nurtures communities.',
  },
  {
    name: 'Giraffe',
    image: giraffe,
    description: 'Graceful tall visionary',
    symbolism: 'Long-range vision, foresight, and calm leadership.',
  },
  {
    name: 'Rhino',
    image: rhino,
    description: 'Resilient mighty force',
    symbolism: 'Symbol of grounded power, spiritual depth, and persistence.',
  },
  // Add more animals here anytime. Grid will scale without breaking.
];

const AnimalAvatar = ({ onSelect, selectedAnimal }) => {
  const [showConfetti, setShowConfetti] = useState(false);
  const [modalAnimal, setModalAnimal] = useState(null);

  const handleSelect = (animal) => {
    if (animal.name !== selectedAnimal) {
      onSelect(animal.name);
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 1500);
    }
    setModalAnimal(animal);
  };

  return (
    <div className="w-full font-ubuntu relative">
      {showConfetti && <Confetti numberOfPieces={200} recycle={false} />}

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 gap-4 mt-4">
        {animals.map((animal) => (
          <div
            key={animal.name}
            onClick={() => handleSelect(animal)}
            className={`cursor-pointer border rounded-xl p-3 text-center transition duration-200 ${
              selectedAnimal === animal.name
                ? 'border-emerald-500 bg-emerald-800/30 shadow-lg scale-[1.02]'
                : 'border-transparent hover:bg-emerald-800/10'
            }`}
          >
            <LazyLoadImage
              src={animal.image}
              alt={animal.name}
              effect="blur"
              className="w-full h-32 object-cover rounded-lg shadow"
              draggable={false}
            />
            <h3 className="mt-2 text-sm font-semibold text-white">{animal.name}</h3>
            <p className="text-xs text-emerald-300">{animal.description}</p>
            <span className="text-xs mt-1 text-emerald-400 underline block">
              View meaning
            </span>
          </div>
        ))}
      </div>

      {/* Meaning Modal */}
      <Dialog open={!!modalAnimal} onClose={() => setModalAnimal(null)} className="relative z-50">
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <Dialog.Panel className="bg-black border border-emerald-400 p-6 rounded-xl max-w-md w-full text-center shadow-lg">
            <LazyLoadImage
              src={modalAnimal?.image}
              alt={modalAnimal?.name}
              className="w-24 h-24 mx-auto mb-4 rounded-lg shadow"
            />
            <Dialog.Title className="text-xl font-bold text-emerald-300 mb-2">
              {modalAnimal?.name}
            </Dialog.Title>
            <p className="text-sm text-emerald-100 mb-4">{modalAnimal?.symbolism}</p>
            <button
              onClick={() => setModalAnimal(null)}
              className="mt-2 px-4 py-2 bg-emerald-500 text-black font-semibold rounded hover:bg-emerald-600"
            >
              Got it!
            </button>
          </Dialog.Panel>
        </div>
      </Dialog>
    </div>
  );
};

export default React.memo(AnimalAvatar);
