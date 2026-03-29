import { ENV } from '../config/env';

export const debugEnvironment = () => {
  console.debug('=== Environment Debug ===');
  console.debug('HUGGING_FACE_TOKEN present:', !!ENV.HUGGING_FACE_TOKEN);
  console.debug('HUGGING_FACE_TOKEN length:', ENV.HUGGING_FACE_TOKEN.length);
  console.debug('HUGGING_FACE_TOKEN starts with "hf_":', ENV.HUGGING_FACE_TOKEN.startsWith('hf_'));
  console.debug('========================');
}; 