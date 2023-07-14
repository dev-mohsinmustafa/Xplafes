import React from 'react'
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import ratios from '../../styles/ratios'
import { channelData } from '../../constants/Constants';

let {
  widthPixel,
  heightPixel,
  fontPixel
} = ratios;

const Channel = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <View style={styles.container1}>
        <Text style={styles.xplafes}>Channel</Text>
      </View>

      <View style={{alignItems:'center',}}>

        {

          channelData.map((item, index) => {
            return (
              <TouchableOpacity
              key={index}
              style={styles.container2}
                onPress={() => navigation.navigate("WomenWork")}
              >
                <Text style={styles.work}>{item.work}</Text>


                <View style={{ flexDirection: 'row' }} >
                  <View>
                    <Image
                      source={require("../../assets/images/circle.png")} />

                  </View>
                  <Text style={styles.status}>{item.status}</Text>
                </View>

                <View>
                  <Text >{item.dot}</Text>
                </View>

                <View style={{ flexDirection: "row" }}>
                  <Text style={styles.member}>{item.member1}</Text>
                  <Text style={styles.para}>{item.para1}</Text>
                </View>

                <View style={{ flexDirection: "row" }}>
                  <Text style={styles.member}>{item.member2}</Text>
                  <Text style={styles.para}>{item.para2}</Text>
                </View>


              </TouchableOpacity>
            )
          })

        }

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
    flex: 0.2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  xplafes: {
    color: "#372329",
    fontFamily: "Nunito-SemiBold",
    fontSize: fontPixel(30),
  },
  container2: {

    width: widthPixel(372),
    height: heightPixel(120),
    backgroundColor: "#FFECD0",
    borderWidth: 1,
    borderColor: "#FF3974",
    borderRadius: 12,
    marginBottom: heightPixel(16)
  },

  work: {
    color: "#372329",
    fontFamily: "Nunito-Regular",
    fontSize: fontPixel(22),
  },
  status: {
    color: "#372329",
    fontFamily: "Nunito-Regular",
    fontSize: fontPixel(20),
  },
  member: {
    color: "#FF3974",
    fontFamily: "Nunito-Regular",
    fontSize: fontPixel(12),
  },
  para: {
    color: "#372329",
    fontFamily: "Nunito-Regular",
    fontSize: fontPixel(12),
  }
})

export default Channel;