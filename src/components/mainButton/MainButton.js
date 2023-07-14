import React from 'react'
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'

import ratios from '../../styles/ratios'

let {
    widthPixel,
    heightPixel,
    fontPixel,
    pixelSizeVertical,
    pixelSizeHorizontal,
} = ratios

const MainButton = (props) => {
    return (
        <View style={styles.button}>
                <Text style={styles.loginButton}>{props.title}</Text>
        </View>
    )
}


const styles = StyleSheet.create({

    button: {
        // alignItems: 'flex-end',
        backgroundColor: "#FFECD0",
        width: widthPixel(144),
        height: heightPixel(60),
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 7,
        marginHorizontal: widthPixel(30),
        alignSelf: 'flex-end',
        marginTop: -41,
    },
    loginButton: {
        color: "#372329",
        fontFamily: "Nunito-Italic",
        fontSize: fontPixel(24),
    }
})
export default MainButton;