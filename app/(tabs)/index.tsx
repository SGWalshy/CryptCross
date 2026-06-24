import { LinearGradient } from 'expo-linear-gradient';
import { useRef, useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

const ANSWER = 'elephant';
const NUM_LETTERS = ANSWER.length;

export default function HomeScreen() {
  const [letters, setLetters] = useState(Array(NUM_LETTERS).fill(''));
  const [activeBox, setActiveBox] = useState(0);
  const inputRefs = useRef([]);

  const handlePress = (index) => {
    setActiveBox(index);
    inputRefs.current[index]?.focus();
  };

  const handleChange = (text, index) => {
    const newLetters = [...letters];
    const newChar = text.slice(-1).toUpperCase();
    newLetters[index] = newChar;
    setLetters(newLetters);
    if (newChar && index < NUM_LETTERS - 1) {
      setActiveBox(index + 1);
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyPress = (e, index) => {
    if (e.nativeEvent.key === 'Backspace') {
      const newLetters = [...letters];
      if (newLetters[index] !== '') {
        newLetters[index] = '';
        setLetters(newLetters);
      } else if (index > 0) {
        newLetters[index - 1] = '';
        setLetters(newLetters);
        setActiveBox(index - 1);
        inputRefs.current[index - 1]?.focus();
      }
    }
  };

  const checkAnswer = () => {
    if (letters.join('').toLowerCase() === ANSWER) {
      alert('Correct! Well done!');
    } else {
      alert('Wrong! Try again!');
    }
  };

  const allFilled = letters.every(l => l !== '');

  return (
    <LinearGradient
      colors={['#1a4a7a', '#2a6aaa', '#1a4a7a']}
      style={styles.container}
    >
      <Text style={styles.title}>Daily Word</Text>
      <Text style={styles.clue}>Clue: A large grey animal with a trunk</Text>
      <View style={styles.boxes}>
        {letters.map((letter, index) => (
          <TouchableOpacity key={index} onPress={() => handlePress(index)}>
            <View style={[styles.box, activeBox === index && styles.activeBox]}>
              <TextInput
                ref={ref => inputRefs.current[index] = ref}
                style={styles.boxText}
                value={letter}
                onChangeText={text => handleChange(text, index)}
                onKeyPress={e => handleKeyPress(e, index)}
                maxLength={2}
                autoCapitalize="characters"
                caretHidden={true}
                selection={{ start: 1, end: 1 }}
              />
            </View>
          </TouchableOpacity>
        ))}
      </View>
      {allFilled && (
        <TouchableOpacity style={styles.button} onPress={checkAnswer}>
          <Text style={styles.buttonText}>Submit</Text>
        </TouchableOpacity>
      )}
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    color: '#fff',
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 40,
  },
  clue: {
    color: '#ccc',
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 40,
  },
  boxes: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 40,
  },
  box: {
    width: 40,
    height: 50,
    borderWidth: 2,
    borderColor: '#fff',
    borderRadius: 6,
    alignItems: 'center',
    justifyContent: 'center',
  },
  activeBox: {
    borderColor: '#00ff88',
  },
  boxText: {
    color: '#fff',
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    width: 40,
  },
  button: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 8,
    width: '100%',
    alignItems: 'center',
  },
  buttonText: {
    color: '#1a4a7a',
    fontSize: 18,
    fontWeight: 'bold',
  },
});