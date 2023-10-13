import { View, Text, SafeAreaView, TouchableOpacity, FlatList } from 'react-native'
import React, { useCallback, useContext, useState } from 'react'
import { styles } from './styles'
import { CommonStyle } from '../../Utils/CommonStyle'
import Header from '../../Container/Header'
import { ImagePath } from '../../Utils/ImagePath'
import List from './List'
import { useFocusEffect } from '@react-navigation/native'
import { KEY, SOURCE } from '../../Services/Constant'
import Apis from '../../Services/Apis'
import AuthContext from '../../Services/Context'
import Loader from '../../Container/Loader'
import { ToastError, ToastMessage } from '../../Services/CommonFunction'
import { getAccessToken } from '../../Services/AsyncStorage'

const DashBoard = ({ navigation }) => {

    const context = useContext(AuthContext);
    const { appData, accesstoken, isLogin } = context.allData

    const [state, setState] = useState({
        loading: true,
        data: [],
    })

    useFocusEffect(
        useCallback(() => {
            const unsubscribe = onGetData();
            return () => unsubscribe
        }, [navigation])
    )

    const onGetData = useCallback(async () => {
        let accesstoken = await getAccessToken();
        if (accesstoken) {
            navigation.navigate('CheckIn')
            setState(prevState => ({
                ...prevState,
                loading: false
            }))
        } else {
            try {
                setState(prevState => ({
                    ...prevState,
                    loading: true
                }))
                let datas = {
                    key: KEY,
                    source: SOURCE
                }
                const response = await Apis.home_screen(datas)
                if (__DEV__) {
                    console.log('homeResponse', JSON.stringify(response))
                }
                if (response.status) {
                    setState(prevState => ({
                        ...prevState,
                        data: response?.data,
                        loading: false
                    }))
                } else {
                    setState(prevState => ({
                        ...prevState,
                        data: [],
                        loading: false
                    }))
                    ToastMessage(response?.message);
                }
            } catch (error) {
                setState(prevState => ({
                    ...prevState,
                    data: [],
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

    const onCheckin = useCallback(async () => {
        navigation.navigate('CheckIn')
    })

    const ItemSeperator = () => (
        <View style={{ borderWidth: 0.5, marginVertical: '3%', borderColor: appData?.color_theme }} />
    )

    const onBookNow = useCallback(async (item) => {
        console.log('item', item);
        navigation.navigate('RoomList', { item: item })
    })

    return (
        <SafeAreaView style={CommonStyle.container}>
            <Header
                leftIcon={ImagePath.menu}
                leftonPress={onLeftMenu}
            />
            {(state.loading) ? <Loader loading={state.loading} /> :
                <View style={styles.bodyContent}>

                    {/* <TouchableOpacity onPress={onCheckin} activeOpacity={0.5} style={[styles.checkinContainer, { backgroundColor: appData?.color_panel_bg }]}>
                        <Text style={[styles.checkinText, { color: appData?.color_panel_text }]}>Welcome to Relook Hotel</Text>
                        <Text style={[styles.checkinText, { color: appData?.color_panel_text }]}>Kharagpur</Text>
                        <Text style={[styles.checkinText, { color: appData?.color_panel_text }]}>Please check in</Text>
                    </TouchableOpacity> */}
                    {(state.data) && (
                        <View style={{ flex: 1 }}>
                            {(state?.data.length > 0) && (
                                <FlatList
                                    data={state.data}
                                    keyExtractor={(item, index) => item.id}
                                    renderItem={({ item }) =>
                                        <List item={item} onPress={onBookNow} appdata={appData} />
                                    }
                                    ItemSeparatorComponent={ItemSeperator}
                                />
                            )}
                        </View>
                    )}
                </View>
            }
        </SafeAreaView>
    )
}

export default DashBoard