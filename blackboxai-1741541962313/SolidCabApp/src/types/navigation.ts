import { NavigatorScreenParams } from '@react-navigation/native';

export type RootStackParamList = {
  DrawerHome: NavigatorScreenParams<DrawerParamList>;
  BookingDetails: { bookingId: string };
  Confirmation: { bookingId: string };
};

export type DrawerParamList = {
  Home: undefined;
  MyRides: undefined;
  Profile: undefined;
  Wallet: undefined;
  Support: undefined;
  Notifications: undefined;
};

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}

export {};
