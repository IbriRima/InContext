import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface ChatHeaderProps {
  place: string;
}

const shopEmojis: { [key: string]: { left: string; right: string } } = {
  'Cafe': { left: '☕️', right: '🥐' },
  'Bakery': { left: '🥨', right: '🥖' },
  'Butcher': { left: '🥩', right: '🍖' },
  'Bookstore': { left: '📚', right: '📖' },
  'Pharmacy': { left: '💊', right: '🏥' },
  'Grocery Store': { left: '🛒', right: '🥬' },
  'Flower Shop': { left: '🌸', right: '🌺' },
  'Ice Cream Shop': { left: '🍦', right: '🍨' },
  'Toy Store': { left: '🧸', right: '🎮' },
  'StoriesBook': { left: '📚', right: '📖' },
  'YouTube': { left: '📺', right: '🎥' },
  'InContext': { left: '🗣️', right: '💭' },
};

const germanNames: { [key: string]: string } = {
  'Cafe': 'Café',
  'Bakery': 'Bäckerei',
  'Butcher': 'Metzgerei',
  'Bookstore': 'Buchhandlung',
  'Pharmacy': 'Apotheke',
  'Grocery Store': 'Lebensmittel',
  'Flower Shop': 'Blumenladen',
  'Ice Cream Shop': 'Eisdiele',
  'Toy Store': 'Spielzeug',
  'StoriesBook': 'Bibliothek',
  'YouTube': 'YouTube',
  'InContext': 'InContext',
};

export const ChatHeader: React.FC<ChatHeaderProps> = ({ place }) => {
  const emojis = shopEmojis[place] || { left: '🏪', right: '🏪' };
  const germanName = germanNames[place] || place;

  return (
    <View style={styles.header}>
      <View style={styles.titleContainer}>
        <Text style={styles.emoji}>{emojis.left}</Text>
        <Text style={styles.title}>{germanName}</Text>
        <Text style={styles.emoji}>{emojis.right}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
    backgroundColor: '#ffffff',
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
  },
  emoji: {
    fontSize: 24,
  },
}); 