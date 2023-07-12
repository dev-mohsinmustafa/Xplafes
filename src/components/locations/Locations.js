import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'

import ratios from '../../styles/ratios'
import { useNavigation } from '@react-navigation/native';

let {
    widthPixel,
    heightPixel,
    fontPixel
} = ratios;

const Locations = ({ locationData }) => {

const navigation = useNavigation();

    return (
        <View style={styles.container}>

            <View>
                <Image
                    source={require("../../assets/images/location.png")}
                />
            </View>


            <View>
                <Text style={styles.name}>{locationData?.location}</Text>
                <Text style={styles.street}>{locationData?.address}</Text>
            </View>


            <View>
                <TouchableOpacity 
                onPress={()=>navigation.navigate("XplafesDetail")}
                >
                    <Image
                        style={{ tintColor: "#372329" }}
                        source={require("../../assets/images/arrow.png")}
                    />
                </TouchableOpacity>
            </View>

        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        // flex: 1,
        backgroundColor: '#FFECD0',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: widthPixel(345),
        height: heightPixel(72),
        borderRadius: 12,
        borderWidth: 1,
        borderColor: "#FF3974",
        paddingHorizontal: widthPixel(22),
        marginBottom: heightPixel(15),
        shadowColor: "#000",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 5,
    },
    name: {
        color: "#FF3974",
        fontFamily: "Nunito-SemiBold",
        fontSize: fontPixel(24),
    },
    street: {
        color: "#372329",
        fontFamily: "Nunito-Regular",
        fontSize: fontPixel(14),
    }
})
export default Locations;