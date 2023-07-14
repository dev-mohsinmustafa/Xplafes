import React, { useEffect, useRef, useState } from 'react'
import {
    StyleSheet, Text, View, Image, ImageBackground, TextInput,
    TouchableOpacity, ScrollView, KeyboardAvoidingView, Platform, Keyboard, Alert, ActivityIndicator
} from 'react-native'


// 2nd method of code
import { errormessage, bwmessage } from '../../styles/CommonError';

import ratios from '../../styles/ratios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import GoBack from '../../components/button/GoBack';





let {
    widthPixel,
    heightPixel,
    fontPixel,
    pixelSizeVertical,
    pixelSizeHorizontal,
} = ratios










const ChangePassword = ({ navigation }) => {


    // const { email } = route.params;
    // console.log(email);
    // // ab ese compare krenge jo user enter krega code


    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmNewPassword, setConfirmNewPassword] = useState("");
    const [loading, setLoading] = useState(false);

    const [errormsg, setErrormsg] = useState(null);
    // ab mene data lena hai to 1 user ki hook bana lety hai




    const handlePasswordChange = () => {
        // agr ye dono password matched krty to agy barho nai to error 
        if (oldPassword == "" || newPassword == "" || confirmNewPassword == "") {
            Alert.alert("Plese fill all the fields")
            setErrormsg("Please fill all the fields");

        } else if (newPassword != confirmNewPassword) {
            setErrormsg("Password does not Matched")
            Alert.alert("New password and confirm new password does not Matched")
        }
        else {
            setLoading(true);
            // hamne email nikalna hai iskleye user likha
            AsyncStorage.getItem("user")
                .then(data => {
                    fetch("http://10.0.2.2:8090/changePassword", {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                            "Authorization": "Bearer " + JSON.parse(data).token,

                        },
                        // ye email hamy pata params se araha hai or password jo uper hook banai us se araha hai 
                        body: JSON.stringify({
                            oldPassword: oldPassword,
                            newPassword: newPassword,
                            // data string ke format me araha tha to usko pele parse kiya yani JSON me convert kiya
                            // or us ke ander user se email nikal lya
                            email: JSON.parse(data).user.email,
                        }),
                    })

                        .then(res => res.json())
                        .then(data => {
                            if (data.message === "Password Changed Successfully") {
                                Alert.alert(data.message);
                                AsyncStorage.removeItem("user")
                                setErrormsg("Password Code Matched")
                                setLoading(false)
                                navigation.navigate("Login")
                            }
                            else {
                                setLoading(false)
                                Alert.alert("wrong password !! Try Password Again")
                            }
                        })
                        .catch(err => {
                            setLoading(false);
                            Alert.alert(err)
                            console.log(err);
                        })
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
                            <Text style={styles.login}>Choose Password</Text>
                        </View>
                        <Text style={styles.bwmessage}>Choose a strong password </Text>

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
                                <Text style={styles.email}>Enter Old password</Text>
                            </View>

                            <View style={styles.inputContainer}>
                                <TextInput
                                    placeholder='Please enter your old password'
                                    placeholderTextColor="#FFECD0"
                                    style={[styles.input, styles.email]}

                                    onChangeText={(text) => setOldPassword(text)}

                                    secureTextEntry={true}

                                    onPressIn={() => setErrormsg(null)}


                                />
                            </View>

                        </View>


                        <View style={{ marginTop: heightPixel(19) }}>
                            <View style={styles.container2}>
                                <Text style={styles.email}>Enter New password</Text>
                            </View>

                            <View style={styles.inputContainer}>
                                <TextInput
                                    placeholder='Please enter your new password'
                                    placeholderTextColor="#FFECD0"
                                    style={[styles.input, styles.email]}

                                    onChangeText={(text) => setNewPassword(text)}

                                    secureTextEntry={true}

                                    onPressIn={() => setErrormsg(null)}


                                />
                            </View>

                        </View>



                        <View style={{ marginTop: heightPixel(19) }}>
                            <View style={styles.container2}>
                                <Text style={styles.email}>Confirm New password</Text>
                            </View>

                            <View style={styles.inputContainer}>
                                <TextInput
                                    placeholder='Please enter your confirm new password'
                                    placeholderTextColor="#FFECD0"
                                    style={[styles.input, styles.email]}

                                    onChangeText={(text) => setConfirmNewPassword(text)}

                                    secureTextEntry={true}

                                    onPressIn={() => setErrormsg(null)}


                                />
                            </View>

                        </View>


                    </View>

                    <View style={styles.forgotContainer}>
                        <TouchableOpacity
                            onPress={() => navigation.navigate("ForgotPassword")}
                        >
                            <Text style={styles.forgotButton}>Forgot Password?</Text>
                        </TouchableOpacity>
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

                    </View>



                    <View style={styles.button}>
                        <TouchableOpacity
                            onPress={() => handlePasswordChange()}
                        >
                            <Text style={styles.loginButton}>Next</Text>
                        </TouchableOpacity>
                    </View>
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
        marginTop: heightPixel(260),

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




export default ChangePassword;
