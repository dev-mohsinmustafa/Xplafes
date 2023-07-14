import React, { useEffect, useRef, useState } from 'react'
import {
    Image, ImageBackground,
    StyleSheet, Text, View, TextInput, TouchableOpacity, ScrollView,
    KeyboardAvoidingView, Platform, Keyboard, Alert, ActivityIndicator
} from 'react-native';
import ratios from '../../styles/ratios';
import ErrorHandler from '../../components/ErrorHandler';

import { errormessage, bwmessage } from '../../styles/CommonError';
import MainButton from '../../components/mainButton/MainButton';



let {
    widthPixel,
    heightPixel,
    fontPixel,
    pixelSizeVertical,
    pixelSizeHorizontal,
} = ratios





const Register = ({ navigation }) => {


    // day 4 video
    // aj ham frontend ko backend se connect krenge  

    // signup/ register me ham full name email or password liya hai or ab 

    // ham 1 kam krty hai 1 hook bana lety hain jis me ham ye sary values store krwany waly hain  

    // yaha me simply likhonga const or apni hook ka name fdata rkhonga 
    // jis me hamara name email current users ka saved rhe ga
    const [fdata, setFdata] = useState({
        // ab ham yaha apna data bhej denge

        fullName: "",
        email: "",
        password: ""

        // initially ap values blank he rkhoge na 

        // ye sare values jo hamne backend me schema banaya hai usme add be krenge 

    });


    // ab ham 1 error message ka be bana lete hai agr mujhe koi error ata hai backend se ya mujhse koi mistake hai frontend se 
    // jese agr password sai nai hai 

    const [errormsg, setErrormsg] = useState(null);
    const [loading, setLoading] = useState(false);

    // yaha me check kroga ke jo email hai jis se user signup kr raha wo pehle se mere database me hai to me usy signup ne krne doga
    //  balqe usy error show krwa donga ke bhai tm pehle he signup kr chuky ho 
    // to uske leye pehle jaha hmne input fields lagai hai unko get krna prenge values



    // jo neche function banaya 

    const sendToBackend = () => {
        // pehle me check kr leta hun ke button call be horaha hai ya nai
        console.log(fdata);

        // ab hamara pass sara data araha hai console.log(fdata); es se

        // ab hame check krna ke bhai agr koi fields empty hai to ham 1 error dekhaye ge please fill all fields 
        if (fdata.fullName === "" || fdata.email === "" || fdata.password === "") {
            setLoading(false)
            // agr in me se kush me blank hai to 1 error set krdo
            setErrormsg("All fields are required");
            // ab ye error message ap kahi pe be dekha skty ho jese me form ke top me he dekha deta hu
            return
        }


        //neche error ka jo code kiya hai usko dekhane ke bad hamne check krna hai agr user ne sab kush sai
        // dala hai to 

        // ye code mere app me nai hai lekin agr confrom password be ho kisi app me to ye krenge
        // ab ham check krenge ke password of conform password match krta hai ke nai
        // agr match krta hai to signup krwa do nai to 1 or error de do user ko
        // yaha ham es ke else me 1 condition or laga dete hai 
        // else {

        //     // ab yaha me bol skta hun 
        //     // != es ka matlb agr match nai krta hai to kis se cpassword se
        //     if (fdata.password != fdata.cpassword)
        //         // agr ye dono match ne krty to hame 1 error dedo
        //         setErrormsg("Password and Confirm Password must be same ");
        //     return;
        // }

        // ab hame krna hai ke agr sab khush ok hai user ka to 1 api fetch krni hai
        else {
            setLoading(true)
            // try {
            // ye adress change me hoskta hai lekin abi ke leye ap yehe krenge
            // signup ka matlab ham server ko target kr rahy hai signup waly route ko 
            // backend wale route ko connect krne ke leye 

            // or oske bad signup ke bad ham comma laga denge or ab data bheje ge  
            fetch("http://10.0.2.2:8090/verify", {
                // day-5 video
                // ab ham yaha pe pele verify ka route call krenge mtlb pele ham verify krwa lenge bad me signup ko call krenge jb ham email ko verify krlenge
                // to uske bad data save kr lenge database me
                // end


                // to ab apko pehle method specify krna hai
                method: "POST",
                // uske headers ap kya bhej rhy ho
                headers: {
                    "Content-Type": "application/json",
                },
                // or eske bad ham body json stringify
                // yani hamne bola jo be uper FRONTEND me hamne data likha hai usko backend me bhejdo
                // fdata ka matlab sara data 
                body: JSON.stringify(fdata),
            })
                // ab hmne uper wale code me request bhej de ab ham 
                // response get krna chahty hain to osko json format me bhjen ge
                .then(res => res.json())
                // ab is se jo be hamy error milega json me to usko be ham priny krwa lenge
                // ham data ko print krwaye ge mtlb ham bolenge ke agr data hai to print krwa do 
                .then(
                    data => {
                        // console.log(data);

                        // day-5 video
                        // to abhi ke leye ham 1 error dekha denge sirf  invalid wala


                        if (data.error === 'Invalid Credentials') {
                            setErrormsg("Invalid Credentials");
                            setLoading(false)

                        }
                        // or dosra agr wo hamara message match krta howa verification code se to 
                        else if (data.message === "Verification Code Sent to your Email") {
                            setLoading(false)

                            console.log(data.userdata);
                            Alert.alert(data.message);
                            navigation.navigate("Verification", { userdata: data.userdata })
                        }





                        // 


                        // day-4
                        // ab  jo error ata hai response me aye ga jo usko be set kr lenge
                        // if (data.error) {
                        //     setErrormsg(data.error)
                        // }
                        // // agr mera sab kush sai hai to me bolonga ke 
                        // // ab hamara account to ban raha hai ab ham login krwaty hai uske leye login page me jaye
                        // else{
                        //     Alert.alert("Account Created Successfully")
                        //     navigation.navigate("Login")
                        // }
                        // day-4
                    }
                )

        }
    }


    // ab is ko me kis se compare kronga yani me 1 new page pe route krwa donga  ke jab user agle bar  apni email se ye exact code dale ga
    // jo hamne uski mail me bheja hai to
    // yani 1 code apki app me hai to usko email waly se compare krenge agr usne sai dala to usko verify kr denge 
    // yaha 1 component bana lety verification ke name se
    // ab hamary pass code araha hai to ham ese agy page me route krwa denge
    // ab ham page me jaye ge verification waly 






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
            <KeyboardAvoidingView style={{ flex: 1 }}
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            >
                <ScrollView style={{ flex: 1 }}
                    ref={scrollViewRef}
                >
                    <Image
                        style={{ borderRadius: 30, position: 'absolute', width: "100%", top: 0, zIndex: -1, height: "100%" }}
                        // resizeMode="contain"
                        source={require("../../assets/images/register.png")}
                    />



                    <View style={styles.textContainer}>
                        <View style={styles.container1}>
                            <Text style={styles.login}>Register</Text>
                        </View>

                        {/* yaha me ab error dekha deta hun agr user sara khush ni fill krta to */}
                        {
                            // yaha pe me bolonga ke agr errormsg null nai hai to directlly error msg dekha do 

                            // ? eska matlab hai ke agr errormsg null nai hai to ap direct errormsg dekha do nai to null yani kush be na dekhao
                            // errormsg ? <ErrorHandler title="All fields are required"/> : null
                            // ye wala null es leye dekhaya kyo ke agr ye nai dekhayen to app me space ajaye ge us jagah fullname me

                            // ab jo error show horaha usko me hatana hai yani agr me ab fullname pe press kro to error remove hojaye
                            // to uske leye onPressIn() 

                            // 2nd method 
                            // errormsg ? <Text style={errormessage}>{errormsg}</Text> : null

                            // 3rd method
                            errormsg && <ErrorHandler title={errormsg} />



                        }
                        <View style={styles.container2}>
                            <Text style={styles.email}>Full Name</Text>
                        </View>

                        <View style={styles.inputContainer}>
                            <TextInput
                                placeholder='Enter your full name'
                                placeholderTextColor="#FFECD0"
                                style={[styles.input, styles.email]}

                                // to uske leye pehle jaha hmne input fields lagai hai unko get krna prenge values
                                // to usme ham ese likhenge 
                                onChangeText={(text) => setFdata({ ...fdata, fullName: text })}
                                // onchangetext me hamne jo be text likha man lo ke mene apna name Mohsin likha 
                                // or jo fdata mene banaya jo be array hai fdata ki usme jo fullname wali field hai usme add krdo jo ap ne likha hai mtlb mne Mohsin likha
                                // to usko add kr do
                                // yani ke full name wali field me Mohsin add krdo
                                // same yehe kam hamne baqi input fields me krna hai 



                                // error hatane ke leye
                                // ab jo error show horaha usko me hatana hai yani agr me ab fullname pe press kro to error remove hojaye
                                // to uske leye onPressIn() 

                                onPressIn={() => setErrormsg(null)}

                            />

                        </View>

                        <View style={{ marginTop: heightPixel(14) }}>

                            <View style={styles.container2}>
                                <Text style={styles.email}>Email</Text>
                            </View>

                            <View style={styles.inputContainer}>
                                <TextInput
                                    placeholder='Enter your email'
                                    placeholderTextColor="#FFECD0"
                                    style={[styles.input, styles.email]}

                                    onChangeText={(text) => setFdata({ ...fdata, email: text })}
                                    onPressIn={() => setErrormsg(null)}


                                />
                            </View>
                        </View>

                        <View style={{ marginTop: heightPixel(19) }}>
                            <View style={styles.container2}>
                                <Text style={styles.email}>Password</Text>
                            </View>

                            <View style={styles.inputContainer}>
                                <TextInput
                                    placeholder='Enter your password'
                                    placeholderTextColor="#FFECD0"
                                    style={[styles.input, styles.email]}
                                    // yaha pe 1 important chez hai ke agr ap password me ... ese dekhana chahty hai to ye krenege
                                    secureTextEntry={true}

                                    onChangeText={(text) => setFdata({ ...fdata, password: text })}
                                    // jitna be data hai wo ab hamary pass ajaye ga
                                    // eske bad me ham register wale button pe backend lagaye ge

                                    onPressIn={() => setErrormsg(null)}


                                />
                            </View>

                        </View>


                    </View>
                    {/* </ImageBackground> */}

                    {/* <View style={styles.forgotContainer}>
                <TouchableOpacity>
                    <Text style={styles.forgotButton}>Forgot Password?</Text>
                </TouchableOpacity>
                </View> */}

                    {loading ? <ActivityIndicator size={'large'} color="red" /> :

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
                        <Text style={styles.newHere}>Already Member?</Text>
                        <TouchableOpacity
                            onPress={() => navigation.navigate("Login")}
                        >
                            <Text style={styles.register}> Login</Text>
                        </TouchableOpacity>
                    </View>



                    <TouchableOpacity onPress={() => sendToBackend()}>
                        <MainButton title="Register" />
                    </TouchableOpacity>

                    {/* <View style={styles.button}>
                        <TouchableOpacity
                            // eske bad me ham register wale button pe backend lagaye ge
                            // to yaha sendToBackend ka me 1 function bana donga
                            // or ese uper declare kr doga
                            onPress={() => { sendToBackend(); }}
                        >
                            <Text style={styles.loginButton}>Register</Text>
                        </TouchableOpacity>
                    </View> */}
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
        height: "100%"
    },
    textContainer: {
        // top: "65%",
        // position: 'absolute',

    },
    container1: {
        // flex: 0.2,
        // backgroundColor: "green",
        left: 21,
        bottom: 20,
        marginTop: heightPixel(332),

    },
    login: {
        color: "#FFECD0",
        fontFamily: "Nunito-ExtraBold",
        fontSize: fontPixel(36),

    },
    email: {
        color: "#FFECD0",
        fontFamily: "Nunito-Italic",
        fontSize: fontPixel(14),
        // backgroundColor: "green",

    },
    inputContainer: {
        marginHorizontal: widthPixel(21),
        height: widthPixel(40),
        width: widthPixel(309)
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
        left: 21,
        marginBottom: heightPixel(2)

    },
    forgotContainer: {
        marginHorizontal: widthPixel(20),
        alignItems: 'flex-end',
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
        marginLeft: widthPixel(25),
        marginTop: heightPixel(26)
    },
    registerButtonContainer: {
        flexDirection: 'row',
        marginTop: heightPixel(73),
        marginLeft: widthPixel(25)
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




export default Register;
