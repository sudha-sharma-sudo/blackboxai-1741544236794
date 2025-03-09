declare module '*.svg' {
  import { SvgProps } from 'react-native-svg';
  const content: React.FC<SvgProps>;
  export default content;
}

declare module '*.png' {
  const content: any;
  export default content;
}

declare module '*.jpg' {
  const content: any;
  export default content;
}

declare module '*.json' {
  const content: any;
  export default content;
}

// Extend the theme type for styled-components
import { Theme } from '../styles/theme';

declare module 'styled-components/native' {
  export interface DefaultTheme extends Theme {}
}

// Extend the Window interface
declare global {
  interface Window {
    __DEV__: boolean;
  }
}

// Add custom properties to the process.env
declare namespace NodeJS {
  interface ProcessEnv {
    NODE_ENV: 'development' | 'production' | 'test';
    API_URL: string;
    GOOGLE_MAPS_API_KEY: string;
  }
}

// Add custom properties to the console object
interface Console {
  tron: any;
}

// Add custom properties to the navigator object
interface Navigator {
  geolocation: {
    getCurrentPosition(
      success: (position: Position) => void,
      error?: (error: PositionError) => void,
      options?: PositionOptions
    ): void;
    watchPosition(
      success: (position: Position) => void,
      error?: (error: PositionError) => void,
      options?: PositionOptions
    ): number;
    clearWatch(id: number): void;
  };
}

// Add custom properties to the global object
declare global {
  namespace ReactNativePaper {
    interface ThemeColors {
      custom: string;
    }
  }
}

// Add custom properties to the React Navigation theme
declare module '@react-navigation/native' {
  export interface Theme {
    custom: {
      spacing: number;
      borderRadius: number;
    };
  }
}
