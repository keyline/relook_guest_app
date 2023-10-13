import { View, Text } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import DashBoard from '../Component/DashBoard';
import CheckIn from '../Component/CheckIn';
import Resturant from '../Component/Resturant';
import HouseKeeping from '../Component/HouseKeeping';
import FrontOffice from '../Component/FrontOffice';
import Booking from '../Component/Booking';
import ResetPassword from '../Component/ResetPassword';
import Login from '../Component/Login';
import SignUp from '../Component/SignUp';
import ForgotPassword from '../Component/ForgotPassword';
import OtpVerify from '../Component/OtpVerify';
import MyProfile from '../Component/MyProfile';
import EditProfile from '../Component/EditProfile';
import ChangePassword from '../Component/ChangePassword';
import RoomList from '../Component/RoomList';

const MainStack = () => {

    const Stack = createNativeStackNavigator();

    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: false
            }}
            initialRouteName='DashBoard'
        >
            <Stack.Screen name='Login' component={Login} />
            <Stack.Screen name='SignUp' component={SignUp} />
            <Stack.Screen name='ForgotPassword' component={ForgotPassword} />
            <Stack.Screen name='OtpVerify' component={OtpVerify} />
            <Stack.Screen name='ResetPassword' component={ResetPassword} />
            <Stack.Screen name='DashBoard' component={DashBoard} />
            <Stack.Screen name='CheckIn' component={CheckIn} />
            <Stack.Screen name='Resturant' component={Resturant} />
            <Stack.Screen name='HouseKeeping' component={HouseKeeping} />
            <Stack.Screen name='FrontOffice' component={FrontOffice} />
            <Stack.Screen name='Booking' component={Booking} />
            <Stack.Screen name='MyProfile' component={MyProfile} />
            <Stack.Screen name='EditProfile' component={EditProfile} />
            <Stack.Screen name='ChangePassword' component={ChangePassword} />
            <Stack.Screen name='RoomList' component={RoomList} />
        </Stack.Navigator>
    )
}

export default MainStack