import React from 'react'
import { Image, Pressable, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'

import ratios from '../../../styles/ratios';
import Header from '../../../components/header/Header';
import Button from '../../../components/button/Button';

let {
    widthPixel,
    heightPixel,
    fontPixel,
    pixelSizeVertical,
    pixelSizeHorizontal,
} = ratios


const PrivacyPolicy = ({ navigation }) => {
    return (
        <View style={styles.container}>



            <Header title="Privacy Policy" marginLeft={31} marginLeft1={27}
                marginLeft2={9}
                image1={require("../../../assets/images/arrow-left.png")}
                image2={require("../../../assets/images/bible.png")}


            />


            <ScrollView style={styles.container2}>
                <View>
                    <Image
                        source={require("../../../assets/images/girlcycle.png")}
                        // style={{ width: 374, height: 194 }}
                        style={{alignSelf: 'center'}}
                        resizeMode='contain'
                    />
                </View>


                <View style={styles.container3}>
                    <Text style={styles.bible}>1. Create a Privacy Policy Document:</Text>
                    <Text style={styles.lorem}>Work with a legal professional or consult online resources to create a comprehensive privacy policy for your app. The document should include details on what data is collected, how it is used, who has access to it, and how it is protected.</Text>
                    <Text style={styles.bible}>2. Link to the Privacy Policy from the App Store:</Text>
                    <Text style={styles.lorem}>Many app stores, like Google Play Store and Apple App Store, require developers to link to their privacy policy on the app's store page. Ensure that your privacy policy is accessible from the app's listing before users download the app.</Text>
                    <Text style={styles.bible}>3. Add a Privacy Policy Screen in the App:</Text>
                    <Text style={styles.lorem}>Implement a dedicated screen within the app that displays the privacy policy to users. This screen should be easily accessible, typically through a settings or menu option.</Text>
                    <Text style={styles.bible}>4. Design the Privacy Policy Screen:</Text>
                    <Text style={styles.lorem}>Create a user-friendly and visually appealing layout for the privacy policy screen. Make sure the text is easy to read and navigate. You can use a scrollable view to display the entire privacy policy.</Text>
                    <Text style={styles.bible}>5. Link to the Privacy Policy Document:</Text>
                    <Text style={styles.lorem}>Within the privacy policy screen, include a clickable link that directs users to the full privacy policy document. You can use a web view to display the policy document within the app or open it in the device's default web browser.</Text>
                    <Text style={styles.bible}>6. Obtain Consent:</Text>
                    <Text style={styles.lorem}>When users first open the app, consider adding a pop-up or banner that informs them about the existence of the privacy policy and asks for their consent. This helps ensure that users are aware of the policy and agree to its terms.</Text>
                    <Text style={styles.bible}>7. Regularly Update the Privacy Policy:</Text>
                    <Text style={styles.lorem}>As your app evolves and collects different types of data or integrates with third-party services, make sure to update the privacy policy accordingly. Notify users of any significant changes to the policy.</Text>
                    <Text style={styles.bible}>8. Localization:</Text>
                    <Text style={styles.lorem}>If your app is available in multiple languages or countries, ensure that the privacy policy is also available in those languages and adheres to the specific privacy laws of those regions.</Text>
                    <Text style={styles.bible}>9. App Store Compliance:</Text>
                    <Text style={styles.lorem}>Make sure that your app complies with the privacy policies and guidelines set forth by the app stores you publish it on. Failure to do so can lead to your app being removed from the stores.</Text>
                    <Text style={styles.bible}>10. Transparency and Communication:</Text>
                    <Text style={styles.lorem}>Be transparent about your data practices and respond promptly to user inquiries or concerns about privacy and data security.</Text>

                </View>


                <TouchableOpacity style={styles.button} onPress={() => navigation.goBack()}>
                    <Button title="Please Back !" />
                </TouchableOpacity>

            </ScrollView>














        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#FFECD0",
        borderRadius: 30,

    },
    container1: {
        flex: 0.3,
        // backgroundColor:"red",
        justifyContent: 'space-around',
        alignItems: 'center',
        flexDirection: 'row',
    },
    bible: {
        color: "#FF3974",
        fontFamily: "Nunito-Medium",
        fontSize: fontPixel(22),
    },
    container2: {
        // flex: 2,
        width: widthPixel(374),
        height: heightPixel(689),
        backgroundColor: "#FFFFFF69",
        borderRadius: 10,
        marginHorizontal: heightPixel(18),
        // justifyContent: 'center',
        // alignItems: 'center',

    },
    container3: {
        marginTop: heightPixel(30),
        marginHorizontal: widthPixel(10),

    },
    lorem: {
        color: "#372329",
        fontFamily: "Nunito-Medium",
        fontSize: fontPixel(20),
    },
    button: {
        flex: 0.3,
        marginVertical: heightPixel(30),
    }


})

export default PrivacyPolicy;