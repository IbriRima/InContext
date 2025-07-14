import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  FlatList,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';

export default function ChatScreen({ route }) {
  const { place } = route.params || {};
  const [messages, setMessages] = useState([
    { role: 'assistant', text: `Hallo! Willkommen im ${place}. Wie kann ich helfen?` },
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = { role: 'user', text: input };
    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages);
    setInput('');
    setLoading(true);

    try {
      const response = await fetch(
        'https://api-inference.huggingface.co/models/HuggingFaceH4/zephyr-7b-beta',
        {
          method: 'POST',
          headers: {
            Authorization: 'Bearer YOUR_HUGGINGFACE_TOKEN',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            inputs: buildPrompt(updatedMessages),
          }),
        }
      );

      const data = await response.json();
      const botReply = data?.generated_text || 'Entschuldigung, ich habe das nicht verstanden.';

      setMessages([...updatedMessages, { role: 'assistant', text: botReply }]);
    } catch (err) {
      setMessages([
        ...updatedMessages,
        { role: 'assistant', text: 'Fehler bei der Anfrage. Bitte versuche es erneut.' },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const buildPrompt = (messages) => {
    const promptHeader = `You are a helpful bilingual language partner. Respond in German if the question is in English, and in English if the question is in German.\n\n`;
    return (
      promptHeader +
      messages
        .map((m) => `${m.role === 'user' ? 'User' : 'Assistant'}: ${m.text}`)
        .join('\n') +
      `\nAssistant:`
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={messages}
        keyExtractor={(_, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={item.role === 'user' ? styles.userBubble : styles.botBubble}>
            <Text>{item.text}</Text>
          </View>
        )}
        contentContainerStyle={{ paddingBottom: 12 }}
      />

      {loading && <ActivityIndicator size="small" color="#555" style={{ marginBottom: 8 }} />}

      <View style={styles.inputRow}>
        <TextInput
          style={styles.input}
          placeholder="Type your message..."
          value={input}
          onChangeText={setInput}
          onSubmitEditing={sendMessage}
        />
        <Button title="Send" onPress={sendMessage} disabled={loading} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f7f9ff',
  },
  userBubble: {
    alignSelf: 'flex-end',
    backgroundColor: '#d4eafd',
    padding: 10,
    borderRadius: 10,
    marginVertical: 4,
    maxWidth: '80%',
  },
  botBubble: {
    alignSelf: 'flex-start',
    backgroundColor: '#eaeaea',
    padding: 10,
    borderRadius: 10,
    marginVertical: 4,
    maxWidth: '80%',
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 12,
    borderTopWidth: 1,
    borderColor: '#ccc',
    paddingTop: 8,
  },
  input: {
    flex: 1,
    height: 40,
    borderColor: '#aaa',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    marginRight: 8,
  },
});
