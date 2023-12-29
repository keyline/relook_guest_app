import { View, Text, SafeAreaView, FlatList, TouchableOpacity, Image } from 'react-native'
import React, { useState, useContext, useCallback } from 'react'
import { CommonStyle } from '../../Utils/CommonStyle'
import { ImagePath } from '../../Utils/ImagePath'
import Header from '../../Container/Header'
import { styles } from './styles'
import List from './List'
import { Colors } from '../../Utils/Colors'
import AuthContext from '../../Services/Context'
import { useFocusEffect } from '@react-navigation/native'
import { KEY, SOURCE } from '../../Services/Constant'
import Apis from '../../Services/Apis'
import { ToastError, ToastMessage } from '../../Services/CommonFunction'
import LoaderNew from '../../Container/LoaderNew'
import EmptyContent from '../../Container/EmptyContent'
import { RefreshControl } from 'react-native'

const listitem = [
    {
        id: 1, orderId: 'AB12345', status: '3', items: [
            { ids: 11, name: 'Coffee', price: 100, qty: 1, },
            { ids: 12, name: 'Veg Pakora', price: 120, qty: 2, }
        ]
    },
    {
        id: 2, orderId: 'AB12345', status: '2', items: [
            { ids: 21, name: 'Chicken Biriyani', price: 200, qty: 2, },
            { ids: 22, name: 'Veg Pakora', price: 120, qty: 2, }

        ]
    },
    {
        id: 3, orderId: 'AB12345', status: '1', items: [
            { ids: 31, name: 'Chicken Biriyani', price: 200, qty: 2, },
            { ids: 32, name: 'Veg Pakora', price: 120, qty: 2, }

        ]
    },
    {
        id: 4, orderId: 'AB12345', status: '2', items: [
            { ids: 41, name: 'Chicken Biriyani', price: 200, qty: 2, },
            { ids: 42, name: 'Veg Pakora', price: 120, qty: 2, }

        ]
    },
    // { id: 3, orderId: 'AB12345', name: 'Paneer', price: 170, qty: 1, status: '1' },
    // { id: 4, orderId: 'AB12345', name: 'Veg Pakora', price: 100, qty: 2, status: '3' },
    // { id: 5, orderId: 'AB12345', name: 'Coffee', price: 100, qty: 1, status: '3' },
    // { id: 6, orderId: 'AB12345', name: 'Chicken Biriyani', price: 200, qty: 2, status: '2' },
    // { id: 7, orderId: 'AB12345', name: 'Paneer', price: 170, qty: 1, status: '1' },
    // { id: 8, orderId: 'AB12345', name: 'Veg Pakora', price: 100, qty: 2, status: '3' },
]

const OrderList = ({ navigation, route }) => {

    const params = route?.params?.page
    const context = useContext(AuthContext);
    const { appData, accesstoken, isLogin } = context.allData

    const [state, setState] = useState({
        loading: false,
        data: null
    })

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
            const response = await Apis.order_list(datas);
            if (__DEV__) {
                console.log('OrderList', JSON.stringify(response))
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
                if (response.message && response.message == 'Booking not found.Please login again.') {
                    navigation.replace('DashBoard')
                }
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

    const onLeftMenu = useCallback(async () => {
        if (params) {
            navigation.goBack();
        } else {
            navigation.openDrawer();
        }
    })

    const ItemSeperatorNew = () => (
        <View style={{ borderWidth: 0, borderColor: Colors.grey, marginVertical: '2%' }} />
    )

    const getColor = (status) => {
        if (status == 'Ordered') {
            return '#FF8D08'
        } else if (status == 'Delivered') {
            return '#007E05'
        } else {
            return '#696969'
        }
    }

    return (
        <SafeAreaView style={[CommonStyle.container,{backgroundColor:appData?.color_theme}]}>
            <Header
                // leftIcon={params ? ImagePath.back_new : ImagePath.menu}
                // leftonPress={onLeftMenu}
                // rightIcon={ImagePath.bell}
            />
            <View style={styles.mainContent}>
            <View style={[styles.bodyContent,{backgroundColor:appData?.color_theme}]}>
                <Text style={[CommonStyle.headingText, { marginBottom: '6%', textAlign: 'center', color: Colors.white }]}>My Orders</Text>
                <View style={{ flex: 1 }}>
                    <FlatList
                        data={state.data}
                        keyExtractor={(item, index) => item.id}
                        renderItem={({ item, index }) =>
                            <List items={item} index={index} />
                        }
                        showsVerticalScrollIndicator={false}
                        ItemSeparatorComponent={ItemSeperatorNew}
                        refreshControl={<RefreshControl refreshing={false} onRefresh={onGetData} />}
                        ListEmptyComponent={<EmptyContent word={'No Order Found'} />}
                    />
                </View>
            </View>
            </View>
            {(state.loading) && (
                <LoaderNew loading={state.loading} />
            )}
        </SafeAreaView>
    )
}

export default OrderList