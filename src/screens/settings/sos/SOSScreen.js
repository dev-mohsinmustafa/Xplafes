import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  TextInput,
  Alert,
} from 'react-native';
import SendIntent from 'react-native-send-intent';
// import Contacts from 'react-native-contacts';

const SOSScreen = () => {
  const [emergencyContacts, setEmergencyContacts] = useState([]);
  const [newContactName, setNewContactName] = useState('');
  const [newContactNumber, setNewContactNumber] = useState('');

  const addContact = () => {
    if (!newContactName || !newContactNumber) {
      Alert.alert('Error', 'Please enter name and phone number.');
      return;
    }

    setEmergencyContacts((prevContacts) => [
      ...prevContacts,
      { name: newContactName, phoneNumber: newContactNumber },
    ]);
    setNewContactName('');
    setNewContactNumber('');
  };

  const removeContact = (contactToRemove) => {
    setEmergencyContacts((prevContacts) =>
      prevContacts.filter((contact) => contact.phoneNumber !== contactToRemove.phoneNumber)
    );
  };

  const sendSOS = () => {
    if (emergencyContacts.length === 0) {
      Alert.alert('Error', 'Please add emergency contacts before using SOS.');
      return;
    }

    const smsBody = 'Emergency: I need help!'; // Customize the message as needed
    emergencyContacts.forEach((contact) => {
      SendIntent.sendSms(contact.phoneNumber, smsBody);
    });

    Alert.alert('Success', 'SOS distress signal sent.');
  };

  return (
    <View style={styles.container}>
      <View style={styles.contactForm}>
        <TextInput
          style={styles.input}
          placeholder="Name"
          value={newContactName}
          onChangeText={setNewContactName}
        />
        <TextInput
          style={styles.input}
          placeholder="Phone Number"
          value={newContactNumber}
          onChangeText={setNewContactNumber}
          keyboardType="numeric"
        />
        <TouchableOpacity style={styles.addButton} onPress={addContact}>
          <Text>Add Contact</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={emergencyContacts}
        renderItem={({ item }) => (
          <View style={styles.contactItem}>
            <Text>{item.name}</Text>
            <Text>{item.phoneNumber}</Text>
            <TouchableOpacity onPress={() => removeContact(item)}>
              <Text style={styles.removeButton}>Remove</Text>
            </TouchableOpacity>
          </View>
        )}
        keyExtractor={(item) => item.phoneNumber}
      />

      <TouchableOpacity style={styles.sosButton} onPress={sendSOS}>
        <Text>SOS Panic Button</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  contactForm: {
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  addButton: {
    backgroundColor: 'blue',
    padding: 10,
    alignItems: 'center',
    borderRadius: 5,
  },
  contactItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  removeButton: {
    color: 'red',
  },
  sosButton: {
    backgroundColor: 'red',
    padding: 15,
    alignItems: 'center',
    borderRadius: 5,
    marginTop: 20,
  },
});

export default SOSScreen;
