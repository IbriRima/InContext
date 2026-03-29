export type Message = {
  role: 'user' | 'assistant';
  text: string;
  translation?: string;
};

export type ChatState = {
  messages: Message[];
  input: string;
  loading: boolean;
}; 