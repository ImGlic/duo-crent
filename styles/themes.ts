export type ThemeMode = 'light' | 'dark' | 'system';

export type Theme = {
  mode: ThemeMode;
  colors: {
    background: string;
    text: string;
    primary: string;
    secondary: string;
    border: string;
    inputBackground: string;
    card: string;
    placeholder: string;
    buttonWrapper: string; // Cor de fundo para o botão
    button: string; // Cor de fundo do botão
    buttonText: string; // Cor do texto do botão
    favoriteButton: string; // Cor de fundo do botão de favorito
    favoriteButtonText: string; // Cor do ícone de favorito
  };
};

export const themes: Record<'light' | 'dark', Theme> = {
  light: {
    mode: 'light',
    colors: {
      background: '#FFFFFF',
      text: '#1E1E1E',
      primary: '#0056D2',
      secondary: '#FF9900',
      border: '#D3D3D3',
      inputBackground: '#E8E8E8',
      card: '#F5F5F5',
      placeholder: '#7A7A7A',
      buttonWrapper: '#F0F0F0', // Cor de fundo do wrapper do botão
      button: '#0056D2', // Cor de fundo do botão
      buttonText: '#FFFFFF', // Cor do texto do botão
      favoriteButton: '#FF9900', // Cor de fundo do botão de favorito
      favoriteButtonText: '#FFFFFF', // Cor do ícone de favorito
    },
  },
  dark: {
    mode: 'dark',
    colors: {
      background: '#121212',
      text: '#FFFFFF',
      primary: '#3399FF',
      secondary: '#FFC107',
      border: '#444',
      inputBackground: '#2C2C2C',
      card: '#2C2C2C',
      placeholder: '#666666',
      buttonWrapper: '#333333', // Cor de fundo do wrapper do botão
      button: '#3399FF', // Cor de fundo do botão
      buttonText: '#FFFFFF', // Cor do texto do botão
      favoriteButton: '#FFC107', // Cor de fundo do botão de favorito
      favoriteButtonText: '#FFFFFF', // Cor do ícone de favorito
    },
  },
};
