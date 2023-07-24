import React from 'react'
import { Image, Pressable, StyleSheet, Text, TouchableOpacity, View } from 'react-native'

import ratios from '../../styles/ratios';

let {
  widthPixel,
  heightPixel,
  fontPixel,
  pixelSizeVertical,
  pixelSizeHorizontal,
} = ratios


const Bible = ({ navigation }) => {
  return (
    <View style={styles.container}>

      <View style={styles.container1}>
        <Text style={styles.bible}>Bible of Safety</Text>
      </View>


      <View style={styles.container2}>
        <Image
          source={require("../../assets/images/bible.png")}
        />
      </View>


      <View style={styles.container3}>

        <TouchableOpacity style={styles.container4}
          onPress={() => navigation.navigate("SafetyAtWork")}
        >

          <Text style={styles.text}>Safety at Work</Text>
          <View>


            <Image
              source={require("../../assets/images/arrow.png")}
            />
          </View>
        </TouchableOpacity>


        <TouchableOpacity style={styles.container4}
          onPress={() => navigation.navigate("SafetyAtHome")}
        >
          <Text style={styles.text}>Safety at Home</Text>
          <View>

            <Image
              source={require("../../assets/images/arrow.png")}
            />
          </View>
        </TouchableOpacity>



        <TouchableOpacity style={styles.container4}
          onPress={() => navigation.navigate("SafetyAtUniversity")}
        >
          <Text style={styles.text}>Safety at University</Text>
          <View>

            <Image
              source={require("../../assets/images/arrow.png")}
            />
          </View>
        </TouchableOpacity>



        <TouchableOpacity style={styles.container4}
          onPress={() => navigation.navigate("WomenSafetyOnline")}

        >
          <Text style={styles.text}>Women Safety Online</Text>
          <View>

            <Image
              source={require("../../assets/images/arrow.png")}
            />
          </View>
        </TouchableOpacity>



        <TouchableOpacity style={styles.container4}
        onPress={() => navigation.navigate("SafetyOnTheStreets")}
        >
            <Text style={styles.text}>Safety on the Streets</Text>
          <View>
          

              <Image
                source={require("../../assets/images/arrow.png")}
              />
          </View>
        </TouchableOpacity>


      </View>








    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFECD0",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30
  },
  container1: {
    flex: 0.3,
    // backgroundColor:"red",
    justifyContent: 'center',
    alignItems: 'center'
  },
  bible: {
    color: "#372329",
    fontFamily: "Nunito-SemiBold",
    fontSize: fontPixel(30),
  },
  container2: {
    flex: 0.5,
    // backgroundColor:"blue",
    justifyContent: 'center',
    alignItems: 'center'
  },
  container3: {
    flex: 2,
    // backgroundColor: "green",
  },
  container4: {
    backgroundColor: "#FF3974",
    marginLeft: widthPixel(29),
    width: widthPixel(348),
    height: heightPixel(80),
    borderRadius: 12,
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    marginTop: heightPixel(18),
    paddingHorizontal: 22
  },
  text: {
    color: "#FFECD0",
    fontFamily: "Nunito-Bold",
    fontSize: fontPixel(25),
  }
})

export default Bible;