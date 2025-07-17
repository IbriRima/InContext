import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import type { StoryScreenProps } from '../types/navigation';

type Props = StoryScreenProps;

/* ------------------------------------------------------------------ */
/* 📖 Story Content                                                    */
/* ------------------------------------------------------------------ */
const storyContent = {
    adventure: {
      title: '🌄 Das Bergabenteuer',
      content: `Die frische Bergluft füllte deine Lungen, als du am Fuße der gewaltigen Gipfel standest. Der uralte Steinpfad schlängelte sich nach oben und verschwand in den nebligen Wolken darüber.
  
  Deine Reise begann mit einer einfachen Karte und einem Herzen voller Mut. Die Einheimischen hatten dich vor den geheimnisvollen Geräuschen gewarnt, die nachts durch die Täler hallten, doch nichts konnte dich davon abhalten, herauszufinden, was in diesen heiligen Bergen verborgen lag.
  
  Je höher du stiegst, desto dünner wurde die Luft und desto gefährlicher der Pfad. Seltsame Markierungen auf den Felsen schienen von jenen zu erzählen, die vor dir gekommen waren. Jeder Schritt brachte dich der Wahrheit näher, die dich hierher geführt hatte.
  
  Die Sonne ging gerade unter, als du den uralten Tempel erreichtest, der in die Bergflanke gehauen war. Seine verwitterten Steinmauern bargen Geheimnisse, die seit Jahrhunderten darauf warteten, entdeckt zu werden. In dem Moment, in dem du eintratst, wusstest du, dass dein Leben nie wieder dasselbe sein würde.
  
  Welche Geheimnisse erwarten dich im Herzen des Berges?`,
    },
  
    mystery: {
      title: '🔍 Die Verborgene Bibliothek',
      content: `Das alte Universitätsgebäude hatte schon immer eine geheimnisvolle Aura, doch heute war es anders. Als du durch den großen Eingang tratst, fiel dir etwas Merkwürdiges auf – eine Tür, die gestern noch nicht da gewesen war.
  
  Die Tür war klein und unscheinbar, versteckt hinter einem staubigen Bücherregal. Ihr Messinggriff glänzte, als wäre er erst kürzlich poliert worden, obwohl seit Monaten niemand diesen Teil der Bibliothek betreten hatte.
  
  Deine Neugier siegte, und du griffst nach dem Griff. Zu deiner Überraschung drehte er sich mühelos und gab eine schmale Treppe frei, die hinab in die Dunkelheit führte. Die Luft war kühl und roch nach altem Pergament und Leder.
  
  Als du die Treppe hinabstiegst, befandest du dich in einer Kammer, wie du sie noch nie gesehen hattest. Bücher säumten die Wände vom Boden bis zur Decke, ihre Rücken leuchteten in einem unirdischen Licht. Einige Titel waren in Sprachen geschrieben, die du nicht erkennen konntest.
  
  In der Mitte des Raumes stand ein massiver Holztisch, bedeckt mit uralten Manuskripten und geheimnisvollen Artefakten. Ein Buch erregte besonders deine Aufmerksamkeit – es schien vor Energie zu pulsieren, als wäre es lebendig.
  
  Der Bibliothekar hatte diesen Ort nie erwähnt, und du warst sicher, dass er auf keinem Grundriss des Gebäudes verzeichnet war. Welche Geheimnisse birgt diese verborgene Bibliothek?`,
    },
  
    fantasy: {
      title: '🐉 Der Schatz des Drachen',
      content: `Die uralten Schriftrollen erzählten von einem Drachenschatz, der tief in den Kristallhöhlen verborgen und von einer Magie geschützt war, die älter war als das Königreich selbst. Als du den Höhleneingang erreichtest, spürtest du die Kraft, die aus dem Inneren strömte.
  
  Dein Abenteuer hatte mit einer einfachen Karte begonnen, die du in den Ruinen eines alten Zaubererturms gefunden hattest. Das Pergament war brüchig und vergilbt, doch die Anweisungen waren klar – folge dem Pfad der untergehenden Sonne, bis du den Berg mit den zwei Gipfeln erreichst.
  
  Der Höhleneingang war mit Runen markiert, die in einem sanften blauen Licht leuchteten. Als du eintratst, wurde die Luft wärmer, und du hörtest das entfernte Tropfen von Wasser, das von Kristallformationen fiel.
  
  Je tiefer du vordrangst, desto prachtvoller wurde die Höhle. Stalaktiten und Stalagmiten funkelten wie Diamanten, und die Wände schienen von einem inneren Licht zu pulsieren. Du spürtest, dass du deinem Ziel näherkamst.
  
  Schließlich erreichtest du das Herz der Höhle – eine gewaltige Kammer, gefüllt mit Schätzen jenseits aller Vorstellungskraft. Goldmünzen, kostbare Edelsteine und magische Artefakte lagen überall verstreut. Doch in der Mitte, auf einem Sockel aus purem Kristall, lag der wertvollste Besitz des Drachen.
  
  Der Drache selbst war nirgends zu sehen, doch du konntest seine Präsenz spüren, wie er beobachtete und lauerte. Der Schatz war zum Greifen nah – aber um welchen Preis?`,
    },
  
    scifi: {
      title: '🚀 Weltraumforscher',
      content: `Wir schreiben das Jahr 2157, und du bist der erste Mensch, der den geheimnisvollen Planeten XR-847 betritt. Dein Raumschiff, die Stellar Pioneer, hatte ungewöhnliche Energiesignaturen auf der Oberfläche des Planeten festgestellt.
  
  Als du aus deiner Landekapsel tratst, erstreckte sich die fremdartige Landschaft in alle Richtungen. Der Himmel war ein tiefes Violett, und zwei Monde hingen niedrig am Horizont. Die Luft war atembar, trug jedoch einen süßen, ungewohnten Duft.
  
  Deine Mission war einfach: Untersuche die Energiequelle und bestimme, ob der Planet für eine menschliche Kolonie geeignet ist. Doch schon zu Beginn deiner Erkundung wurde dir klar, dass XR-847 Geheimnisse birgt, die das Verständnis der Menschheit vom Universum verändern würden.
  
  Die Energiesignaturen führten dich zu einer gewaltigen Struktur, die halb Gebäude, halb lebender Organismus zu sein schien. Ihre Wände pulsierten vor Licht, und seltsame Symbole bedeckten jede Fläche. Als du dich näherstest, schien die Struktur deine Präsenz zu erkennen.
  
  Eine holografische Projektion erschien vor dir und zeigte Bilder anderer Welten, anderer Zivilisationen. Die Botschaft war deutlich – du warst nicht der Erste, der diesen Ort entdeckte, und du würdest nicht der Letzte sein.
  
  Welches uralte Wissen erwartet dich in den Tiefen dieser fremden Struktur?`,
    },
  
    romance: {
      title: '💕 Liebe in Paris',
      content: `Leiser Regen fiel auf die Kopfsteinpflasterstraßen von Paris, während du dich durch die engen Gassen von Montmartre beeiltest. Die Stadt der Liebe hatte schon immer einen besonderen Platz in deinem Herzen, doch heute fühlte es sich anders an.
  
  Du warst nach Paris gekommen, um Inspiration für deinen nächsten Roman zu finden, doch das Schicksal hatte andere Pläne. Als du in ein kleines Café flüchtetest, um dem Regen zu entkommen, standest du plötzlich jemandem gegenüber, der dein Leben für immer verändern würde.
  
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
  
/* ------------------------------------------------------------------ */
/* 🚀 Component                                                       */
/* ------------------------------------------------------------------ */
export default function StoryScreen({ route, navigation }: Props) {
  const { storyId, storyTitle } = route.params;
  const [currentStory, setCurrentStory] = useState<any>(null);
  const insets = useSafeAreaInsets();

  useEffect(() => {
    const story = storyContent[storyId as keyof typeof storyContent];
    if (story) {
      setCurrentStory(story);
    }
  }, [storyId]);

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

      <View style={[styles.contentContainer, { marginBottom: insets.bottom + 20 }]}>
        <ScrollView 
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={true}
          bounces={true}
          alwaysBounceVertical={false}
        >
          <Text style={styles.storyText}>{currentStory.content}</Text>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

/* ------------------------------------------------------------------ */
/* 🎨 Styles                                                          */
/* ------------------------------------------------------------------ */
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
  storyText: {
    fontSize: 16,
    lineHeight: 24,
    color: '#2c3e50',
    textAlign: 'justify',
  },
  loadingText: {
    fontSize: 18,
    textAlign: 'center',
    marginTop: 50,
    color: '#7f8c8d',
  },
});
