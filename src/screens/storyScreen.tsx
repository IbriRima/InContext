import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import type { StoryScreenProps } from '../types/navigation';

type Props = StoryScreenProps;

/* ------------------------------------------------------------------ */
/* 📖 Story Content                                                    */
/* ------------------------------------------------------------------ */
const storyContent = {
  adventure: {
    title: '🌄 The Mountain Adventure',
    content: `The crisp mountain air filled your lungs as you stood at the base of the towering peaks. The ancient stone path wound its way upward, disappearing into the misty clouds above.

Your journey began with a simple map and a heart full of courage. The locals had warned you about the mysterious sounds that echoed through the valleys at night, but nothing could deter you from discovering what lay hidden in these sacred mountains.

As you climbed higher, the air grew thinner and the path more treacherous. Strange markings on the rocks seemed to tell a story of those who had come before you. Each step brought you closer to the truth that had drawn you here.

The sun was setting when you reached the ancient temple carved into the mountainside. Its weathered stone walls held secrets that had been waiting for centuries to be discovered. The moment you stepped inside, you knew your life would never be the same.

What mysteries await you in the heart of the mountain?`,
  },
  mystery: {
    title: '🔍 The Hidden Library',
    content: `The old university building had always held an air of mystery, but today was different. As you walked through the grand entrance, you noticed something peculiar - a door that hadn't been there yesterday.

The door was small and unassuming, tucked away behind a dusty bookshelf. Its brass handle gleamed as if it had been polished recently, though no one had been in this section of the library for months.

Curiosity got the better of you, and you reached for the handle. To your surprise, it turned easily, revealing a narrow staircase leading down into darkness. The air was cool and carried the scent of old parchment and leather.

Descending the stairs, you found yourself in a chamber unlike anything you'd ever seen. Books lined the walls from floor to ceiling, their spines glowing with an otherworldly light. Some of the titles were written in languages you couldn't recognize.

In the center of the room stood a massive wooden table, covered in ancient manuscripts and mysterious artifacts. One book in particular caught your eye - it seemed to pulse with energy, as if it was alive.

The librarian had never mentioned this place, and you were certain it wasn't on any of the building's blueprints. What secrets does this hidden library hold?`,
  },
  fantasy: {
    title: '🐉 Dragon\'s Treasure',
    content: `The ancient scrolls spoke of a dragon's hoard hidden deep within the Crystal Caves, protected by magic older than the kingdom itself. As you approached the cave entrance, you could feel the power emanating from within.

Your quest had begun with a simple map found in the ruins of an old wizard's tower. The parchment was fragile and yellowed with age, but the directions were clear - follow the path of the setting sun until you reach the mountain with two peaks.

The cave entrance was marked with runes that glowed with a soft blue light. As you stepped inside, the air grew warmer and you could hear the distant sound of water dripping from crystal formations.

The deeper you ventured, the more magnificent the cave became. Stalactites and stalagmites sparkled like diamonds, and the walls seemed to pulse with an inner light. You could sense that you were getting closer to your goal.

Finally, you reached the heart of the cave - a vast chamber filled with treasures beyond imagination. Gold coins, precious gems, and magical artifacts were scattered across the floor. But in the center of it all, resting on a pedestal of pure crystal, was the dragon's most prized possession.

The dragon itself was nowhere to be seen, but you could feel its presence, watching and waiting. The treasure was within your reach, but at what cost?`,
  },
  scifi: {
    title: '🚀 Space Explorer',
    content: `The year was 2157, and you were the first human to set foot on the mysterious planet designated as XR-847. Your spaceship, the Stellar Pioneer, had detected unusual energy signatures emanating from the planet's surface.

As you stepped out of your landing pod, the alien landscape stretched before you in all directions. The sky was a deep purple, and two moons hung low on the horizon. The air was breathable, but carried a sweet, unfamiliar scent.

Your mission was simple: investigate the energy source and determine if the planet was suitable for human colonization. But as you began your exploration, you quickly realized that XR-847 held secrets that would change humanity's understanding of the universe.

The energy signatures led you to a massive structure that seemed to be part building, part living organism. Its walls pulsed with light, and strange symbols covered every surface. As you approached, the structure seemed to recognize your presence.

A holographic projection appeared before you, showing images of other worlds, other civilizations. The message was clear - you were not the first to discover this place, and you wouldn't be the last.

What ancient knowledge awaits you in the depths of this alien structure?`,
  },
  romance: {
    title: '💕 Love in Paris',
    content: `The rain fell softly on the cobblestone streets of Paris as you hurried through the narrow alleyways of Montmartre. The city of love had always held a special place in your heart, but today felt different.

You had come to Paris to find inspiration for your next novel, but fate had other plans. As you ducked into a small café to escape the rain, you found yourself face to face with someone who would change your life forever.

The café was cozy and warm, filled with the aroma of freshly baked croissants and strong coffee. Paintings by local artists covered the walls, and soft jazz music played in the background. It was the perfect setting for a romantic encounter.

She was sitting by the window, lost in a book, completely unaware of the world around her. Her dark hair fell in soft waves around her shoulders, and the light from the street lamps created a halo effect around her.

When she looked up and smiled at you, time seemed to stand still. In that moment, you knew that your life would never be the same. The city of Paris had worked its magic once again, bringing together two souls who were meant to find each other.

What adventures await you in the most romantic city in the world?`,
  },
  horror: {
    title: '👻 The Haunted Mansion',
    content: `The old Victorian mansion loomed before you, its dark windows staring like empty eyes into the night. You had inherited this place from your great-uncle, but the locals had warned you about the strange occurrences that happened within its walls.

As you stepped through the front door, the air grew thick with the scent of old wood and something else - something you couldn't quite identify. The floorboards creaked beneath your feet, and you could hear the wind howling through the chimney.

The mansion was filled with antique furniture and family portraits that seemed to follow you with their eyes. In the parlor, you found your great-uncle's journal, filled with rambling entries about voices in the night and shadows that moved on their own.

As you explored deeper into the house, you began to notice things that couldn't be explained. Doors would open and close on their own, and you could hear footsteps echoing through empty hallways. The temperature would drop suddenly, and you could feel eyes watching you from the darkness.

In the attic, you discovered a room that had been sealed off for decades. The door was covered in strange symbols, and the air was thick with an oppressive energy. Something was waiting for you inside, something that had been waiting for a very long time.

What horrors lurk in the shadows of your family's past?`,
  },
};

/* ------------------------------------------------------------------ */
/* 🚀 Component                                                       */
/* ------------------------------------------------------------------ */
export default function StoryScreen({ route, navigation }: Props) {
  const { storyId, storyTitle } = route.params;
  const [currentStory, setCurrentStory] = useState<any>(null);
  const insets = useSafeAreaInsets();

  useEffect(() => {
    const story = storyContent[storyId as keyof typeof storyContent];
    if (story) {
      setCurrentStory(story);
    }
  }, [storyId]);

  if (!currentStory) {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.loadingText}>Loading story...</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.backButtonText}>← Back</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{currentStory.title}</Text>
      </View>

      <View style={[styles.contentContainer, { marginBottom: insets.bottom + 20 }]}>
        <ScrollView 
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={true}
          bounces={true}
          alwaysBounceVertical={false}
        >
          <Text style={styles.storyText}>{currentStory.content}</Text>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

/* ------------------------------------------------------------------ */
/* 🎨 Styles                                                          */
/* ------------------------------------------------------------------ */
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: '#e9ecef',
  },
  backButton: {
    padding: 8,
  },
  backButtonText: {
    fontSize: 16,
    color: '#007bff',
    fontWeight: '600',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 16,
    color: '#2c3e50',
    flex: 1,
  },
  contentContainer: {
    flex: 1,
    marginHorizontal: 16,
    marginTop: 8,
    backgroundColor: '#ffffff',
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  scrollView: {
    flex: 1,
    padding: 20,
  },
  scrollContent: {
    paddingBottom: 20,
  },
  storyText: {
    fontSize: 16,
    lineHeight: 24,
    color: '#2c3e50',
    textAlign: 'justify',
  },
  loadingText: {
    fontSize: 18,
    textAlign: 'center',
    marginTop: 50,
    color: '#7f8c8d',
  },
});
