import React, { useEffect, useState } from 'react'
import {
    StyleSheet, Text, View, Image, ImageBackground, TextInput,
    TouchableOpacity, ScrollView, KeyboardAvoidingView, Platform, Keyboard, Alert, ActivityIndicator
} from 'react-native'




import ratios from '../../styles/ratios';
import GoBack from '../../components/button/GoBack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Button from '../../components/button/Button';



import { launchImageLibrary } from 'react-native-image-picker';

import ImagePicker from 'react-native-image-crop-picker';


import { getStorage, ref, uploadBytes, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { initializeApp } from 'firebase/app';




let {
    widthPixel,
    heightPixel,
    fontPixel,
    pixelSizeVertical,
    pixelSizeHorizontal,
} = ratios

const firebaseConfig = {
    apiKey: "AIzaSyDF4pqIIVEnLB9ygMlfgm2Am7oUnq5cbGk",
    authDomain: "womensafetyapp-eaeb2.firebaseapp.com",
    projectId: "womensafetyapp-eaeb2",
    storageBucket: "womensafetyapp-eaeb2.appspot.com",
    messagingSenderId: "1035857805556",
    appId: "1:1035857805556:web:27697254808eb90afbdea1"
};

const app = initializeApp(firebaseConfig);
const storage = getStorage(app);






const UploadProfilePicture = ({ navigation }) => {



    const [image, setImage] = useState("");
    const [userdata, setUserdata] = useState(null);


    const [loading, setLoading] = useState(false);
    const [uploading, setUploading] = useState(false);
    const [transferred, setTransferred] = useState(0);


    const handleUpload2 = () => {

        choosePhotoFromLibrary()

        AsyncStorage.getItem("user")
            .then(data => {
                setUploading(true)
                // setLoading(true)
                submitPost().then(imageUri => {

                    // agr profilepage me ye updateprofilepicture dekhane hai to ye likhe or uper 
                    // (updateProfilePicture) ye bhej den bs
                    // Update the profile picture URL in the parent component
                    //   updateProfilePicture(imageUri);

                    fetch("http://10.0.2.2:8090/setprofilepic", {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify({ email: JSON.parse(data).user.email, profilepic: imageUri })
                    })
                        // })
                        .then(res => res.json())
                        .then(data => {
                            if (data.message === "Profile Picture Uploaded Successfully") {
                                console.log("profile aye ke nai", data);

                                setUserdata(data.user);
                                setUploading(false)
                                // setLoading(false)
                                Alert.alert("Profile Picture Uploaded Successfully")
                                navigation.navigate("Settings1")
                            }
                            else if (data.error === "Invalid Credentials") {
                                Alert.alert("Invalid Credentials")
                                // setLoading(false)
                                setUploading(false)
                                navigation.navigate("Login")
                            }
                            // else {
                            //     setUploading(false)
                            //     // setLoading(false)
                            //     Alert.alert("Please Try Again!")
                            // }
                        })
                        .catch(err => {
                            console.log(err)
                        })
                })
            })
    }




    const handleUpload = () => {
        AsyncStorage.getItem("user")
            .then(data => {
                setUploading(true)
                // setLoading(true)
                submitPost().then(imageUri => {

                    // agr profilepage me ye updateprofilepicture dekhane hai to ye likhe or uper 
                    // (updateProfilePicture) ye bhej den bs
                    // Update the profile picture URL in the parent component
                    //   updateProfilePicture(imageUri);

                    fetch("http://10.0.2.2:8090/setprofilepic", {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify({ email: JSON.parse(data).user.email, profilepic: imageUri })
                    })
                        // })
                        .then(res => res.json())
                        .then(data => {
                            if (data.message === "Profile Picture Uploaded Successfully") {
                                console.log("profile aye ke nai", data);

                                setUserdata(data.user);
                                setUploading(false)
                                // setLoading(false)
                                Alert.alert("Profile Picture Uploaded Successfully")
                                navigation.navigate("Settings1")
                            }
                            else if (data.error === "Invalid Credentials") {
                                Alert.alert("Invalid Credentials")
                                // setLoading(false)
                                setUploading(false)
                                navigation.navigate("Login")
                            }
                            // else {
                            //     setUploading(false)
                            //     // setLoading(false)
                            //     Alert.alert("Please Try Again!")
                            // }
                        })
                        .catch(err => {
                            console.log(err)
                        })
                })
            })
    }




    //
    // const pickImage = async () => {
    //     const options = {
    //         mediaType: 'photo',
    //         allowsEditing: true,
    //         aspectRatio: [1, 1],
    //         quality: 1,
    //     };
    //     //
    //     launchImageLibrary(options, async (response) => {
    //         if (!response.didCancel) {
    //             // const source = { uri: response.uri };
    //             // setImage(source);
    //             const imageUri = Platform.OS === 'ios' ? response.sourceURL : response.path;
    //             setImage(imageUri);

    //             try {
    //                 const response = await fetch(imageUri);
    //                 const blob = await response.blob();

    //                 const storageRef = ref(storage, filename);

    //                 // Create an upload task using the storage reference
    //                 const uploadTask = uploadBytesResumable(storageRef, blob);
    //                 // const uploadTask = firebase.storage().ref().child(filename).put(blob);
    //                 // const ref = firebase.storage().ref().child(filename);

    //                 const filename = response.uri.substring(response.uri.lastIndexOf('/') + 1);

    //                 uploadTask.on(
    //                     'state_changed',
    //                     (snapshot) => {
    //                         // Handle progress updates if needed
    //                         const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
    //                         console.log('Upload is ' + progress + '% done');
    //                     },
    //                     (error) => {
    //                         // Handle unsuccessful upload
    //                         console.error(error);
    //                     },
    //                     () => {
    //                         // Handle successful upload
    //                         uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
    //                             console.log('File available at', downloadURL);
    //                         });

    //                     })


    //             } catch (error) {
    //                 console.log(error);
    //                 return null;
    //             }
    //         }

    //     });
    //     //
    // }

    // const handleUpload = () => {
    //     pickImage();

    // };


    //




    const takePhotoFromCamera = () => {
        ImagePicker.openCamera({

            compressImageMaxWidth: 300,
            compressImageMaxHeight: 300,
            cropping: true,
            compressImageQuality: 0.7

        }).then(image => {
            console.log(image);
            const imageUri = Platform.OS === 'ios' ? image.sourceURL : image.path;
            setImage(imageUri);
            // submitPost();
        });
        // console.log("Take Photo");
        handleUpload();

    }

    const choosePhotoFromLibrary = async () => {
        ImagePicker.openPicker({
            compressImageMaxWidth: 300,
            compressImageMaxHeight: 300,
            cropping: true,
            compressImageQuality: 0.7
        }).then(image => {
            console.log(image);

            // check image path for ios and andriod 
            // android image come from path and ios image come from sourceURL
            const imageUri = Platform.OS === 'ios' ? image.sourceURL : image.path;
            // update state
            setImage(imageUri);
            // submitPost();
        });
        // console.log("Choose Photo");
        handleUpload();
    }

    const handleCancel = () => {
        navigation.goBack();
    }



    // this is correct code without loading
    // const submitPost = async () => {
    //     const uploadUri = image;
    //     let filename = uploadUri.substring(uploadUri.lastIndexOf('/') + 1);
    //     setUploading(true);

    //     try {
    //         const response = await fetch(uploadUri);

    //         const blob = await response.blob();
    //         await uploadBytes(ref(storage, filename), blob).then((snapshot) => {
    //             console.log('Uploaded a blob or file!');
    //         });
    //         setUploading(false);
    //         Alert.alert(
    //             "Image Uploaded!",
    //             "Your image has been uploaded to Firebase Storage successfully!"
    //         );
    //     } catch (error) {
    //         console.log(error);
    //     }

    // };


    // this is with loading
    const submitPost = async () => {

        const uploadUri = image;
        let filename = uploadUri.substring(uploadUri.lastIndexOf('/') + 1);
        setUploading(true);

        setTransferred(0)

        try {
            const response = await fetch(uploadUri);
            const blob = await response.blob();

            // Create a storage reference with the filename
            const storageRef = ref(storage, filename);

            // Create an upload task using the storage reference
            const uploadTask = uploadBytesResumable(storageRef, blob);

            // Listen for state changes, errors, and completion of the upload task
            uploadTask.on(
                "state_changed",
                (snapshot) => {
                    // Handle progress updates if needed
                    //   const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    console.log('Upload is ' + transferred + '% done');
                    //   setTransferred(progress);
                    setTransferred(Math.round(snapshot.bytesTransferred / snapshot.totalBytes) * 100);
                },
                (error) => {
                    // Handle unsuccessful upload
                    console.error(error);
                    setUploading(false);
                    Alert.alert(
                        "Upload Failed",
                        "Error occurred while uploading the image. Please try again."
                    );
                },

                async () => {
                    // Handle successful upload
                    try {
                        const downloadURL = await getDownloadURL(uploadTask.snapshot.ref)
                        //    .then((downloadURL) => {
                        console.log("File available at", downloadURL);
                        setUploading(false);
                        Alert.alert(
                            "Image Uploaded!",
                            "Your image has been uploaded to Firebase Storage successfully!"
                        );
                        // });

                    }

                    catch (error) {
                        console.error(error);
                        setUploading(false);
                        Alert.alert(
                            "Upload Failed",
                            "Error occurred while uploading the image. Please try again."
                        );
                    }
                }
            );
        } catch (error) {
            console.log(error);
            setUploading(false);
            Alert.alert(
                "Upload Failed",
                "Error occurred while uploading the image. Please try again."
            );
        }
    };

    console.log(userdata);




    if (uploading) {
        return (
            <View style={[styles.uploadingContainer, styles.container]}>
                <Text style={styles.uploadingText}>{transferred} % Completed!</Text>
                <View style={{ marginTop: 20 }}>
                    <ActivityIndicator size='large' color="red" />
                </View>
            </View>
        );
    }


    return (

        <View style={styles.container}>
            <GoBack />
            <ImageBackground
                imageStyle={{ borderRadius: 30, }}
                style={{ position: 'absolute', width: "100%", height: "100%", top: 0, zIndex: -1 }}
                source={require("../../assets/images/register.png")}
            >
                {/* <Image
                style={{ alignSelf: 'center', marginTop: 100 }}
                source={{ uri: image }}
            /> */}


                {
                    // yaha pe ap bolo ge ke agr pic hai to uski length 0 se bari hogi na
                    image ?
                        // agr length o se bari to ye kam kro

                        <Image
                            style={styles.updatedProfilePic}
                            source={{ uri: image }}
                        />


                        : <Image
                            style={{ alignSelf: 'center', marginTop: 100 }}
                            source={require("../../assets/images/profile.png")}
                        />
                    // nahi to blank */}

                }


                <View style={styles.forgotContainer}>

                </View>
                <View style={styles.textContainer}>
                    <View style={styles.container1}>
                        <Text style={styles.login}>Choose a profile picture</Text>
                    </View>
                    {/* <Text style={styles.bwmessage}>Please Choose your profile Picture </Text> */}
                </View>

                {uploading ? (
                    <View style={styles.uploadingContainer}>
                        <Text style={styles.uploadingText}>{transferred} % Completed!</Text>
                        <View style={{ marginTop: 20 }}>
                            <ActivityIndicator size='large' color="red" />
                        </View>
                    </View>
                )
                    :

                    (
                        <View>
                            <View style={{ marginTop: heightPixel(19) }}>
                                <TouchableOpacity onPress={() => takePhotoFromCamera()}>
                                    <Button title="Take a Photo" />
                                </TouchableOpacity>
                            </View>

                            <View style={{ marginTop: heightPixel(19) }}>
                                <TouchableOpacity onPress={() => choosePhotoFromLibrary()}>
                                    <Button title="Choose from Library" />
                                </TouchableOpacity>
                            </View>
                            <View style={{ marginTop: heightPixel(19) }}>
                                <TouchableOpacity onPress={() => handleUpload2()}>
                                    <Button title="Upload" />
                                </TouchableOpacity>
                            </View>

                            <View style={{ marginTop: heightPixel(19) }}>
                                <TouchableOpacity
                                    // onPress={submitPost}
                                    onPress={handleCancel}
                                >
                                    <Button title="Cancel" />
                                </TouchableOpacity>
                            </View>
                        </View>

                    )

                }

                {

                    uploading ? <ActivityIndicator size={'large'} color="red" /> :

                        <View style={{ marginTop: heightPixel(30) }}>

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
                        </View>


                }

            </ImageBackground>
        </View>
    )
}
export default UploadProfilePicture;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // backgroundColor: "red",
        backgroundColor: "#1A1110",
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
        // left: 21,
        // bottom: 20,
        // marginTop: heightPixel(350),
        alignItems: 'center'

    },
    login: {
        color: "#FF3974",
        fontFamily: "Nunito-ExtraBold",
        fontSize: fontPixel(25),
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
    updatedProfilePic: {
        borderRadius: 100,
        alignSelf: 'center',
        marginTop: 100,
        width: widthPixel(200),
        height: heightPixel(200),
    },
    uploadingContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: heightPixel(19)
    },
    uploadingText: {
        color: "yellow",
        fontSize: 40
    }

});
