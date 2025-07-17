import React, { useState } from 'react';
import { View, FlatList, ActivityIndicator, SafeAreaView, KeyboardAvoidingView, Platform } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import type { ChatScreenProps } from '../types/navigation';
import type { Message } from '../types/chat';
import { ChatMessage } from '../components/ChatMessage';
import { ChatInput } from '../components/ChatInput';
import { ChatHeader } from '../components/ChatHeader';
import { chatStyles } from '../styles/chat';
import { createInitialMessage } from '../utils/chat';
import { answerGeneration, checkPythonServerHealth } from '../utils/python-ai-client';
import { debugEnvironment } from '../utils/debug';

export default function ChatScreen({ route }: ChatScreenProps) {
  const { place = 'InContext' } = route.params ?? {};
  const insets = useSafeAreaInsets();
  
  React.useEffect(() => {
    debugEnvironment();
    checkPythonServerHealth().then(isHealthy => {
      console.debug('Python AI server health:', isHealthy);
    });
  }, []);


  const [messages, setMessages] = useState<Message[]>([
    createInitialMessage(place),
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  const sendMessage = async (): Promise<void> => {
    if (!input.trim()) return;

    const userMessage: Message = { role: 'user', text: input };
    const updatedMessages = [...messages, userMessage];

    setMessages(updatedMessages);
    setInput('');
    setLoading(true);

    try {
      const chatMessages = updatedMessages.map(msg => ({
        role: msg.role,
        content: msg.text,
      }));
      const botReply = await answerGeneration(chatMessages);
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

  return (
    <SafeAreaView style={chatStyles.safeArea}>
      <KeyboardAvoidingView 
        style={chatStyles.keyboardAvoidingView}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}
      >
        <View style={chatStyles.container}>
          <ChatHeader place={place} />
          
          <FlatList
            data={messages}
            keyExtractor={(_: Message, index: number) => index.toString()}
            renderItem={({ item }: { item: Message }) => (
              <ChatMessage message={item} />
            )}
            contentContainerStyle={chatStyles.messagesContainer}
            showsVerticalScrollIndicator={false}
          />

          {loading && (
            <ActivityIndicator size="small" color="#555" style={chatStyles.loadingIndicator} />
          )}

          <ChatInput
            value={input}
            onChangeText={setInput}
            onSend={sendMessage}
            loading={loading}
            bottomInset={insets.bottom}
          />
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
