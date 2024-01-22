import { View, Text, Image, Alert, SafeAreaView } from 'react-native'
import React, { useContext, useCallback, useState } from 'react'
import AuthContext from '../Services/Context';
import { useFocusEffect } from '@react-navigation/native';
import { KEY, SOURCE } from '../Services/Constant';
import Apis from '../Services/Apis';
import { ToastError, ToastMessage } from '../Services/CommonFunction';
import { styles } from './styles';
import { ImagePath } from '../Utils/ImagePath';
import { DrawerContentScrollView, DrawerItem, DrawerItemList } from '@react-navigation/drawer';
import { Colors } from '../Utils/Colors';
import { navigationRef } from '../Services/NavigationRef';
import LoaderNew from '../Container/LoaderNew';
import { getStoreFcmToken } from '../Services/AsyncStorage';

const CustomDrawerContent = (props) => {

    const context = useContext(AuthContext);
    const { appData, accesstoken, isLogin, userProfile, appVersion } = context.allData

    const [state, setState] = useState({
        loading: false,
        data: ''
    })

    useFocusEffect(
        useCallback(() => {
            const unsubscribe = onGetData();
            return () => unsubscribe
        }, [props])
    )

    const onGetData = useCallback(async () => {
        if (isLogin) {
            if (userProfile) {
                setState(prev => ({
                    ...prev,
                    data: userProfile,
                    // loading: false
                }))
            } else {
                try {
                    setState(prev => ({
                        ...prev,
                        loading: true
                    }))
                    let datas = {
                        key: KEY,
                        source: SOURCE
                    }
                    const response = await Apis.profile_get(datas);
                    // if (__DEV__) {
                    //     console.log('DrawerProfileResponse', JSON.stringify(response))
                    // }
                    if (response.status) {
                        setState(prev => ({
                            ...prev,
                            data: response?.data,
                            loading: false
                        }))
                    } else {
                        setState(prev => ({
                            ...prev,
                            loading: true
                        }))
                        ToastMessage(response?.message)
                    }
                } catch (error) {
                    setState(prev => ({
                        ...prev,
                        loading: false
                    }))
                    if (__DEV__) {
                        console.log(error)
                    }
                    ToastError();
                }
            }
        }
    })

    const menuList = [
        { id: 1, name: 'Home', screen: 'DashBoard', icon: ImagePath.home, logiReq: false },
        { id: 2, name: 'My Profile', screen: 'MyProfile', icon: ImagePath.user, logiReq: true },
        // { id: 3, name: 'Cart', screen: 'CartList', icon: ImagePath.cart, logiReq: true },
        { id: 4, name: 'My Order', screen: 'OrderList', icon: ImagePath.cart, logiReq: true },

        // { id: 1, name: 'Home', screen: 'DashBoard', icon: ImagePath.home, logiReq: false },
    ]

    const onMenuPress = useCallback(async (item) => {
        if (item.screen == 'DashBoard') {
            navigationRef.navigate('DashBoard');
        } else if (item.screen == 'MyProfile') {
            navigationRef.navigate('MyProfile')
        } else if (item.screen == 'CartList') {
            navigationRef.navigate('CartList')
        } else if (item.screen == 'OrderList') {
            navigationRef.navigate('OrderList')
        }

    })

    const SignOutAlert = useCallback(async () => {
        Alert.alert(
            'Sign Out',
            'Do you really want to Sign Out?',
            [
                {
                    text: 'Yes',
                    onPress: () => onSignOut()
                },
                {
                    text: 'No',
                    onPress: () => null
                }
            ],
            { cancelable: true }
        )
    })

    const onSignOut = useCallback(async () => {
        try {
            setState(prev => ({
                ...prev,
                loading: true
            }))
            let fcmtoken = await getStoreFcmToken();
            let datas = {
                key: KEY,
                source: SOURCE,
                fcm_token: fcmtoken ? fcmtoken : ""
            }
            const signOut = await Apis.sign_out(datas);
            if (__DEV__) {
                console.log('SignOutResponse', JSON.stringify(signOut))
            }
            if (signOut.status) {
                await context.onClearStoreData();
                navigationRef.navigate('DashBoard')
            }
            setState(prev => ({
                ...prev,
                loading: false
            }))
            ToastMessage(signOut?.message)
        } catch (error) {
            setState(prev => ({
                ...prev,
                loading: false
            }))
            if (__DEV__) {
                console.log(error)
            }
            ToastError();
        }
    })

    const onLogin = useCallback(async () => {
        navigationRef.navigate('LoginWithOTP');
    })

    const Icon = ({ props, source }) => (
        <Image source={source} style={{ width: props?.size, height: props?.size, tintColor: props?.color, resizeMode: 'contain' }} />
    )

    return (
        <SafeAreaView style={{ flex: 1 }}>
            {(isLogin) && (
                <View style={styles.drawerTopContent}>
                    <Image source={state.data?.profile_image ? { uri: state?.data?.profile_image } : ImagePath.user} style={styles.drawerLogo} />
                    <Text style={[styles.drawerNametext, { color: appData?.color_title }]}>{state?.data?.first_name + " " + state?.data?.last_name}</Text>
                    <View style={[styles.border, { borderColor: appData?.color_theme }]} />
                </View>
            )}
            <DrawerContentScrollView {...props} showsVerticalScrollIndicator={false}>
                {/* <DrawerItemList {...props} /> */}
                {(isLogin ? menuList : menuList.filter(obj => obj.logiReq == false)).map((item, key) => (
                    <DrawerItem
                        key={key}
                        label={item.name}
                        onPress={() => onMenuPress(item)}
                        labelStyle={styles.menuText}
                        icon={(props) => (<Icon source={item.icon} props={props} />)}
                        activeTintColor={appData?.color_theme}
                        inactiveTintColor={Colors.grey}
                        focused={props.state.routeNames[props.state.index] === item.screen}
                        pressColor={appData?.color_theme}
                        style={{ marginVertical: 0 }}
                    />
                ))}
                <DrawerItem
                    label={isLogin ? "Sign Out" : "Login"}
                    onPress={isLogin ? SignOutAlert : onLogin}
                    labelStyle={styles.menuText}
                    icon={(props) => (<Icon source={isLogin ? ImagePath.logout : ImagePath.login} props={props} />)}
                    activeTintColor={appData?.color_theme}
                    inactiveTintColor={Colors.grey}
                    pressColor={appData?.color_theme}
                    style={{ marginVertical: 0 }}
                />
            </DrawerContentScrollView>
            {(appVersion) && (
                <View style={styles.versionContainer}>
                    <Text style={[styles.versionText, { color: appData?.color_theme }]}>Version {appVersion}</Text>
                </View>
            )}
            {(state.loading) && (
                <LoaderNew loading={state.loading} />
            )}
        </SafeAreaView>
    )
}

export default CustomDrawerContent