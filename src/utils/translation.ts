import translate from 'google-translate-api-x';

interface TranslationResult {
  original: string;
  translation: string;
  success: boolean;
}

/**
 * Translate a German word to English
 * @param word - The German word to translate
 * @returns Promise<TranslationResult>
 */
export async function translateWord(word: string): Promise<TranslationResult> {
  try {
    // Clean the word (remove punctuation, etc.)
    const cleanWord = word.replace(/[.,!?;:()]/g, '').trim().toLowerCase();
    
    if (!cleanWord || cleanWord.length < 2) {
      return {
        original: word,
        translation: word,
        success: false
      };
    }

    const result = await translate(cleanWord, { from: 'de', to: 'en' });
    
    return {
      original: word,
      translation: result.text,
      success: true
    };
  } catch (error) {
    console.error('Translation error:', error);
    return {
      original: word,
      translation: word,
      success: false
    };
  }
}

/**
 * Translate a German sentence to English
 * @param sentence - The German sentence to translate
 * @returns Promise<TranslationResult>
 */
export async function translateSentence(sentence: string): Promise<TranslationResult> {
  try {
    const cleanSentence = sentence.trim();
    
    if (!cleanSentence || cleanSentence.length < 3) {
      return {
        original: sentence,
        translation: sentence,
        success: false
      };
    }

    const result = await translate(cleanSentence, { from: 'de', to: 'en' });
    
    return {
      original: sentence,
      translation: result.text,
      success: true
    };
  } catch (error) {
    console.error('Sentence translation error:', error);
    return {
      original: sentence,
      translation: sentence,
      success: false
    };
  }
}

/**
 * Translate multiple words at once
 * @param words - Array of German words to translate
 * @returns Promise<TranslationResult[]>
 */
export async function translateWords(words: string[]): Promise<TranslationResult[]> {
  const results: TranslationResult[] = [];
  
  for (const word of words) {
    const result = await translateWord(word);
    results.push(result);
  }
  
  return results;
} 