
import React, { useEffect, useState } from 'react'
import { Platform, StyleSheet, Text, View, TouchableOpacity, Image, Alert, Pressable, TextInput, ActivityIndicator, ScrollView, } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage';

import { locationData } from '../../constants/Constants';

import ratios from '../../styles/ratios';
import Locations from '../../components/locations/Locations';
import Header from '../../components/header/Header';
import Button from '../../components/button/Button';
import { errormessage } from '../../styles/CommonError';

let {
  widthPixel,
  heightPixel,
  fontPixel,
  pixelSizeVertical,
  pixelSizeHorizontal,
} = ratios

import DateTimePicker from "@react-native-community/datetimepicker";


const XplafesDetail = ({ navigation }) => {


  const [message, setmessage] = useState('')
  const [loading, setLoading] = useState(false);
  const [errormsg, setErrormsg] = useState(null);
  
  
  
  // DateTimePicker
  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState("date");
  const [show, setShow] = useState(false);
  const [text, setText] = useState("Empty");
  

  const showMode = (currentMode)=>{
    setShow(true);
    setMode(currentMode);
  }


  const onChange =(event, selectedDate)=>{
    const currentDate = selectedDate || date; //|| it means otherwise , and date this is initial date 
  setShow(Platform.OS === "ios");
  setDate(currentDate);

  let tempDate = new Date(currentDate);
  let fDate = tempDate.getDate() + "/" + (tempDate.getMonth() + 1) + "/" + tempDate.getFullYear(); // 1 is index

  let fTime = "Hours: " + tempDate.getHours() + " | Minutes: " + tempDate.getMinutes();

  setText(fDate + "\n" + fTime) // \n for new line 
  console.log(fDate + " (" + fTime + ")"); 



  }



  const sendToBackend = () => {

    if (message == '') {
      setErrormsg("Please enter your message");
      Alert.alert('Please enter message')
    }
    else {
      setLoading(true)
      AsyncStorage.getItem('user').then(
        data => {
          fetch('http://10.0.2.2:8090/setmessage', {
            method: 'post',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              email: JSON.parse(data).user.email,
              message: message
            })
          })
            .then(res => res.json())
            .then(data => {
              if (data.message === "Message has been sent Successfully") {
                setLoading(false)
                Alert.alert('Message has been sent successfully')
                navigation.navigate("Notification")
              }
              else if (data.error === "Invalid Credentials") {
                Alert.alert('Invalid Credentials')
                setLoading(false)
                navigation.navigate('Login')
              }
              else {
                setLoading(false)
                Alert.alert("Please Try Again");
              }
            })
            .catch(err => {
              Alert.alert('Something went wrong')
              setLoading(false)
            })
        }
      )
        .catch(err => {
          Alert.alert('Something went wrong')
          setLoading(false)
        })
    }

    // navigation.navigate('Signup_ChoosePassword')
  }




  if (loading) {
    return (
      <View style={[styles.container, { justifyContent: 'center', alignItems: 'center' }]}>
        <ActivityIndicator size="large" color="red" />
      </View>
    );
  }


  return (
    <ScrollView style={styles.container}>

      <View style={{ flex: 0.2, marginTop: heightPixel(43) }}>
        <Header title="Nearby Xplafé" marginLeft={31} marginLeft1={27}
          image1={require("../../assets/images/arrow-left.png")}
          image2={[]}
        />
      </View>



      <View style={styles.container1}>
        <Text style={styles.text}>Schindler’s Street, New York</Text>
        <Image
          source={require("../../assets/images/location.png")}
        />

      </View>

      <View style={styles.container2}>
        <Text style={styles.message}>Time</Text>
      </View>

      <View style={styles.container3}>
        <Text style={styles.text}>From</Text>
        <Text style={styles.text}>To</Text>
      </View>
      <View style={styles.container4}>

        <View style={{
          justifyContent: 'space-between', paddingHorizontal: widthPixel(15),
          alignItems: 'center', flexDirection: 'row', width: "47%", height: 46, backgroundColor: "white", borderRadius: 15
        }}>
          <Text style={styles.textDate}>{text}</Text>
          <TouchableOpacity onPress={()=> showMode("date")}>
            <Image
              source={require("../../assets/images/calendar.png")}
            />
          </TouchableOpacity>

          {
            show && (
            <DateTimePicker 
            testID='dateTimePicker'
            value={date}  // initial date
            mode={mode}  // this mode is "date" and "time" we call onpress in line number 165
            is24Hour={true}
            display='default'
            onChange={onChange}
            
            />
            
            )
          }
        </View>
        <View style={{
          justifyContent: 'space-between', paddingHorizontal: widthPixel(15),
          alignItems: 'center', flexDirection: 'row', width: "47%", height: 46, backgroundColor: "white", borderRadius: 15
        }}>
          <Text>Date</Text>
          <TouchableOpacity onPress={()=> showMode("time")}>
            <Image
              source={require("../../assets/images/calendar.png")}
            />
          </TouchableOpacity>
        </View>

      </View>

      <View style={styles.container2}>
        <Text style={styles.message}>Message</Text>
      </View>




      {
        errormsg ? <Text style={errormessage}>{errormsg}</Text> : null
      }


      <View style={styles.container5}>
        <TextInput
          placeholder='Please enter your Message'
          placeholderTextColor="#372329"
          onChangeText={(text) => setmessage(text)}
          onPressIn={() => setErrormsg(null)}
          multiline={true}
          numberOfLines={20}
          style={styles.input}
        />
      </View>






      <TouchableOpacity style={styles.button} onPress={() => sendToBackend()}>
        <Button title="Send Message !" />
      </TouchableOpacity>


    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFECD0",
    borderRadius: 30,

  },
  container1: {
    // flex: 0.1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: "#FFFFFF",
    borderRadius: 15,
    marginHorizontal: widthPixel(22),
    height: 46,
    marginTop: 10
  },
  text: {
    color: "#372329",
    fontFamily: "Nunito-Regular",
    fontSize: fontPixel(18),
  },

  container2: {
    flex: 0.2,
    // backgroundColor: "red",
    marginTop: 10,
    justifyContent: 'center',
    marginHorizontal: widthPixel(20),
  },
  message: {
    color: "#372329",
    fontFamily: "Nunito-Regular",
    fontSize: fontPixel(20),
  },
  container3: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: widthPixel(24),
    // backgroundColor: 'red',
    paddingHorizontal: widthPixel(15),
    marginBottom: 5

  },
  container4: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: widthPixel(24),
    // backgroundColor: 'green',
  },
  textDate:{
fontWeight:"bold",
fontSize:10
  },

  container5: {
    backgroundColor: "#FFFFFF",
    borderRadius: 17,
    marginHorizontal: widthPixel(20),
    flex: 1,
    // justifyContent: 'center',
    alignItems: 'center',
    // height: 345
  },
  input: {
    // borderWidth: 1,
    // borderColor: "#FF3974",
    borderRadius: 10,
    paddingHorizontal: widthPixel(10),
    backgroundColor: "#FFFFFF",
    width: "80%",
    height: "70%"
  },
  button: {
    flex: 0.3,
    marginTop: 19,
  }


})

export default XplafesDetail;