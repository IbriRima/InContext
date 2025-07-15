import React from 'react';
import { View, TextInput, Button } from 'react-native';
import { chatInputStyles } from '../styles/chat';

interface ChatInputProps {
  value: string;
  onChangeText: (text: string) => void;
  onSend: () => void;
  loading: boolean;
  placeholder?: string;
  bottomInset?: number;
}

export const ChatInput: React.FC<ChatInputProps> = ({
  value,
  onChangeText,
  onSend,
  loading,
  placeholder = 'Type your message...',
  bottomInset = 0,
}) => {
  return (
    <View style={[chatInputStyles.container, { paddingBottom: bottomInset + 8 }]}>
      <TextInput
        style={chatInputStyles.input}
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
        onSubmitEditing={onSend}
      />
      <Button title="Send" onPress={onSend} disabled={loading} />
    </View>
  );
}; 