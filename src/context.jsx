import { createContext, useContext, useState } from 'react';

const AppContext = createContext(null);

export function AppProvider({ children }) {
  const [lang, setLang] = useState('en');
  const [screen, setScreen] = useState('landing');
  const [photoDataUrl, setPhotoDataUrl] = useState(null);
  const [message, setMessage] = useState('');
  const [recipientName, setRecipientName] = useState('');
  const [recipientCity, setRecipientCity] = useState('');

  function reset() {
    setPhotoDataUrl(null);
    setMessage('');
    setRecipientName('');
    setRecipientCity('');
    setScreen('editor');
  }

  return (
    <AppContext.Provider value={{
      lang, setLang,
      screen, setScreen,
      photoDataUrl, setPhotoDataUrl,
      message, setMessage,
      recipientName, setRecipientName,
      recipientCity, setRecipientCity,
      reset,
    }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  return useContext(AppContext);
}
