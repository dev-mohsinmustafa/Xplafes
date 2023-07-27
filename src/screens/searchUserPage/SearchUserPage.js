import React, { useEffect, useState } from 'react'
import { ActivityIndicator, Keyboard, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import Header from '../../components/header/Header'
import { chat, container1, searchbar } from '../../styles/CommonCss'
import UserCard from '../../components/cards/UserCard'
import { bwmessage } from '../../styles/CommonError'




const SearchUserPage = ({ navigation }) => {

    // abi hamne backend nai lgaya to ap 1 array bana ke image kr le
    // data dekhane ke leye card banana hai
    // let data = [
    //     {
    //         username: "harshal",
    //         profileimage: "https://picsum.photos/200/300"
    //     },
    //     {
    //         username: "mohsin",
    //         profileimage: "https://picsum.photos/500/500"
    //     },
    //     {
    //         username: "viraj",
    //         profileimage: "https://picsum.photos/500/500"
    //     },
    //     {
    //         username: "saeed",
    //         profileimage: "https://picsum.photos/500/500"
    //     },
    //     {
    //         username: "user3",
    //         profileimage: "https://picsum.photos/500/500"
    //     },
    //     {
    //         username: "azam",
    //         profileimage: "https://picsum.photos/500/500"
    //     },
    //     {
    //         username: "user4",
    //         profileimage: "https://picsum.photos/500/500"
    //     },
    //     {
    //         username: "ahmad",
    //         profileimage: "https://picsum.photos/500/500"
    //     },
    //     {
    //         username: "user5",
    //         profileimage: "https://picsum.photos/500/500"
    //     },
    //     {
    //         username: "ali",
    //         profileimage: "https://picsum.photos/500/500"
    //     },
    //     {
    //         username: "user6",
    //         profileimage: "https://picsum.photos/500/500"
    //     },
    //     {
    //         username: "hassan",
    //         profileimage: "https://picsum.photos/500/500"
    //     },
    //     {
    //         username: "ans",
    //         profileimage: "https://picsum.photos/500/500"
    //     },
    //     {
    //         username: "hussain",
    //         profileimage: "https://picsum.photos/500/500"
    //     },

    // ]

    // agr search me sirf search wala user dekhe to us ke leye hooks banaty hai
    // jo be hm ne likha hoga wo is hook me aye ga is ko krene ke leye sirf filter laga den bs
    const [keyword, setKeyword] = useState("");
    // console.log(keyword);
    const [loading, setLoading] = useState(false);
    // const [searchdata, setSearchdata] = useState("");
    const [data, setData] = useState([]);
    const [error, setError] = useState(null);


    // now we get real data
    // data from backend
    const getallusers = async () => {
        // agr keyword 1 se bara hai tb he search ho user
        if (keyword.length > 0) {
            setLoading(true);
            fetch("http://10.0.2.2:8090/searchuser", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ keyword: keyword, }) // keyword nikal lya
            })
                .then(res => res.json())
                .then(data => {
                    if (data.error) {
                        setData([]);
                        // yani agr ham x likhete hai or wo user database me exists nai krta to ye purana
                        // data show krwaye ga agr apne nai krwana to [] ese krdo or error be neche dekhao
                        setError(data.error);
                        setLoading(false);
                    }
                    else if (data.message === "User Found") {
                        console.log("data from serachUserPage", data);
                        setLoading(false);
                        setData(data.user);
                        // ab error ko null be krwa do agr sai user hai m to show hoga
                        setError(null)

                    }
                })
                .catch(err => {
                    setData([])
                    console.log(err);
                    setLoading(false)
                })
        }

        // es me logic hai ke yani agr mene m serach kiya or clear kr deya back 
        // chla to ye sara data remove kr de ga es ke begar m wala user show hoga
        else {
            // agr length 0 hai to ye set krdo
            setData([]);
            setError(null);
        }
    }



    // jab be keyword me changing ho to mera data call ho 
    useEffect(() => {
        getallusers();
    }, [keyword])

    return (
        <View style={styles.container}>
            <View style={{ flex: 0.15, marginTop: 10 }}>

                <Header title="Serach User"
                    image1={require("../../assets/images/arrow-left.png")}
                    image2={require("../../assets/images/bible.png")}
                />
            </View>


            <View style={container1}>
                <Text style={chat}>Search</Text>
                <TextInput
                    placeholder='Search by Username...'
                    style={searchbar}
                    onChangeText={(text) => setKeyword(text)}
                />

            </View>


            {
                loading ? <ActivityIndicator  size={'large'} color="red"/> :

                    // yani agr ham x likhete hai or wo user database me exists nai krta to ye purana
                    // data show krwaye ga agr apne nai krwana to [] ese krdo
                    <>
                        {
                            error ? <Text style={[bwmessage, { margin: 10 }]}> {error}</Text>
                                :

                                <ScrollView style={styles.userlists}>

                                    <View style={styles.container2}>
                                        {
                                            data.map((item, index) => {
                                                return (
                                                    <UserCard
                                                        key={item.username} // beacuse username is unique
                                                        // data ya users dekhana ke leye
                                                        user={item} //or agy bhej dya user agy forward kr dya
                                                    />
                                                )
                                            })



                                        }
                                    </View>


                                </ScrollView>

                        }

                    </>


            }
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#FFECD0",
        borderRadius: 30,
    },
    userlists: {
        flex: 1,

    },
    container2: {
        width: '100%',
        padding: 10,
    }
})

export default SearchUserPage;































// ye code jab ham backend laga denge tb ese remove kr denge kyo data ab backend se araaha to kyo ke
// search already filter hai
// .filter(
//     (user) => {
//         // agr blank hai to
//         if (keyword == "") {
//             return null // kise be user ka data na aye agr blank hai to
//         }

//         // yani jo user ne name likha hai or jo hamne rkha hai to agr ye 2no baraabar/same hai to
//         // agr blank hai to bs wohi wali user null kr do
//         // else if (user.username.toLocaleLowerCase( === keyword.toLowerCase()) {
//         else if (
//             // agr include likhenge to pehla lafz likhe pe sab show honge
//             user.username.toLowerCase().includes(keyword.toLowerCase())
//         ) {
//             return user
//         }
//     }
// )