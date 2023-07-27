import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View, ImageBackground, TouchableOpacity, Image, Pressable, Alert, ActivityIndicator, TextInput } from 'react-native'

import AsyncStorage from '@react-native-async-storage/async-storage';

import AwesomeIcon from 'react-native-vector-icons/Ionicons';

import ratios from '../../styles/ratios';
import Header from '../../components/header/Header';


let {
  widthPixel,
  heightPixel,
  fontPixel,
  pixelSizeVertical,
  pixelSizeHorizontal,
} = ratios


const Profile = ({ navigation }) => {



  // const data = {
  //   username: "mohsinmustafaansari",
  //   email: "mohsinmustafaansari@gmail.com",
  //   profilepic: "https://picsum.photos/500/500",
  // }


  const [userdata, setUserdata] = useState(null);
  const [loading, setLoading] = useState(true);


  // agr image yaha lani hai to ye code open kren
  // Inside the Profile component
  // useEffect(() => {
  //   const loadProfilePicture = async () => {
  //     try {
  //       // Retrieve the updated profile picture URL from AsyncStorage or use a prop
  //       const updatedProfilePic = await AsyncStorage.getItem("updatedProfilePic");

  //       // Update the userdata state with the new profile picture URL
  //       setUserdata((prevData) => ({
  //         ...prevData,
  //         profilepic: updatedProfilePic,
  //       }));
  //     } catch (err) {
  //       // Handle the error
  //     }
  //   };

  //   loadProfilePicture();
  // }, []);



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



  // with then catch
  // useEffect(() => {
  //   AsyncStorage.getItem("user")
  //     .then(async (value) => {
  // es ko ese email ka variable bana ke store be krwa skty hain
  //       // const email = JSON.parse(value)?.user?.email;
  //       // if (email) {
  //       fetch("http://10.0.2.2:8090/userdata", {
  //         method: 'POST',
  //         headers: {
  //           "Content-Type" : "application/json",
  //           // value me se token nikalna hai
  //           "Authorization" : "Bearer " + JSON.parse(value).token, 
  //         },
  //         // body: JSON.stringify({ email }),
  //         body: JSON.stringify({ email: JSON.parse(value).user.email }),

  //       })
  //         .then(res => res.json())
  //         .then(data => {
  //           if (data.message == 'User found') {
  //             setUserdata(data.user);
  //             console.log('Userdata:', data.user);
  //           } else {
  //             navigation.navigate("Login");
  //             Alert.alert("Login in again ");
  //             console.log("User not found.");
  //           }
  //           setLoading(false);
  //         })
  //         .catch(err => {
  //           Alert.alert(err);
  //           navigation.navigate("Login");
  //           setLoading(false);
  //         });
  //       // } else {
  //       //   navigation.navigate('Login');
  //       //   setLoading(false);
  //       // }
  //     })
  //     .catch(err => {
  //       Alert.alert(err);
  //       navigation.navigate("Login");
  //       setLoading(false);
  //     });
  // }, [navigation]);
  // console.log("async userdata from Profile screen", userdata);

  if (loading) {
    return (
      <View style={[styles.container, { justifyContent: 'center', alignItems: 'center' }]}>
        <ActivityIndicator size="large" color="red" />
      </View>
    );
  }




  // yaha ab get krna hai data ye code ne chla na he koi error hai isme
  // useEffect(() => {
  //   AsyncStorage.getItem("user")
  //     .then( value => {
  //       const email = JSON.parse(value)?.user?.email;
  //       if (email) {
  //         fetch("http://10.0.2.2:8090/userdata", {
  //           method: "POST",
  //           headers: {
  //             "Content-Type": "application/json",
  //           },
  //           body: JSON.stringify({ email }),
  //         })
  //           .then(res => res.json())
  //           .then(data => {
  //             if (data.message == "User Found") {
  //               setUserdata(data.user)
  //               console.log("Userdata:", data.user);
  //             } else {
  //               navigation.navigate("Login")
  //               Alert.alert("Something went wrong")
  //               console.log("User not found.");
  //             }
  //             setLoading(false);
  //           })

  //           .catch(err => {
  //             Alert.alert(err)
  //             navigation.navigate("Login");
  //             setLoading(false);

  //           });
  //         }
  //         else {
  //           navigation.navigate('Login');
  //           setLoading(false);
  //         }
  //       })


  //     .catch(err => {
  //       Alert.alert(err)
  //       navigation.navigate("Login")
  //       setLoading(false)

  //     })
  // }, [navigation])


  // if (loading) {
  //   return (
  //     <View style={styles.container}>
  //       <ActivityIndicator size="large" color="red" />
  //     </View>
  //   );
  // }

  // useEffect(() => {
  //   console.log("userdata", userdata);
  // }, [userdata]);

  // console.log("async userdata from Profile screen", userdata);










  return (
    <View style={styles.container}>

      {/* <View style={{ marginHorizontal: 22, flex: 0.5, justifyContent: 'center', flexDirection: 'row', alignItems: 'center' }}>
        <Header title="Profile"
          justifyContent="space-between"
          image1={require("../../assets/images/arrow-left.png")}
        // image2={require("../../assets/images/bible.png")}

        />

        <Pressable

          onPress={() => navigation.navigate("Settings1")}>
          <AwesomeIcon name="settings-sharp" size={30} color="#372329"
          />

        </Pressable>
      </View> */}


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
                  style={[styles.input, styles.inputField,{ textAlign: 'center', height: heightPixel(50), textAlignVertical: 'center', backgroundColor: "pink" }]}
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



      <View style={styles.container5}>

        <TouchableOpacity style={styles.button}
          onPress={() => navigation.navigate("Login")}
        >
          <Text style={styles.register}>Log Out</Text>
        </TouchableOpacity>
      </View>










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
})

export default Profile;