import React from 'react';
import { NavBar } from '../containers/NavBar';

export const NavigationProvider = ({ children }: { children: React.ReactNode }) => {
  const token = localStorage.getItem('token');
  return token ? (
    <>
      <NavBar />
      {children}
    </>
  ) : (
    <>{children}</>
  );
};
