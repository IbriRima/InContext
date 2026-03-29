import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  Platform,
  StatusBar,
} from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';

type RootStackParamList = {
  Map: undefined;
  Chat: { place: string };
  Login: undefined;
  Home: undefined;
  StoriesBook: undefined;
  YouTube: undefined;
};

type Shop = {
  id: number;
  name: string;
  germanName: string;
  emoji: string;
  level: number;
  position: 'left' | 'center' | 'right';
};

type Props = Readonly<
  NativeStackScreenProps<RootStackParamList, 'Map'>
>;



const shops: Shop[] = [
  { id: 1, name: 'Bakery', germanName: 'Bäckerei', emoji: '🥨', level: 1.5, position: 'center' },
  { id: 2, name: 'Butcher', germanName: 'Metzgerei', emoji: '🥩', level: 2.5, position: 'right' },
  { id: 3, name: 'Bookstore', germanName: 'Buchhandlung', emoji: '📚', level: 3.5, position: 'left' },
  { id: 4, name: 'Cafe', germanName: 'Café', emoji: '☕', level: 4.5, position: 'center' },
  { id: 5, name: 'Pharmacy', germanName: 'Apotheke', emoji: '💊', level: 5.5, position: 'right' },
  { id: 6, name: 'Grocery Store', germanName: 'Lebensmittel', emoji: '🛒', level: 6.5, position: 'left' }, 
  { id: 7, name: 'Flower Shop', germanName: 'Blumenladen', emoji: '🌸', level: 7.5, position: 'center' },
  { id: 8, name: 'Ice Cream Shop', germanName: 'Eisdiele', emoji: '🍦', level: 8.5, position: 'right' },
  { id: 9, name: 'Toy Store', germanName: 'Spielzeug', emoji: '🧸', level: 9.5, position: 'center' }, 
  { id: 10, name: 'StoriesBook', germanName: 'Bibliothek', emoji: '📚', level: 10.5, position: 'left' }, 
  { id: 11, name: 'YouTube', germanName: 'YouTube', emoji: '📺', level: 11.5, position: 'right' },
];

export default function MapScreen({ navigation }: Props) {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>🗺️ Deutsche Geschäfte</Text>
      
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.mapArea}>
          {/* Path decoration */}
          <View style={styles.path} />
          
          {/* Shop nodes */}
          {shops.map((shop) => (
            <TouchableOpacity
              key={shop.id}
              style={[
                styles.shopNode,
                styles[`position${shop.position}`],
                { top: (shop.level - 1) * 120 },
                (shop.name === 'StoriesBook' || shop.name === 'YouTube') && styles.learningNode
              ]}
              onPress={() => 
                shop.name === 'StoriesBook' 
                  ? navigation.navigate('StoriesBook')
                  : shop.name === 'YouTube'
                    ? navigation.navigate('YouTube')
                    : navigation.navigate('Chat', { place: shop.name })
              }
            >
              <View style={[
                styles.nodeContent,
                (shop.name === 'StoriesBook' || shop.name === 'YouTube') && styles.learningNodeContent
              ]}>
                <Text style={styles.shopEmoji}>{shop.emoji}</Text>
                <Text style={styles.shopName}>{shop.germanName}</Text>
              </View>
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
    backgroundColor: '#c8e6c9', 
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0, 
  },
  title: {
    fontSize: 24,
    marginTop: Platform.OS === 'android' ? 20 : 10, 
    marginBottom: 16,
    textAlign: 'center',
    color: '#2c3e50',
    fontWeight: 'bold',
    backgroundColor: '#ffffff',
    padding: 8,
    borderRadius: 12,
    marginHorizontal: 20,
    elevation: 3,
  },
  scrollContainer: {
    flexGrow: 1,
    paddingBottom: 100, 
  },
  mapArea: {
    height: 1500, 
    width: '100%',
    paddingTop: 40,
  },
  path: {
    position: 'absolute',
    width: 10,
    height: '95%', 
    backgroundColor: '#81c784',
    left: '50%',
    marginLeft: -5,
    zIndex: 1,
    borderRadius: 5,
    opacity: 0.6,
  },
  shopNode: {
    position: 'absolute',
    minWidth: 100, 
    minHeight: 100, 
    zIndex: 2,
  },
  nodeContent: {
    width: 'auto',
    minWidth: 100,
    height: 100,
    backgroundColor: '#ffffff',
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 5,
    borderWidth: 3,
    borderColor: '#81c784',
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  positionleft: {
    left: '15%', 
  },
  positioncenter: {
    left: '50%',
    transform: [{ translateX: -50 }], 
  },
  positionright: {
    right: '15%', 
  },
  shopEmoji: {
    fontSize: 32,
    marginBottom: 4,
  },
  shopName: {
    fontSize: 10,
    textAlign: 'center',
    color: '#2c3e50',
    fontWeight: '600',
    flexWrap: 'wrap', 
    width: '100%', 
  },
  learningNode: {
    transform: [{ scale: 1.1 }], 
  },
  learningNodeContent: {
    backgroundColor: '#e8f5e8', 
    borderColor: '#4caf50', 
  },
});
