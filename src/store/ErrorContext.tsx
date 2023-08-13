import React, { createContext, useContext, useState, ReactNode } from 'react';

interface ErrorContextType {
  errorAlert: { message: string; open: boolean }
  setErrorAlert: React.Dispatch<React.SetStateAction<{
    message: string
    open: boolean
}>>
  showErrorAlert: (message: string) => void;
}

const ErrorContext = createContext<ErrorContextType | undefined>(undefined);

export const ErrorProvider = ({ children }: {children: React.ReactNode}) => {
  const [errorAlert, setErrorAlert] = useState<{ message: string; open: boolean }>({
    message: '',
    open: false,
  });

  const showErrorAlert = (message: string) => {
    setErrorAlert({ message, open: true });
    setTimeout(() => {
      setErrorAlert((prevState) => ({ ...prevState, open: false }));
    }, 10000);
  };

  return (
    <ErrorContext.Provider value={{ errorAlert, setErrorAlert, showErrorAlert }}>
      {children}
    </ErrorContext.Provider>
  );
};

export const useError = () => {
  const context = useContext(ErrorContext);
  if (context === undefined) {
    throw new Error('useError must be used within an ErrorProvider');
  }
  return context;
};