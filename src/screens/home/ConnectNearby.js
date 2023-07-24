
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


const ConnectNearby = ({ navigation }) => {

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

            <Header title="Connect nearby" 
                image1={require("../../assets/images/arrow-left.png")}
                image2={[]}
            />





            <TouchableOpacity style={styles.button} onPress={() => navigation.goBack()}>
                <Button title="Explafe It!" />
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
    },
    container1: {
        flex: 0.2,
        justifyContent: 'center',
        alignItems: 'center',
        // backgroundColor: "red",
    },
    button: {
        flex: 0.3,
        marginTop: heightPixel(10),
    },
    container2: {
        // backgroundColor: "green",
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }


})

export default ConnectNearby;