import React, { useEffect, useRef, useState } from 'react'
import {
    StyleSheet, Text, View, Image, ImageBackground, TextInput,
    TouchableOpacity, ScrollView, KeyboardAvoidingView, Platform, Keyboard, Alert
} from 'react-native'


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










const ForgotPasswordVerificationCode = ({ navigation, route }) => {


    const { useremail, userVerificationCode } = route.params;
    console.log(useremail, userVerificationCode);
    // ab ese compare krenge jo user enter krega code


    const [VerificationCode, setVerificationCode] = useState("");







    const [errormsg, setErrormsg] = useState(null);
    // ab mene data lena hai to 1 user ki hook bana lety hai




    const sendToBackend = () => {
        if (VerificationCode != userVerificationCode) {
            setErrormsg("Invalid Verfication Code");

            Alert.alert("Invalid Verfication Code")
        } else {
            setErrormsg("Verfication Code Matched")

            Alert.alert("Verfication Code Matched")
            navigation.navigate("ForgotPassword_ChoosePassword",{email: useremail})
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
                            <Text style={styles.login}>Forgot Password Code</Text>
                        </View>
                        <Text style={styles.bwmessage}>A verification code has been sent to you on your email </Text>

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
                                <Text style={styles.email}>Code</Text>
                            </View>

                            <View style={styles.inputContainer}>
                                <TextInput
                                    placeholder='Enter 6 digit Verfication Code'
                                    placeholderTextColor="#FFECD0"
                                    style={[styles.input, styles.email]}

                                    onChangeText={(text) => setVerificationCode(text)}

                                    secureTextEntry={true}

                                    onPressIn={() => setErrormsg(null)}


                                />
                            </View>

                        </View>


                    </View>
                    {/* </ImageBackground> */}

                    <View style={styles.forgotContainer}>
                        <TouchableOpacity
                            onPress={() => navigation.navigate("ForgotPassword")}
                        >
                            <Text style={styles.forgotButton}>Forgot Password?</Text>
                        </TouchableOpacity>
                    </View>

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




                    <View style={styles.registerButtonContainer}>
                        <Text style={styles.newHere}>New Here?</Text>
                        <TouchableOpacity
                            onPress={() => navigation.navigate("Register")}
                        >
                            <Text style={styles.register}> Register</Text>
                        </TouchableOpacity>
                    </View>

                    <TouchableOpacity onPress={() => sendToBackend()}>
                        <MainButton title="Verify" />
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
    button: {
        // alignItems: 'flex-end',
        backgroundColor: "#FFECD0",
        width: widthPixel(144),
        height: heightPixel(60),
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 7,
        marginHorizontal: widthPixel(30),
        alignSelf: 'flex-end',
        marginTop: -41,
    },
    loginButton: {
        color: "#372329",
        fontFamily: "Nunito-Italic",
        fontSize: fontPixel(24),
    }

})




export default ForgotPasswordVerificationCode;
