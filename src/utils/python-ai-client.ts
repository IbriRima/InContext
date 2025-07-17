import { getEnvVar } from '../config/env';

export interface ChatMessage {
  role: 'user' | 'assistant' | 'system';
  content: string;
}

// Get the Python server URL from environment or use default
const getPythonServerUrl = (): string => {
  const serverUrl = getEnvVar('PYTHON_AI_SERVER_URL');
  return serverUrl || 'http://localhost:8000';
};

export const answerGeneration = async (messages: ChatMessage[]): Promise<string> => {
  try {

    
    const serverUrl = getPythonServerUrl();
    const endpoint = '/chat';
    
    const response = await fetch(`${serverUrl}${endpoint}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        messages: messages,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`HTTP error! status: ${response.status}, message: ${errorText}`);
    }

    const data = await response.json();
    
    if (data.error) {
      throw new Error(data.error);
    }

    return data.response || 'No response from AI server';
  } catch (error) {
    console.error('Python AI Server error:', error);
    throw error;
  }
};




export const checkPythonServerHealth = async (): Promise<boolean> => {
  try {
    const serverUrl = getPythonServerUrl();
    const response = await fetch(`${serverUrl}/health`);
    
    if (response.ok) {
      const data = await response.json();
      console.log('Python server health check:', data);
      return true;
    }
    return false;
  } catch (error) {
    console.error('Python server health check failed:', error);
    return false;
  }
}; 