import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  ActivityIndicator,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import type { StoryScreenProps } from '../types/navigation';


type Props = StoryScreenProps;

interface StoryContent {
  title: string;
  content: string;
}

interface StoryContentMap {
  [key: string]: StoryContent;
}

const storyContent: StoryContentMap = {
    adventure: {
      title: '🌄 Das Bergabenteuer',
      content: `Deine Reise begann mit einer einfachen Karte und einem Herzen voller Mut. Die Einheimischen hatten dich vor den geheimnisvollen Geräuschen gewarnt, die nachts durch die Täler hallten, doch nichts konnte dich davon abhalten, herauszufinden, was in diesen heiligen Bergen verborgen lag.
  
  Je höher du stiegst, desto dünner wurde die Luft und desto gefährlicher der Pfad. Seltsame Markierungen auf den Felsen schienen von jenen zu erzählen, die vor dir gekommen waren. Jeder Schritt brachte dich der Wahrheit näher, die dich hierher geführt hatte.
  
  Die Sonne ging gerade unter, als du den uralten Tempel erreichtest, der in die Bergflanke gehauen war. Seine verwitterten Steinmauern bargen Geheimnisse, die seit Jahrhunderten darauf warteten, entdeckt zu werden. In dem Moment, in dem du eintratst, wusstest du, dass dein Leben nie wieder dasselbe sein würde.
  
  Welche Geheimnisse erwarten dich im Herzen des Berges?`,
    },
  
    mystery: {
      title: '🔍 Die Verborgene Bibliothek',
      content: `Das alte Universitätsgebäude hatte schon immer eine geheimnisvolle Aura, doch heute war es anders. Als du durch den großen Eingang tratst, fiel dir etwas Merkwürdiges auf – eine Tür, die gestern noch nicht da gewesen war.
  
  Die Bibliothek war still und verlassen, nur das leise Rascheln von Papier und das Knarren der alten Holzdielen unterbrach die Stille. Du folgtest dem Pfad zwischen den hohen Bücherregalen, die bis zur Decke reichten und mit Tausenden von Büchern gefüllt waren.
  
  Plötzlich hieltst du inne. Ein Buch hatte sich von selbst geöffnet, und seine Seiten flatterten im unsichtbaren Wind. Als du näher tratst, sahst du, dass es ein Tagebuch war, geschrieben in einer Handschrift, die du nicht kanntest.
  
  Die Einträge erzählten von einem verborgenen Raum, der nur in bestimmten Nächten zugänglich war. Der Autor hatte Hinweise hinterlassen, die zu einem Schatz führten, der seit Jahrhunderten versteckt war.
  
  Du spürtest, dass du kurz davor warst, ein Geheimnis zu entdecken, das die Welt verändern würde. Doch die Zeit lief davon, und du wusstest, dass du nicht der Einzige warst, der nach diesem Schatz suchte.`,
    },
  
    fantasy: {
      title: '🐉 Der Schatz des Drachen',
      content: `Das Abenteuer hatte mit einer einfachen Karte begonnen, die du in den Ruinen eines alten Zaubererturms gefunden hattest. Das Pergament war brüchig und vergilbt, doch die Anweisungen waren klar – folge dem Pfad der untergehenden Sonne, bis du den Berg mit den zwei Gipfeln erreichst.
  
  Der Höhleneingang war mit Runen markiert, die in einem sanften blauen Licht leuchteten. Als du eintratst, wurde die Luft wärmer, und du hörtest das entfernte Tropfen von Wasser, das von Kristallformationen fiel.
  
  Je tiefer du vordrangst, desto prachtvoller wurde die Höhle. Stalaktiten und Stalagmiten funkelten wie Diamanten, und die Wände schienen von einem inneren Licht zu pulsieren. Du spürtest, dass du deinem Ziel näherkamst.
  
  Schließlich erreichtest du das Herz der Höhle – eine gewaltige Kammer, gefüllt mit Schätzen jenseits aller Vorstellungskraft. Goldmünzen, kostbare Edelsteine und magische Artefakte lagen überall verstreut. Doch in der Mitte, auf einem Sockel aus purem Kristall, lag der wertvollste Besitz des Drachen.
  
  Der Drache selbst war nirgends zu sehen, doch du konntest seine Präsenz spüren, wie er beobachtete und lauerte. Der Schatz war zum Greifen nah – aber um welchen Preis?`,
    },
  
    scifi: {
      title: '🚀 Weltraumforscher',
      content: `Wir schreiben das Jahr 2157, und du bist der erste Mensch, der den geheimnisvollen Planeten XR-847 betritt. Dein Raumschiff, die Stellar Pioneer, hatte ungewöhnliche Energiesignaturen auf der Oberfläche des Planeten festgestellt.
  
  Als du die Luftschleuse öffnetest, wurde dein Helm von einem seltsamen violetten Licht erfüllt. Die Atmosphäre war atembar, doch sie hatte einen metallischen Geschmack, der dich an Kupfer erinnerte.
  
  Die Landschaft war atemberaubend – kristalline Formationen, die in allen Regenbogenfarben schimmerten, erstreckten sich bis zum Horizont. Die Schwerkraft war geringer als auf der Erde, und du konntest mühelos große Sprünge machen.
  
  Plötzlich entdecktest du Spuren im violetten Sand – sie waren definitiv nicht von Menschen gemacht. Die Abdrücke waren dreifach und führten zu einer Höhle, die von einem pulsierenden Licht erfüllt war.
  
  Du wusstest, dass du kurz davor warst, die erste Begegnung der Menschheit mit außerirdischem Leben zu erleben. Doch was würdest du tun, wenn die Bewohner dieses Planeten nicht friedlich waren?`,
    },
  
    romance: {
      title: '💕 Liebe in Paris',
      content: `Du warst nach Paris gekommen, um Inspiration für deinen nächsten Roman zu finden, doch das Schicksal hatte andere Pläne. Als du in ein kleines Café flüchtetest, um dem Regen zu entkommen, standest du plötzlich jemandem gegenüber, der dein Leben für immer verändern würde.
  
  Das Café war gemütlich und warm, erfüllt vom Duft frisch gebackener Croissants und starken Kaffees. Gemälde lokaler Künstler schmückten die Wände, und leiser Jazz spielte im Hintergrund. Es war der perfekte Ort für eine romantische Begegnung.
  
  Sie saß am Fenster, vertieft in ein Buch, völlig unbeeindruckt von der Welt um sie herum. Ihr dunkles Haar fiel in weichen Wellen über ihre Schultern, und das Licht der Straßenlampen bildete einen Halo um sie.
  
  Als sie aufblickte und dich anlächelte, schien die Zeit stillzustehen. In diesem Moment wusstest du, dass dein Leben nie wieder dasselbe sein würde. Die Stadt Paris hatte erneut ihre Magie gewirkt und zwei Seelen zusammengeführt, die füreinander bestimmt waren.
  
  Welche Abenteuer erwarten euch in der romantischsten Stadt der Welt?`,
    },
  
    horror: {
      title: '👻 Das Verfluchte Herrenhaus',
      content: `Das alte viktorianische Herrenhaus erhob sich vor dir, seine dunklen Fenster starrten wie leere Augen in die Nacht. Du hattest diesen Ort von deinem Großonkel geerbt, aber die Einheimischen hatten dich vor den seltsamen Ereignissen gewarnt, die sich innerhalb seiner Mauern abspielten.
  
  Als du durch die Vordertür tratst, wurde die Luft schwer vom Geruch alten Holzes und etwas anderem – etwas, das du nicht genau identifizieren konntest. Die Dielen knarrten unter deinen Füßen, und du hörtest den Wind durch den Schornstein heulen.
  
  Das Herrenhaus war voller antiker Möbel und Familienporträts, deren Blicke dir zu folgen schienen. Im Salon fandest du das Tagebuch deines Großonkels, gefüllt mit wirren Einträgen über Stimmen in der Nacht und Schatten, die sich von selbst bewegten.
  
  Je tiefer du das Haus erkundetest, desto mehr fiel dir auf, was sich nicht erklären ließ. Türen öffneten und schlossen sich von selbst, und Schritte hallten durch leere Flure. Die Temperatur fiel plötzlich ab, und du spürtest Blicke aus der Dunkelheit.
  
  Auf dem Dachboden entdecktest du einen Raum, der seit Jahrzehnten versiegelt war. Die Tür war mit seltsamen Symbolen bedeckt, und die Luft war schwer von einer bedrückenden Energie. Etwas wartete dort drinnen auf dich, etwas, das schon sehr lange gewartet hatte.
  
  Welche Schrecken lauern im Schatten deiner Familiengeschichte?`,
    },
  };


function renderStoryWithClickableWords(text: string, onTranslationRequest: (text: string) => void, pressedElement: string | null, setPressedElement: (element: string | null) => void) {
  const words = text.split(/(\s+)/);
  
  return (
    <Text style={styles.storyText}>
      {words.map((word, index) => {
        const isWhitespace = /^\s+$/.test(word);
        
        if (isWhitespace) {
          return <Text key={index}>{word}</Text>;
        }
        
        const isPressed = pressedElement === word;
        
        return (
          <TouchableOpacity
            key={index}
            onPress={() => onTranslationRequest(word)}
            onPressIn={() => setPressedElement(word)}
            onPressOut={() => setPressedElement(null)}
            style={word.trim().length > 1 ? styles.clickableWord : undefined}
          >
            <Text style={[
              styles.storyText, 
              word.trim().length > 1 ? (isPressed ? styles.pressedText : styles.normalText) : styles.normalText
            ]}>
              {word}
            </Text>
          </TouchableOpacity>
        );
      })}
    </Text>
  );
}

function renderStoryWithClickableSentences(text: string, onTranslationRequest: (text: string) => void, pressedElement: string | null, setPressedElement: (element: string | null) => void) {
  const sentences = text.split(/(?<=[.!?])\s+/);
  
  return (
    <Text style={styles.storyText}>
      {sentences.map((sentence, index) => {
        if (!sentence.trim()) {
          return null;
        }
        
        const isCompleteSentence = /[.!?]$/.test(sentence.trim());
        
        if (isCompleteSentence && sentence.trim().length > 10) {
          const isPressed = pressedElement === sentence;
          
          return (
            <TouchableOpacity
              key={index}
              onPress={() => onTranslationRequest(sentence)}
              onPressIn={() => setPressedElement(sentence)}
              onPressOut={() => setPressedElement(null)}
              style={styles.clickableSentence}
            >
              <Text style={[styles.storyText, isPressed ? styles.pressedText : styles.normalText]}>
                {sentence}
              </Text>
            </TouchableOpacity>
          );
        } else {
          return <Text key={index}>{sentence}</Text>;
        }
      })}
    </Text>
  );
}


export default function StoryScreen({ route, navigation }: Props) {
  const { storyId, storyContent: navStoryContent } = route.params;
  const [currentStory, setCurrentStory] = useState<StoryContent | null>(null);
  const [translationMode, setTranslationMode] = useState<'words' | 'sentences'>('words');
  const [showTranslationModal, setShowTranslationModal] = useState(false);
  const [translationData, setTranslationData] = useState<{
    original: string;
    translation: string;
    isLoading: boolean;
  }>({ original: '', translation: '', isLoading: false });
  const [pressedElement, setPressedElement] = useState<string | null>(null);
  const insets = useSafeAreaInsets();

  useEffect(() => {
    if (navStoryContent) {
      setCurrentStory(navStoryContent);
    } else {
      const story = storyContent[storyId as keyof typeof storyContent];
      if (story) {
        setCurrentStory(story);
      }
    }
  }, [storyId, navStoryContent]);

  const handleTranslationRequest = async (text: string, isSentence: boolean = false) => {
    setTranslationData({ original: text, translation: '', isLoading: true });
    setShowTranslationModal(true);
    
    try {
      const result = isSentence 
        ? await import('../utils/translation').then(m => m.translateSentence(text))
        : await import('../utils/translation').then(m => m.translateWord(text));
      
      if (result.success) {
        setTranslationData({ 
          original: text, 
          translation: result.translation, 
          isLoading: false 
        });
      } else {
        setTranslationData({ 
          original: text, 
          translation: 'Translation not available', 
          isLoading: false 
        });
      }
    } catch (error) {
      console.error('Translation error:', error);
      setTranslationData({ 
        original: text, 
        translation: 'Translation failed', 
        isLoading: false 
      });
    }
  };

  if (!currentStory) {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.loadingText}>Loading story...</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.backButtonText}>← Back</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{currentStory.title}</Text>
      </View>

      <View style={styles.translationModeContainer}>
        <TouchableOpacity
          style={[
            styles.modeButton,
            translationMode === 'words' && styles.activeModeButton
          ]}
          onPress={() => setTranslationMode('words')}
        >
          <Text style={[
            styles.modeButtonText,
            translationMode === 'words' && styles.activeModeButtonText
          ]}>
            Words
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.modeButton,
            translationMode === 'sentences' && styles.activeModeButton
          ]}
          onPress={() => setTranslationMode('sentences')}
        >
          <Text style={[
            styles.modeButtonText,
            translationMode === 'sentences' && styles.activeModeButtonText
          ]}>
            Sentences
          </Text>
        </TouchableOpacity>
      </View>

      <View style={[styles.contentContainer, { marginBottom: insets.bottom + 20 }]}>
        <ScrollView 
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          bounces={true}
          alwaysBounceVertical={false}
        >
          <View style={styles.storyTextContainer}>
            {translationMode === 'words' 
              ? renderStoryWithClickableWords(currentStory.content, (text) => handleTranslationRequest(text, false), pressedElement, setPressedElement)
              : renderStoryWithClickableSentences(currentStory.content, (text) => handleTranslationRequest(text, true), pressedElement, setPressedElement)
            }
          </View>
        </ScrollView>
      </View>

      {/* Translation Modal */}
      {showTranslationModal && (
        <View style={styles.modalOverlay}>
          <TouchableOpacity
            style={styles.modalOverlay}
            activeOpacity={1}
            onPress={() => setShowTranslationModal(false)}
          >
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>
                {translationMode === 'words' ? 'Word Translation' : 'Sentence Translation'}
              </Text>
              <Text style={styles.originalText}>{translationData.original}</Text>
              
              {translationData.isLoading ? (
                <View style={styles.loadingContainer}>
                  <ActivityIndicator size="small" color="#007bff" />
                  <Text style={styles.loadingText}>Translating...</Text>
                </View>
              ) : (
                <Text style={styles.translationText}>{translationData.translation}</Text>
              )}
              
              <TouchableOpacity
                style={styles.closeButton}
                onPress={() => setShowTranslationModal(false)}
              >
                <Text style={styles.closeButtonText}>Close</Text>
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: '#e9ecef',
  },
  backButton: {
    padding: 8,
  },
  backButtonText: {
    fontSize: 16,
    color: '#007bff',
    fontWeight: '600',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 16,
    color: '#2c3e50',
    flex: 1,
  },
  translationModeContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: '#e9ecef',
  },
  modeButton: {
    flex: 1,
    paddingVertical: 8,
    paddingHorizontal: 16,
    marginHorizontal: 4,
    borderRadius: 8,
    backgroundColor: '#f8f9fa',
    alignItems: 'center',
  },
  activeModeButton: {
    backgroundColor: '#007bff',
  },
  modeButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#6c757d',
  },
  activeModeButtonText: {
    color: '#ffffff',
  },
  contentContainer: {
    flex: 1,
    marginHorizontal: 16,
    marginTop: 8,
    backgroundColor: '#ffffff',
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  scrollView: {
    flex: 1,
    padding: 20,
  },
  scrollContent: {
    paddingBottom: 20,
  },
  storyTextContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  storyText: {
    fontSize: 16,
    lineHeight: 24,
    color: '#2c3e50',
  },
  loadingText: {
    fontSize: 16,
    textAlign: 'center',
    marginTop: 50,
    color: '#7f8c8d',
  },
  clickableWord: {
    paddingHorizontal: 2,
    paddingVertical: 1,
  },
  clickableText: {
    textDecorationLine: 'underline',
    textDecorationStyle: 'solid',
    textDecorationColor: '#007bff',
  },
  normalText: {
    textDecorationLine: 'none',
  },
  clickableSentence: {
    paddingVertical: 2,
  },
  pressedText: {
    backgroundColor: '#e3f2fd', 
    color: '#1976d2',
    paddingHorizontal: 2,
    paddingVertical: 1,
    borderRadius: 4,
  },
  modalOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
  },
  modalContent: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 20,
    width: '80%',
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#2c3e50',
  },
  originalText: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 15,
    color: '#34495e',
    textAlign: 'center',
  },
  loadingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },

  translationText: {
    fontSize: 16,
    lineHeight: 24,
    color: '#2c3e50',
    marginTop: 15,
    textAlign: 'center',
  },
  closeButton: {
    marginTop: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: '#007bff',
    borderRadius: 8,
  },
  closeButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
});
