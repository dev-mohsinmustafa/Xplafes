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

      <View style={{ alignItems: 'center', marginTop: 30 }}>

        {

          channelData.map((item, index) => {
            return (
              <TouchableOpacity
                key={index}
                style={styles.container2}
                onPress={() => navigation.navigate("ChatGPT")}
              >
                <Text style={[styles.work, { marginLeft: widthPixel(23) }]}>{item.work}</Text>


                <View style={{ alignItems: 'center', flexDirection: 'row', marginLeft: widthPixel(51) }} >
                  {/* <View  style={{alignSelf:'center'}}> */}
                  <Image
                    source={require("../../assets/images/circle.png")} />
                  {/* </View> */}
                  <Text style={styles.status}>{item.status}</Text>
                </View>

                <View style={{ marginLeft: widthPixel(83) }}>
                  <Text >{item.dot}</Text>
                </View>

                <View style={{ flexDirection: "row", marginLeft: widthPixel(35),}}>
                  <View style={{flexDirection:'column'}}>
                    <Text style={styles.member}>{item.member1}</Text>
                    <Text style={styles.member}>{item.member2}</Text>
                  </View>

                  <View style={{ flexDirection: "column", paddingLeft:5  }}>
                    <Text style={styles.para}>{item.para1}</Text>
                    <Text style={styles.para}>{item.para2}</Text>
                  </View>

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
    flex: 0.3,
    justifyContent: 'center',
    alignItems: 'center',
  },
  xplafes: {
    color: "#372329",
    fontFamily: "Nunito-SemiBold",
    fontSize: fontPixel(30),
  },
  container2: {
    justifyContent: 'center',
    // alignItems:'center',
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