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
import type { NativeStackScreenProps } from '@react-navigation/native-stack';

/* ------------------------------------------------------------------ */
/* 🔑 1. Navigation types                                             */
/* ------------------------------------------------------------------ */
type RootStackParamList = {
  Chat: { place?: string };
  /* add other screens here, e.g. Login: undefined; Map: { … } */
};

type Props = NativeStackScreenProps<RootStackParamList, 'Chat'>;

/* ------------------------------------------------------------------ */
/* 🔑 2. Message type                                                 */
/* ------------------------------------------------------------------ */
type Message = {
  role: 'user' | 'assistant';
  text: string;
};

/* ------------------------------------------------------------------ */
/* 🚀 3. Component                                                    */
/* ------------------------------------------------------------------ */
export default function ChatScreen({ route }: Props) {
  const { place = 'InContext' } = route.params ?? {};

  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      text: `Hallo! Willkommen im ${place}. Wie kann ich helfen?`,
    },
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  /* ---------------------------------- */
  /* 📨 Send message flow               */
  /* ---------------------------------- */
  const sendMessage = async (): Promise<void> => {
    if (!input.trim()) return;

    const userMessage: Message = { role: 'user', text: input };
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
          body: JSON.stringify({ inputs: buildPrompt(updatedMessages) }),
        },
      );

      const data: { generated_text?: string } = await response.json();
      const botReply =
        data?.generated_text ?? 'Entschuldigung, ich habe das nicht verstanden.';

      setMessages([...updatedMessages, { role: 'assistant', text: botReply }]);
    } catch (err) {
      console.error('API error:', err);
      setMessages([
        ...updatedMessages,
        {
          role: 'assistant',
          text: 'Fehler bei der Anfrage. Bitte versuche es erneut.',
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  /* ---------------------------------- */
  /* 🧠 Prompt builder                  */
  /* ---------------------------------- */
  const buildPrompt = (history: Message[]): string => {
    const header =
      'You are a helpful bilingual language partner. Respond in German if the question is in English, and in English if the question is in German.\n\n';

    const transcript = history
      .map((m) => `${m.role === 'user' ? 'User' : 'Assistant'}: ${m.text}`)
      .join('\n');

    return `${header}${transcript}\nAssistant:`;
  };

  /* ---------------------------------- */
  /* 🎨 UI                              */
  /* ---------------------------------- */
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

      {loading && (
        <ActivityIndicator size="small" color="#555" style={{ marginBottom: 8 }} />
      )}

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

/* ------------------------------------------------------------------ */
/* 🎨 4. Styles                                                        */
/* ------------------------------------------------------------------ */
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
