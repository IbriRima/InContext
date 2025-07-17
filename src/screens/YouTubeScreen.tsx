import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import type { YouTubeScreenProps } from '../types/navigation';

type Props = YouTubeScreenProps;

export default function YouTubeScreen({ navigation }: Props) {
  const [youtubeUrl, setYoutubeUrl] = useState('');
  const [isValidUrl, setIsValidUrl] = useState(false);
  const insets = useSafeAreaInsets();

  const validateYouTubeUrl = (url: string): boolean => {
    // Basic YouTube URL validation
    const youtubeRegex = /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.be)\/.+/;
    return youtubeRegex.test(url);
  };

  const handleUrlChange = (text: string) => {
    setYoutubeUrl(text);
    setIsValidUrl(validateYouTubeUrl(text));
  };

  const handleSubmit = () => {
    if (!youtubeUrl.trim()) {
      Alert.alert('Error', 'Please enter a YouTube URL');
      return;
    }

    if (!isValidUrl) {
      Alert.alert('Invalid URL', 'Please enter a valid YouTube URL');
      return;
    }

    // Here you can add logic to process the YouTube URL
    // For now, we'll just show a success message
    Alert.alert(
      'Success!',
      'YouTube URL submitted successfully!',
      [
        {
          text: 'OK',
          onPress: () => {
            setYoutubeUrl('');
            setIsValidUrl(false);
          }
        }
      ]
    );
  };

  const handleClear = () => {
    setYoutubeUrl('');
    setIsValidUrl(false);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.backButtonText}>← Back</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>📺 YouTube Link</Text>
      </View>

      <ScrollView 
        style={styles.content}
        contentContainerStyle={[styles.scrollContent, { paddingBottom: insets.bottom + 20 }]}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Enter YouTube URL:</Text>
          <TextInput
            style={[
              styles.textInput,
              isValidUrl && youtubeUrl ? styles.validInput : null,
              !isValidUrl && youtubeUrl ? styles.invalidInput : null
            ]}
            placeholder="https://www.youtube.com/watch?v=..."
            value={youtubeUrl}
            onChangeText={handleUrlChange}
            autoCapitalize="none"
            autoCorrect={false}
            multiline={false}
          />
          
          {youtubeUrl && (
            <View style={styles.validationContainer}>
              {isValidUrl ? (
                <Text style={styles.validText}>✅ Valid YouTube URL</Text>
              ) : (
                <Text style={styles.invalidText}>❌ Invalid YouTube URL</Text>
              )}
            </View>
          )}
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={[styles.button, styles.submitButton, !isValidUrl && styles.disabledButton]}
            onPress={handleSubmit}
            disabled={!isValidUrl}
          >
            <Text style={styles.buttonText}>Submit URL</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.button, styles.clearButton]}
            onPress={handleClear}
          >
            <Text style={styles.clearButtonText}>Clear</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.infoContainer}>
          <Text style={styles.infoTitle}>📋 Supported URL Formats:</Text>
          <Text style={styles.infoText}>
            • https://www.youtube.com/watch?v=VIDEO_ID{'\n'}
            • https://youtu.be/VIDEO_ID{'\n'}
            • https://youtube.com/watch?v=VIDEO_ID{'\n'}
            • www.youtube.com/watch?v=VIDEO_ID
          </Text>
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
  content: {
    flex: 1,
    padding: 20,
  },
  scrollContent: {
    flexGrow: 1,
  },
  inputContainer: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 12,
    color: '#2c3e50',
  },
  textInput: {
    borderWidth: 2,
    borderColor: '#e9ecef',
    borderRadius: 8,
    padding: 16,
    fontSize: 16,
    backgroundColor: '#ffffff',
    color: '#2c3e50',
  },
  validInput: {
    borderColor: '#28a745',
    backgroundColor: '#f8fff9',
  },
  invalidInput: {
    borderColor: '#dc3545',
    backgroundColor: '#fff8f8',
  },
  validationContainer: {
    marginTop: 8,
  },
  validText: {
    color: '#28a745',
    fontSize: 14,
    fontWeight: '600',
  },
  invalidText: {
    color: '#dc3545',
    fontSize: 14,
    fontWeight: '600',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  button: {
    flex: 1,
    paddingVertical: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginHorizontal: 5,
  },
  submitButton: {
    backgroundColor: '#007bff',
  },
  disabledButton: {
    backgroundColor: '#6c757d',
  },
  clearButton: {
    backgroundColor: '#ffffff',
    borderWidth: 2,
    borderColor: '#dc3545',
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
  clearButtonText: {
    color: '#dc3545',
    fontSize: 16,
    fontWeight: '600',
  },
  infoContainer: {
    backgroundColor: '#e3f2fd',
    borderRadius: 12,
    padding: 20,
    borderLeftWidth: 4,
    borderLeftColor: '#2196f3',
  },
  infoTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 12,
    color: '#1976d2',
  },
  infoText: {
    fontSize: 14,
    lineHeight: 20,
    color: '#424242',
  },
}); 