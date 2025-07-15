import type { NativeStackScreenProps } from '@react-navigation/native-stack';

export type RootStackParamList = {
  Home: undefined;
  Chat: { place?: string };
  Map: undefined;
  Login: undefined;
};

export type ChatScreenProps = NativeStackScreenProps<RootStackParamList, 'Chat'>;
export type HomeScreenProps = NativeStackScreenProps<RootStackParamList, 'Home'>;
export type MapScreenProps = NativeStackScreenProps<RootStackParamList, 'Map'>;
export type LoginScreenProps = NativeStackScreenProps<RootStackParamList, 'Login'>; 