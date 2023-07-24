import React from 'react'
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'

const Home = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.navigate("ConnectNearby")}>

        <View>
          <Image

            source={require("../../assets/images/map.png")}
          />
        </View>

      </TouchableOpacity>

    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFECD0",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30
  }
})

export default Home;