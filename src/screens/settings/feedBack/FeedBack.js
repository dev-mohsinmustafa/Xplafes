
import React, { useEffect, useState, useMemo } from 'react'
import { StyleSheet, Text, View, TouchableOpacity, Alert, TextInput, ActivityIndicator, ScrollView, } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage';

import ratios from '../../../styles/ratios';
import Header from '../../../components/header/Header';
import Button from '../../../components/button/Button';
import { errormessage } from '../../../styles/CommonError';
import RadioGroup from 'react-native-radio-buttons-group';

let {
    widthPixel,
    heightPixel,
    fontPixel,
    pixelSizeVertical,
    pixelSizeHorizontal,
} = ratios


const FeedBack = ({ navigation }) => {


    const [feedback, setfeedback] = useState('')
    const [loading, setLoading] = useState(false);
    const [errormsg, setErrormsg] = useState(null);
    const [selectedId, setSelectedId] = useState();



    const radioButtons = useMemo(() => ([
        {
            id: '1', // acts as primary key, should be unique and non-empty string
            label: 'Neither Satisfied or dissatisfied',
            value: 'option1'
        },
        {
            id: '2',
            label: 'Neither Satisfied or dissatisfied',
            value: 'option2'
        },
        {
            id: '3',
            label: 'Neither Satisfied or dissatisfied',
            value: 'option3'
        },

    ]), []);

    const sendToBackend = () => {

        if (feedback == '') {
            setErrormsg("Please enter your feedback");
            Alert.alert('Please enter feedback')
        }
        else {
            setLoading(true)
            AsyncStorage.getItem('user').then(
                data => {
                    fetch('http://10.0.2.2:8090/setfeedback', {
                        method: 'post',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                            email: JSON.parse(data).user.email,
                            feedback: feedback
                        })
                    })
                        .then(res => res.json())
                        .then(data => {
                            if (data.message === "FeedBack Updated Successfully") {
                                setLoading(false)
                                Alert.alert('FeedBack has been set successfully')
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




    if (loading) {
        return (
            <View style={[styles.container, { justifyContent: 'center', alignItems: 'center' }]}>
                <ActivityIndicator size="large" color="red" />
            </View>
        );
    }









    return (
        <ScrollView style={styles.container}>

            <View style={{ flex: 0.2, marginTop: heightPixel(20), }}>
                <Header title="FeedBack" marginLeft={31} marginLeft1={27}
                    image1={require("../../../assets/images/arrow-left.png")}
                    image2={[]}
                />
            </View>


            <View style={styles.radioGroup}>
                <Text>Overall, how did you feel about the services?</Text>

                <RadioGroup
                    style={styles.radioButton}
                    radioButtons={radioButtons}
                    onPress={setSelectedId}
                    selectedId={selectedId}
                />
            </View>




            <View style={styles.container2}>
                <Text style={styles.message}>How could we improve our services?</Text>
            </View>

            {
                errormsg ? <Text style={errormessage}>{errormsg}</Text> : null
            }

            <View style={styles.container5}>
                <TextInput
                    placeholder='Please enter your FeedBack'
                    placeholderTextColor="#372329"
                    onChangeText={(text) => setfeedback(text)}
                    onPressIn={() => setErrormsg(null)}
                    multiline={true}
                    numberOfLines={20}
                // style={styles.input}
                />
            </View>
            <View style={{ marginHorizontal: widthPixel(22),marginTop:5 }}>
                <Text style={styles.message}>Characters Limit 1200</Text>
            </View>







            <TouchableOpacity style={styles.button} onPress={() => sendToBackend()}>
                <Button title="Give FeedBack !" />
            </TouchableOpacity>


        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#FFECD0",
        borderRadius: 30,

    },
    container1: {
        // flex: 0.1,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        backgroundColor: "#FFFFFF",
        borderRadius: 15,
        marginHorizontal: widthPixel(22),
        height: 46
    },
    text: {
        color: "#372329",
        fontFamily: "Nunito-Regular",
        fontSize: fontPixel(18),
    },
    radioGroup: {
        marginTop: heightPixel(20),
        marginHorizontal: widthPixel(22),
        justifyContent: 'flex-start',
        alignItems: 'flex-start',



    },
    radioButton: {
        backgroundColor: "pink",

    },

    container2: {
        flex: 0.2,
        // backgroundColor: "red",
        marginVertical: heightPixel(10),
        justifyContent: 'center',
        marginHorizontal: widthPixel(20),
    },
    message: {
        color: "#372329",
        fontFamily: "Nunito-Regular",
        fontSize: fontPixel(20),
    },
    container3: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginHorizontal: widthPixel(24),
    },
    container4: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginHorizontal: widthPixel(24),
    },
    container5: {
        backgroundColor: "#FFFFFF",
        borderRadius: 17,
        marginHorizontal: widthPixel(20),
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        // height: 345
    },
    input: {
        borderWidth: 1,
        borderColor: "#372329",
        borderRadius: 10,
        paddingHorizontal: widthPixel(10),
        backgroundColor: "#FFFFFF",
        width: "100%",
        height: "100%"
    },
    button: {
        flex: 0.3,
        marginTop: 19,
    }


})

export default FeedBack;