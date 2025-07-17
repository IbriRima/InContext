import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';

/* ------------------------------------------------------------------ */
/* 🔑 Navigation types                                                */
/* ------------------------------------------------------------------ */
type RootStackParamList = {
  Map: undefined;
  Chat: { place: string };
  Login: undefined;
  Home: undefined;
  StoriesBook: undefined;
  YouTube: undefined;
};

/* 🛡 Read-only props (Sonar rule S6759) */
type Props = Readonly<
  NativeStackScreenProps<RootStackParamList, 'Map'>
>;

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

/* ------------------------------------------------------------------ */
/* 🚀 Component                                                       */
/* ------------------------------------------------------------------ */
export default function MapScreen({ navigation }: Props) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>🗺️ Town Map</Text>

      <View style={styles.mapArea}>
        {/* ☕ Café */}
        <TouchableOpacity
          style={[styles.tile, styles.shopTile]}
          onPress={() => navigation.navigate('Chat', { place: 'Café' })}
        >
          <Text style={styles.tileText}>☕ Café</Text>
        </TouchableOpacity>

        {/* 📚 Library */}
        <TouchableOpacity
          style={[styles.tile, styles.shopTile]}
          onPress={() => navigation.navigate('Chat', { place: 'Library' })}
        >
          <Text style={styles.tileText}>📚 Library</Text>
        </TouchableOpacity>

        {/* 🧍 Tourist */}
        <TouchableOpacity
          style={[styles.tile, styles.npcTile]}
          onPress={() => navigation.navigate('Chat', { place: 'Tourist' })}
        >
          <Text style={styles.tileText}>🧍 Tourist</Text>
        </TouchableOpacity>

        {/* 📚 Story Library */}
        <TouchableOpacity
          style={[styles.tile, styles.storyTile]}
          onPress={() => navigation.navigate('StoriesBook')}
        >
          <Text style={styles.tileText}>📚 Story Library</Text>
        </TouchableOpacity>

        {/* 🏠 Home */}
        <TouchableOpacity
          style={[styles.tile, styles.homeTile]}
          onPress={() => navigation.navigate('Home')}
        >
          <Text style={styles.tileText}>🏠 Home</Text>
        </TouchableOpacity>

        {/* 📺 YouTube */}
        <TouchableOpacity
          style={[styles.tile, styles.youtubeTile]}
          onPress={() => navigation.navigate('YouTube')}
        >
          <Text style={styles.tileText}>📺 YouTube</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

/* ------------------------------------------------------------------ */
/* 🎨 Styles                                                          */
/* ------------------------------------------------------------------ */
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#eef4ff',
    padding: 24,
  },
  title: {
    fontSize: 24,
    marginBottom: 16,
    textAlign: 'center',
  },
  mapArea: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  tile: {
    width: screenWidth * 0.4,
    height: screenHeight * 0.2,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  shopTile: { backgroundColor: '#ffe3a3' },
  npcTile: { backgroundColor: '#b0f3c8' },
  storyTile: { backgroundColor: '#e8f5e8' },
  homeTile: { backgroundColor: '#fce4ec' },
  youtubeTile: { backgroundColor: '#ff6b6b' },
  tileText: {
    fontSize: 18,
    fontWeight: '600',
  },
});
