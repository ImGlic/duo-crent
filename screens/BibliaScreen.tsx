import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  TouchableOpacity, 
  StyleSheet, 
  ScrollView, 
  ActivityIndicator, 
  FlatList,
  SafeAreaView,
  Dimensions 
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import * as Speech from 'expo-speech';

const API_KEY = '934161ad1aabe3758871d6d919372bb2c30a75f176bfd089ae1ef3801f252d5d';

const BibliaScreen = () => {
  const windowWidth = Dimensions.get('window').width;
  const [versions, setVersions] = useState([]);
  const [loading, setLoading] = useState({
    versions: true,
    books: false,
    chapters: false,
    verses: false
  });
  const [error, setError] = useState({
    versions: null,
    books: null,
    chapters: null,
    verses: null
  });
  const [selected, setSelected] = useState({
    version: null,
    book: null,
    chapter: null
  });
  const [data, setData] = useState({
    books: [],
    chapters: [],
    verses: []
  });
  const [selectedVerseIndex, setSelectedVerseIndex] = useState(null);

  const getBackButtonText = () => {
    if (selected.chapter) return `Capítulo ${selected.chapter}`;
    if (selected.book) return selected.book.name;
    return "";
  };

  const showTitle = () => {
    if (!selected.version) return "Selecione uma versão";
    if (selected.version && !selected.book) return "Livros";
    return null;
  };

  const showNavigationHeader = () => {
    if (selected.version && !selected.book) {
      return (
        <View style={styles.header}>
          <TouchableOpacity onPress={handleBack} style={styles.simpleBackButton}>
            <Icon name="arrow-left" size={20} color="#0056D2" />
          </TouchableOpacity>
          <Text style={styles.screenTitle}>{showTitle()}</Text>
        </View>
      );
    } else if (selected.book) {
      return (
        <TouchableOpacity onPress={handleBack} style={styles.backButton}>
          <Icon name="arrow-left" size={20} color="#0056D2" />
          <Text style={styles.backText}>{getBackButtonText()}</Text>
        </TouchableOpacity>
      );
    }
    return null;
  };

  const calculateBoxSize = () => {
    const marginBetweenBoxes = 8;
    const paddingHorizontal = 16;
    const availableWidth = windowWidth - (paddingHorizontal * 2);
    const boxesPerRow = 4;
    const totalMarginSpace = (boxesPerRow - 1) * marginBetweenBoxes;
    const boxSize = (availableWidth - totalMarginSpace) / boxesPerRow;
    return Math.floor(boxSize);
  };

  const speakVerse = (verseText) => {
    Speech.speak(verseText, {
      language: 'pt',
      pitch: 1,
      rate: 0.75,
    });
  };

  const fetchVersions = async () => {
    try {
      const response = await fetch('https://pesquisarnabiblia.com.br/api-projeto/api/get_versions.php', {
        headers: { Authorization: `Bearer ${API_KEY}` }
      });
      const result = await response.json();
      setVersions(Array.isArray(result) ? result : Object.values(result));
    } catch (err) {
      setError(prev => ({ ...prev, versions: 'Erro ao buscar versões' }));
    } finally {
      setLoading(prev => ({ ...prev, versions: false }));
    }
  };

  const fetchBooks = async (versionId) => {
    setLoading(prev => ({ ...prev, books: true }));
    setError(prev => ({ ...prev, books: null }));
    try {
      const response = await fetch(`https://pesquisarnabiblia.com.br/api-projeto/api/get_books.php?version_id=${versionId}`, {
        headers: { Authorization: `Bearer ${API_KEY}` }
      });
      const result = await response.json();
      const booksArray = Array.isArray(result) ? result : Object.values(result);
      setData(prev => ({ ...prev, books: booksArray }));
    } catch (err) {
      setError(prev => ({ ...prev, books: 'Erro ao buscar livros' }));
    } finally {
      setLoading(prev => ({ ...prev, books: false }));
    }
  };

  const fetchChapters = async (versionId, bookId) => {
    setLoading(prev => ({ ...prev, chapters: true }));
    setError(prev => ({ ...prev, chapters: null }));
    try {
      const response = await fetch(`https://pesquisarnabiblia.com.br/api-projeto/api/get_chapters.php?version_id=${versionId}&book_id=${bookId}`, {
        headers: { Authorization: `Bearer ${API_KEY}` }
      });
      const result = await response.json();
      let chapters = Array.isArray(result)
        ? result.map(item => item.chapter_id || item.id || item.number)
        : Object.values(result);
      chapters = [...new Set(chapters)].filter(Number.isInteger).sort((a, b) => a - b);
      setData(prev => ({ ...prev, chapters }));
    } catch (err) {
      setError(prev => ({ ...prev, chapters: 'Erro ao buscar capítulos' }));
    } finally {
      setLoading(prev => ({ ...prev, chapters: false }));
    }
  };

  const fetchVerses = async (versionId, bookId, chapterId) => {
    setLoading(prev => ({ ...prev, verses: true }));
    setError(prev => ({ ...prev, verses: null }));
    try {
      const response = await fetch(
        `https://pesquisarnabiblia.com.br/api-projeto/api/get_verses.php?version_id=${versionId}&book_id=${bookId}&chapter_id=${chapterId}`,
        {
          headers: { Authorization: `Bearer ${API_KEY}` }
        }
      );
      const result = await response.json();
      const versesList = result.verses
        .map(item => ({
          id: item.verse_id || item.verse_number,
          number: item.verse_number,
          text: item.text
        }))
        .sort((a, b) => a.number - b.number);
      setData(prev => ({ ...prev, verses: versesList }));
    } catch (err) {
      setError(prev => ({ ...prev, verses: 'Erro ao buscar versículos' }));
    } finally {
      setLoading(prev => ({ ...prev, verses: false }));
    }
  };

  const handleVersionSelect = (version) => {
    setSelected({ version, book: null, chapter: null });
    setData({ books: [], chapters: [], verses: [] });
    fetchBooks(version.id);
  };

  const handleBookSelect = (book) => {
    setSelected(prev => ({ ...prev, book, chapter: null }));
    setData(prev => ({ ...prev, chapters: [], verses: [] }));
    fetchChapters(selected.version.id, book.id);
  };

  const handleChapterSelect = (chapter) => {
    setSelected(prev => ({ ...prev, chapter }));
    setData(prev => ({ ...prev, verses: [] }));
    fetchVerses(selected.version.id, selected.book.id, chapter);
  };

  const handleBack = () => {
    if (selected.chapter) {
      setSelected(prev => ({ ...prev, chapter: null }));
      setSelectedVerseIndex(null);
    } else if (selected.book) {
      setSelected(prev => ({ ...prev, book: null, chapter: null }));
    } else {
      setSelected({ version: null, book: null, chapter: null });
    }
  };

  const renderList = (items, onSelect) => (
    <ScrollView>
      {items.map((item, index) => (
        <TouchableOpacity
          key={item.id || item.number || index}
          onPress={() => onSelect(item)}
          style={styles.listItem}
        >
          <Text style={styles.listItemText}>
            {item.name || item.title || item.number || `Item ${index + 1}`}
          </Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );

  const renderChapterGrid = () => {
    const boxSize = calculateBoxSize();
    
    return (
      <FlatList
        data={data.chapters}
        numColumns={4}
        keyExtractor={(item) => item.toString()}
        contentContainerStyle={styles.gridContainer}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={[
              styles.chapterBox, 
              { 
                width: boxSize,
                height: boxSize,
                marginHorizontal: 4,
                marginVertical: 4
              }
            ]}
            onPress={() => handleChapterSelect(item)}
          >
            <Text style={styles.chapterText}>{item}</Text>
          </TouchableOpacity>
        )}
      />
    );
  };

  const renderVerses = () => {
    if (selectedVerseIndex !== null) {
      const verse = data.verses[selectedVerseIndex];
      return (
        <View style={styles.selectedVerseContainer}>
          <View style={styles.verseWrapper}>
            <Text style={styles.bigVerseText}>
              {verse.number}. {verse.text}
            </Text>
          </View>
          <View style={styles.navButtons}>
            {selectedVerseIndex > 0 && (
              <TouchableOpacity
                onPress={() => setSelectedVerseIndex(prev => prev - 1)}
                style={styles.navButton}
              >
                <Icon name="arrow-left" size={20} color="#fff" />
              </TouchableOpacity>
            )}
            <TouchableOpacity
              onPress={() => speakVerse(verse.text)}
              style={styles.audioButton}
            >
              <Icon name="volume-up" size={24} color="#fff" />
            </TouchableOpacity>
            {selectedVerseIndex < data.verses.length - 1 && (
              <TouchableOpacity
                onPress={() => setSelectedVerseIndex(prev => prev + 1)}
                style={styles.navButton}
              >
                <Icon name="arrow-right" size={20} color="#fff" />
              </TouchableOpacity>
            )}
          </View>
        </View>
      );
    }

    return (
      <ScrollView style={styles.versesContainer}>
        {data.verses.map((verse, index) => (
          <TouchableOpacity 
            key={verse.id} 
            onPress={() => setSelectedVerseIndex(index)}
            style={styles.verseItemContainer}
          >
            <View style={styles.verseItem}>
              <Text style={styles.verseNumber}>{verse.number}.</Text>
              <Text style={styles.verseText}>{verse.text}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    );
  };

  const renderContent = () => {
    if (!selected.version) {
      return (
        <View style={styles.mainContent}>
          <Text style={styles.mainTitle}>Selecione uma versão</Text>
          {loading.versions ? (
            <ActivityIndicator size="large" color="#0056D2" />
          ) : error.versions ? (
            <Text style={styles.errorText}>{error.versions}</Text>
          ) : (
            renderList(versions, handleVersionSelect)
          )}
        </View>
      );
    }
    if (!selected.book) {
      return loading.books ? (
        <ActivityIndicator size="large" color="#0056D2" />
      ) : error.books ? (
        <Text style={styles.errorText}>{error.books}</Text>
      ) : (
        renderList(data.books, handleBookSelect)
      );
    }
    if (!selected.chapter) {
      return loading.chapters ? (
        <ActivityIndicator size="large" color="#0056D2" />
      ) : error.chapters ? (
        <Text style={styles.errorText}>{error.chapters}</Text>
      ) : (
        renderChapterGrid()
      );
    }
    return renderVerses();
  };

  useEffect(() => {
    fetchVersions();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      {showNavigationHeader()}
      <View style={styles.contentContainer}>
        {renderContent()}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  mainContent: {
    flex: 1,
  },
  mainTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#0056D2',
    textAlign: 'center',
    marginVertical: 20,
    marginHorizontal: 16
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#eee'
  },
  simpleBackButton: {
    marginRight: 12
  },
  screenTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#0056D2'
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#eee'
  },
  backText: {
    fontSize: 16,
    color: '#0056D2',
    marginLeft: 8,
    fontWeight: '500'
  },
  contentContainer: {
    flex: 1
  },
  errorText: {
    color: 'red',
    textAlign: 'center',
    marginTop: 20,
    fontSize: 16
  },
  listItem: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd'
  },
  listItemText: {
    fontSize: 18
  },
  gridContainer: {
    justifyContent: 'center',
    paddingVertical: 8,
    paddingHorizontal: 8
  },
  chapterBox: {
    backgroundColor: '#0056D2',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
  },
  chapterText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  versesContainer: {
    flex: 1,
    padding: 16
  },
  verseItemContainer: {
    marginBottom: 16
  },
  verseItem: {
    flexDirection: 'row',
    paddingVertical: 8
  },
  verseNumber: {
    fontSize: 18,
    fontWeight: 'bold',
    marginRight: 8,
    color: '#0056D2'
  },
  verseText: {
    fontSize: 18,
    flex: 1,
    lineHeight: 24
  },
  bigVerseText: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 24,
    textAlign: 'center',
    paddingHorizontal: 16,
    lineHeight: 28
  },
  selectedVerseContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16
  },
  verseWrapper: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  navButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '80%',
    marginTop: 24
  },
  navButton: {
    padding: 12,
    backgroundColor: '#0056D2',
    borderRadius: 50,
    width: 50,
    alignItems: 'center'
  },
  audioButton: {
    backgroundColor: '#0056D2',
    borderRadius: 50,
    padding: 14,
    width: 50,
    alignItems: 'center'
  }
});

export default BibliaScreen;