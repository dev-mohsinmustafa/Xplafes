import { StyleSheet, Text, Touchable, TouchableOpacity, View } from 'react-native'
import React from 'react'
import Header from '../../components/header/Header'

import ratios from '../../styles/ratios';
import AsyncStorage from '@react-native-async-storage/async-storage';

let {
    widthPixel,
    heightPixel,
    fontPixel,
    pixelSizeVertical,
    pixelSizeHorizontal,
} = ratios


const Settings1 = ({ navigation }) => {

    const logout = () => {
        AsyncStorage.removeItem("user")
            .then(() => {
                navigation.navigate("Login")
            })
    }


    return (
        <View style={styles.container}>
            <View style={{ flex: 0.2 }}>
                <Header title="Settings" image1={require("../../assets/images/arrow-left.png")}
                    image2={require("../../assets/images/bible.png")}
                />
            </View>
            

            <View style={styles.container1}>
                <TouchableOpacity onPress={() => navigation.navigate("EditProfile")}>
                    <Text style={styles.text} >Edit Profile</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate("ChangePassword")}>
                    <Text style={styles.text}  >Change Password</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate("Description")}>
                    <Text style={styles.text}>Customer Support</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => navigation.navigate("AboutMe")}>
                    <Text style={styles.text}>About Me</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate("SOSScreen")}>
                    <Text style={styles.text}>SOS Signal</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate("FeedBack")}>
                    <Text style={styles.text}>Give FeedBack</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate("ContactMe")}>
                    <Text style={styles.text}>Contact Me</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate("AboutApp")}>
                    <Text style={styles.text}>About App</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate("PrivacyPolicy")}>
                    <Text style={styles.text}>Privacy Policy</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => logout()}>
                    <Text style={styles.text}>Log Out</Text>
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
        borderTopRightRadius: 30,

    },
    text: {
        marginHorizontal: widthPixel(26),
        color: "#372329",
        fontFamily: "Nunito-SemiBold",
        fontSize: fontPixel(29),
        borderBottomColor: "gray",
        borderBottomWidth: 1,
    },
    container1:{
        flex:1,
        // backgroundColor:"red"
    }
})
export default Settings1;