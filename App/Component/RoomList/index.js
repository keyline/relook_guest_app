import { View, Text, SafeAreaView, ScrollView, Image, TouchableOpacity, FlatList } from 'react-native'
import React, { useContext, useCallback, useState } from 'react'
import { CommonStyle } from '../../Utils/CommonStyle'
import Header from '../../Container/Header'
import { ImagePath } from '../../Utils/ImagePath'
import { styles } from './styles'
import StarView from '../../Container/StarView'
import AuthContext from '../../Services/Context'
import List from './List'
import { useFocusEffect } from '@react-navigation/native'
import { ToastError, ToastMessage } from '../../Services/CommonFunction'
import { KEY, SOURCE } from '../../Services/Constant'
import Apis from '../../Services/Apis'

const room = [
    { id: 1, type: 'Single Rooms', img: ImagePath.room1, price: '1000' },
    { id: 2, type: 'Double Rooms', img: ImagePath.room2, price: '1400' },
    { id: 3, type: 'Deluxe Rooms', img: ImagePath.room1, price: '2000' },

]

const RoomList = ({ navigation, route }) => {

    const context = useContext(AuthContext);
    const { appData, accesstoken, isLogin } = context.allData
    const params = route?.params?.item
    const [state, setState] = useState({
        loading: false,
        data: null,

    })

    useFocusEffect(
        useCallback(() => {
            const unsubscribe = onGetData();
            return () => unsubscribe
        }, [navigation])
    )

    const onGetData = useCallback(async () => {
        try {
            setState(prevState => ({
                ...prevState,
                loading: true
            }))
            let datas = {
                key: KEY,
                source: SOURCE,
                id: params.id
            }
            const response = await Apis.get_hotelroom(datas)
            if (__DEV__) {
                console.log('RoomList', JSON.stringify(response))
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
    })

    const onLeftMenu = useCallback(async () => {
        navigation.goBack();
    })

    const onNext = useCallback(async (item) => {
        navigation.navigate('Booking', { item: state.data })
    })

    return (
        <SafeAreaView style={CommonStyle.container}>
            <Header
                leftIcon={ImagePath.back_new}
                leftonPress={onLeftMenu}
            />
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={{ flex: 1 }}>
                    <Image source={ImagePath.banner1} style={styles.img} />
                    <View style={styles.bodyContent}>
                        <Text style={[CommonStyle.headingText, { color: appData?.color_theme }]}>{state.data?.name}</Text>
                        <TouchableOpacity activeOpacity={0.5} style={styles.flex}>
                            <View style={styles.flexNew}>
                                <StarView rating={state.data?.rating} />
                                <Text style={[CommonStyle.boldtext, { marginLeft: '4%', color: appData?.color_theme }]}>Very Good</Text>
                            </View>
                            <Image source={ImagePath.right_arrow} style={[styles.location, { tintColor: appData?.color_theme }]} />
                        </TouchableOpacity>
                        <View style={styles.locationContainer}>
                            <Image source={ImagePath.location} style={[styles.location, { tintColor: appData?.color_theme }]} />
                            <Text style={CommonStyle.boldtextgrey}> {state.data?.location}</Text>
                        </View>
                        <View style={[styles.border, { borderColor: appData?.color_theme }]} />
                        <View style={{ flex: 1, }}>
                            <Text style={[CommonStyle.headingText, { textAlign: 'center', color: appData?.color_theme }]}>Room Type</Text>
                            {(state.data?.room_type_list && state.data?.room_type_list.length > 0) && (
                                <View style={{ flex: 1, marginTop: '2%' }}>
                                    {(state.data?.room_type_list).map((item, key) => (
                                        <List key={key} item={item} onPress={onNext} />
                                    ))}
                                    {/* <FlatList
                                    data={state.data?.room_type_list}
                                    keyExtractor={(item, index) => item.room_id}
                                    renderItem={({ item }) =>
                                        <List item={item} onPress={onNext} />
                                    }
                                    showsVerticalScrollIndicator={false}
                                /> */}
                                </View>
                            )}
                        </View>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

export default RoomList