import { NavigatorScreenParams } from '@react-navigation/native';
import { StackScreenProps } from '@react-navigation/stack';
import { DrawerScreenProps } from '@react-navigation/drawer';

// Main Stack Navigator Types
export type RootStackParamList = {
  Main: NavigatorScreenParams<DrawerParamList>;
  BookingConfirmation: {
    bookingId: string;
    pickupLocation: string;
    dropLocation: string;
    date: string;
    time: string;
    carType: string;
    fare: number;
  };
  RideDetails: {
    rideId: string;
  };
  Payment: {
    amount: number;
    bookingId: string;
  };
};

// Drawer Navigator Types
export type DrawerParamList = {
  Home: undefined;
  MyRides: undefined;
  Profile: undefined;
  Settings: undefined;
  Support: undefined;
};

// Screen Props Types
export type RootStackScreenProps<T extends keyof RootStackParamList> = StackScreenProps<
  RootStackParamList,
  T
>;

export type DrawerScreenProps<T extends keyof DrawerParamList> = DrawerScreenProps<
  DrawerParamList,
  T
>;

// Helper Types
export type NavigationProps = RootStackScreenProps<keyof RootStackParamList>;
export type DrawerProps = DrawerScreenProps<keyof DrawerParamList>;

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}
