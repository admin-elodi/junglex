import React, { useState } from 'react';
import AnimalAvatar from '@components/AnimalAvatar';

const AuthForm = () => {
  const [isSignUp, setIsSignUp] = useState(true);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    username: '',
    animal: 'Lion',
  });
  const [error, setError] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleAnimalChange = (animal) => {
    setFormData({ ...formData, animal });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    // Client-side validation
    if (!formData.email.includes('@') || !formData.email.includes('.')) {
      setError('Please enter a valid email address (e.g., user@domain.com).');
      return;
    }
    if (formData.password.length < 8) {
      setError('Password must be at least 8 characters long.');
      return;
    }
    if (isSignUp && !formData.username.trim()) {
      setError('Username is required for sign-up.');
      return;
    }
    if (isSignUp && !formData.animal) {
      setError('Please select an animal avatar.');
      return;
    }

    // Placeholder for backend API call (to be added later)
    console.log(`${isSignUp ? 'Sign Up' : 'Login'} submitted:`, formData);
    // TODO: Integrate with free auth solution (e.g., Firebase free tier) later
  };

  return (
    <div className="bg-black backdrop-blur-sm p-6 rounded-2xl shadow-xl w-full max-w-md opacity-70">
      <h2 className="text-2xl font-bold text-white mb-4 text-center font-ubuntu">
        {isSignUp ? 'Unleash Your Tribe' : 'Enter the Hunt'}
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {isSignUp && (
          <div>
            <label
              className="block text-white font-medium mb-1 text-sm font-ubuntu"
              htmlFor="username"
            >
              Username
            </label>
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleInputChange}
              className="w-full px-3 py-2 bg-sand border border-white rounded-lg focus:outline-none focus:ring-2 focus:ring-ochre transition-all duration-200 text-sm"
              placeholder="Choose your username"
              aria-required="true"
            />
          </div>
        )}
        <div>
          <label
            className="block text-white font-medium mb-1 text-sm font-ubuntu"
            htmlFor="email"
          >
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            className="w-full px-3 py-2 bg-sand border border-white rounded-lg focus:outline-none focus:ring-2 focus:ring-ochre transition-all duration-200 text-sm"
            placeholder="Your email address"
            aria-required="true"
          />
        </div>
        <div>
          <label
            className="block text-white font-medium mb-1 text-sm font-ubuntu"
            htmlFor="password"
          >
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            className="w-full px-3 py-2 bg-sand border border-white rounded-lg focus:outline-none focus:ring-2 focus:ring-ochre transition-all duration-200 text-sm"
            placeholder="Your password"
            aria-required="true"
          />
        </div>
        {isSignUp && (
          <div>
            <label className="block text-baobab font-medium mb-2 text-sm font-ubuntu">
              Choose Your Animal Avatar
            </label>
            <AnimalAvatar
              selectedAnimal={formData.animal}
              setSelectedAnimal={handleAnimalChange}
            />
          </div>
        )}
        {error && (
          <p className="text-sunset text-xs text-center font-ubuntu" role="alert">
            {error}
          </p>
        )}
        <button
          type="submit"
          className="w-full py-2 bg-ochre text-white font-semibold rounded-lg hover:bg-ochre/90 transition-all duration-300 shadow-md text-sm font-ubuntu"
          aria-label={isSignUp ? 'Sign up for SahelX Connect' : 'Log in to SahelX Connect'}
        >
          {isSignUp ? 'Sign Up' : 'Login'}
        </button>
      </form>
      <p className="text-white text-center mt-3 text-lg font-ubuntu">
        {isSignUp ? 'Already have an account?' : 'New to SahelX Connect?'}
        <button
          onClick={() => setIsSignUp(!isSignUp)}
          className="text-white hover:underline ml-1 font-medium"
          aria-label={isSignUp ? 'Switch to login' : 'Switch to sign up'}
        >
          {isSignUp ? 'Login' : 'Sign Up'}
        </button>
      </p>
      <small className="text-xs opacity-50">© 2025 Elodi Nigeria Enterprises. All rights reserved</small>
    </div>
  );
};

export default AuthForm;