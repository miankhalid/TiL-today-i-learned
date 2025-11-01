import type { NavigatorScreenParams } from '@react-navigation/native';
import type { StackScreenProps } from '@react-navigation/stack';

// Root Navigator
export type RootScreenProps<T extends keyof RootStackParamList> = StackScreenProps<
  RootStackParamList,
  T
>;

export type RootStackParamList = {
  Auth: NavigatorScreenParams<AuthStackParamList>;
  Main: NavigatorScreenParams<MainStackParamList>;
};

// Auth Navigator
export type AuthScreenProps<T extends keyof AuthStackParamList> = StackScreenProps<
  AuthStackParamList,
  T
>;

export type AuthStackParamList = {
  Feed: undefined;
  Login: undefined;
  Signup: undefined;
};

// Main (App) Navigator
export type MainScreenProps<T extends keyof MainStackParamList> = StackScreenProps<
  MainStackParamList,
  T
>;

export type MainStackParamList = {
  Feed: undefined;
  Home: undefined;
};
