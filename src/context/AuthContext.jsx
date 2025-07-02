// src/context/AuthContext.jsx
import React, { createContext, useState, useEffect } from 'react';
import { signUpUser } from '@/services/api/auth';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [accounts, setAccounts] = useState(() => {
    const saved = localStorage.getItem('junglex_accounts');
    return saved ? JSON.parse(saved) : [];
  });
  const [currentAccount, setCurrentAccount] = useState(null);
  const [signUpSuccess, setSignUpSuccess] = useState(false);

  useEffect(() => {
    localStorage.setItem('junglex_accounts', JSON.stringify(accounts));
  }, [accounts]);

  const login = async (email) => {
    // Password parameter to be added for Firebase integration
    const newAccount = { email, token: `mock-token-${email}` };
    setCurrentAccount(newAccount);
    if (!accounts.some((acc) => acc.email === email)) {
      setAccounts([...accounts, newAccount]);
    }
  };

  const addAccount = async (email) => {
    // Password used in future Firebase integration
    const newAccount = { email, token: `mock-token-${email}` };
    setAccounts([...accounts, newAccount]);
    setCurrentAccount(newAccount);
  };

  const signUp = async ({ username, email, password, spiritAnimal }) => {
    const response = await signUpUser({ username, email, password, spiritAnimal });
    const newAccount = { email, token: response.token || `mock-token-${email}`, username, spiritAnimal };
    setAccounts([...accounts, newAccount]);
    setCurrentAccount(newAccount);
    setSignUpSuccess(true);
  };

  const updateProfile = async ({ email, bio, culturalTags, bannerPattern, badgeColor }) => {
    const updatedAccount = { ...currentAccount, bio, culturalTags, bannerPattern, badgeColor };
    setAccounts(accounts.map((acc) => (acc.email === email ? updatedAccount : acc)));
    setCurrentAccount(updatedAccount);
  };

  const switchAccount = (email) => {
    const account = accounts.find((acc) => acc.email === email);
    setCurrentAccount(account);
  };

  return (
    <AuthContext.Provider value={{ accounts, currentAccount, login, addAccount, signUp, updateProfile, switchAccount, signUpSuccess }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };