import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { translateWord } from './src/utils/translation';

const TestTranslation: React.FC = () => {
  const [translation, setTranslation] = React.useState<string>('');
  const [isLoading, setIsLoading] = React.useState<boolean>(false);

  const testTranslation = async () => {
    setIsLoading(true);
    try {
      const result = await translateWord('Hallo');
      console.log('Translation result:', result);
      setTranslation(result.translation);
    } catch (error) {
      console.error('Translation error:', error);
      setTranslation('Translation failed');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Translation Test</Text>
      <TouchableOpacity style={styles.button} onPress={testTranslation}>
        <Text style={styles.buttonText}>
          {isLoading ? 'Translating...' : 'Test Translation'}
        </Text>
      </TouchableOpacity>
      {translation && (
        <Text style={styles.result}>
          Translation: {translation}
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#007bff',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
    marginBottom: 20,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  result: {
    fontSize: 16,
    textAlign: 'center',
    color: '#2c3e50',
  },
});

export default TestTranslation; 