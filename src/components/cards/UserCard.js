import { Image, StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React from 'react'
import nopic from "../../assets/images/mohsin.png";
import { useNavigation } from '@react-navigation/native';


const UserCard = ({ user }) => {
    console.log("user from UserCard Screen", user);


    const navigation = useNavigation();

    return (

        <TouchableOpacity onPress={() => navigation.navigate("OtherUserProfile", {user: user})}>

            <View style={styles.userCard}>
                {user.profilepic ?
                    (
                        <Image
                            source={{ uri: user.profilepic }}
                            style={styles.image}
                        />) :

                    <Image
                        source={nopic}
                        style={styles.image}
                    />
                }

                <View style={styles.container1}>
                    <Text style={styles.username}>{user.fullName}</Text>
                </View>


            </View>
        </TouchableOpacity>

    )
}

export default UserCard;

const styles = StyleSheet.create({
    userCard: {
        flex: 1,
        backgroundColor: "#FF3974",
        marginVertical: 10,
        // marginTop: 10,
        borderRadius: 20,
        padding: 10,
        flexDirection: 'row',
        alignItems: 'center',
    },
    image: {
        width: 40,
        height: 40,
        borderRadius: 50,
    },
    container1: {
        marginLeft: 20,

    },
    username: {
        color: 'white',
        fontSize: 20,
        fontWeight: 'bold',
    },
    lastmessage: {
        color: '#372329',
        fontSize: 19,
    }
})