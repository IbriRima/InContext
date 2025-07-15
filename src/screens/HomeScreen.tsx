import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';

/* ------------------------------------------------------------------ */
/* 🔑 1. Navigation types                                             */
/* ------------------------------------------------------------------ */
type RootStackParamList = {
  Home: undefined;
  Login: undefined;
};

type Props = Readonly<NativeStackScreenProps<RootStackParamList, 'Home'>>;

/* ------------------------------------------------------------------ */
/* 🚀 2. Component                                                    */
/* ------------------------------------------------------------------ */
export default function HomeScreen({ navigation }: Props) {
  const handleLogout = () => navigation.navigate('Login');

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Welcome to InContext</Text>
        <Text style={styles.subtitle}>Your language learning journey starts here</Text>
      </View>

      <View style={styles.content}>
        {/* --- Quick Start Card --- */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Quick Start</Text>
          <Text style={styles.cardText}>
            Begin your language learning adventure with our interactive lessons and exercises.
          </Text>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Start Learning</Text>
          </TouchableOpacity>
        </View>

        {/* --- Progress Card --- */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Progress</Text>
          <Text style={styles.cardText}>
            Track your learning progress and see how far you've come.
          </Text>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>View Progress</Text>
          </TouchableOpacity>
        </View>

        {/* --- Settings Card --- */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Settings</Text>
          <Text style={styles.cardText}>
            Customize your learning experience and preferences.
          </Text>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Settings</Text>
          </TouchableOpacity>
        </View>
      </View>

      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.logoutText}>Logout</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

/* ------------------------------------------------------------------ */
/* 🎨 3. Styles                                                       */
/* ------------------------------------------------------------------ */
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    backgroundColor: '#4A90E2',
    padding: 24,
    paddingTop: 60,
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#fff',
    opacity: 0.9,
    textAlign: 'center',
  },
  content: {
    padding: 16,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#333',
  },
  cardText: {
    fontSize: 16,
    color: '#666',
    marginBottom: 16,
    lineHeight: 24,
  },
  button: {
    backgroundColor: '#4A90E2',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  logoutButton: {
    backgroundColor: '#ff6b6b',
    margin: 16,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  logoutText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});
