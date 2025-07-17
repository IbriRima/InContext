import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  ScrollView,
} from 'react-native';
import type { MapScreenProps } from '../types/navigation';

/* 🛡 Read-only props (Sonar rule S6759) */
type Props = MapScreenProps;

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

/* ------------------------------------------------------------------ */
/* 📚 Story Data                                                      */
/* ------------------------------------------------------------------ */
const stories = [
  {
    id: 'adventure',
    title: '🌄 Das Bergabenteuer',
    description: 'Eine aufregende Reise durch geheimnisvolle Berge',
    category: 'Abenteuer',
  },
  {
    id: 'mystery',
    title: '🔍 Die Verborgene Bibliothek',
    description: 'Entdecke Geheimnisse in einer alten Bibliothek',
    category: 'Geheimnis',
  },
  {
    id: 'fantasy',
    title: '🐉 Der Schatz des Drachen',
    description: 'Eine magische Suche nach dem Gold des Drachen',
    category: 'Fantasy',
  },
  {
    id: 'scifi',
    title: '🚀 Weltraumforscher',
    description: 'Reise durch die Sterne und unbekannte Planeten',
    category: 'Science-Fiction',
  },
  {
    id: 'romance',
    title: '💕 Liebe in Paris',
    description: 'Eine romantische Geschichte in der Stadt der Lichter',
    category: 'Romantik',
  },
  {
    id: 'horror',
    title: '👻 Das Verfluchte Herrenhaus',
    description: 'Eine schauderhafte Erzählung über übernatürliche Vorkommnisse',
    category: 'Grusel',
  },
];

/* ------------------------------------------------------------------ */
/* 🚀 Component                                                       */
/* ------------------------------------------------------------------ */
export default function StoriesBookScreen({ navigation }: Props) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>📚 Story Library</Text>
      <Text style={styles.subtitle}>Choose your adventure</Text>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.storiesGrid}>
          {stories.map((story) => (
            <TouchableOpacity
              key={story.id}
              style={[styles.storyCard, styles[`${story.category.toLowerCase()}Card`]]}
              onPress={() => navigation.navigate('Story', { 
                storyId: story.id, 
                storyTitle: story.title 
              })}
            >
              <Text style={styles.storyTitle}>{story.title}</Text>
              <Text style={styles.storyDescription}>{story.description}</Text>
              <View style={styles.categoryBadge}>
                <Text style={styles.categoryText}>{story.category}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

/* ------------------------------------------------------------------ */
/* 🎨 Styles                                                          */
/* ------------------------------------------------------------------ */
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 8,
    color: '#2c3e50',
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 24,
    color: '#7f8c8d',
  },
  scrollView: {
    flex: 1,
  },
  storiesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingBottom: 20,
  },
  storyCard: {
    width: screenWidth * 0.44,
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  adventureCard: { backgroundColor: '#e8f5e8' },
  mysteryCard: { backgroundColor: '#fff3cd' },
  fantasyCard: { backgroundColor: '#f8d7da' },
  scifiCard: { backgroundColor: '#d1ecf1' },
  romanceCard: { backgroundColor: '#fce4ec' },
  horrorCard: { backgroundColor: '#f3e5f5' },
  storyTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#2c3e50',
  },
  storyDescription: {
    fontSize: 12,
    color: '#7f8c8d',
    marginBottom: 12,
    lineHeight: 16,
  },
  categoryBadge: {
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    alignSelf: 'flex-start',
  },
  categoryText: {
    fontSize: 10,
    fontWeight: '600',
    color: '#2c3e50',
  },
});
