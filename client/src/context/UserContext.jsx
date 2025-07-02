
import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from '@clerk/clerk-react';

const UserContext = createContext();

export const useUserId= () => useContext(UserContext);

export const UserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const { userId, isSignedIn } = useAuth();

  useEffect(() => {
  if (isSignedIn && userId) {
    setCurrentUser({ id: userId });
    localStorage.setItem('userId', userId);
  } else {
    // User logged out
    setCurrentUser(null);
    localStorage.removeItem('userId');
  }
}, [userId, isSignedIn]);

  return (
    <UserContext.Provider value={{ currentUser, setCurrentUser }}>
      {children}
    </UserContext.Provider>
  );
};
