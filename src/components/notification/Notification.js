import React from 'react'
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import Button from '../button/Button';

const Notification = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <View style={styles.container1}>
        <Text style={styles.notification}>Notification Sent!!</Text>

        <TouchableOpacity style={styles.button} onPress={() => navigation.goBack()}>
          <Button title="Ok!" />
        </TouchableOpacity>

      </View>
    </View>
  )
}

export default Notification;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: "#FFFFFF",
  },
  container1: {
    flex: 0.2,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: "#FFECD0",
    borderRadius: 22,
  },
  notification: {
    color: "#372329",
    textAlignVertical: 'center',
    fontFamily: "Nunito-Bold",
    fontSize: 30,
  },
  button: {
    // flex: 0.3,
    marginTop: 10,
  }
})