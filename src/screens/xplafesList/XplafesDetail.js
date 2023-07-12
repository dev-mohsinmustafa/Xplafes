
import React, { useEffect, useState } from 'react'
import { ImageBackground, StyleSheet, Text, View, TouchableOpacity, Image, Alert, } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage';

import { locationData } from '../../constants/Constants';

import ratios from '../../styles/ratios';
import Locations from '../../components/locations/Locations';
import Header from '../../components/header/Header';
import Button from '../../components/button/Button';

let {
  widthPixel,
  heightPixel,
  fontPixel,
  pixelSizeVertical,
  pixelSizeHorizontal,
} = ratios


const XplafesDetail = ({ navigation }) => {

  // es data ko ap store be krwa skty hai 1 variable me
  const [userdata, setUserdata] = useState(null)







  //   // yaha ab get krna hai data
  //   AsyncStorage.getItem("user")
  //   .then(data=>{
  // // console.log("async user data", data);
  // // hook banane ke bad ab parse krwana hai data kyo wha hamne string ke format me bheja tha na
  // // ab is taran log krwana se bar bar data data aye ga to ham es ko useEffect me 
  // // call kr lenge function ko
  // setUserdata(JSON.parse(data))

  //   })
  //   .catch(err=>{
  //     Alert.alert(err)
  //   })

  useEffect(() => {
    AsyncStorage.getItem("user")
      .then(data => {
        setUserdata(JSON.parse(data))

      })
      .catch(err => {
        Alert.alert(err)
      })
  }, [])



  // ab is taran log krwana se bar bar data data aye ga to ham es ko useEffect me 
  // call kr lenge function ko ta ke 1 bar data aye bs
  console.log("async userdata from XplafesList screen", userdata);

  return (
    <View style={styles.container}>

      <Header title="Nearby Xplafé" marginLeft={31} marginLeft1={27}
        image1={require("../../assets/images/arrow-left.png")}
      />
      {/* 
      <View style={styles.container1}>
        <Text style={styles.xplafes}>Xplafés Around</Text>
        <Text style={styles.xplafes}>You Details</Text>
      </View> */}


{/* 
      <View style={styles.container2}>
        {
          locationData.map((item, index) => {
            return (
              // <Text key={index}>{item.location} - {item.address}</Text>
              <Locations key={index} locationData={item} />
            )
          })
        }


      </View> */}


<Button title="Contact Her!"/>


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
    // backgroundColor: "red",
    // marginBottom:61
  },
  xplafes: {
    color: "#372329",
    fontFamily: "Nunito-SemiBold",
    fontSize: fontPixel(30),
  },
  container2: {
    // backgroundColor: "green",
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }


})

export default XplafesDetail;