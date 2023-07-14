import React, { useEffect, useRef, useState } from 'react'
import {
    StyleSheet, Text, View, Image, ImageBackground, TextInput,
    TouchableOpacity, ScrollView, KeyboardAvoidingView, Platform, Keyboard, Alert, ActivityIndicator
} from 'react-native'
// import ErrorHandler from '../../components/ErrorHandler';


// 2nd method of code
import { errormessage, bwmessage } from '../../styles/CommonError';

import ratios from '../../styles/ratios';





let {
    widthPixel,
    heightPixel,
    fontPixel,
    pixelSizeVertical,
    pixelSizeHorizontal,
} = ratios







// day-6 video 
// aj ham page banane waly hai or code ko compare krenge ke sai be dala he ke nai user ne

// to uske leye hamy 1 extra route banana prega 


const Verification = ({ navigation, route }) => {

        // day-5 video
    // ab ham verification code ko compare krenege kis se jo hamne data bheja hai userdata ki form me
    //  us se next video me
    // ab hamne Register ke page me userdata be bheja hai to  usko verfication waly page me get krna hai 
    // take ham is data ko verification code se compare krna hai
    // to yaha pe simply route likh do 

    // day-5 video
    // or yaha pe likhenge 

    const { userdata } = route.params;

    // ab yaha hamy userdata se be sirf VerificationCode chahye bs
    // to us ke leye ham ne data ka index access krna hai [0] phr us me hamy VerificationCode access krna hai
    // ? question mark is leye lagagya ke jab tak data na ajaye tb tk agy na bharhoo
    // console.log("From Verification Page Component", userdata[0]?.VerificationCode);


    // is ke bad ham 1 form banaye ge jis me user value dale ga VerificationCode ki jo usy email me aye ga
    // or us value ko compare krenge is se userdata[0]?.VerificationCode ke agr uska email or ye same hai to user
    // verified hai nai to us ka account nai banaye ge
// end day-5


const [loading, setLoading] = useState(false);

    const [errormsg, setErrormsg] = useState(null);
    // ab mene data lena hai to 1 user ki hook bana lety hai
    const [userCode, setUserCode] = useState("XXXX");

    const [actualCode, setActualCode] = useState(null);

    // ab mene
    // useEffect is leye lagaya ke jese he page load ho to backend se code ko nikal lo userdata 
    //    ke ander se jo araha hai

    // useEffect(() => {
    //     setActualCode(userdata[0]?.VerificationCode)
    // }, [])

    useEffect(() => {
        if (userdata && userdata.length > 0) {
          setActualCode(userdata[0]?.VerificationCode);
        }
      }, [userdata]);
      





    const sendToBackend = () => {
        // ab code to same araha hai email or backend dono me ab hamy kese pta chlega ke user sai dal raha hai
        // to ab compare krenge neche 

        // log hamne practice keleye lagaya
        console.log("user code is", userCode);
        console.log("but actual code is", actualCode);

        //to ab ham ese compare krenge ke sai code dalo bhai

        // COMPARISON

        // agr usercode ki value jo ham ne default set ki hai ya || usercode ki value blank hai userCode === ""
        // to ham bolonge please enter the code or return kr do

        if (userCode == "XXXX" || userCode == "") {
            setErrormsg("Please enter the code");
            return;
        }
        // agr dono code sai hai to
        else if (userCode == actualCode) {
            setLoading(true)
            console.log("correct code");

            // ab agr sai dala hai user ne to ham bolenge ke 
            // ab me userdata bhejna chahta hun or us ko save krwana hai database me to
            // or userdata hamne uper get kiya howa hai route me
            // userdata hamne fullName,email, password me get kiya howa hai 
            const fdata = {
                // ab ham fdata me ye sab le rahy hai
                fullName: userdata[0]?.fullName,
                email: userdata[0]?.email,
                password: userdata[0]?.password,
            }
            // ab is ke bad me signup wala route FETCH kronga
            // ab ham wapis is data ko signup waly route me bhejen ge pele hamne banaya tha signup wala 
            // route lekin bad me hamne usy verify se change kr deya tha to ab ham usy bana lenge authRoute me

            // ab ham verification waly page pe signup wala route call kr rahy hai or 
            // signup waly page me verify wala route call kr rhy hai to ye dekhan rkhna
            fetch("http://10.0.2.2:8090/signup", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(fdata),
            })
                // response me token hai jo ham get krenge
                .then(res => res.json())
                .then(
                    data => {
                        console.log(data);

                        // ab yaha ham bolenge ke backend se data.message aye ga to 
                        if (data.message === "User Registered Successfully"){
                            setLoading(false)
                            Alert.alert(data.message);
                            navigation.navigate("Login")
                        }
                        else{
                            setLoading(false)
                            Alert.alert("Something went wrong !! Try Signing Up Again")
                        }
                    })

        }
        // agr galat dala diya user ne to wo else me aye ga
        else if (userCode != actualCode) {
            setErrormsg("Incorrect code");
            return;
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
            {/* ab hamne code save krwa leya hai or yaha ham 1 textinput lenge or us me user dale ga or 
            usy compare krenge jo email me code aye ga agr sai hoga to ok hai next video me */}

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
                            <Text style={styles.login}>Verification</Text>
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

                                    onChangeText={(text) => setUserCode(text)}

                                    secureTextEntry={true}

                                    onPressIn={() => setErrormsg(null)}


                                />
                            </View>

                        </View>


                    </View>
                    {/* </ImageBackground> */}

                    <View style={styles.forgotContainer}>
                        <TouchableOpacity 
                        onPress={()=>navigation.navigate("ForgotPassword")}
                        >
                            <Text style={styles.forgotButton}>Forgot Password?</Text>
                        </TouchableOpacity>
                    </View>


{ loading ? <ActivityIndicator size={'large'} color="red" />  : 

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



                    <View style={styles.button}>
                        <TouchableOpacity
                            onPress={() => sendToBackend()}
                        >
                            <Text style={styles.loginButton}>Verifyjkj</Text>
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
        padding: 5,
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




export default Verification;
