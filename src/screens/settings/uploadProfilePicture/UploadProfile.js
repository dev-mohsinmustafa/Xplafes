import { StyleSheet, Text,  View,  Image,  Alert, Pressable, ActivityIndicator, TouchableOpacity} from 'react-native';
import React, { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';

import AsyncStorage from '@react-native-async-storage/async-storage';
import AwesomeIcon from 'react-native-vector-icons/Ionicons';


import ratios from '../../../styles/ratios';


let {
  widthPixel,
  heightPixel,
  fontPixel,
  pixelSizeVertical,
  pixelSizeHorizontal,
} = ratios
import {  launchImageLibrary } from 'react-native-image-picker';
import storage from '@react-native-firebase/storage';
// import {firebase} from "../../../config/firebase";




// import firebase from '@react-native-firebase/app';



// const firebaseConfig = {
//     apiKey: "AIzaSyDF4pqIIVEnLB9ygMlfgm2Am7oUnq5cbGk",
//     authDomain: "womensafetyapp-eaeb2.firebaseapp.com",
//     projectId: "womensafetyapp-eaeb2",
//     storageBucket: "womensafetyapp-eaeb2.appspot.com",
//     messagingSenderId: "1035857805556",
//     appId: "1:1035857805556:web:27697254808eb90afbdea1",
//     databaseURL: "https://console.firebase.google.com/u/0/project/womensafetyapp-eaeb2/database/womensafetyapp-eaeb2-default-rtdb/data/~2F"
// };

// // Check if Firebase is already initialized before initializing it again
// if (!firebase.apps.length) {
//     firebase.initializeApp(firebaseConfig);
//   }
  
  
const Profile = (props) => {
    const navigation = useNavigation();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');


    const [userdata, setUserdata] = useState(null);
    const [loading, setLoading] = useState(true);


    

    const [uploaded, setUploaded] = useState(false);
    const [imagePath, setImagePath] = useState('');
   
    const [url, setUrl] = useState('');
    useEffect(() => {
        try {
            getData();
            getUrl();
        } catch (error) {
            console.log(error);
        }
      
    }, );
    const getData = async () => {
        try {
            const name = await AsyncStorage.getItem('name');
            const email = await AsyncStorage.getItem('email');
            setName(name);
            setEmail(email);
            console.log('profile updated');
        } catch (e) {
            console.log(e, 'token ni h');
        }
    };
    const removeValue = async () => {
        try {
            await AsyncStorage.removeItem('token');
            await AsyncStorage.removeItem('name');
            await AsyncStorage.removeItem('email');
            navigation.navigate('Login');
        } catch (e) { }
        console.log('Logout ...');
    };
    const getUrl = async () => {
        const url = await AsyncStorage.getItem('image');

        setUrl(url);
        console.log('getUrl', url);
    };

    const handleImageUpload = async () => {
        try {
            let options = {
                storageOptions: {
                    path: 'image',
                },
            };
            launchImageLibrary(options, async (response) => {
                const imagePath = response.assets[0].uri;
                setImagePath(imagePath);
                console.log('imagePath', imagePath);

                const uploadUri = imagePath;
                console.log('uploadUri', uploadUri);
                const fileName = imagePath.substring(imagePath.lastIndexOf('/') + 1);
                setUploaded(true);
                const imgRes = await storage().ref(fileName).putFile(imagePath);
                console.log("image uploaded", imgRes);
                setUploaded(false);
                Alert.alert('Image Updated!');
                const url = await storage().ref(fileName).getDownloadURL();
                console.log('url', url);
                await AsyncStorage.setItem('image', url);
                console.log('URL stored in AsyncStorage');
            });
        } catch (error) {
            console.log(error, error.message);
        }
    };
    








    const loaddata = async () => {
        const fetchData = async () => {
          try {
            const value = await AsyncStorage.getItem("user")
            const response = await fetch("http://10.0.2.2:8090/userdata", {
              method: 'POST',
              headers: {
                "Content-Type": "application/json",
                // value me se token nikalna hai
                "Authorization": "Bearer " + JSON.parse(value).token,
              },
              // body: JSON.stringify({ email }),
              body: JSON.stringify({ email: JSON.parse(value).user.email }),
            });
            const data = await response.json()
            if (data.message == "User found") {
              setUserdata(data.user);
              console.log('Userdata:', data.user);
            } else {
              navigation.navigate("Login");
              Alert.alert("Login in again ");
              console.log("User not found.");
            }
            setLoading(false);
          }
          catch (err) {
            Alert.alert(err);
            navigation.navigate("Login");
            setLoading(false);
          };
        }
        fetchData();
      }
    
      // yaha ab get krna hai data
      // with try catch
      useEffect(() => {
        loaddata()
      }, [navigation]);
      console.log("async userdata from Profile screen", userdata);
    


       if (loading) {
    return (
      <View style={[styles.container, { justifyContent: 'center', alignItems: 'center' }]}>
        <ActivityIndicator size="large" color="red" />
      </View>
    );
  }



    
    return (
        
    



        <View style={styles.container}>
                {/* container 1 */}


{/* container 2 */}

<View style={styles.container2}>
        <Text style={styles.profile}>Profile</Text>

        <Pressable style
          onPress={() => navigation.navigate("Settings1")}>
          <AwesomeIcon name="settings-sharp" size={30} color="#372329"
          />
        </Pressable>


      </View>


      <Pressable style={styles.refresh}
        onPress={() => loaddata()}>
        <AwesomeIcon name="refresh" size={30} color="red"
        />
      </Pressable>


{/*  */}



{/* container 3 */}


<View style={styles.container3}>
        {/* {
          // yaha pe ap bolo ge ke agr pic hai to uski length 0 se bari hogi na
          userdata?.profilepic ?
            // agr length o se bari to ye kam kro

            <Image
              style={styles.profilepic}
              source={{ uri: userdata.profilepic }}
            />


            : 
            
            <Image
              source={require("../../../assets/images/profile.png")}
            />
          // nahi to blank */}

       {/* // }// // */}

{imagePath || url ? (
    <Image
        source={{ uri: imagePath || url }}
        style={{ width: 180, height: 180, borderRadius: 180, alignSelf: 'center', marginTop: 30 }}
    />
) : (
    <ActivityIndicator size="large" color="#FF3974" />
)}

                <Pressable onPress={handleImageUpload}>
                    <Image source={require('../../../assets/images/editImage.png')} 
                    style={{ width: 40, height: 40, display: 'flex', flexDirection: 'row', 
                    alignSelf: 'flex-end', marginLeft: '32%', marginTop: -20 }} />

                </Pressable>
{/* {imagePath || url ? 
            <TouchableOpacity onPress={handleImageUpload}>
            <Image
            style={styles.profilepic}
            source={{ uri: imagePath.profilepic || url }}
            />
            </TouchableOpacity> : 
            <TouchableOpacity onPress={handleImageUpload}>
            <Image
              source={require("../../../assets/images/profile.png")}
            />
</TouchableOpacity>
} */}
      </View>

{/*  */}



{/*  */}




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
                <Text
                  placeholder='Marie Antoinette'
                  placeholderTextColor="#372329"
                  style={[styles.input, styles.inputField, { textAlign: 'center', height: heightPixel(50), textAlignVertical: 'center', backgroundColor: "pink" }]}
                >{userdata?.description}</Text>
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



{/*  */}


<View style={styles.container5}>

<TouchableOpacity style={styles.button}
  onPress={() => navigation.navigate("Login")}
>
  <Text style={styles.register}>Log Out</Text>
</TouchableOpacity>
</View>







        </View>
    );
};

export default Profile;

const styles = StyleSheet.create({



    box: {
        height: 80, marginHorizontal: 28, borderRadius: 15,
        justifyContent: 'center',
        alignContent: 'center',
        shadowColor: "#00000040",
        shadowOffset: {
            width: 0,
            height: 0,
        },
        shadowOpacity: 0.5,
        shadowRadius: 0.2,

        elevation: 10,
    },




    container: {
        flex: 1,
        backgroundColor: "#FFECD0",
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
    
      },
    
      container2: {
        // backgroundColor: "gray",
        flex: 0.4,
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
        flex: 0.3,
        alignSelf: 'flex-end',
        marginHorizontal: widthPixel(27),
    
      },
      button: {
        borderRadius: 7,
        width: widthPixel(120),
        height: heightPixel(43),
        backgroundColor: "#FF3974",
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 12,
        },
        shadowOpacity: 0.58,
        shadowRadius: 16.00,
    
        elevation: 24,
    
      },
      register: {
        color: "#FFECD0",
        fontFamily: "Nunito-Bold",
        fontSize: fontPixel(20),
    
      },
      refresh: {
        position: 'absolute',
        top: 80,
        right: 16,
        zIndex: 1,
      }






});





// const createUser = async () => {
//         try {
//             const response = await axios.post(
//                 'womansafetyapp-production.up.railway.app/auth/image',
//                 { image: url },
//             );

//             console.log('image posted successfully :', response.data.image);
//         } catch (error) {
//             console.error(error);
//         }
//     };


/* <Image source={{ uri: url }} style={{ width: '30%', height: 100 }} /> */ 


/* <Button title="Pick Image" onPress={() => imageUpload()} /> */ 
/* <Button title="Upload Image" onPress={() => submitImage()} /> */ 
/* <Button title="Upload in Db " onPress={() => createUser()} /> */ 








// const uploadImageToCloudinary = async (image) => {
//     try {
//       const cloudinaryUrl = 'https://api.cloudinary.com/v1_1/dumudqpgz/image/upload';
//       const uploadPreset = 'womanSafetyApp';

//       const data = new FormData();
//       data.append('file', image);
//       data.append('upload_preset', uploadPreset);

//       const response = await axios.post(cloudinaryUrl, data);

//       if (response.status !== 200) {
//         throw new Error('Image upload failed');
//       }

//       const result = response.data;
//       console.log('Upload result:', result);
//     } catch (error) {
//       console.error('Error uploading image:', error.message);
//     }
//   };
//   const getImage = async()=>{
//     try {
//         const imageSource = await AsyncStorage.getItem('image');

//         setImageSource(imageSource);

//         console.log("image get successfully");

//     } catch (e) {
//         console.log(e, 'image get failed');
//     }
//   }

// if (!name || !email) {
//     setName("");
//     setEmail("");
// }


    /* <form action="" onSubmit={()=>{}}>
                      <Input type='file'
                      lable='Image'name='myFile' id='file-upload' accept='.jpg,.jpeg,.png,.gif'
                      />
                  </form> */


    /* <Button type='submit' title='Save Image' onPress={uploadImageToCloudinary}/> */


// await AsyncStorage.setItem('image',imagePath );
// console.log("image uploaded successfully");

// setImageSource(imageSource)
// console.log('image path' , response.assets[0].uri);

// const saveImage =  await AsyncStorage.setItem('image', response.assets[0].uri);
// setImageSource(saveImage)
//   console.log(saveImage , 'image saved successfully');

// url = 'https://api.cloudinary.com/v1_1/dumudqpgz/image/upload'
// const uploadImageToCloudinary = async (image) => {
//     try {
//         const cloudinary = new Cloudinary({ cloud_name: 'dumudqpgz' });
//         const data = new FormData();
//         data.append('file', image);
//         data.append('upload_preset', 'YOUR_UPLOAD_PRESET');
//         data.append('cloud_name', 'dumudqpgz');
//         const response = await axios.post(
//             cloudinary.url('https://api.cloudinary.com/v1_1/dumudqpgz/image/upload'),
//             data
//         );
//         if (response.status !== 200) {
//             throw new Error('Image upload failed');
//         }
//         const result = response.data;
//         console.log('Upload result:', result);
//     } catch (error) {
//         console.error('Error uploading image:', error.response?.data || error.message);
//     }
// };
// const openImagePicker = async () => {
//     try {
//         const image = await DocumentPicker.pick({
//             type: [DocumentPicker.types.images],
//         });
//         uploadImageToCloudinary(image.uri);
//     } catch (error) {
//         console.log('Error selecting image:', error);
//     }
// };
// const imageUpload = () => {
//     ImagePicker.showImagePicker(
//         {
//             width: 300,
//             height: 400,
//             cropping: true,
//         },
//         (response) => {
//             if (response.didCancel) {
//                 console.log('User cancelled image picker');
//             } else if (response.error) {
//                 console.log('ImagePicker Error: ', response.error);
//             } else if (response.customButton) {
//                 console.log('User tapped custom button: ', response.customButton);
//             } else {
//                 const source = { uri: response.uri };
//                 setImageSource(source);
//             }
//         }
//     );
// }

// const imageUpload = () => {
//     ImagePicker.openPicker({
//         width: 300,
//         height: 400,
//         cropping: true
//     }).then(image => {
//         console.log(image);
//         console.log(image.cropRect[0].path);

//     });
// }
// const onAvatarChange = (image) => {
//     console.log(image);
//     // upload image to server here
// };
// const saveImage =    await AsyncStorage.setItem('ImagePicker', ImagePicker.image);
// console.log(saveImage, "saveImage");
// ImagePicker.openCamera({
//     width: 300,
//     height: 400,
//     cropping: true,
// }).then(image => {
//     console.log(image);
// });
// ImagePicker.openCropper({
//     path: 'my-file-path.jpg',
//     width: 300,
//     height: 400
// }).then(image => {
//     console.log(image);
// });
// ImagePicker.clean().then(() => {
//     console.log('removed all tmp images from tmp directory');
// }).catch(e => {
//     alert(e);
// });
