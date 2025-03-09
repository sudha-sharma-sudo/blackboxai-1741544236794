// Image declarations
declare module '*.png' {
  const content: any;
  export default content;
}

declare module '*.jpg' {
  const content: any;
  export default content;
}

declare module '*.jpeg' {
  const content: any;
  export default content;
}

declare module '*.gif' {
  const content: any;
  export default content;
}

declare module '*.svg' {
  import { SvgProps } from 'react-native-svg';
  const content: React.FC<SvgProps>;
  export default content;
}

// JSON declarations
declare module '*.json' {
  const content: { [key: string]: any };
  export default content;
}

// Environment variables
declare module '@env' {
  export const API_URL: string;
  export const GOOGLE_MAPS_API_KEY: string;
  export const STRIPE_PUBLISHABLE_KEY: string;
  export const APP_ENV: 'development' | 'staging' | 'production';
}

// Global type augmentations
declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NODE_ENV: 'development' | 'production' | 'test';
      API_URL: string;
      GOOGLE_MAPS_API_KEY: string;
      STRIPE_PUBLISHABLE_KEY: string;
      APP_ENV: 'development' | 'staging' | 'production';
    }
  }

  interface Window {
    __DEV__: boolean;
  }
}

// Extend existing modules
declare module 'react-native' {
  interface ViewStyle {
    elevation?: number;
  }
}

declare module 'react-native-config' {
  interface NativeConfig {
    API_URL: string;
    GOOGLE_MAPS_API_KEY: string;
    STRIPE_PUBLISHABLE_KEY: string;
    APP_ENV: 'development' | 'staging' | 'production';
  }
  const Config: NativeConfig;
  export default Config;
}

// Extend the console object for debugging
interface Console {
  tron: any;
}

// Extend the navigator object
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

// Extend the theme type for styled-components
import { Theme } from '../styles/theme';
declare module 'styled-components/native' {
  export interface DefaultTheme extends Theme {}
}

// Export empty object to make this a module
export {};
