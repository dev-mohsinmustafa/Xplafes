import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'

const ChatCard = ({ chat }) => {
    console.log(chat);
    return (
        <View style={styles.chartCard}>
            <Image
                source={{ uri: chat.profileimage }}
                style={styles.image}
            />

            <View style={styles.container1}>
                <Text style={styles.username}>{chat.username}</Text>
                <Text style={styles.lastmessage}>{chat.lastmessage}</Text>
            </View>

        </View>
    )
}

export default ChatCard;

const styles = StyleSheet.create({
    chartCard: {
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
    lastmessage:{
        color: '#372329',
        fontSize: 19,
    }
})