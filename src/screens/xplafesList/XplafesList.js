
import React, { useEffect, useState } from 'react'
import { ImageBackground, StyleSheet, Text, View, TouchableOpacity, Image, Alert, Pressable } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage';

import { locationData } from '../../constants/Constants';

import ratios from '../../styles/ratios';
import Locations from '../../components/locations/Locations';

import AwesomeIcon from 'react-native-vector-icons/Ionicons';
import AwesomeIcon1 from 'react-native-vector-icons/MaterialCommunityIcons';


let {
  widthPixel,
  heightPixel,
  fontPixel,
  pixelSizeVertical,
  pixelSizeHorizontal,
} = ratios


const XplafesList = ({ navigation }) => {

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
      <View style={styles.container1}>
        <Text style={styles.xplafes}>Xplafés Around</Text>
        <Text style={styles.xplafes}>You</Text>
      </View>

      <Pressable style={styles.refresh}
        onPress={() => navigation.navigate("AllChats")}>
        <AwesomeIcon name="chatbubbles" size={30} color="#FF3974"
        />
      </Pressable>

      <Pressable style={styles.search}
        onPress={() => navigation.navigate("SearchUserPage")}>
        <AwesomeIcon1 name="account-search" size={35} color="#FF3974"
        />
      </Pressable>


      <View style={styles.container2}>
        {
          locationData.map((item, index) => {
            return (
              // <Text key={index}>{item.location} - {item.address}</Text>
              <Locations key={index} locationData={item} />
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
  },
  refresh: {
    position: 'absolute',
    top: 20,
    right: 16,
    zIndex: 1,
  },
  search: {
    position: 'absolute',
    top: 20,
    left: 16,
    zIndex: 1,
  }


})

export default XplafesList;