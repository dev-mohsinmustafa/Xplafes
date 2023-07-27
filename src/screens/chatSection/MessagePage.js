import React, { useEffect, useState } from 'react'
import { Alert, Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'


import AwesomeIcon from 'react-native-vector-icons/Ionicons';
import nopic from "../../assets/images/mohsin.png";

import ratios from '../../styles/ratios';
import AsyncStorage from '@react-native-async-storage/async-storage';
let {
    widthPixel,
    heightPixel,
    fontPixel,
    pixelSizeVertical,
    pixelSizeHorizontal,
} = ratios
import MaterialIcons from "react-native-vector-icons/MaterialIcons"


const MessagePage = ({ navigation, route }) => {

    // friend ka email aye ga
    const { fuseremail } = route.params;

    // kese aye ga to useEffect laga de
    useEffect(() => {
        loaddata();

        // console.log(fuseremail);
    }, [])


    // ab khud ka email be nikalna hai to hamne ne pehle wo async storage me save kiya hai waha se nikal lenge 
    // yani jo id email se ap login ho us ka data hmne profile page me storage krwaya async storage me
    // to us se ham khud ka email nikal lenge

    // hook bana len js se khud ka or dost ka data store hojaye
    const [ouruserdata, setOuruserdata] = useState(null);
    // friend userdata
    const [fuserdata, setFuserdata] = useState(null);
    const [loading, setLoading] = useState(null);


    const loaddata = () => {
        // es me 2 chez lani hain 1 khud ka data or 2 dost ka
        // in ko le ke ane ke leye AsyncStorage use krenege 

        // pehle hamne bola ke mera khud ka data leke ao
        AsyncStorage.getItem("user")
            // jese he data aye ga to
            // data ko agy pass kr deya value name ke variable ke ander
            .then(async (value) => {
                fetch("http://10.0.2.2:8090/userdata", {
                    // ab khud ka data nikal raha hun is leye mene userdata likha
                    // me ab check kronga ke mere pass token he be ke nai to us ke leye ne userdata wala call kr raha hun api

                    // jab ham friend ka call krenge to otheruserdata route call krnege
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        // jab tk APKE token nai ho to kise ke be chat na dekh pao
                        "Authorization": "Bearer " + JSON.parse(value).token,
                    },
                    body: JSON.stringify({ email: JSON.parse(value).user.email })
                })
                    .then(res => res.json())
                    .then(data => {
                        if (data.message === "User found") {
                            setOuruserdata(data.user);
                            console.log("our user data", data.user.fullName);



                            // ab mera data agya hai or mene dost ka be nikalna hai
                            //  copy route in otheruserdata
                            fetch("http://10.0.2.2:8090/otheruserdata", {
                                method: "POST",
                                headers: {
                                    "Content-Type": "application/json",
                                },
                                body: JSON.stringify({ email: fuseremail })
                            })
                                .then(res => res.json())
                                .then(data => {
                                    if (data.message == "User Found") {
                                        console.log("f user data", data.user.fullName);
                                        setFuserdata(data.user)
                                        setLoading(false)
                                    } else {
                                        Alert.alert("User Not Found");
                                        navigation.navigate("serachUserPage")
                                        setLoading(false)

                                    }
                                })
                                .catch(err => {
                                    console.log(err);
                                    Alert.alert("Something Went Wrong")
                                    navigation.navigate("serachUserPage")
                                    setLoading(false)


                                })






                        } else {
                            Alert.alert("Login Again")
                            navigation.navigate("Login")

                        }
                    })
                    .catch(err => {
                        console.log(err);
                        navigation.navigate("Login")

                    })

            })
            .catch(err => {
                console.log(err);
                navigation.navigate("Login")
            })

    }



    if (loading) {
        return (
            <View style={[styles.container, { justifyContent: 'center', alignItems: 'center' }]}>
                <ActivityIndicator size="large" color="red" />
            </View>
        );
    }

    return (
        <View style={styles.container}>

            <View style={styles.s1}>
                <TouchableOpacity
                    onPress={() => navigation.goBack()}
                >
                    <Image
                        style={{ tintColor: "white", width: 35, }}
                        source={require("../../assets/images/arrow-left.png")}
                    />
                </TouchableOpacity>

                {
                    // agr dost ka data agya hai to
                    fuserdata?.profilepic ?
                        <Image source={{ uri: fuserdata?.profilepic }} style={styles.profilepic} /> :
                        <Image source={nopic} style={styles.profilepic} />
                }
                <Text style={styles.username}>{fuserdata?.fullName}</Text>
            </View>

            <View style={styles.sbottom}>
                <TextInput style={styles.sbottominput}
                    placeholder='Type a message' placeholderTextColor={"white"} />

                <TouchableOpacity style={styles.sbottombtn}>
                    <MaterialIcons name="send" size={24} color="white"
                        onPress={() => sendMessage()}
                    />
                </TouchableOpacity>
            </View>


        </View>
    )
}

export default MessagePage;

const styles = StyleSheet.create({
    container: {
        // width: '100%',
        // height: '100%',
        flex: 1,
        backgroundColor: 'black',
    },
    profilepic: {
        width: 40,
        height: 40,
        borderRadius: 25,
    },
    username: {
        color: 'white',
        fontSize: 20,
        marginLeft: 10,
        fontWeight: 'bold'
    },
    s1: {
        width: '100%',
        alignItems: 'center',
        flexDirection: 'row',
        backgroundColor: "#111111",
        padding: 10,
    },
    sbottom: {
        width: '100%',
        height: 50,
        backgroundColor: '#111111',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 10,
        position: 'absolute',
        bottom: 0,
        borderRadius: 30,
    },
    sbottominput: {
        width: '80%',
        height: 40,
        fontSize: 17,
        color: 'white',
    },
    sbottombtn: {
        backgroundColor: "blue",
        borderRadius: 20,
        width: 40,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        paddingLeft: 5
    }

})