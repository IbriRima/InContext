import { ENV } from '../config/env';

export const debugEnvironment = () => {
  console.log('=== Environment Debug ===');
  console.log('HUGGING_FACE_TOKEN present:', !!ENV.HUGGING_FACE_TOKEN);
  console.log('HUGGING_FACE_TOKEN length:', ENV.HUGGING_FACE_TOKEN.length);
  console.log('HUGGING_FACE_TOKEN starts with "hf_":', ENV.HUGGING_FACE_TOKEN.startsWith('hf_'));
  console.log('========================');
}; 