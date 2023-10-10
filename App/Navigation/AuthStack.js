import { View, Text } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from '../Component/Login';
import SignUp from '../Component/SignUp';
import ForgotPassword from '../Component/ForgotPassword';
import OtpVerify from '../Component/OtpVerify';
import ResetPassword from '../Component/ResetPassword';

const AuthStack = () => {

    const Stack = createNativeStackNavigator();

    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: false
            }}
        >
            <Stack.Screen name='Login' component={Login} />
            <Stack.Screen name='SignUp' component={SignUp} />
            <Stack.Screen name='ForgotPassword' component={ForgotPassword} />
            <Stack.Screen name='OtpVerify' component={OtpVerify} />
            <Stack.Screen name='ResetPassword' component={ResetPassword} />
        </Stack.Navigator>
    )
}

export default AuthStack