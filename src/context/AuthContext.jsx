import React, { createContext, useState, useEffect } from 'react';
import { signUpUser } from '@/services/api/auth';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [accounts, setAccounts] = useState(() => {
    const saved = localStorage.getItem('junglex_accounts');
    return saved ? JSON.parse(saved) : [];
  });
  const [currentAccount, setCurrentAccount] = useState(null);

  useEffect(() => {
    localStorage.setItem('junglex_accounts', JSON.stringify(accounts));
  }, [accounts]);

  const login = async (email, password) => {
    // TODO: Replace with Firebase signInWithEmailAndPassword
    const newAccount = { email, token: `mock-token-${email}` };
    setCurrentAccount(newAccount);
    if (!accounts.some((acc) => acc.email === email)) {
      setAccounts([...accounts, newAccount]);
    }
  };

  const addAccount = async (email, password) => {
    // TODO: Replace with Firebase signInWithEmailAndPassword
    const newAccount = { email, token: `mock-token-${email}-${password}` }; // Use password in mock token
    setAccounts([...accounts, newAccount]);
    setCurrentAccount(newAccount);
  };

  const signUp = async ({ username, email, password, spiritAnimal }) => {
    // TODO: Replace with Firebase createUserWithEmailAndPassword
    const response = await signUpUser({ username, email, password, spiritAnimal });
    const newAccount = { email, token: `mock-token-${email}`, username, spiritAnimal };
    setAccounts([...accounts, newAccount]);
    setCurrentAccount(newAccount);
  };

  const switchAccount = (email) => {
    const account = accounts.find((acc) => acc.email === email);
    setCurrentAccount(account);
  };

  return (
    <AuthContext.Provider value={{ accounts, currentAccount, login, addAccount, signUp, switchAccount }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };