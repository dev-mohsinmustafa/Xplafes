import React from 'react'
import { View, Text, StyleSheet, Image, ImageBackground, TouchableOpacity, } from 'react-native'
import ratios from '../../styles/ratios';
import { useNavigation } from '@react-navigation/native';




let {
    widthPixel,
    heightPixel,
    fontPixel,
    pixelSizeVertical,
    pixelSizeHorizontal,
} = ratios;
const Header = (props) => {
    const navigation = useNavigation()

    return (


        <View style={[styles.container1, {justifyContent: props.justifyContent}]}>
            <TouchableOpacity
                onPress={() => navigation.goBack()}
            >
                <Image
                    // style={{marginLeft:31}}
                    style={{ marginLeft: props.marginLeft }}
                    // style={{ tintColor: '#FFFFFF' }}
                    source={props.image1}
                />
            </TouchableOpacity>
            <Text style={[styles.bible, {marginLeft: props.marginLeft1}]}>{props.title}</Text>
            <TouchableOpacity>
                <Image
                    style={{ width: 45, height: 44, marginLeft: props.marginLeft2 }}
                    // style={{ width: 45, height: 44, marginLeft:9 }}
                    source={props.image2}

                />
            </TouchableOpacity>
        </View>
    )
}



const styles = StyleSheet.create({


    container1: {
        flex: 0.7,
        // backgroundColor:"red",
        // justifyContent: 'space-around',
        alignItems: 'center',
        flexDirection: 'row',
    },
    bible: {
        color: "#372329",
        fontFamily: "Nunito-SemiBold",
        fontSize: fontPixel(30),
        // marginLeft: 27
    },

})

export default Header