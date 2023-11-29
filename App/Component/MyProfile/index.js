import { View, Text, SafeAreaView, TouchableOpacity, Image, ScrollView, FlatList, Alert } from 'react-native'
import React, { useCallback, useContext, useState } from 'react'
import Header from '../../Container/Header'
import { ImagePath } from '../../Utils/ImagePath'
import { CommonStyle } from '../../Utils/CommonStyle'
import { styles } from './styles'
import AuthContext from '../../Services/Context'
import { useFocusEffect } from '@react-navigation/native'
import { KEY, SOURCE } from '../../Services/Constant'
import Apis from '../../Services/Apis'
import { ToastError, ToastMessage } from '../../Services/CommonFunction'
import Loader from '../../Container/Loader'
import LoaderNew from '../../Container/LoaderNew'
import { getFcmToken } from '../../Services/DeviceToken'
import { getStoreFcmToken } from '../../Services/AsyncStorage'

const MyProfile = ({ navigation }) => {

    const context = useContext(AuthContext);
    const { appData, accesstoken, isLogin, userProfile } = context.allData

    const [state, setState] = useState({
        loading: false,
        data: null
    })

    useFocusEffect(
        useCallback(() => {
            const unsubscribe = onGetData();
            return () => unsubscribe
        }, [navigation, context])
    )

    const onGetData = useCallback(async () => {
        if (userProfile) {
            setState(prev => ({
                ...prev,
                data: userProfile,
                loading: false
            }));
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
                if (__DEV__) {
                    console.log('MyProfile', JSON.stringify(response))
                }
                if (response.status) {
                    setState(prev => ({
                        ...prev,
                        data: response?.data,
                        loading: false
                    }))
                } else {
                    setState(prev => ({
                        ...prev,
                        data: null,
                        loading: false
                    }));
                    ToastMessage(response?.message);
                }
            } catch (error) {
                setState(prev => ({
                    ...prev,
                    data: null,
                    loading: false
                }))
                if (__DEV__) {
                    console.log(error)
                }
                ToastError();
            }
        }
    })

    const onLeftMenu = useCallback(async () => {
        navigation.openDrawer();
    })

    const menuList = [
        { id: 1, name: 'Edit Profile', screen: 'EditProfile', logo: ImagePath.edit_profile },
        // { id: 2, name: 'My Booking', screen: 'MyBooking', logo: ImagePath.booking },
        // { id: 3, name: 'Change Password', screen: 'ChangePassword', logo: ImagePath.lock },
        { id: 4, name: 'Sign Out', screen: 'SignOut', logo: ImagePath.logout },
    ]

    const renderItem = ({ item }) => (
        <TouchableOpacity onPress={() => onMenuPress(item)} activeOpacity={0.5} style={styles.listcontent}>
            <View style={styles.leftcontent}>
                <Image source={item.logo} style={styles.icon} />
                <Text style={styles.boldtxt}>{item.name}</Text>
            </View>
            <Image source={ImagePath.right_arrow} style={styles.arrowicon} />
        </TouchableOpacity>
    )

    const itemSeparator = () => (
        <View style={styles.separator} />
    )

    const onMenuPress = useCallback(async (item) => {
        if (item.screen && item.screen == 'SignOut') {
            SignOutAlert();
        } else if (item.screen && item.screen == 'MyBooking') {
            ToastMessage('Coming Soon')
        } else if (item.screen) {
            navigation.navigate(item.screen)
        }
    })

    const SignOutAlert = useCallback(async () => {
        Alert.alert(
            'Sign Out',
            'Are you Really Want to Sign Out?',
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
                navigation.replace('DashBoard')
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

    return (
        <SafeAreaView style={CommonStyle.container}>
            <Header
            // leftIcon={ImagePath.menu}
            // leftonPress={onLeftMenu}
            />
            {/* {(state.loading) ? <Loader loading={true} /> : */}
            {(state.data) && (
                <View style={styles.bodyContent}>
                    <Text style={[CommonStyle.headingText, { marginBottom: '2%', textAlign: 'center', color: appData.color_theme }]}>My Profile</Text>
                    <View style={styles.headingContent}>
                        <Image source={state.data?.profile_image ? { uri: state.data?.profile_image } : ImagePath.user} style={styles.logo} />
                        <Text style={[CommonStyle.boldtext, { marginTop: '2%', color: appData?.color_title }]}>{state.data?.first_name + ' ' + state.data?.last_name}</Text>
                        <Text style={CommonStyle.lightText}>{state?.data?.email}</Text>
                    </View>
                    <View style={[styles.border, { borderColor: appData?.color_theme }]} />
                    <View style={styles.menuContainer}>
                        <FlatList
                            data={menuList}
                            keyExtractor={(item, index) => item.id}
                            renderItem={renderItem}
                            ItemSeparatorComponent={itemSeparator}
                            showsVerticalScrollIndicator={false}
                        />
                    </View>
                </View>
            )}
            {/* } */}
            {(state.loading) && (
                <LoaderNew loading={state.loading} />
            )}
        </SafeAreaView>
    )
}

export default MyProfile