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
  ActivityIndicator,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import type { YouTubeScreenProps } from '../types/navigation';
import { transcribeYouTubeVideo, TranscriptionResult } from '../utils/python-ai-client';

type Props = YouTubeScreenProps;

export default function YouTubeScreen({ navigation }: Props) {
  const [youtubeUrl, setYoutubeUrl] = useState('');
  const [isValidUrl, setIsValidUrl] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [transcriptionResult, setTranscriptionResult] = useState<TranscriptionResult | null>(null);
  const insets = useSafeAreaInsets();

  const validateYouTubeUrl = (url: string): boolean => {
    // Basic YouTube URL validation
    const youtubeRegex = /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.be)\/.+/;
    return youtubeRegex.test(url);
  };

  const handleUrlChange = (text: string) => {
    setYoutubeUrl(text);
    setIsValidUrl(validateYouTubeUrl(text));
    // Clear previous results when URL changes
    if (transcriptionResult) {
      setTranscriptionResult(null);
    }
  };

  const handleSubmit = async () => {
    if (!youtubeUrl.trim()) {
      Alert.alert('Error', 'Please enter a YouTube URL');
      return;
    }

    if (!isValidUrl) {
      Alert.alert('Invalid URL', 'Please enter a valid YouTube URL');
      return;
    }

    setIsLoading(true);
    setTranscriptionResult(null);

    try {
      const result = await transcribeYouTubeVideo(youtubeUrl);
      setTranscriptionResult(result);
      Alert.alert(
        'Success!',
        'Video transcribed successfully!',
        [{ text: 'OK' }]
      );
    } catch (error) {
      console.error('Transcription error:', error);
      Alert.alert(
        'Error',
        `Failed to transcribe video: ${error instanceof Error ? error.message : 'Unknown error'}`,
        [{ text: 'OK' }]
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleClear = () => {
    setYoutubeUrl('');
    setIsValidUrl(false);
    setTranscriptionResult(null);
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
        <Text style={styles.headerTitle}>📺 YouTube Transcription</Text>
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
            editable={!isLoading}
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
            style={[
              styles.button, 
              styles.submitButton, 
              (!isValidUrl || isLoading) && styles.disabledButton
            ]}
            onPress={handleSubmit}
            disabled={!isValidUrl || isLoading}
          >
            {isLoading ? (
              <View style={styles.loadingContainer}>
                <ActivityIndicator size="small" color="#ffffff" />
                <Text style={styles.buttonText}>Transcribing...</Text>
              </View>
            ) : (
              <Text style={styles.buttonText}>Transcribe Video</Text>
            )}
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.button, styles.clearButton]}
            onPress={handleClear}
            disabled={isLoading}
          >
            <Text style={styles.clearButtonText}>Clear</Text>
          </TouchableOpacity>
        </View>

        {transcriptionResult && (
          <View style={styles.resultContainer}>
            <Text style={styles.resultTitle}>📝 Transcription Result</Text>
            <View style={styles.resultInfo}>
              <Text style={styles.resultLabel}>Title:</Text>
              <Text style={styles.resultText}>{transcriptionResult.title}</Text>
            </View>
            <View style={styles.resultInfo}>
              <Text style={styles.resultLabel}>Transcription:</Text>
              <Text style={styles.transcriptionText}>{transcriptionResult.transcription}</Text>
            </View>
          </View>
        )}

        <View style={styles.infoContainer}>
          <Text style={styles.infoTitle}>📋 Supported URL Formats:</Text>
          <Text style={styles.infoText}>
            • https://www.youtube.com/watch?v=VIDEO_ID{'\n'}
            • https://youtu.be/VIDEO_ID{'\n'}
            • https://youtube.com/watch?v=VIDEO_ID{'\n'}
            • www.youtube.com/watch?v=VIDEO_ID
          </Text>
          <Text style={styles.infoNote}>
            ⚠️ Note: Transcription may take several minutes depending on video length.
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
  loadingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  resultContainer: {
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
  resultTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#2c3e50',
  },
  resultInfo: {
    marginBottom: 12,
  },
  resultLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#6c757d',
    marginBottom: 4,
  },
  resultText: {
    fontSize: 16,
    color: '#2c3e50',
    fontWeight: '500',
  },
  transcriptionText: {
    fontSize: 14,
    color: '#2c3e50',
    lineHeight: 20,
    textAlign: 'justify',
  },
  infoContainer: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  infoTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 12,
    color: '#2c3e50',
  },
  infoText: {
    fontSize: 14,
    color: '#6c757d',
    lineHeight: 20,
    marginBottom: 12,
  },
  infoNote: {
    fontSize: 12,
    color: '#dc3545',
    fontStyle: 'italic',
  },
}); 