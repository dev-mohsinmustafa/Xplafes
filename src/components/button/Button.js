import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import ratios from '../../styles/ratios'

let {
    widthPixel,
    heightPixel,
    fontPixel
} = ratios; 

const Button = (props) => {
    return (
        <View style={styles.container}>
            <Text style={styles.button}>{props.title}</Text>
        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        backgroundColor: "#FF3974",
        borderWidth: 1,
        borderColor: "#FF3974",
        width: 250,
        height: 55,
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf:'center'
    },
    button:{
        color:"#FFFFFF",
        fontSize:fontPixel(24),
        fontFamily: "Nunito-Regular",
        
    }
})
export default Button;