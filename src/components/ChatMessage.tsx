import React from 'react';
import { View, Text, StyleProp, ViewStyle, TextStyle } from 'react-native';
import type { Message } from '../types/chat';
import { chatMessageStyles } from '../styles/chat';
import { chatStyles } from '../styles/chat'; 

interface ChatMessageProps {
  message: Message;
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
}

export const ChatMessage: React.FC<ChatMessageProps> = ({ 
  message, 
  style, 
  textStyle 
}) => {
  const isUser = message.role === 'user';

  return (
    <View style={[{ marginBottom: 4 }, isUser ? { alignSelf: 'flex-end' } : { alignSelf: 'flex-start' }]}>
      <View style={[
        isUser ? chatMessageStyles.userBubble : chatMessageStyles.botBubble,
        style
      ]}>
        <Text style={[
          chatMessageStyles.messageText,
          textStyle
        ]}>{message.text}</Text>
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
