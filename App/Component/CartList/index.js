import { View, Text, SafeAreaView, Image, TouchableOpacity, FlatList } from 'react-native'
import React, { useCallback, useContext, useState } from 'react'
import { CommonStyle } from '../../Utils/CommonStyle'
import Header from '../../Container/Header'
import { ImagePath } from '../../Utils/ImagePath'
import { styles } from './styles'
import List from './List'
import AuthContext from '../../Services/Context'
import { Colors } from '../../Utils/Colors'
import { RadioGroup } from 'react-native-radio-buttons-group'
import { Font_Family } from '../../Utils/Fonts'
import { useFocusEffect } from '@react-navigation/native'
import { ToastError, ToastMessage } from '../../Services/CommonFunction'
import { KEY, SOURCE } from '../../Services/Constant'
import Apis from '../../Services/Apis'
import LoaderNew from '../../Container/LoaderNew'

const listitem = [
    { id: 1, name: 'Coffee', price: 100, qty: 1 },
    { id: 2, name: 'Chicken Biriyani', price: 200, qty: 2 },
    { id: 3, name: 'Paneer', price: 170, qty: 1 },
    { id: 4, name: 'Veg Pakora', price: 100, qty: 2 },

]


const CartList = ({ navigation, route }) => {

    const context = useContext(AuthContext);
    const { appData, accesstoken, isLogin } = context.allData
    const params = route?.params?.page

    const [state, setState] = useState({
        loading: false,
        data: null,
        roomlist: null
    })
    const [roomid, setRoomid] = useState();
    const roomList = [
        { id: 1, label: 'Room No. 301', value: '301', labelStyle: { color: appData?.color_theme, fontFamily: Font_Family.NunitoSans_ExtraBold } },
        { id: 2, label: 'Room No. 302', value: '302', labelStyle: { color: appData?.color_theme, fontFamily: Font_Family.NunitoSans_ExtraBold } },
        // { id: 3, label: 'Room No. 304', value: '303', labelStyle: { color: appData?.color_theme, fontFamily: Font_Family.NunitoSans_ExtraBold } },
        // { id: 4, label: 'Room No. 304', value: '304', labelStyle: { color: appData?.color_theme, fontFamily: Font_Family.NunitoSans_ExtraBold } },
    ]

    useFocusEffect(
        useCallback(() => {
            const unsubscribe = onGetData();
            return () => unsubscribe
        }, [navigation])
    )

    const onGetData = useCallback(async () => {
        try {
            setState(prev => ({
                ...prev,
                loading: true
            }))
            let datas = {
                key: KEY,
                source: SOURCE
            }
            const response = await Apis.get_cart(datas);
            if (__DEV__) {
                console.log('CartList', JSON.stringify(response))
            }
            if (response.status) {
                let roomList = await onUpdateRoomList(response?.data?.rooms);
                setState(prev => ({
                    ...prev,
                    data: response?.data?.cart_items,
                    roomlist: roomList,
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

    const onUpdateRoomList = useCallback(async (room) => {
        if (room && room.length > 0) {
            let updateList = room.map((obj, index) => {
                let { room_id, room_no } = obj;
                return { id: index + 1, label: `Room No. ${room_no}`, value: room_id, labelStyle: { color: appData?.color_theme, fontFamily: Font_Family.NunitoSans_ExtraBold } }
            })
            // console.log('roomList', JSON.stringify(updateList))
            return updateList
        } else {
            return null
        }
    })

    const onLeftMenu = useCallback(async () => {
        if (params) {
            navigation.goBack();
        } else {
            navigation.openDrawer();
        }
    })

    const onCalPrice = useCallback(async (item, type) => {
        if (item?.total_amount < 1) {
            return 0
        } else {
            let unitPrice = item?.total_amount / item?.count
            if (type == 'add') {
                return (item?.total_amount + unitPrice)
            } else {
                return (item?.total_amount - unitPrice)
            }
        }
    })

    const onUpdateCart = useCallback(async (item, type) => {
        try {
            setState(prev => ({
                ...prev,
                loading: true
            }))
            let datas = {
                key: KEY,
                source: SOURCE,
                cart_type: item?.cart_type,
                item_id: item?.cart_item_id,
                count: type == 'add' ? item?.count + 1 : item?.count - 1,
                action: type
            }
            const res = await Apis.update_cart(datas)
            if (__DEV__) {
                console.log('UpdateCart', JSON.stringify(res))
            }
            if (res.status) {
                if (type == 'remove') {
                    if (item?.count <= 1) {
                        let updateList = state.data.filter(obj => obj.cart_id != item.cart_id);
                        setState(prev => ({
                            ...prev,
                            data: updateList,
                            loading: false
                        }))
                    } else {
                        let amount = await onCalPrice(item, type)
                        let itemIndex = state.data.findIndex(obj => obj.cart_id === item?.cart_id)
                        if (itemIndex !== -1) {
                            let qty = state.data[itemIndex].count
                            state.data[itemIndex].count = qty - 1
                            state.data[itemIndex].total_amount = amount
                            setState(prev => ({
                                ...prev,
                                loading: false
                            }))
                        }
                    }
                } else {
                    let amount = await onCalPrice(item, type)
                    let itemIndex = state.data.findIndex(obj => obj.cart_id === item?.cart_id)
                    if (itemIndex !== -1) {
                        let qty = state.data[itemIndex].count
                        state.data[itemIndex].count = qty + 1
                        state.data[itemIndex].total_amount = amount
                        setState(prev => ({
                            ...prev,
                            loading: false
                        }))
                    }
                }
            }
            ToastMessage(res?.message, 'short')
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


    const renderFooter = () => (
        <View style={styles.footerContainer}>
            {(state.roomlist) && (
                <View style={styles.roomContainer}>
                    <Text style={[CommonStyle.boldtext, { color: Colors.black, textAlign: 'center' }]}>Please Deliver Food at  </Text>
                    <RadioGroup
                        radioButtons={state.roomlist}
                        onPress={setRoomid}
                        selectedId={roomid}
                        containerStyle={{}}
                    />
                </View>
            )}
            <TouchableOpacity activeOpacity={0.5} style={[styles.placeBtn, { backgroundColor: appData?.color_theme }]}>
                <Text style={[CommonStyle.boldtext, { color: Colors.white }]}>CONFIRM</Text>
            </TouchableOpacity>
            <Text style={[CommonStyle.boldtext, { color: Colors.black, textAlign: 'center', marginVertical: '2%' }]}>Amount will be added with your Final Bill </Text>
        </View >
    )

    return (
        <SafeAreaView style={CommonStyle.container}>
            <Header
                leftIcon={params ? ImagePath.back_new : ImagePath.menu}
                leftonPress={onLeftMenu}
                rightIcon={ImagePath.bell}
            />
            {(state.data && state.data.length > 0) && (
                <View style={styles.bodyContent}>
                    <Text style={[CommonStyle.headingText, { marginBottom: '8%', textAlign: 'center', color: appData?.color_theme }]}>House Keeping</Text>
                    <FlatList
                        data={state.data}
                        keyExtractor={(item, index) => item.cart_id}
                        renderItem={({ item }) =>
                            <List item={item} onUpdateCart={onUpdateCart} />
                        }
                        ListFooterComponent={renderFooter}
                    />
                </View>
            )}
            {(state.loading) && (
                <LoaderNew loading={state.loading} />
            )}
        </SafeAreaView>
    )
}

export default CartList