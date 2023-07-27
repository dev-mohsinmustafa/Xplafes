import React from 'react'
import { View, Text } from 'react-native'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from '../screens/login/Login';
import Register from '../screens/register/Register';
import TabNavigator from './TabNavigator';
import Verification from '../screens/verification/Verification';
import Profile from '../screens/profile/Profile';
import ForgotPassword from '../screens/forgotPassword/ForgotPassword';
import ForgotPasswordVerificationCode from '../screens/forgotPassword/ForgotPasswordVerificationCode';
import ForgotPassword_ChoosePassword from '../screens/forgotPassword/ForgotPassword_ChoosePassword';
import XplafesDetail from '../screens/xplafesList/XplafesDetail';
import SafetyAtWork from '../components/SafetyAtWork/SafetyAtWork';
import ConnectNearby from '../screens/home/ConnectNearby';
import Settings1 from '../screens/settings/Settings1';
import ChangePassword from '../screens/settings/ChangePassword';
import EditProfile from '../screens/settings/editProfile/EditProfile';
import ChangeUsername from '../screens/settings/ChangeUsername';
// import ChangeDescription from '../screens/settings/ChangeDescription';
import UploadProfilePicture from '../screens/settings/UploadProfilePicture';
import ChangeDescription from '../screens/settings/ChangeDescription';
import UploadProfilePicture1 from '../screens/settings/UploadProfilePicture1';
import SafetyAtHome from '../components/SafetyAtHome/SafetyAtHome';
import SafetyAtUniversity from '../components/SafetyAtUniversity/SafetyAtUniversity';
import WomenSafetyOnline from '../components/WomenSafetyOnline/WomenSafetyOnline';
import SafetyOnTheStreets from '../components/SafetyOnTheStreets/SafetyOnTheStreets';
import AboutMe from '../screens/settings/aboutMe/AboutMe';
import AllChats from '../screens/chatSection/AllChats';
import Description from '../screens/settings/description/Description';
import FeedBack from '../screens/settings/feedBack/FeedBack';
import ContactMe from '../screens/settings/contactMe/ContactMe';
import AboutApp from '../screens/settings/aboutApp/AboutApp';
import Notification from '../components/notification/Notification';
import UploadProfile from '../screens/settings/uploadProfilePicture/UploadProfile';
import SOSScreen from '../screens/settings/sos/SOSScreen';
import PrivacyPolicy from '../screens/settings/privacyPolicy/PrivacyPolicy';
import SearchUserPage from '../screens/searchUserPage/SearchUserPage';
import OtherUserProfile from '../screens/profile/OtherUserProfile';
import MessagePage from '../screens/chatSection/MessagePage';





const Stack = createNativeStackNavigator();




const MainNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator

        screenOptions={{ headerShown: false, animation: "slide_from_right" }}
        initialRouteName="XplafesList">

        <Stack.Screen
          name="Login"
          component={Login}
        // options={{title: 'Welcome to Splash Screen'}}
        />

        <Stack.Screen name="Verification" component={Verification} />
        <Stack.Screen name="Register" component={Register} />

        <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
        <Stack.Screen name="ForgotPasswordVerificationCode" component={ForgotPasswordVerificationCode} />
        <Stack.Screen name="ForgotPassword_ChoosePassword" component={ForgotPassword_ChoosePassword} />

        <Stack.Screen name="XplafesDetail" component={XplafesDetail} />
        <Stack.Screen name="SafetyAtWork" component={SafetyAtWork} />
        <Stack.Screen name="SafetyAtHome" component={SafetyAtHome} />
        <Stack.Screen name="SafetyAtUniversity" component={SafetyAtUniversity} />
        <Stack.Screen name="WomenSafetyOnline" component={WomenSafetyOnline} />
        <Stack.Screen name="SafetyOnTheStreets" component={SafetyOnTheStreets} />
        <Stack.Screen name="ConnectNearby" component={ConnectNearby} />
        <Stack.Screen name="Settings1" component={Settings1} />

        <Stack.Screen name="ChangePassword" component={ChangePassword} />
        <Stack.Screen name="AboutMe" component={AboutMe} />

        <Stack.Screen name="EditProfile" component={EditProfile} />

        <Stack.Screen name="ChangeUsername" component={ChangeUsername} />
        <Stack.Screen name="ChangeDescription" component={ChangeDescription} />
        <Stack.Screen name="UploadProfilePicture" component={UploadProfilePicture} />
        <Stack.Screen name="UploadProfilePicture1" component={UploadProfilePicture1} />

        <Stack.Screen name="AllChats" component={AllChats}
          options={{ animation: "slide_from_bottom" }}
        />
        <Stack.Screen name="Description" component={Description}
          options={{ animation: "slide_from_bottom" }}
        />
        <Stack.Screen name="FeedBack" component={FeedBack}
          options={{ animation: "slide_from_bottom" }}
        />
        <Stack.Screen name="ContactMe" component={ContactMe}
          options={{ animation: "slide_from_bottom" }}
        />
        <Stack.Screen name="AboutApp" component={AboutApp}
          options={{ animation: "slide_from_bottom" }}
        />
        <Stack.Screen name="PrivacyPolicy" component={PrivacyPolicy}
          options={{ animation: "slide_from_bottom" }}
        />


        {/* Notification */}
        <Stack.Screen name="Notification" component={Notification}
          options={{ animation: "slide_from_bottom" }}
        />




        <Stack.Screen name='XplafesList' component={TabNavigator} />
        <Stack.Screen name='UploadProfile' component={UploadProfile} />
        {/* <Stack.Screen name='SOSScreen' component={SOSScreen} /> */}

        <Stack.Screen name='SearchUserPage' component={SearchUserPage}
          options={{ animation: "simple_push" }}
        />
        <Stack.Screen name='OtherUserProfile' component={OtherUserProfile}
          options={{ animation: "simple_push" }}
        />

        <Stack.Screen name="MessagePage" component={MessagePage}
          options={{ animation: "slide_from_bottom" }}
        />



      </Stack.Navigator>

    </NavigationContainer>
  )
}

export default MainNavigator