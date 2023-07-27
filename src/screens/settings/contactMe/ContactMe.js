import React from 'react'
import { Image, Pressable, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'

import ratios from '../../../styles/ratios';
import Header from '../../../components/header/Header';

let {
    widthPixel,
    heightPixel,
    fontPixel,
    pixelSizeVertical,
    pixelSizeHorizontal,
} = ratios


const ContactMe = () => {
    return (
        <View style={styles.container}>



            <Header title="Contact Me"
                image1={require("../../../assets/images/arrow-left.png")}
                image2={require("../../../assets/images/bible.png")}
            />




            <View style={styles.container2}>
                <View>
                    <Image
                        source={require("../../../assets/images/mohsin.png")}
                        style={{ width: 300, height: 300, borderRadius: 300, marginTop: 10 }}
                        resizeMode='contain'
                    />
                </View>


                <View style={styles.container3}>
                    <Text style={styles.lorem}>
                        I'm Mohsin Mustafa
                    </Text>

                </View>


                <ScrollView>
                    <Text style={styles.totor}>
                        Contact Me : 03007261440
                    </Text>
                    <Text style={styles.totor}>
                        Location : Punjab, Pakistan
                    </Text>
                </ScrollView>


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
        fontFamily: "Nunito-SemiBold",
        fontSize: fontPixel(30),
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
        marginTop: heightPixel(39),
    },
    lorem: {
        color: "#372329",
        fontFamily: "Nunito-Bold",
        fontSize: fontPixel(18),
        maxWidth: widthPixel(353),
        marginHorizontal: 9
    },
    totor: {
        marginTop: heightPixel(20),
        color: "#FF3974",
        fontFamily: "Nunito-Bold",
        fontSize: fontPixel(20),
        maxWidth: widthPixel(353),
        marginHorizontal: 9
    }


})

export default ContactMe;