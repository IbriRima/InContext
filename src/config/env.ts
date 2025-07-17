export const ENV = {
  HUGGING_FACE_TOKEN: process.env.HUGGING_FACE_TOKEN || 'YOUR_HUGGING_FACE_TOKEN_HERE',
  PYTHON_AI_SERVER_URL: process.env.EXPO_PUBLIC_PYTHON_AI_SERVER_URL || 'http://192.168.1.11:8000',
} as const;

export const getEnvVar = (key: keyof typeof ENV): string => {
  return ENV[key];
}; 