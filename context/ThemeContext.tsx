import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Appearance } from 'react-native';
import { themes, Theme, ThemeMode } from '../styles/themes';

type ThemeContextType = {
  theme: Theme; 
  mode: ThemeMode;
  setMode: (mode: ThemeMode) => void;
};

const ThemeContext = createContext<ThemeContextType>({
  theme: themes.light,
  mode: 'light',
  setMode: () => {},
});

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const systemScheme = Appearance.getColorScheme();
  const [mode, setMode] = useState<ThemeMode>('light');

  const resolvedMode = mode === 'system' ? (systemScheme || 'light') : mode;
  const theme = themes[resolvedMode];

  return (
    <ThemeContext.Provider value={{ theme, mode, setMode }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useThemeContext = () => useContext(ThemeContext);
