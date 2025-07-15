import { getEnvVar } from '../config/env';

export const API_ENDPOINTS = {
  CHAT: 'https://api-inference.huggingface.co/models/mistralai/Mistral-7B-Instruct-v0.2',
} as const;

export const API_HEADERS = {
  'Content-Type': 'application/json',
} as const;

export const DEFAULT_PLACE = 'InContext';

// Hugging Face API Configuration
export const HF_CONFIG = {
  MODEL_URL: 'https://api-inference.huggingface.co/models/mistralai/Mistral-7B-Instruct-v0.2',
  TOKEN: getEnvVar('HUGGING_FACE_TOKEN'),
  PARAMETERS: {
    max_new_tokens: 150,
    temperature: 0.7,
    do_sample: true,
  },
} as const; 