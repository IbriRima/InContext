import React from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleProp, ViewStyle, Platform } from 'react-native';
import { chatInputStyles } from '../styles/chat';

interface ChatInputProps {
  value: string;
  onChangeText: (text: string) => void;
  onSend: () => void;
  loading: boolean;
  placeholder?: string;
  bottomInset?: number;
  style?: StyleProp<ViewStyle>;
}

export const ChatInput: React.FC<ChatInputProps> = ({
  value,
  onChangeText,
  onSend,
  loading,
  placeholder = 'Schreiben Sie eine Nachricht...',
  bottomInset = 0,
  style,
}) => {
  const finalBottomPadding = Platform.select({
    ios: Math.max(bottomInset, 20),
    android: 20
  });

  return (
    <View style={[
      chatInputStyles.container,
      {
        paddingBottom: finalBottomPadding
      },
      style
    ]}>
      <TextInput
        style={chatInputStyles.input}
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
        onSubmitEditing={onSend}
        multiline
        maxLength={1000}
      />
      <TouchableOpacity 
        style={[
          chatInputStyles.sendButton,
          { opacity: loading || !value.trim() ? 0.5 : 1 }
        ]} 
        onPress={onSend}
        disabled={loading || !value.trim()}
      >
        <Text style={chatInputStyles.sendButtonText}>➤</Text>
      </TouchableOpacity>
    </View>
  );
}; 