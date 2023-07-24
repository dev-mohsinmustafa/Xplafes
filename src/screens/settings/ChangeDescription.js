import React, { useEffect, useRef, useState } from 'react'
import {
    StyleSheet, Text, View, Image, ImageBackground, TextInput,
    TouchableOpacity, ScrollView, KeyboardAvoidingView, Platform, Keyboard, Alert, ActivityIndicator
} from 'react-native'


// 2nd method of code
import { errormessage, bwmessage } from '../../styles/CommonError';

import ratios from '../../styles/ratios';
import GoBack from '../../components/button/GoBack';
import MainButton from '../../components/mainButton/MainButton';
import AsyncStorage from '@react-native-async-storage/async-storage';





let {
    widthPixel,
    heightPixel,
    fontPixel,
    pixelSizeVertical,
    pixelSizeHorizontal,
} = ratios










const ChangeDescription = ({ navigation }) => {


    // ab ese compare krenge jo user enter krega code


    const [description, setdescription] = useState('')
    const [loading, setLoading] = useState(false);
    const [errormsg, setErrormsg] = useState(null);
    // ab mene data lena hai to 1 user ki hook bana lety hai




    // const sendToBackend = () => {
    //     console.log("Username change horaga console me to", fullName);

    //     // agr ye username hai to agy barho nai to error 
    //     if (fullName == "") {
    //         Alert.alert("Plese enter new username")
    //         setErrormsg("Please enter a new username");
    //     }
    //     else {
    //         setLoading(true);
    //         fectchData();
    //     }
    // }

    // ab hame yaha sab se pehle async storage se email nikalne hai kyo ke ham email ab waha provide 
    // ne kr rye pele ham route params se nikal rahe thy 
    // to us ke leye .get wala method likhna hai




    // const fectchData = async () => {
    //     console.log("Username change horaga console me to", fullName);
    //     try {
    //         const data1 = await AsyncStorage.getItem("user")
    //         const response = await fetch("http://10.0.2.2:8090/setusername", {
    //             method: "POST",
    //             headers: {
    //                 "Content-Type": "application/json",
    //             },
    //             body: JSON.stringify({
    //                 email: JSON.parse(data1).user.email, //ye email nikal lya
    //                 fullName: fullName                   //ye fullName nikal lya
    //             }),
    //             // ye email hamy pata params se araha hai or password jo uper hook banai us se araha hai 
    //             //or wapis bhej dya body ke ander ab ye backend me chla jaye ga 
    //         })
    //         // ye ab jo backend se response aya hai wo hao
    //         const data = await response.json()
    //         if (data.message === "Username Updated Successfully") {
    //             setErrormsg("Username Matched")
    //             setLoading(false)
    //             console.log("Dekho mohsin change howa hai username", data);

    //             Alert.alert("Username has been set Successfully");
    //             navigation.navigate("Settings1")

    //         }
    //         else if (data.err == "Invalid Credentials") {
    //             setLoading(false);
    //             AsyncStorage.removeItem("user")
    //             navigation.navigate("Login");
    //         }
    //         else {
    //             console.log("Dekho mohsin username aya ke nai", data);
    //             setLoading(false)
    //             Alert.alert("Username not available!! Try Username Again!")
    //         }
    //     }
    //     catch (err) {
    //         setLoading(false);
    //         Alert.alert("Server Error")
    //         console.log("Username not available");
    //     }
    // }



    const sendToBackend = () => {

        if (description == '') {
            Alert.alert('Please enter description')
        }
        else {
            setLoading(true)
            AsyncStorage.getItem('user').then(
                data => {
                    fetch('http://10.0.2.2:8090/setdescription', {
                        method: 'post',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                            email: JSON.parse(data).user.email,
                            description: description
                        })
                    })
                        .then(res => res.json())
                        .then(data => {
                            if (data.message === "Description Updated Successfully") {
                                setLoading(false)
                                Alert.alert('Description has been set successfully')
                                navigation.navigate('Settings1')
                            }
                            else if (data.error === "Invalid Credentials") {
                                Alert.alert('Invalid Credentials')
                                setLoading(false)
                                navigation.navigate('Login')
                            }
                            else {
                                setLoading(false)
                                Alert.alert("Please Try Again");
                            }
                        })
                        .catch(err => {
                            Alert.alert('Something went wrong')
                            setLoading(false)
                        })
                }
            )
                .catch(err => {
                    Alert.alert('Something went wrong')
                    setLoading(false)
                })
        }

        // navigation.navigate('Signup_ChoosePassword')
    }









    const scrollViewRef = useRef(null);

    useEffect(() => {
        const keyboardDidShowListener = Keyboard.addListener(
            'keyboardDidShow',
            _keyboardDidShow
        );
        const keyboardDidHideListener = Keyboard.addListener(
            'keyboardDidHide',
            _keyboardDidHide
        );

        return () => {
            keyboardDidShowListener.remove();
            keyboardDidHideListener.remove();
        };
    }, []);

    const _keyboardDidShow = () => {
        scrollViewRef.current.scrollTo({ y: 220, animated: true });
        // setHeightTop(260);
    };

    const _keyboardDidHide = () => {
        // setHeightTop(30);
    };

    return (




        <View style={styles.container}>

            <GoBack />


            <KeyboardAvoidingView style={{ flex: 1 }}
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            >
                <ScrollView style={{ flex: 1 }}
                    ref={scrollViewRef}
                >
                    <Image
                        style={{ borderRadius: 30, position: 'absolute', width: "100%", height: "100%", top: 0, zIndex: -1 }}
                        // resizeMode="contain"
                        source={require("../../assets/images/register.png")}
                    />
                    <View style={styles.textContainer}>
                        <View style={styles.container1}>
                            <Text style={styles.login}>Change Description</Text>
                        </View>
                        {/* <Text style={styles.bwmessage}>Please Change your Description </Text> */}

                        {/* yaha me ab error dekha deta hun agr user sara khush ni fill krta to */}
                        {
                            // 2nd method
                            errormsg ? <Text style={errormessage}>{errormsg}</Text> : null
                        }




                        <View style={{ marginTop: heightPixel(19) }}>
                            <View style={styles.container2}>
                                <Text style={styles.email}>Enter new description</Text>
                            </View>

                            <View style={styles.inputContainer}>
                                <TextInput
                                    placeholder='Please enter your new description'
                                    placeholderTextColor="black"
                                    style={[styles.input, styles.description]}
                                    onChangeText={(text) => setdescription(text)}
                                    onPressIn={() => setErrormsg(null)}
                                    multiline={true}
                                    numberOfLines={5}
                                />
                            </View>

                        </View>





                    </View>

                    <View style={styles.forgotContainer}>

                    </View>


                    {
                        loading ? <ActivityIndicator size={'large'} color="red" /> :


                            <View style={styles.imageContainer}>
                                <Image
                                    style={{ width: widthPixel(45), height: heightPixel(45) }}
                                    source={require("../../assets/images/google-logo.png")}
                                />
                                <Image
                                    style={{ width: widthPixel(45), height: heightPixel(45) }}
                                    source={require("../../assets/images/fb-logo.png")}
                                />
                                <Image
                                    style={{ width: widthPixel(45), height: heightPixel(45) }}
                                    source={require("../../assets/images/apple-logo.png")}
                                />
                            </View>

                    }



                    <View style={styles.registerButtonContainer}>
                        <Text style={styles.newHere}>New Here?</Text>
                        <TouchableOpacity
                            onPress={() => navigation.navigate("Register")}
                        >
                            <Text style={styles.register}> Register</Text>
                        </TouchableOpacity>
                    </View>

                    <TouchableOpacity onPress={() => sendToBackend()}>
                        <MainButton title="Save" />
                    </TouchableOpacity>


                </ScrollView>

            </KeyboardAvoidingView>
        </View>





    )
}



const styles = StyleSheet.create({
    container: {
        flex: 1,
        // backgroundColor: "red",
        backgroundColor: "#FF3974",
        borderRadius: 30,
        width: "100%",
        height: "100%",
    },
    textContainer: {
        // top: "65%",
        // position: 'absolute',

    },
    container1: {
        // flex: 0.2,
        // backgroundColor: "green",
        // width:widthPixel(338),
        // height:heightPixel(67),
        left: 21,
        // bottom: 20,
        marginTop: heightPixel(350),

    },
    login: {
        color: "#FFECD0",
        fontFamily: "Nunito-ExtraBold",
        fontSize: fontPixel(36),
    },

    bwmessage: {
        color: "red",
        backgroundColor: "white",
        marginHorizontal: 22,
        fontSize: 15,
        textAlign: "center",
        // padding: 5,
        borderRadius: 5,
    },
    email: {
        color: "#FFECD0",
        fontFamily: "Nunito-Italic",
        fontSize: fontPixel(14),
        // backgroundColor: "green",

    },
    inputContainer: {
        marginHorizontal: widthPixel(25),
        // height: widthPixel(40),
        // width: widthPixel(309)
        // width:"75%"
    },
    input: {
        borderWidth: 1,
        borderColor: "gray",
        borderRadius: 10,
        paddingHorizontal: widthPixel(10),
        backgroundColor:"#FFECD0",
    },
    description:{
        color: "#372329",
        fontFamily: "Nunito-Italic",
        fontSize: fontPixel(16),
    },
    container2: {
        // flex: 1,
        // backgroundColor:"yellow",
        left: 25,
        marginBottom: heightPixel(2)

    },
    forgotContainer: {
        // backgroundColor: "red",
        marginRight: widthPixel(75),
        alignItems: 'flex-end',
        // marginLeft: widthPixel(217),
        marginTop: heightPixel(13)
    },

    imageContainer: {
        flexDirection: 'row',
        marginLeft: widthPixel(25)
    },
    registerButtonContainer: {
        flexDirection: 'row',
        marginTop: heightPixel(74),
        marginLeft: widthPixel(34)
    },
    newHere: {
        color: "#FFECD0",
        fontFamily: "Nunito-Italic",
        fontSize: fontPixel(16),
        // backgroundColor: "green",
    },
    register: {
        color: "#FFECD0",
        fontFamily: "Nunito-Bold",
        fontSize: fontPixel(16),
        // backgroundColor: "gray",
    },

})




export default ChangeDescription;
