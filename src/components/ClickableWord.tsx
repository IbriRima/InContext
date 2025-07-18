import React, { useState } from 'react';
import { Text, TouchableOpacity, View, StyleSheet, ActivityIndicator, TextStyle } from 'react-native';
import { translateWord } from '../utils/translation';

interface ClickableWordProps {
  word: string;
  onWordPress?: (word: string, translation: string) => void;
  style?: TextStyle;
}

export const ClickableWord: React.FC<ClickableWordProps> = ({ 
  word, 
  onWordPress,
  style 
}) => {
  const [translation, setTranslation] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [isPressed, setIsPressed] = useState(false);

  const handlePress = async () => {
    if (!word.trim() || word.trim().length < 2) {
      return;
    }
    setIsLoading(true);
    setShowModal(true);
    try {
      const result = await translateWord(word);
      if (result.success) {
        setTranslation(result.translation);
        onWordPress?.(word, result.translation);
      } else {
        setTranslation('Translation not available');
      }
    } catch (error) {
      console.error('Translation error:', error);
      setTranslation('Translation failed');
    } finally {
      setIsLoading(false);
    }
  };

  const handlePressIn = () => {
    setIsPressed(true);
  };

  const handlePressOut = () => {
    setIsPressed(false);
  };

  const shouldBeClickable = word.trim().length > 1;

  return (
    <>
      <TouchableOpacity
        onPress={shouldBeClickable ? handlePress : undefined}
        onPressIn={shouldBeClickable ? handlePressIn : undefined}
        onPressOut={shouldBeClickable ? handlePressOut : undefined}
        disabled={!shouldBeClickable}
        style={shouldBeClickable ? styles.clickableWord : undefined}
      >
        <Text style={[
          style,
          shouldBeClickable ? (isPressed ? styles.pressedText : styles.normalText) : styles.normalText
        ]}>
          {word}
        </Text>
      </TouchableOpacity>

      {showModal && (
        <View style={styles.modalOverlay}>
          <TouchableOpacity
            style={styles.modalOverlay}
            activeOpacity={1}
            onPress={() => setShowModal(false)}
          >
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>Translation</Text>
              <Text style={styles.originalWord}>{word}</Text>
              
              {isLoading ? (
                <View style={styles.loadingContainer}>
                  <ActivityIndicator size="small" color="#007bff" />
                  <Text style={styles.loadingText}>Translating...</Text>
                </View>
              ) : (
                <Text style={styles.translationText}>{translation}</Text>
              )}
              
              <TouchableOpacity
                style={styles.closeButton}
                onPress={() => setShowModal(false)}
              >
                <Text style={styles.closeButtonText}>Close</Text>
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        </View>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  clickableWord: {
    // Add any additional styling for clickable words
  },
  normalText: {
    color: '#2c3e50', // Normal text color
  },
  pressedText: {
    color: '#007bff',
    textDecorationLine: 'underline',
    backgroundColor: 'rgba(0, 123, 255, 0.1)',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  modalContent: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 20,
    margin: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    maxWidth: '90%',
    minWidth: 200,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#2c3e50',
  },
  originalWord: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 10,
    color: '#007bff',
  },
  translationText: {
    fontSize: 16,
    marginBottom: 15,
    color: '#2c3e50',
    textAlign: 'center',
  },
  loadingContainer: {
    alignItems: 'center',
    marginBottom: 15,
  },
  loadingText: {
    marginTop: 8,
    fontSize: 14,
    color: '#7f8c8d',
  },
  closeButton: {
    backgroundColor: '#007bff',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
  },
  closeButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
}); 