import React, { useEffect, useRef, useState } from 'react'
import {
    StyleSheet, Text, View, Image, ImageBackground, TextInput,
    TouchableOpacity, ScrollView, KeyboardAvoidingView, Platform, Keyboard, Alert, ActivityIndicator
} from 'react-native'
// import ErrorHandler from '../../components/ErrorHandler';


// 2nd method of code
import { errormessage, bwmessage } from '../../styles/CommonError';

import ratios from '../../styles/ratios';
import GoBack from '../../components/button/GoBack';
import MainButton from '../../components/mainButton/MainButton';





let {
    widthPixel,
    heightPixel,
    fontPixel,
    pixelSizeVertical,
    pixelSizeHorizontal,
} = ratios









const ForgotPassword = ({ navigation, route }) => {




    const [errormsg, setErrormsg] = useState(null);
    // ab mene data lena hai to 1 user ki hook bana lety hai


    // new code 
    // ab sbse pehle hamara kam hai enter email wala uske leye 2 hooks bana lo
    const [email, setEmail] = useState("")
    const [loading, setLoading] = useState(false)





    const sendToBackend = () => {
        if (email === "") {
            setErrormsg("Please enter your email");
            Alert.alert("Please enter your email");
            return
        }
        else {
            setLoading(true)
            fetch("http://10.0.2.2:8090/verifyForgotPassword", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email: email }),
            })
                .then(res => res.json())
                .then(data => {

                    if (data.error === 'Invalid Credentials') {
                        setLoading(false)
                        setErrormsg("Invalid Credentials")
                    }
                    // or dosra agr wo hamara message match krta howa verification code se to 
                    else if (data.message === "Verification Code Sent to your Email") {
                        setLoading(false)
                        console.log(data.userdata);
                        Alert.alert(data.message);
                        navigation.navigate("ForgotPasswordVerificationCode", {
                            useremail: data.email,
                            userVerificationCode: data.VerificationCode,
                        })
                    }

                })
        }
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
                            <Text style={styles.login}>Password Reset </Text>
                        </View>
                        <Text style={styles.bwmessage}>
                            Verify your email address
                        </Text>

                        {/* yaha me ab error dekha deta hun agr user sara khush ni fill krta to */}
                        {
                            // 1st method
                            // errormsg ? <ErrorHandler /> : null

                            // 2nd method
                            errormsg ? <Text style={errormessage}>{errormsg}</Text> : null

                            // 3rd method
                            // errormsg && <ErrorHandler title={errormsg} />

                        }




                        <View style={{ marginTop: heightPixel(19) }}>
                            <View style={styles.container2}>
                                <Text style={styles.email}>Verify your email address</Text>
                            </View>

                            <View style={styles.inputContainer}>
                                <TextInput
                                    placeholder='info@example.com'
                                    placeholderTextColor="#FFECD0"
                                    style={[styles.input, styles.email]}

                                    onChangeText={(text) => setEmail(text)}

                                    // secureTextEntry={true}

                                    onPressIn={() => setErrormsg(null)}


                                />
                            </View>

                        </View>


                    </View>
                    {/* </ImageBackground> */}

                    <View style={styles.forgotContainer}>
                        {/* <TouchableOpacity>
                            <Text style={styles.forgotButton}>Forgot Password?</Text>
                        </TouchableOpacity> */}
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
                        <Text style={styles.newHere}>New Here? </Text>
                        <TouchableOpacity
                            onPress={() => navigation.navigate("Register")}
                        >
                            <Text style={styles.register}>Register</Text>
                        </TouchableOpacity>
                    </View>


                    <TouchableOpacity onPress={() => sendToBackend()}>
                        <MainButton title="Next" />
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
        marginTop: heightPixel(396),

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
        height: widthPixel(40),
        width: widthPixel(309)
        // width:"75%"
    },
    input: {
        borderWidth: 1,
        borderColor: "#FFECD0",
        borderRadius: 10,
        paddingHorizontal: widthPixel(10),
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
    forgotButton: {
        color: "#FFECD0",
        fontFamily: "Nunito-Bold",
        fontSize: fontPixel(14),
        // backgroundColor: "blue",
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




export default ForgotPassword;
