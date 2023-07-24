import React, { useState } from 'react'
import { View, Text, StyleSheet, Image, Alert } from 'react-native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { COLORS } from "../constants/theme/theme";

import XplafesList from '../screens/xplafesList/XplafesList';
import Channel from '../screens/channel/Channel';
import Home from '../screens/home/Home';
import Bible from '../screens/bible/Bible';
import Profile from '../screens/profile/Profile';

import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ratios from "../styles/ratios";
import ChatGpt from '../screens/channel/ChatGpt';

let {
    widthPixel,
    heightPixel,
    fontPixel,
    pixelSizeVertical,
    pixelSizeHorizontal,
} = ratios


const Tab = createBottomTabNavigator();
// Multiple Page Routing
// Very Important Point for multiple screens navigation
const Stack = createNativeStackNavigator();


const getIconColor = focused => ({
    tintColor: focused ? COLORS.red : COLORS.black
});


// Very Important Point for multiple screens navigation
const ChannelStack = () => {
return(
    <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="Channel" component={Channel} />
    <Stack.Screen name="ChatGPT" component={ChatGpt} />
</Stack.Navigator>
)

}




const TabNavigator = () => {



    return (
        <Tab.Navigator
            screenOptions={{
                headerShown: false,
                tabBarShowLabel: false,
                tabBarStyle: styles.tabBar
            }}

            initialRouteName='XplafesList'
        >
            <Tab.Screen name='StartingScreen' component={XplafesList}
                options={{
                    tabBarIconStyle: {
                        height: 0
                    },
                    tabBarIcon: ({ focused }) => (
                        <View style={styles.tabIconContainer}>
                            <Image
                                style={[styles.tabIcon, getIconColor(focused)]}
                                resizeMode='contain'
                                source={require("../assets/images/Icon1.png")}
                            />
                        </View>
                    )
                }}


            />
            {/* Very Important Point for multiple screens navigation */}
            <Tab.Screen name='ChannelStack' component={ChannelStack}
                options={{
                    tabBarIconStyle: {
                        height: 0
                    },
                    tabBarIcon: ({ focused }) => (
                        <View style={styles.tabIconContainer}>
                            <Image
                                style={[styles.tabIcon, getIconColor(focused)]}
                                resizeMode='contain'
                                source={require("../assets/images/Icon2.png")}
                            />
                        </View>
                    )
                }}


            />


            <Tab.Screen name='Home' component={Home}

                options={{
                    tabBarIconStyle: {
                        height: 0
                    },
                    tabBarIcon: ({ focused }) => (
                        <View style={styles.tabIconContainer}>
                            <Image
                                style={[styles.tabIcon, getIconColor(focused)]}
                                resizeMode='contain'
                                source={require("../assets/images/Icon3.png")}
                            />
                        </View>
                    )
                }}

            />
            <Tab.Screen name='Bible' component={Bible}

                options={{
                    tabBarIconStyle: {
                        height: 0
                    },
                    tabBarIcon: ({ focused }) => (
                        <View style={styles.tabIconContainer}>
                            <Image
                                style={[styles.tabIcon, getIconColor(focused)]}
                                resizeMode='contain'
                                source={require("../assets/images/Icon4.png")}
                            />
                        </View>
                    )
                }}

            />

            <Tab.Screen name='Profile' component={Profile}

                options={{
                    tabBarIconStyle: {
                        height: 0
                    },
                    tabBarIcon: ({ focused }) => (
                        <View style={styles.tabIconContainer}>
                            <Image
                                style={[styles.tabIcon, getIconColor(focused)]}
                                resizeMode='contain'
                                source={require("../assets/images/Icon5.png")}
                            />
                        </View>
                    )
                }}

            />


        </Tab.Navigator>







    )
}


const styles = StyleSheet.create({
    tabBar: {
        // position: 'absolute',
        // left: 16,
        // right:16,
        // bottom: 22,
        height: heightPixel(97),
        // width:"100%",
        backgroundColor: "#FF3974",
        borderTopColor: "transparent",
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,


    },
    tabIconContainer: {
        position: 'absolute',
        // top:12,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 60,
        width: 45,
        height: 45,
        backgroundColor: "#FFECD0"
    }
    , tabIcon: {
        // width: 20,
        // height: 20,


    }
})

export default TabNavigator