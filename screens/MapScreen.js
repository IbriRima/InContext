import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

export default function MapScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>🗺️ Town Map</Text>

      {/* Simulated grid-based map */}
      <View style={styles.mapArea}>
        {/* Store blocks */}
        <TouchableOpacity
          style={[styles.tile, styles.shopTile]}
          onPress={() => navigation.navigate('Chat', { place: 'Café' })}
        >
          <Text style={styles.tileText}>☕ Café</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.tile, styles.shopTile]}
          onPress={() => navigation.navigate('Chat', { place: 'Library' })}
        >
          <Text style={styles.tileText}>📚 Library</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.tile, styles.npcTile]}
          onPress={() => navigation.navigate('Chat', { place: 'Tourist' })}
        >
          <Text style={styles.tileText}>🧍 Tourist</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

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
  shopTile: {
    backgroundColor: '#ffe3a3',
  },
  npcTile: {
    backgroundColor: '#b0f3c8',
  },
  tileText: {
    fontSize: 18,
    fontWeight: '600',
  },
});
