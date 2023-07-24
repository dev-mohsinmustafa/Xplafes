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


        <View style={[styles.container1, ]}>
            <TouchableOpacity
                onPress={() => navigation.goBack()}
            >
                <Image
                    // style={{marginLeft:31}}
                    // style={{ tintColor: '#FFFFFF' }}
                    source={props.image1}
                />
            </TouchableOpacity>
            <Text style={[styles.bible, ]}>{props.title}</Text>
            <TouchableOpacity>
                <Image
                    style={{ width: 45, height: 44,  }}
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
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row',
        marginHorizontal: widthPixel(22)
    },
    bible: {
        color: "#372329",
        fontFamily: "Nunito-SemiBold",
        fontSize: fontPixel(30),
        // marginLeft: 27
    },

})

export default Header