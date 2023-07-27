import React from 'react'
import { Image, Pressable, StyleSheet, Text, TouchableOpacity, View } from 'react-native'

import ratios from '../../../styles/ratios';
import Header from '../../../components/header/Header';
import Button from '../../../components/button/Button';

let {
    widthPixel,
    heightPixel,
    fontPixel,
    pixelSizeVertical,
    pixelSizeHorizontal,
} = ratios


const AboutApp = ({ navigation }) => {
    return (
        <View style={styles.container}>



            <Header title="About Version" 
                image1={require("../../../assets/images/arrow-left.png")}
                image2={require("../../../assets/images/bible.png")}


            />


            <View style={styles.container2}>
                <View>
                    <Image
                        source={require("../../../assets/images/girlcycle.png")}
                        style={{ width: 374, height: 174 }}
                        resizeMode='contain'
                    />
                </View>


                <View style={styles.container3}>
                    <Text style={styles.lorem}>Software Version :</Text>
                    <Text style={styles.bible}>15.7.7</Text>
                    <Text style={styles.lorem}>Model Name : </Text>
                    <Text style={styles.bible}>iPhoneXs Max </Text>
                    <Text style={styles.lorem}>Model Number : </Text>
                    <Text style={styles.bible}>MN2X2VN/A </Text>
                    <Text style={styles.lorem}>Developed By :</Text>
                    <Text style={styles.bible}>Mohsin Mustafa</Text>
                    <Text style={styles.lorem}>App Version :</Text>
                    <Text style={styles.bible}>9.x.9</Text>
                </View>


                <TouchableOpacity style={styles.button} onPress={() => navigation.goBack()}>
                    <Button title="Please Back !" />
                </TouchableOpacity>

            </View>














        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#FFECD0",
        borderRadius: 30,

    },
    container1: {
        flex: 0.3,
        // backgroundColor:"red",
        justifyContent: 'space-around',
        alignItems: 'center',
        flexDirection: 'row',
    },
    bible: {
        color: "#372329",
        fontFamily: "Nunito-Bold",
        fontSize: fontPixel(35),
    },
    container2: {
        // flex: 2,
        width: widthPixel(374),
        height: heightPixel(689),
        backgroundColor: "#FFFFFF69",
        borderRadius: 10,
        marginHorizontal: heightPixel(18),
        // justifyContent: 'center',
        alignItems: 'center',

    },
    container3: {
        marginTop: heightPixel(30),

    },
    lorem: {
        color: "#FF3974",
        fontFamily: "Nunito-Bold",
        fontSize: fontPixel(20),
    },
    button: {
        flex: 0.3,
        marginTop: heightPixel(10),
    }


})

export default AboutApp;