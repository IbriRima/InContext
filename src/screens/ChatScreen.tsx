import React, { useState, useEffect, useRef } from 'react';
import { 
  View, 
  Text, 
  FlatList, 
  KeyboardAvoidingView, 
  Platform,
  StyleSheet,
  Keyboard,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import type { ChatScreenProps } from '../types/navigation';
import type { Message } from '../types/chat';
import { ChatMessage } from '../components/ChatMessage';
import { ChatInput } from '../components/ChatInput';
import { chatStyles } from '../styles/chat';
import { createInitialMessage } from '../utils/chat';
import { answerGeneration, checkPythonServerHealth } from '../utils/python-ai-client';
import { debugEnvironment } from '../utils/debug';

/* ------------------------------------------------------------------ */
/* 🎨 Shop Theme Decorations                                           */
/* ------------------------------------------------------------------ */
const shopDecorations = {
  'Cafe': {
    topDecoration: '☕️ ☕️ ☕️',
    bottomDecoration: '🥐 🥨 🥖',
    backgroundColor: '#F5E6D3',
    accentColor: '#6F4E37',
    welcomeMessage: 'Willkommen im Café! Möchten Sie etwas bestellen?'
  },
  'Bakery': {
    topDecoration: '🥨 🥯 🥖',
    bottomDecoration: '🍞 🥐 🥪',
    backgroundColor: '#FFF3E0',
    accentColor: '#8D6E63',
    welcomeMessage: 'Willkommen in der Bäckerei! Unser Brot ist frisch gebacken.'
  },
  'Butcher': {
    topDecoration: '🥩 🍖 🥓',
    bottomDecoration: '🍗 🥪 🍖',
    backgroundColor: '#FFEBEE',
    accentColor: '#D32F2F',
    welcomeMessage: 'Willkommen in der Metzgerei! Wir haben frisches Fleisch.'
  },
  'Bookstore': {
    topDecoration: '📚 📖 📚',
    bottomDecoration: '📖 📚 📖',
    backgroundColor: '#E8F5E9',
    accentColor: '#2E7D32',
    welcomeMessage: 'Willkommen in der Buchhandlung! Wonach suchen Sie?'
  },
  'Pharmacy': {
    topDecoration: '💊 🏥 💉',
    bottomDecoration: '🩹 💊 🩺',
    backgroundColor: '#E3F2FD',
    accentColor: '#1976D2',
    welcomeMessage: 'Willkommen in der Apotheke! Wie kann ich Ihnen helfen?'
  },
  'Grocery Store': {
    topDecoration: '🥬 🥕 🍎',
    bottomDecoration: '🥖 🥩 🧀',
    backgroundColor: '#F1F8E9',
    accentColor: '#558B2F',
    welcomeMessage: 'Willkommen im Lebensmittelgeschäft! Was brauchen Sie?'
  },
  'Flower Shop': {
    topDecoration: '🌸 🌺 🌹',
    bottomDecoration: '🌷 🌼 🌻',
    backgroundColor: '#FCE4EC',
    accentColor: '#C2185B',
    welcomeMessage: 'Willkommen im Blumenladen! Suchen Sie besondere Blumen?'
  },
  'Ice Cream Shop': {
    topDecoration: '🍦 🍨 🍧',
    bottomDecoration: '🍪 🧁 🍰',
    backgroundColor: '#F3E5F5',
    accentColor: '#7B1FA2',
    welcomeMessage: 'Willkommen in der Eisdiele! Welche Sorte möchten Sie?'
  },
  'Toy Store': {
    topDecoration: '🧸 🎮 🎲',
    bottomDecoration: '🎨 🎭 🎪',
    backgroundColor: '#FFF3E0',
    accentColor: '#F57F17',
    welcomeMessage: 'Willkommen im Spielzeuggeschäft! Womit können wir helfen?'
  },
  'InContext': {
    topDecoration: '🗣️ 📝 ✨',
    bottomDecoration: '📚 💭 ✍️',
    backgroundColor: '#E8EAF6',
    accentColor: '#3949AB',
    welcomeMessage: 'Willkommen! Wie kann ich Ihnen beim Deutsch lernen helfen?'
  }
};

const germanNames: { [key: string]: string } = {
  'Cafe': 'Café',
  'Bakery': 'Bäckerei',
  'Butcher': 'Metzgerei',
  'Bookstore': 'Buchhandlung',
  'Pharmacy': 'Apotheke',
  'Grocery Store': 'Lebensmittel',
  'Flower Shop': 'Blumenladen',
  'Ice Cream Shop': 'Eisdiele',
  'Toy Store': 'Spielzeug',
  'StoriesBook': 'Bibliothek',
  'YouTube': 'YouTube',
  'InContext': 'InContext',
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  keyboardAvoidingView: {
    flex: 1,
  },
  content: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  titleContainer: {
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  titleBox: {
    borderRadius: 20,
    padding: 16,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  titleContent: {
    alignItems: 'center',
  },
  decorationText: {
    fontSize: 24,
    letterSpacing: 8,
    color: '#FFFFFF',
    marginBottom: 12,
  },
  shopName: {
    fontSize: 18,
    color: '#FFFFFF',
    textAlign: 'center',
    lineHeight: 24,
    fontWeight: '600',
  },
  decorationContainer: {
    padding: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  messagesContainer: {
    flex: 1,
  },
  inputWrapper: {
    backgroundColor: '#FFFFFF',
  }
});

export default function ChatScreen({ route }: ChatScreenProps) {
  const { place = 'InContext' } = route.params ?? {};
  const insets = useSafeAreaInsets();
  const theme = shopDecorations[place] || shopDecorations.InContext;
  const flatListRef = useRef<FlatList>(null);
  const [, setKeyboardVisible] = useState(false);
  
  React.useEffect(() => {
    debugEnvironment();
    checkPythonServerHealth().then(isHealthy => {
      console.debug('Python AI server health:', isHealthy);
    });
  }, []);

  const [messages, setMessages] = useState<Message[]>([
    createInitialMessage(theme.welcomeMessage || `Willkommen bei ${place}!`),
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const keyboardDidShow = () => {
      setKeyboardVisible(true);
    };

    const keyboardDidHide = () => {
      setKeyboardVisible(false);
    };

    const showSubscription = Keyboard.addListener('keyboardDidShow', keyboardDidShow);
    const hideSubscription = Keyboard.addListener('keyboardDidHide', keyboardDidHide);

    return () => {
      showSubscription.remove();
      hideSubscription.remove();
    };
  }, []);

  const sendMessage = async (): Promise<void> => {
    if (!input.trim()) return;

    const userMessage: Message = { role: 'user', text: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setLoading(true);

    try {
      const chatMessages = [...messages, userMessage].map(msg => ({
        role: msg.role,
        content: msg.text,
      }));

      console.log('Sending message to server:', chatMessages);
      const botReply = await answerGeneration(chatMessages);
      console.log('Received reply:', botReply);

      setMessages(prev => [...prev, { role: 'assistant', text: botReply }]);
    } catch (err) {
      console.error('API error:', err);
      setMessages(prev => [
        ...prev,
        {
          role: 'assistant',
          text: 'Entschuldigung, es gab einen Fehler. Bitte versuchen Sie es erneut.',
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={[
      styles.container, 
      { 
        backgroundColor: theme.backgroundColor,
        paddingTop: insets.top
      }
    ]}>
      <View style={{ flex: 1 }}>
        <KeyboardAvoidingView 
          style={{ flex: 1 }}
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          keyboardVerticalOffset={Platform.OS === 'ios' ? 64 : 0}
        >
          <View style={styles.content}>
            {/* Title Box with Emojis */}
            <View style={styles.titleContainer}>
              <View style={[styles.titleBox, { backgroundColor: theme.accentColor }]}>
                <View style={styles.titleContent}>
                  <Text style={styles.decorationText}>{theme.topDecoration}</Text>
                  <Text style={styles.shopName}>
                    Hallo! Willkommen im {germanNames[place] || place}!{'\n'}
                    Suchen Sie besondere {place === 'Flower Shop' ? 'Blumen' : 'Produkte'}?{'\n'}
                    Wie kann ich helfen?
                  </Text>
                </View>
              </View>
            </View>

            <View style={styles.messagesContainer}>
              <FlatList
                ref={flatListRef}
                data={messages}
                keyExtractor={(_: Message, index: number) => index.toString()}
                renderItem={({ item }: { item: Message }) => (
                  <ChatMessage 
                    message={item} 
                    style={{ 
                      backgroundColor: item.role === 'assistant' 
                        ? theme.accentColor 
                        : '#FFFFFF',
                      marginLeft: item.role === 'assistant' ? 10 : 50,
                      marginRight: item.role === 'assistant' ? 50 : 10,
                    }}
                    textStyle={{
                      color: item.role === 'assistant' ? '#FFFFFF' : '#000000'
                    }}
                  />
                )}
                contentContainerStyle={[
                  chatStyles.messagesContainer,
                  { paddingTop: 8, paddingBottom: 8 }
                ]}
                showsVerticalScrollIndicator={false}
                keyboardShouldPersistTaps="handled"
                onContentSizeChange={() => flatListRef.current?.scrollToEnd({ animated: true })}
              />
            </View>

            {/* Bottom Decoration */}
            <View style={styles.decorationContainer}>
              <Text style={styles.decorationText}>{theme.bottomDecoration}</Text>
            </View>

            <ChatInput
              value={input}
              onChangeText={setInput}
              onSend={sendMessage}
              loading={loading}
              bottomInset={insets.bottom}
              style={{
                backgroundColor: '#FFFFFF',
                borderTopColor: theme.accentColor,
                borderTopWidth: 1,
              }}
              placeholder={`Schreiben Sie eine Nachricht an ${place}...`}
            />
          </View>
        </KeyboardAvoidingView>
      </View>
    </View>
  );
}
