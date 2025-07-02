// src/components/newsfeed/Newsfeed.jsx
import React, { useState, useEffect, useContext } from 'react';
import { motion as Motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import { AuthContext } from '@/context/AuthContext';
import styles from './Newsfeed.module.css';
import lion from '@assets/images/spirit-animals/lion.webp';

const mockPosts = [
  {
    id: 1,
    user: { name: 'Adewale', spiritAnimal: 'Lion', badgeColor: 'savanna-ochre' },
    content: 'Joined the JungleX Tribe! #UnleashYourTribe',
    tags: ['#AfroFuture', '#TribeVibes'],
    reactions: { ubuntuGlow: 10, sankofaSpark: 5 },
    image: lion,
  },
  {
    id: 2,
    user: { name: 'Nia', spiritAnimal: 'Elephant', badgeColor: 'baobab-green' },
    content: 'Wisdom shapes our future. #Sankofa',
    tags: ['#Sankofa', '#TribeVibes'],
    reactions: { ankhPulse: 8, meritMark: 3 },
    image: null,
  },
];

const Newsfeed = () => {
  const { currentAccount } = useContext(AuthContext);
  const navigate = useNavigate();
  const [posts, setPosts] = useState(mockPosts);
  const [showTutorial, setShowTutorial] = useState(true);
  const [showFreemium, setShowFreemium] = useState(true);

  const handleReaction = (postId, reactionType) => {
    setPosts(posts.map(post =>
      post.id === postId
        ? { ...post, reactions: { ...post.reactions, [reactionType]: (post.reactions[reactionType] || 0) + 1 } }
        : post
    ));
  };

  const handleVerify = (postId) => {
    setPosts(posts.map(post =>
      post.id === postId ? { ...post, verified: '90% verified: Source A, Source B' } : post
    ));
  };

  useEffect(() => {
    setTimeout(() => setShowTutorial(true), 2000);
  }, []);

  return (
    <div className="min-h-screen bg-sahara-beige p-4 md:p-8">
      <Motion.div
        className="max-w-2xl mx-auto"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl font-bold text-emerald-300 mb-6 font-ubuntu text-center">
          Welcome to the Watering Hole, {currentAccount?.spiritAnimal}!
        </h1>

        {showFreemium && (
          <Motion.div
            className="bg-ankh-red text-white p-4 rounded-lg mb-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
          >
            <p className="font-ubuntu">
              Unleash more with JungleX Prime! Get exclusive {currentAccount?.spiritAnimal} skins.
            </p>
            <a
              href="https://x.ai/grok"
              className="text-sahara-beige underline"
              aria-label="Learn about JungleX Prime"
            >
              Learn More
            </a>
            <button
              onClick={() => setShowFreemium(false)}
              className="ml-4 text-sahara-beige"
              aria-label="Dismiss freemium banner"
            >
              ×
            </button>
          </Motion.div>
        )}

        <div className="mb-6">
          <h2 className="text-xl font-bold text-emerald-200 font-ubuntu mb-2">Suggested Tribes</h2>
          <div className="flex gap-2">
            <button
              className="bg-baobab-green text-white p-2 rounded font-ubuntu"
              onClick={() => navigate('/groups/lions-pride')}
            >
              Lion’s Pride
            </button>
            <button
              className="bg-baobab-green text-white p-2 rounded font-ubuntu"
              onClick={() => navigate('/groups/elephant-wisdom')}
            >
              Elephant Wisdom Circle
            </button>
          </div>
        </div>

        {posts.map(post => (
          <Motion.div
            key={post.id}
            className={`bg-black/50 p-4 rounded-lg mb-4 ${styles.post}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex items-center mb-2">
              <div
                className={`w-8 h-8 rounded-full bg-${post.user.badgeColor} mr-2`}
                aria-hidden="true"
              />
              <p className="text-emerald-200 font-ubuntu">
                {post.user.name} • {post.user.spiritAnimal}
              </p>
            </div>
            {post.image && (
              <LazyLoadImage
                src={post.image}
                alt={`${post.user.name}'s post`}
                effect="blur"
                className="w-full h-48 object-cover rounded-lg mb-2"
              />
            )}
            <p className="text-sahara-beige font-ubuntu">{post.content}</p>
            <div className="flex gap-2 mt-2">
              {post.tags.map(tag => (
                <span key={tag} className="text-emerald-300 text-sm font-ubuntu">
                  {tag}
                </span>
              ))}
            </div>
            <div className="flex gap-2 mt-2">
              <button
                onClick={() => handleReaction(post.id, 'ubuntuGlow')}
                className="text-emerald-300 font-ubuntu"
                aria-label="Ubuntu Glow reaction"
              >
                ❤️ {post.reactions.ubuntuGlow || 0}
              </button>
              <button
                onClick={() => handleReaction(post.id, 'sankofaSpark')}
                className="text-emerald-300 font-ubuntu"
                aria-label="Sankofa Spark reaction"
              >
                🐦 {post.reactions.sankofaSpark || 0}
              </button>
              <button
                onClick={() => handleVerify(post.id)}
                className="text-emerald-300 font-ubuntu"
                aria-label="Verify post with Truth Overflow"
              >
                🔍 Verify
              </button>
            </div>
            {post.verified && (
              <p className="text-emerald-200 text-xs font-ubuntu mt-2">
                {post.verified}
              </p>
            )}
          </Motion.div>
        ))}

        <Motion.button
          className="fixed bottom-4 right-4 bg-baobab-green text-white p-4 rounded-full font-ubuntu"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => navigate('/post/create')}
          aria-label="Create a new post"
        >
          Roar Now
        </Motion.button>

        {showTutorial && (
          <Motion.div
            className="fixed bottom-4 left-4 bg-black/80 p-4 rounded-lg z-20"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2 }}
          >
            <p className="text-emerald-300 font-ubuntu text-sm">
              Welcome to the Watering Hole! Share your first post or verify claims with Truth Overflow.
            </p>
            <button
              onClick={() => setShowTutorial(false)}
              className="mt-2 text-emerald-500 text-xs font-ubuntu"
              aria-label="Dismiss tutorial"
            >
              Got It
            </button>
          </Motion.div>
        )}
      </Motion.div>
    </div>
  );
};

export default React.memo(Newsfeed);