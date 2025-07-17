import React from 'react';
import { View, Text } from 'react-native';
import type { Message } from '../types/chat';
import { chatMessageStyles } from '../styles/chat';
import { chatStyles } from '../styles/chat'; 

interface ChatMessageProps {
  message: Message;
}

export const ChatMessage: React.FC<ChatMessageProps> = ({ message }) => {
  const isUser = message.role === 'user';

  return (
    <View style={{ marginBottom: 4 }}>
      <View style={isUser ? chatMessageStyles.userBubble : chatMessageStyles.botBubble}>
        <Text style={chatMessageStyles.messageText}>{message.text}</Text>
      </View>

      {message.translation && (
        <View
          style={[
            chatStyles.translationBubble,
            { alignSelf: isUser ? 'flex-end' : 'flex-start' },
          ]}
        >
          <Text style={chatStyles.translationText}>{message.translation}</Text>
        </View>
      )}
    </View>
  );
};
