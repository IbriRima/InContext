import { StyleSheet } from 'react-native';

export const chatStyles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f7f9ff',
  },
  keyboardAvoidingView: {
    flex: 1,
  },
  container: {
    flex: 1,
    paddingHorizontal: 0,
    paddingTop: 16,
    backgroundColor: '#f7f9ff',
  },
  messagesContainer: {
    flexGrow: 1,
  },
  loadingIndicator: {
    marginBottom: 8,
  },
  translationBubble: {
    marginTop: 4,
    padding: 8,
    backgroundColor: '#eee',
    borderRadius: 6,
    alignSelf: 'flex-start',
  },
  translationText: {
    fontSize: 12,
    color: '#555',
    fontStyle: 'italic',
  },
  messageBubble: {
    marginVertical: 4,
    maxWidth: '80%',
  },
});

export const chatMessageStyles = StyleSheet.create({
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
  messageText: {
    fontSize: 16,
    lineHeight: 20,
  },
});

export const chatInputStyles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 8,
    paddingHorizontal: 16,
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderColor: '#E0E0E0',
  },
  input: {
    flex: 1,
    minHeight: 40,
    maxHeight: 100,
    backgroundColor: '#F5F5F5',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginRight: 8,
    fontSize: 16,
  },
  sendButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#4CAF50',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
  },
  sendButtonText: {
    color: '#FFFFFF',
    fontSize: 20,
    marginLeft: 2,
    marginTop: -2,
  },
}); 


