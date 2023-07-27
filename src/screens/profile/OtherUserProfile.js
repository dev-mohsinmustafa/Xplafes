import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View, ImageBackground, TouchableOpacity, Image, Pressable, Alert, ActivityIndicator, TextInput } from 'react-native'


import AwesomeIcon from 'react-native-vector-icons/Ionicons';
import AwesomeIcon1 from 'react-native-vector-icons/MaterialCommunityIcons';

import ratios from '../../styles/ratios';
import Header from '../../components/header/Header';


let {
    widthPixel,
    heightPixel,
    fontPixel,
    pixelSizeVertical,
    pixelSizeHorizontal,
} = ratios


const OtherUserProfile = ({ navigation, route }) => {

    const { user } = route.params;
    console.log("user ka data from params se liya get kiya", user);


    const [userdata, setUserdata] = useState(null);
    const [loading, setLoading] = useState(true);



    //   userdata kese nikalna hamne backend pe 1 hamne otheruserdata wala route banaya tha us se

    const loaddata = async () => {
        fetch("http://10.0.2.2:8090/otheruserdata", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email: user.email })
        })
            .then(res => res.json())
            .then(data => {
                if (data.message == "User Found") {
                    console.log("yaha to araha hai", data);
                    setUserdata(data.user)
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
    }

    // yaha ab get krna hai data
    // with try catch
    useEffect(() => {
        loaddata()
    }, [navigation]);
    console.log("async userdata from OtherUserProfile screen", userdata);








    if (loading) {
        return (
            <View style={[styles.container, { justifyContent: 'center', alignItems: 'center' }]}>
                <ActivityIndicator size="large" color="red" />
            </View>
        );
    }






    // BUTTONS
    // check follow or not
    // follow this user
    // unfollow user
    // block user

    // check myProfile or otherProfile
    // agr khud ki profile hai to button hide krwana hai







    return (
        <View style={styles.container}>



            <View style={styles.container2}>
                <Text style={styles.profile}>Profile</Text>





            </View>
            <Pressable style={styles.chatBubbles}
                onPress={() => navigation.navigate("AllChats")}>
                <AwesomeIcon name="chatbubbles" size={30} color="#FF3974"
                />
            </Pressable>

            <Pressable style={styles.search}
                onPress={() => navigation.navigate("SearchUserPage")}>
                <AwesomeIcon1 name="account-search" size={35} color="#FF3974"
                />
            </Pressable>

            <Pressable style={styles.refresh}
                onPress={() => loaddata()}>
                <AwesomeIcon name="refresh" size={30} color="red"
                />
            </Pressable>


            <View style={styles.container3}>
                {
                    // yaha pe ap bolo ge ke agr pic hai to uski length 0 se bari hogi na
                    userdata?.profilepic ?
                        // agr length o se bari to ye kam kro

                        <Image
                            style={styles.profilepic}
                            source={{ uri: userdata?.profilepic }}
                        />


                        :

                        <Image
                            source={require("../../assets/images/profile.png")}
                        />
                    // nahi to blank */}

                }

            </View>
            <View style={styles.container5}>
                <Text style={styles.follow}>Follow</Text>
                <TouchableOpacity onPress={()=>navigation.navigate("MessagePage", {fuseremail: userdata.email})}>
                <Text style={styles.message}>Message</Text>
                </TouchableOpacity>
            </View>



            {
                userdata ? (
                    <View style={styles.container4}>
                        {/* For practice */}
                        {/* <Text>frontend data</Text>
            <Text>Name:  {data.username}</Text>
            <Text>Email: {data.email}</Text>

            <Text>backend data</Text>
            <Text>Full Name / Username: {userdata.fullName}</Text>
            <Text>Email: {userdata.email}</Text>
            <Text>Password: {userdata.password}</Text> */}



                        <View style={styles.mainContainer}>
                            <Text style={styles.email}>Name</Text>
                        </View>

                        <View style={styles.inputContainer}>
                            <Text
                                // This will display the userdata.fullName value in the TextInput component.
                                //  Again, use the optional chaining operator ?. to access the fullName property 
                                //  without throwing an error in case userdata is null or undefined.
                                // value={userdata?.fullName}
                                placeholder='Marie Antoinette'
                                placeholderTextColor="#372329"
                                style={[styles.input, styles.inputField, { textAlign: 'center', height: heightPixel(50), textAlignVertical: 'center', backgroundColor: "red" }]}
                            >{userdata?.fullName}</Text>
                        </View>

                        <View style={{ marginTop: heightPixel(16) }}>
                            <View style={styles.mainContainer}>
                                <Text style={styles.email}>Email</Text>
                            </View>

                            <View style={styles.inputContainer}>
                                <Text
                                    // ? is ka mtlb agr error ata to show krwao
                                    // value={userdata?.email}
                                    placeholder='marieantoinette@gmail.com'
                                    placeholderTextColor="#372329"
                                    style={[styles.input, styles.inputField, { textAlign: 'center', height: heightPixel(50), textAlignVertical: 'center', backgroundColor: "red" }]}
                                >{userdata?.email}</Text>
                            </View>
                        </View>

                        <View style={{ marginTop: heightPixel(16) }}>

                            <View style={styles.mainContainer}>
                                <Text style={styles.email}>Description</Text>
                            </View>

                            <View style={styles.inputContainer}>
                                <TextInput
                                    placeholder='Web and Mobile App Developer'
                                    // placeholder='I am a Software Developer and I love to code'
                                    placeholderTextColor="#372329"
                                    style={[styles.input, styles.inputField, { textAlign: 'center', height: heightPixel(50), textAlignVertical: 'center', backgroundColor: "pink" }]}
                                    value={userdata?.description}
                                />
                                {/* {userdata?.description}</Text> */}
                            </View>
                        </View>



                    </View>
                )
                    :
                    (
                        <Text>No user data found</Text>

                        // <ActivityIndicator size={'large'} color="red" />
                    )
            }














        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#FFECD0",
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,

    },

    container2: {
        // backgroundColor: "gray",
        flex: 0.3,
        justifyContent: 'space-between',
        marginHorizontal: widthPixel(22),
        marginLeft: widthPixel(157),
        alignItems: 'center',
        flexDirection: 'row'

    },
    profile: {
        color: "#372329",
        fontFamily: "Nunito-SemiBold",
        fontSize: fontPixel(30),

    },

    container3: {
        // backgroundColor: "green",
        flex: 0.7,
        justifyContent: 'center',
        alignItems: 'center',
        // marginTop:12

    },
    profilepic: {
        width: 150,
        height: 150,
        borderRadius: 75
    },
    description: {
        backgroundColor: 'pink',
        width: "80%",
        height: 50,

    },
    container4: {
        // backgroundColor: "blue",
        flex: 1

    },
    mainContainer: {
        left: 32,
        marginBottom: heightPixel(7)
    },
    email: {
        color: "#372329",
        fontFamily: "Nunito-Bold",
        fontSize: fontPixel(18),
    },
    inputContainer: {
        marginHorizontal: widthPixel(28),

        // width:"75%"
    },
    input: {
        borderWidth: 1,
        borderColor: "#FFECD0",
        backgroundColor: "#FFECD0",
        borderRadius: 10,
        paddingHorizontal: widthPixel(10),
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 12,
        },
        shadowOpacity: 0.58,
        shadowRadius: 16.00,

        elevation: 24,
    },
    inputField: {
        color: "#372329",
        fontFamily: "Nunito-SemiBold",
        fontSize: fontPixel(20),
    },

    container5: {
        // backgroundColor: "yellow",
        // flex: 0.3,
        marginHorizontal: widthPixel(27),
        flexDirection: 'row',
        justifyContent: 'center'
    },
    follow: {
        color: 'white',
        fontSize: 20,
        fontWeight: 'bold',
        margin: 10,
        backgroundColor: '#0AD6A0',
        paddingVertical: 10,
        paddingHorizontal: 30,
        borderRadius: 20
    },
    message: {
        color: 'white',
        fontSize: 20,
        fontWeight: 'bold',
        margin: 10,
        backgroundColor: '#0AD6A0',
        paddingVertical: 10,
        paddingHorizontal: 30,
        borderRadius: 20
    },

    refresh: {
        position: 'absolute',
        top: 80,
        right: 16,
        zIndex: 1,
    },
    chatBubbles: {
        position: 'absolute',
        top: 20,
        right: 16,
        zIndex: 1,
    },
    search: {
        position: 'absolute',
        top: 20,
        left: 16,
        zIndex: 1,
    }

})

export default OtherUserProfile;