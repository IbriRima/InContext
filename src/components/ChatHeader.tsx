import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface ChatHeaderProps {
  place: string;
}

export const ChatHeader: React.FC<ChatHeaderProps> = ({ place }) => {
  return (
    <View style={styles.header}>
      <Text style={styles.title}>{place}</Text>
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
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  subtitle: {
    fontSize: 14,
    color: '#666',
    marginTop: 2,
  },
}); 