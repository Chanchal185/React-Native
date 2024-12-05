import React, { useState } from 'react';
import {
  Text,
  StyleSheet,
  View,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Alert,
} from 'react-native';

function Bank() {
  const [count, setCount] = useState(1000);
  const [depositAmount, setDepositAmount] = useState('');
  const [withdrawAmount, setWithdrawAmount] = useState('');

  const handleDeposit = () => {
    const deposit = parseFloat(depositAmount);
    if (deposit > 0) {
      setCount(count + deposit);
      setDepositAmount('');
    } else {
      Alert.alert('Please enter a valid amount');
    }
  };

  const handleWithdraw = () => {
    const withdraw = parseFloat(withdrawAmount);
    if (withdraw <= count) {
      setCount(count - withdraw);
      setWithdrawAmount('');
    } else {
      Alert.alert(`Please enter an amount less than ${count} balance.`);
    }
  };

  return (
    <SafeAreaView>
      <ScrollView>
        <View>
          <View>
            <Text style={styles.header}> Banking Dashboard </Text>
          </View>
          <View style={styles.container}>
            <View>
              <Text style={styles.heading}> Current Balance: $ {count} </Text>
            </View>
            <View>
              <Text style={styles.text}> Deposit Amount:</Text>
              <TextInput
                style={styles.input}
                value={depositAmount}
                onChangeText={(value) => setDepositAmount(value)}
                keyboardType="numeric"
                placeholder="Enter the Deposit Amount"
              />
            </View>
            <View>
              <Text style={styles.text}> Withdraw Amount:</Text>
              <TextInput
                style={styles.input}
                value={withdrawAmount}
                onChangeText={(value) => setWithdrawAmount(value)}
                keyboardType="numeric"
                placeholder="Enter the Withdraw Amount"
              />
            </View>
            {/* Buttons in the Same Line */}
            <View style={styles.buttonRow}>
              <TouchableOpacity style={styles.button} onPress={handleDeposit}>
                <Text style={styles.size}>Deposit</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.button} onPress={handleWithdraw}>
                <Text style={styles.size}>Withdraw</Text>
              </TouchableOpacity>
            </View>
          </View>
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
    margin: 15,
  },
  header: {
    margin: 20,
    alignItems: 'center',
    fontSize: 35,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  heading: {
    margin: 20,
    alignItems: 'center',
    fontSize: 25,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  text: {
    margin: 20,
    alignItems: 'center',
    fontSize: 20,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  buttonRow: {
    flexDirection: 'row', // Places buttons side-by-side
    justifyContent: 'space-between', // Adds spacing between buttons
    marginTop: 10,
  },
  button: {
    margin: 5,
    padding: 10,
    borderRadius: 4,
    backgroundColor: 'green',
    width: 100, // Fixed width for both buttons
    alignItems: 'center', // Centers text horizontally
    justifyContent: 'center', // Centers text vertically
  },
  size: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  input: {
    height: 50,
    width: 250,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    color: '#ffffff',
  },
});

export default Bank;
