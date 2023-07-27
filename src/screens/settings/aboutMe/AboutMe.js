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


const AboutMe = () => {
    return (
        <View style={styles.container}>



            <Header title="About Me"
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
                        Software development is the systematic process of designing, creating, testing, and maintaining computer software. It encompasses a wide range of activities that begin with understanding the requirements and needs of users or businesses and culminate in delivering a fully functional and reliable software product. Software development involves various stages, including analysis, design, coding, testing, and deployment. Developers use programming languages, frameworks, and tools to write code and develop applications that can run on different platforms and devices. The field of software development is dynamic and continuously evolving, with new methodologies and technologies emerging to improve the efficiency and effectiveness of the development process. As software plays an increasingly critical role in various industries, including finance, healthcare, education, and entertainment, skilled software developers are in high demand to create innovative and cutting-edge solutions that enhance productivity and improve people's lives.
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
        color: "#FF3974",
        fontFamily: "Nunito-Bold",
        fontSize: fontPixel(28),
        maxWidth: widthPixel(353),
        marginHorizontal: 9
    },
    totor: {
        marginTop: heightPixel(20),
        color: "#372329",
        fontFamily: "Nunito-Bold",
        fontSize: fontPixel(14),
        maxWidth: widthPixel(353),
        marginHorizontal: 9
    }


})

export default AboutMe;