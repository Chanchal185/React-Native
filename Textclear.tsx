import React, { useState } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from 'react-native';

function Textclear() {
  const [text, setText] = useState('Hello');

  const clearText = () => {
    setText('');
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.box}>
          {/* Text and Input on the Same Line */}
          <View style={styles.row}>
            <Text style={styles.label}>Name :</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter the name"
              value={text}
              onChangeText={(value) => setText(value)}
              placeholderTextColor="gray"
            />
          </View>

          {/* Button */}
          <TouchableOpacity style={styles.button} onPress={clearText}>
            <Text style={styles.buttonText}>Click Me</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  box:{
    marginTop: 210,
    width: 300,
    height: 250,
    borderColor: 'white',
    borderWidth: 0.6,
    borderRadius: 20,
    backgroundColor: 'black'
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  label: {
    color: 'white',
    fontSize: 30,
    marginTop: 50,
    marginLeft: 20,
  },
  input: {
    height: 40, 
    width: 150,
    borderColor: 'white',
    borderWidth: 0.5,
    color: 'white',
    marginTop: 50,
    marginLeft: 15,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  button: {
    width: 100,
    height: 40,
    backgroundColor: 'white',
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    marginTop: 30
  },
  buttonText: {
    color: 'black',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default Textclear;
