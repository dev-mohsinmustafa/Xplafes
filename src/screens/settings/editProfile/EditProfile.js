import { StyleSheet, Text, Touchable, TouchableOpacity, View } from 'react-native'
import React from 'react'
import Header from '../../../components/header/Header'

import ratios from '../../../styles/ratios';
import AsyncStorage from '@react-native-async-storage/async-storage';

let {
    widthPixel,
    heightPixel,
    fontPixel,
    pixelSizeVertical,
    pixelSizeHorizontal,
} = ratios


const EditProfile = ({ navigation }) => {

    const logout = () => {
        AsyncStorage.removeItem("user")
            .then(() => {
                navigation.navigate("Login")
            })
    }


    return (
        <View style={styles.container}>
            <View style={{ flex: 0.2 }}>
                <Header title="Settings" image1={require("../../../assets/images/arrow-left.png")}
                    image2={require("../../../assets/images/bible.png")}
                />
            </View>

            <View>
                <TouchableOpacity onPress={() => navigation.navigate("UploadProfile")}>
                    <Text style={styles.text}>Change Profile Picture</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate("ChangeUsername")}>
                    <Text style={styles.text}  >Change Username</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate("ChangeDescription")}>
                    <Text style={styles.text}>Change Description</Text>
                </TouchableOpacity>
                <TouchableOpacity
                // onPress={() => logout()}
                >
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
    }
})
export default EditProfile;