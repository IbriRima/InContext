import React, { useState } from 'react';
import { Text, TouchableOpacity, View, StyleSheet, ActivityIndicator, TextStyle } from 'react-native';
import { translateSentence } from '../utils/translation';

interface ClickableSentenceProps {
  sentence: string;
  onSentencePress?: (sentence: string, translation: string) => void;
  style?: TextStyle;
}

export const ClickableSentence: React.FC<ClickableSentenceProps> = ({ 
  sentence, 
  onSentencePress,
  style 
}) => {
  const [translation, setTranslation] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [isPressed, setIsPressed] = useState(false);

  const handlePress = async () => {
    if (!sentence.trim() || sentence.trim().length < 10) {
      return;
    }
    setIsLoading(true);
    setShowModal(true);
    try {
      const result = await translateSentence(sentence);
      if (result.success) {
        setTranslation(result.translation);
        onSentencePress?.(sentence, result.translation);
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

  const shouldBeClickable = sentence.trim().length > 10;

  return (
    <>
      <TouchableOpacity
        onPress={shouldBeClickable ? handlePress : undefined}
        onPressIn={shouldBeClickable ? handlePressIn : undefined}
        onPressOut={shouldBeClickable ? handlePressOut : undefined}
        disabled={!shouldBeClickable}
        style={shouldBeClickable ? styles.clickableSentence : undefined}
      >
        <Text style={[
          style,
          shouldBeClickable ? (isPressed ? styles.pressedText : styles.normalText) : styles.normalText
        ]}>
          {sentence}
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
              <Text style={styles.modalTitle}>Sentence Translation</Text>
              <Text style={styles.originalSentence}>{sentence}</Text>
              
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
  clickableSentence: {
  },
  normalText: {
    color: '#2c3e50', // Normal text color
  },
  pressedText: {
    color: '#28a745',
    textDecorationLine: 'underline',
    backgroundColor: 'rgba(40, 167, 69, 0.1)',
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
  originalSentence: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 10,
    color: '#28a745',
    textAlign: 'center',
    lineHeight: 20,
  },
  translationText: {
    fontSize: 16,
    marginBottom: 15,
    color: '#2c3e50',
    textAlign: 'center',
    lineHeight: 22,
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
    backgroundColor: '#28a745',
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