import type { Message } from '../types/chat';
import { HF_CONFIG } from '../constants/api';
export interface HFResponse {
  generated_text?: string;
  error?: string;
}

export const callHuggingFaceAPI = async (
  messages: Message[],
  input: string
): Promise<string> => {
  try {
    const token = HF_CONFIG.TOKEN;

    console.log('Token status:', token ? 'Token present' : 'Token missing');
    console.log('Token length:', token?.length || 0);

    const response = await fetch(HF_CONFIG.MODEL_URL, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
        
      },
      body: JSON.stringify({
        inputs: {
          past_user_inputs: messages.filter((m) => m.role === 'user').map((m) => m.text),
          generated_responses: messages.filter((m) => m.role === 'assistant').map((m) => m.text),
          text: input,
        },
        parameters: {
          max_new_tokens: 150,
          temperature: 0.7,
        },
      }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data: HFResponse = await response.json();

    if (data.error) {
      throw new Error(data.error);
    }

    return data.generated_text || 'Entschuldigung, ich habe das nicht verstanden.';
  } catch (error) {
    console.error('Hugging Face API error:', error);
    throw error;
  }
};
