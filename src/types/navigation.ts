import type { NativeStackScreenProps } from '@react-navigation/native-stack';

export type RootStackParamList = {
  Home: undefined;
  Chat: { place?: string };
  Map: undefined;
  Login: undefined;
  StoriesBook: undefined;
  Story: { storyId: string; storyTitle: string };
  YouTube: undefined;
};

export type ChatScreenProps = NativeStackScreenProps<RootStackParamList, 'Chat'>;
export type HomeScreenProps = NativeStackScreenProps<RootStackParamList, 'Home'>;
export type MapScreenProps = NativeStackScreenProps<RootStackParamList, 'Map'>;
export type LoginScreenProps = NativeStackScreenProps<RootStackParamList, 'Login'>;
export type StoriesBookScreenProps = NativeStackScreenProps<RootStackParamList, 'StoriesBook'>;
export type StoryScreenProps = NativeStackScreenProps<RootStackParamList, 'Story'>;
export type YouTubeScreenProps = NativeStackScreenProps<RootStackParamList, 'YouTube'>; 