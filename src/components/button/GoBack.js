import React from 'react'
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'
import ratios from '../../styles/ratios'
import { useNavigation } from '@react-navigation/native';

let {
    widthPixel,
    heightPixel,
    fontPixel,
    pixelSizeVertical,
    pixelSizeHorizontal,
} = ratios;

const GoBack = () => {

    const navigation = useNavigation()


    return (
        <View style={styles.container}>
            <TouchableOpacity
                onPress={() => navigation.goBack()}
            >
                <Image
                    style={{ tintColor: "white", width: 35, }}
                    source={require("../../assets/images/arrow-left.png")}
                />
            </TouchableOpacity>

            <Text style={styles.goback}>Go Back</Text>
        </View>



    )
}


const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        top: 30,
        zIndex: 1,
        marginLeft: widthPixel(20)
    },
    goback: {
        color: "white",
        fontFamily: "Nunito-ExtraBold",
        fontSize: fontPixel(20),
    }
})
export default GoBack;