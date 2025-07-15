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
    paddingBottom: 12,
    flexGrow: 1,
  },
  loadingIndicator: {
    marginBottom: 8,
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
    marginTop: 12,
    borderTopWidth: 1,
    borderColor: '#ccc',
    paddingTop: 8,
    paddingHorizontal: 16,
    backgroundColor: '#f7f9ff',
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