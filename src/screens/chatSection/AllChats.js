import React, { useState } from 'react'
import { Keyboard, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import Header from '../../components/header/Header'
import ChatCard from '../../components/cards/ChatCard'
import { chat, container1, searchbar } from '../../styles/CommonCss'




const AllChats = ({ navigation }) => {

    // abi hamne backend nai lgaya to ap 1 array bana ke image kr le
    // data dekhane ke leye card banana hai
    let chats = [
        {
            username: "user1",
            lastmessage: "hello",
            time: "12:00",
            profileimage: "https://picsum.photos/500/500"
        },
        {
            username: "mohsin",
            lastmessage: "Hey, how are you?",
            time: "1:00",
            profileimage: "https://picsum.photos/500/500"
        },
        {
            username: "user2",
            lastmessage: "hello",
            time: "12:00",
            profileimage: "https://picsum.photos/500/500"
        },
        {
            username: "saeed",
            lastmessage: "Hey, how are you?",
            time: "1:00",
            profileimage: "https://picsum.photos/500/500"
        },
        {
            username: "user3",
            lastmessage: "hello",
            time: "12:00",
            profileimage: "https://picsum.photos/500/500"
        },
        {
            username: "azam",
            lastmessage: "Hey, how are you?",
            time: "1:00",
            profileimage: "https://picsum.photos/500/500"
        },
        {
            username: "user4",
            lastmessage: "hello",
            time: "12:00",
            profileimage: "https://picsum.photos/500/500"
        },
        {
            username: "ahmad",
            lastmessage: "Hey, how are you?",
            time: "1:00",
            profileimage: "https://picsum.photos/500/500"
        },
        {
            username: "user5",
            lastmessage: "hello",
            time: "12:00",
            profileimage: "https://picsum.photos/500/500"
        },
        {
            username: "ali",
            lastmessage: "Hey, how are you?",
            time: "1:00",
            profileimage: "https://picsum.photos/500/500"
        },
        {
            username: "user6",
            lastmessage: "hello",
            time: "12:00",
            profileimage: "https://picsum.photos/500/500"
        },
        {
            username: "hassan",
            lastmessage: "Hey, how are you?",
            time: "1:00",
            profileimage: "https://picsum.photos/500/500"
        },
        {
            username: "user7",
            lastmessage: "hello",
            time: "12:00",
            profileimage: "https://picsum.photos/500/500"
        },
        {
            username: "hussain",
            lastmessage: "Hey, how are you?",
            time: "1:00",
            profileimage: "https://picsum.photos/500/500"
        },

    ]

    // agr search me sirf search wala user dekhe to us ke leye hooks banaty hai
    // jo be hm ne likha hoga wo is hook me aye ga is ko krene ke leye sirf filter laga den bs
    const [keyword, setKeyword] = useState("")
    console.log(keyword);

    return (
        <View style={styles.container}>
            <View style={{ flex: 0.1, marginTop: 10 }}>

                <Header title="Your Chats"
                    image1={require("../../assets/images/arrow-left.png")}
                    image2={require("../../assets/images/bible.png")}
                />
            </View>


            <ScrollView style={{ flex: 1 }}>
                <View style={container1}>
                    <Text style={chat}>Your Chats</Text>
                    <TextInput
                        placeholder='Search'
                        style={searchbar}
                        onChangeText={(text) => setKeyword(text)}


                    />
                </View>


                <View style={styles.container2}>
                    {
                        chats.filter(
                            (chat) => {
                                // agr blank hai to 
                                if (keyword == "") {
                                    return chat
                                }
                                // username.toLocaleLowerCase() === keyword.toLowerCase() 

                                // yani jo user ne name likha hai or jo hamne rkha hai to agr ye 2no baraabar hai to 
                                // to bs wohi wali chat return kr do
                                // else if (chat.username.toLocaleLowerCase() === keyword.toLowerCase()) {
                                else if (
                                    // agr include likhenge to pehla lafz likhe pe sab show honge
                                    chat.username.toLowerCase().includes(keyword.toLowerCase())
                                    ||
                                    // || iska mtlb ya sirf last chat search krne wale dekhe
                                    chat.lastmessage.toLowerCase().includes(keyword.toLowerCase())
                                ) {
                                    return chat
                                }
                            }
                        ).map((chat) => {
                            return (
                                <ChatCard
                                    key={chat.username} // beacuse username is unique
                                    chat={chat} //or agy bhej dya last msg username or time agy forward kr dya
                                // item={chats.username}
                                />
                            )
                        })



                    }
                </View>


            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#FFECD0",
        borderRadius: 30,
    },
 
    container2: {
        width: '100%',
        padding: 10,
    }
})

export default AllChats;