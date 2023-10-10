import { View, Text } from 'react-native'
import React, { useContext } from 'react'
import { createDrawerNavigator } from '@react-navigation/drawer';
import CustomDrawerContent from './CustomDrawerContent';
import MainStack from './MainStack';
import { Colors } from '../Utils/Colors';
import AuthContext from '../Services/Context';

const DrawerStack = () => {

    const Drawer = createDrawerNavigator();

    const context = useContext(AuthContext);
    const { appData, accesstoken, isLogin } = context.allData;

    return (
        <Drawer.Navigator
            screenOptions={{
                headerShown: false,
                drawerStyle: {
                    borderTopRightRadius: 20,
                    borderBottomRightRadius: 20,
                    borderWidth: 2,
                    borderColor: appData.color_theme,
                    backgroundColor: Colors.white
                }
            }}
            drawerContent={(props) => <CustomDrawerContent {...props} />}
        >
            <Drawer.Screen name='MainStack' component={MainStack} />
        </Drawer.Navigator>
    )
}

export default DrawerStack