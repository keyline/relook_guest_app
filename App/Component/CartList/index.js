import { View, Text, SafeAreaView, Image, TouchableOpacity, FlatList, Alert, ScrollView, RefreshControl } from 'react-native'
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
        roomlist: null,
        totalAmount: 0
    })

    const [roomid, setRoomid] = useState("");
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
                data: null,
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
                    totalAmount: response?.data?.total_price,
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
                return { id: room_id, label: `Room No. ${room_no}`, value: room_id, labelStyle: { color: appData?.color_theme, fontFamily: Font_Family.NunitoSans_ExtraBold } }
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

    const onUpdatePrice = useCallback(async (item, type) => {
        if (item?.total_amount > 0) {
            let unitPrice = item?.total_amount / item?.count
            if (type == 'add') {
                setState(prev => ({
                    ...prev,
                    totalAmount: state.totalAmount + unitPrice
                }))
            } else {
                setState(prev => ({
                    ...prev,
                    totalAmount: state.totalAmount - unitPrice
                }))
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
                        onUpdatePrice(item, type);
                        let updateList = state.data.filter(obj => obj.cart_id != item.cart_id);
                        setState(prev => ({
                            ...prev,
                            data: updateList,
                            loading: false
                        }))
                    } else {
                        onUpdatePrice(item, type);
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
                    onUpdatePrice(item, type);
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

    const getCartIds = useCallback(async () => {
        let updatelists = state.data.map((obj) => {
            let { cart_id } = obj;
            return cart_id
        })
        return updatelists
    })

    const onOrderAlert = useCallback(async () => {
        if (roomid == "") {
            ToastMessage('Select Room')
            return
        } else {
            Alert.alert(
                'Place Order',
                'Are you sure you want to place your order?',
                [
                    {
                        text: 'No',
                        onPress: () => null
                    },
                    {
                        text: 'Yes',
                        onPress: () => onPlaceOrder()
                    },
                ],
                { cancelable: true }
            )
        }
    })

    const onPlaceOrder = useCallback(async () => {
        try {
            setState(prev => ({
                ...prev,
                loading: true
            }))
            let cartid = await getCartIds();
            let datas = {
                key: KEY,
                source: SOURCE,
                cart_id: cartid,
                room_id: roomid
            }
            // console.log('placeorder', JSON.stringify(datas))
            const res = await Apis.place_order(datas)
            if (__DEV__) {
                console.log('PlaceOrder', JSON.stringify(res))
            }
            if (res.status) {
                navigation.replace('OrderList')
            }
            setState(prev => ({
                ...prev,
                loading: false
            }))
            ToastMessage(res?.message);
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

    const onContinue = useCallback(async () => {
        navigation.navigate('CheckIn')
    })

    const RenderFooter = () => {
        return (
            <View style={styles.footerContainer}>
                <View style={[styles.border, { borderColor: appData?.color_theme }]} />
                <View style={styles.flex}>
                    <Text style={[CommonStyle.boldtext, { color: appData?.color_theme, fontSize: 16 }]}>TOTAL AMOUNT</Text>
                    <Text style={[CommonStyle.boldtext, { color: appData?.color_theme, fontSize: 16 }]}>₹ {state.totalAmount}</Text>
                </View>
                <View style={[styles.border, { marginBottom: '4%', borderColor: appData?.color_theme }]} />
                {(state.roomlist) && (
                    <View style={[styles.roomContainer, { borderColor: appData?.color_theme }]}>
                        <Text style={[CommonStyle.boldtext, { color: Colors.black, textAlign: 'center', marginBottom: '1%' }]}>Please deliver at  </Text>
                        <RadioGroup
                            radioButtons={state.roomlist}
                            onPress={setRoomid}
                            selectedId={roomid}
                            containerStyle={{
                                flexDirection: 'row',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                                width: '100%',
                                flexWrap: 'wrap',
                                overflow: 'hidden'
                            }}
                        />
                    </View>
                )}
                <TouchableOpacity onPress={onOrderAlert} activeOpacity={0.5} style={[styles.placeBtn, { backgroundColor: appData?.color_theme }]}>
                    <Text style={[CommonStyle.boldtext, { color: Colors.white }]}>CONFIRM</Text>
                </TouchableOpacity>
                <Text style={[CommonStyle.boldtext, { color: '#696969', textAlign: 'center', marginVertical: '2%' }]}>Amount will be added with your Final Bill </Text>
            </View >
        )
    }

    return (
        <SafeAreaView style={[CommonStyle.container, { backgroundColor: appData?.color_theme }]}>
            <Header
                leftIcon={params ? ImagePath.back_new : ImagePath.menu}
                leftonPress={onLeftMenu}
                rightIcon={ImagePath.bell}
            />
            <View style={styles.mainContent}>
                <ScrollView
                    refreshControl={<RefreshControl refreshing={false} onRefresh={onGetData} />}
                    showsVerticalScrollIndicator={false}>
                    <View style={[styles.bodyContainer, { backgroundColor: appData?.color_theme }]}>
                        {(state.data && state.data.length > 0) && (
                            <View style={styles.bodyContent}>
                                <Image source={ImagePath.cart_white} style={styles.icon} />
                                <Text style={[CommonStyle.headingText, { marginBottom: '4%', fontSize: 16, textAlign: 'center', color: Colors.white }]}>MY CART</Text>
                                <View style={styles.midContent}>
                                    {(state.data.filter(obj => obj.cart_type == '2')).length > 0 && (
                                        <View style={{ flex: 1, marginBottom: 10 }}>
                                            <View style={[styles.headingContainer, { borderColor: appData?.color_theme }]}>
                                                <Text style={[CommonStyle.boldtext, { color: appData?.color_theme }]}>HOUSE KEEPING</Text>
                                            </View>
                                            {state.data.filter(obj => obj.cart_type == '2').map((item, key) => (
                                                <List item={item} key={key} onUpdateCart={onUpdateCart} />
                                            ))}
                                        </View>
                                    )}
                                    {(state.data.filter(obj => obj.cart_type == '1')).length > 0 && (
                                        <View style={{ flex: 1, marginBottom: 0 }}>
                                            <View style={[styles.headingContainer, { borderColor: appData?.color_theme }]}>
                                                <Text style={[CommonStyle.boldtext, { color: appData?.color_theme }]}>RELISH RESTAURANT</Text>
                                            </View>
                                            {state.data.filter(obj => obj.cart_type == '1').map((item, key) => (
                                                <List item={item} key={key} onUpdateCart={onUpdateCart} />
                                            ))}
                                        </View>
                                    )}
                                    <RenderFooter />
                                </View>
                            </View>
                        )}
                    </View>
                </ScrollView>
                <View style={styles.orderBtmContainer}>
                    <TouchableOpacity onPress={onContinue} activeOpacity={0.5} style={[styles.orderBtm, { backgroundColor: appData?.color_theme }]}>
                        <Text style={[CommonStyle.boldtext, { color: Colors.white }]}>CONTINUE ORDERING</Text>
                    </TouchableOpacity>
                </View>
            </View>
            {(state.loading) && (
                <LoaderNew loading={state.loading} />
            )}
        </SafeAreaView>
    )
}

export default CartList