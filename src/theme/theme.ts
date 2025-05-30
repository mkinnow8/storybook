export const theme = {
  colors: {
    primary: '#FF6B6B', // Playful coral red
    secondary: '#4ECDC4', // Fun turquoise
    accent: '#FFE66D', // Bright yellow
    background: '#F7F9FC', // Light blue-gray background
    text: '#2D3436', // Dark gray for text
    white: '#FFFFFF',
    success: '#6BCB77', // Fresh green
    error: '#FF6B6B', // Coral red for errors
    disabled: '#DFE6E9', // Light gray for disabled states
  },
  typography: {
    title: {
      fontSize: 32,
      fontWeight: '700' as const,
      color: '#2D3436',
    },
    subtitle: {
      fontSize: 24,
      fontWeight: '600' as const,
      color: '#2D3436',
    },
    body: {
      fontSize: 18,
      color: '#2D3436',
    },
    button: {
      fontSize: 20,
      fontWeight: '700' as const,
      color: '#FFFFFF',
    },
  },
  spacing: {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
  },
  borderRadius: {
    small: 8,
    medium: 16,
    large: 24,
    round: 9999,
  },
  shadows: {
    small: {
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 2,
    },
    medium: {
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 4,
      },
      shadowOpacity: 0.15,
      shadowRadius: 8,
      elevation: 4,
    },
  },
};
