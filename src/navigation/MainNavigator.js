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
import BibleDetail from '../screens/bible/BibleDetail';
import ConnectNearby from '../screens/home/ConnectNearby';
import Settings1 from '../screens/settings/Settings1';
import ChangePassword from '../screens/settings/ChangePassword';
import EditProfile from '../screens/settings/EditProfile';
import ChangeUsername from '../screens/settings/ChangeUsername';
// import ChangeDescription from '../screens/settings/ChangeDescription';
import UploadProfilePicture from '../screens/settings/UploadProfilePicture';
import ChangeDescription from '../screens/settings/ChangeDescription';
import UploadProfilePicture1 from '../screens/settings/UploadProfilePicture1';





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
        <Stack.Screen name="BibleDetail" component={BibleDetail} />
        <Stack.Screen name="ConnectNearby" component={ConnectNearby} />
        <Stack.Screen name="Settings1" component={Settings1} />

        <Stack.Screen name="ChangePassword" component={ChangePassword} />
        <Stack.Screen name="EditProfile" component={EditProfile} />

        <Stack.Screen name="ChangeUsername" component={ChangeUsername} />
        <Stack.Screen name="ChangeDescription" component={ChangeDescription} />
        <Stack.Screen name="UploadProfilePicture" component={UploadProfilePicture} />
        <Stack.Screen name="UploadProfilePicture1" component={UploadProfilePicture1} />




        <Stack.Screen name='XplafesList' component={TabNavigator} />





      </Stack.Navigator>

    </NavigationContainer>
  )
}

export default MainNavigator