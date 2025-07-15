import { InferenceClient } from '@huggingface/inference';
import { getEnvVar } from '../config/env';

// Create the inference client with the token
const client = new InferenceClient(getEnvVar('HUGGING_FACE_TOKEN'));

export interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}

export const callHuggingFaceChat = async (messages: ChatMessage[]): Promise<string> => {
  try {
    console.log('Using Hugging Face Inference Client');
    console.log('Messages:', messages.length);
    
    const chatCompletion = await client.chatCompletion({
      provider: "together",
      model: "deepseek-ai/DeepSeek-R1-0528",
      messages: messages as any, // Type assertion for compatibility
    });

    const response = chatCompletion.choices[0]?.message?.content;
    
    if (!response) {
      throw new Error('No response from model');
    }

    return response;
  } catch (error) {
    console.error('Hugging Face Inference Client error:', error);
    throw error;
  }
};

export const callHuggingFaceConversational = async (messages: ChatMessage[]): Promise<string> => {
  try {
    console.log('Using Hugging Face Conversational API');
    console.log('Messages:', messages.length);
    
    // Format messages for conversational API
    const userMessages = messages.filter(m => m.role === 'user').map(m => m.content);
    const assistantMessages = messages.filter(m => m.role === 'assistant').map(m => m.content);
    
    const response = await fetch('https://api-inference.huggingface.co/models/mistralai/Mistral-7B-Instruct-v0.2', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${getEnvVar('HUGGING_FACE_TOKEN')}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        inputs: {
          past_user_inputs: userMessages.slice(0, -1),
          generated_responses: assistantMessages,
          text: userMessages[userMessages.length - 1] || '',
        },
      }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data.generated_text || 'No response generated';
  } catch (error) {
    console.error('Hugging Face Conversational error:', error);
    throw error;
  }
}; 