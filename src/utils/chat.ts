import type { Message } from '../types/chat';

export const buildPrompt = (history: Message[]): string => {
  const header =
    'You are a helpful bilingual language partner. Respond in German if the question is in English, and in English if the question is in German.\n\n';

  const transcript = history
    .map((m) => `${m.role === 'user' ? 'User' : 'Assistant'}: ${m.text}`)
    .join('\n');

  return `${header}${transcript}\nAssistant:`;
};

export const createInitialMessage = (place: string): Message => ({
  role: 'assistant',
  text: `Hallo! Willkommen im ${place}. Wie kann ich helfen?`,
}); 