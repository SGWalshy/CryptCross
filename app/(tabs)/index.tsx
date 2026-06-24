import { useState } from 'react';
import { Alert, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

export default function HomeScreen() {
  const [guess, setGuess] = useState('');

  const checkAnswer = () => {
    if (guess.toLowerCase() === 'elephant') {
      Alert.alert('Correct!', 'Well done!');
    } else {
      Alert.alert('Wrong!', 'Try again!');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Daily Word</Text>
      <Text style={styles.clue}>Clue: A large grey animal with a trunk</Text>
      <TextInput
        style={styles.input}
        placeholder="Type your answer"
        placeholderTextColor="#666"
        value={guess}
        onChangeText={setGuess}
        autoCapitalize="none"
      />
      <TouchableOpacity style={styles.button} onPress={checkAnswer}>
        <Text style={styles.buttonText}>Submit</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#111',
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
    color: '#aaa',
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 40,
  },
  input: {
    backgroundColor: '#222',
    color: '#fff',
    width: '100%',
    padding: 15,
    borderRadius: 8,
    fontSize: 18,
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 8,
    width: '100%',
    alignItems: 'center',
  },
  buttonText: {
    color: '#111',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
