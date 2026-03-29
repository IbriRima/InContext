import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  ScrollView,
  SafeAreaView,
} from 'react-native';
import type { StoriesBookScreenProps } from '../types/navigation';

type Props = StoriesBookScreenProps;

const { width: screenWidth } = Dimensions.get('window');


const stories = [
  {
    id: 'adventure',
    title: '🌄 Das Bergabenteuer',
    description: 'Eine aufregende Reise durch geheimnisvolle Berge',
    category: 'Abenteuer',
    color: '#8d6e63', 
  },
  {
    id: 'mystery',
    title: '🔍 Die Verborgene Bibliothek',
    description: 'Entdecke Geheimnisse in einer alten Bibliothek',
    category: 'Geheimnis',
    color: '#5c6bc0',
  },
  {
    id: 'fantasy',
    title: '🐉 Der Schatz des Drachen',
    description: 'Eine magische Suche nach dem Gold des Drachen',
    category: 'Fantasy',
    color: '#7b1fa2',
  },
  {
    id: 'scifi',
    title: '🚀 Weltraumforscher',
    description: 'Reise durch die Sterne und unbekannte Planeten',
    category: 'Science-Fiction',
    color: '#0097a7',
  },
  {
    id: 'romance',
    title: '💕 Liebe in Paris',
    description: 'Eine romantische Geschichte in der Stadt der Lichter',
    category: 'Romantik',
    color: '#ec407a',
  },
  {
    id: 'horror',
    title: '👻 Das Verfluchte Herrenhaus',
    description: 'Eine schauderhafte Erzählung über übernatürliche Vorkommnisse',
    category: 'Grusel',
    color: '#455a64', 
  },
];

export default function StoriesBookScreen({ navigation }: Props) {
  return (
    <SafeAreaView style={styles.container}>
      {/* Roof Design */}
      <View style={styles.roof}>
        <View style={styles.roofLeft} />
        <View style={styles.roofRight} />
      </View>

      {/* Library Sign */}
      <View style={styles.signBoard}>
        <Text style={styles.title}>📚 Bibliothek</Text>
        <Text style={styles.subtitle}>Wähle dein Abenteuer</Text>
      </View>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.bookshelf}>
          {stories.map((story, index) => (
            <TouchableOpacity
              key={story.id}
              style={[
                styles.book,
                { backgroundColor: story.color },
                { transform: [{ rotate: `${index % 2 === 0 ? '1' : '-1'}deg` }] }
              ]}
              onPress={() => navigation.navigate('Story', { 
                storyId: story.id, 
                storyTitle: story.title 
              })}
            >
              <Text style={styles.bookTitle} numberOfLines={2}>{story.title}</Text>
              <Text style={styles.bookCategory}>{story.category}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  roof: {
    height: 80,
    backgroundColor: '#8d6e63', 
    marginTop: -20,
    marginBottom: 20,
    flexDirection: 'row',
    overflow: 'hidden',
  },
  roofLeft: {
    flex: 1,
    backgroundColor: '#8d6e63',
    transform: [{ skewY: '-10deg' }],
    marginTop: 20,
  },
  roofRight: {
    flex: 1,
    backgroundColor: '#8d6e63',
    transform: [{ skewY: '10deg' }],
    marginTop: 20,
  },
  signBoard: {
    backgroundColor: '#d7ccc8', 
    padding: 15,
    marginHorizontal: 20,
    borderRadius: 10,
    marginTop: -40,
    elevation: 5,
    borderWidth: 2,
    borderColor: '#6d4c41',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#4e342e',
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
    color: '#5d4037',
    marginTop: 5,
  },
  scrollView: {
    flex: 1,
    marginTop: 20,
  },
  bookshelf: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    padding: 15,
    paddingTop: 20,
    backgroundColor: '#a1887f',
    margin: 10,
    borderRadius: 10,
    borderWidth: 3,
    borderColor: '#795548',
  },
  book: {
    width: screenWidth * 0.4,
    height: 160,
    marginBottom: 20,
    borderRadius: 8,
    padding: 15,
    elevation: 5,
    justifyContent: 'space-between',
    borderRightWidth: 4,
    borderBottomWidth: 4,
    borderColor: 'rgba(0,0,0,0.2)',
  },
  bookTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
    textShadowColor: 'rgba(0,0,0,0.3)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  bookCategory: {
    fontSize: 12,
    color: '#fff',
    opacity: 0.9,
    fontStyle: 'italic',
  },
});
