import { View, Text, SafeAreaView, FlatList, TextInput, Image, TouchableOpacity, RefreshControl } from 'react-native'
import React, { useCallback, useState, useContext } from 'react'
import { Colors } from '../../Utils/Colors';
import Header from '../../Container/Header';
import { ImagePath } from '../../Utils/ImagePath';
import { CommonStyle } from '../../Utils/CommonStyle';
import { styles } from './styles';
import List from './List';
import AuthContext from '../../Services/Context';
import { useFocusEffect } from '@react-navigation/native';
import { ToastError, ToastMessage } from '../../Services/CommonFunction';
import { KEY, SOURCE } from '../../Services/Constant';
import Apis from '../../Services/Apis';
import LoaderNew from '../../Container/LoaderNew';

const itemList = [
    { id: 1, name: 'Pillow', img: ImagePath.pillow, desc: 'High-quality and soft pillows for comfort', price: '20' },
    { id: 2, name: 'Blanket', img: ImagePath.blanket, desc: 'Soft, cozy blankets', price: '40' },
    { id: 3, name: 'Bedsheet', img: ImagePath.bedsheet, desc: 'High-quality and durable bedsheets', price: '30' },
    { id: 4, name: 'Room Cleaning', img: ImagePath.room_clean, desc: 'Efficient room cleaning for your comfort', price: '20' },

]

const HouseKeeping = ({ navigation }) => {

    const context = useContext(AuthContext);
    const { appData, accesstoken, isLogin, bookingDetail } = context.allData

    const [state, setState] = useState({
        loading: false,
        data: null,
        totalItem: 0,
        totalAmount: 0,
        totalTime: "",
        search: ''
    })

    useFocusEffect(
        useCallback(() => {
            const unsubscribe = onGetData();
            return () => unsubscribe
        }, [navigation])
    )

    const onGetData = useCallback(async (search = state.search) => {
        try {
            setState(prev => ({
                ...prev,
                loading: true
            }))
            let datas = {
                key: KEY,
                source: SOURCE,
                id: bookingDetail?.hotel_id,
                search: search
            }
            const response = await Apis.housekeeping_list(datas)
            if (__DEV__) {
                console.log('HouseKeeping', JSON.stringify(response))
            }
            if (response.status) {
                let datas = response?.data
                setState(prev => ({
                    ...prev,
                    data: datas?.items,
                    totalItem: datas?.total_item,
                    totalAmount: datas?.total_amount,
                    totalTime: datas?.total_time,
                    loading: false
                }))
            } else {
                setState(prev => ({
                    ...prev,
                    data: null,
                    loading: false
                }))
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
    })

    const onLeftMenu = useCallback(async () => {
        navigation.goBack();
    })

    const ItemSeperator = () => (
        <View style={{ borderWidth: 0.5, borderColor: Colors.grey, marginVertical: '1%' }} />
    )

    const onRequest = useCallback(async (item, qty) => {
        console.log(item)
        console.log(qty)
    })

    const onSearch = useCallback(async (value) => {
        setState(prev => ({
            ...prev,
            search: value
        }))
        onGetData(value)
    })

    const onCartList = useCallback(async () => {
        navigation.navigate('CartList', { page: 'Housekeeping' })
    })

    const onUpdateValue = useCallback(async (item, type) => {
        let index = state.data.findIndex(obj => obj?.id == item?.id)
        if (index !== -1) {
            let qty = state.data[index].order_qty
            state.data[index].order_qty = type == 'add' ? qty + 1 : qty - 1
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
                cart_type: '2',
                item_id: item?.id,
                count: type == 'add' ? item?.order_qty + 1 : item?.order_qty - 1,
                action: type
            }
            const res = await Apis.update_cart(datas)
            if (__DEV__) {
                console.log('UpdateCart', JSON.stringify(res))
            }
            if (res.status) {
                onUpdateValue(item, type)
                setState(prev => ({
                    ...prev,
                    totalItem: type == 'add' ? state.totalItem + 1 : state.totalItem - 1,
                    totalTime: res?.data?.item?.total_tat,
                    loading: false
                }))
            } else {
                setState(prev => ({
                    ...prev,
                    loading: false
                }))
                ToastMessage(res?.message, 'short');
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

    return (
        <SafeAreaView style={[CommonStyle.container, { backgroundColor: appData?.color_theme }]}>
            <Header
                leftIcon={ImagePath.back_new}
                leftonPress={onLeftMenu}
            // rightIcon={ImagePath.bell}
            />
            <View style={styles.mainContent}>
                <View style={[styles.bodyContainer, { backgroundColor: appData?.color_theme }]}>
                    <Image source={ImagePath.housekeeping_banner} style={styles.bannerImage} />
                    <Image source={ImagePath.housekeeping_logo} style={styles.icon} />
                    <Text style={[CommonStyle.headingText, { marginBottom: '2%', textAlign: 'center', color: Colors.white }]}>House Keeping</Text>
                    <View style={[styles.searchContainer, { backgroundColor: appData?.color_theme }]}>
                        <TextInput
                            style={{ paddingHorizontal: '4%', color: Colors.white, width: '80%' }}
                            placeholder='Search items..'
                            value={state.search}
                            placeholderTextColor={Colors.white}
                            onChangeText={e => onSearch(e)}
                        />
                        <Image source={ImagePath.search} style={styles.searchIcon} />
                    </View>
                    <View style={[styles.bodyContent, { paddingBottom: state.totalItem > 0 ? 65 : 0 }]}>
                        <FlatList
                            data={state.data}
                            keyExtractor={(item, index) => item.id}
                            renderItem={({ item }) =>
                                <List item={item} onPress={onRequest} onUpdateCart={onUpdateCart} />
                            }
                            ItemSeparatorComponent={ItemSeperator}
                            refreshControl={<RefreshControl refreshing={false} onRefresh={onGetData} />}
                            showsVerticalScrollIndicator={false}
                        />
                    </View>
                </View>
                {(state.totalItem > 0) && (
                    <View style={[styles.btmContainer, { backgroundColor: Colors.white }]}>
                        <View>
                            <Text style={[CommonStyle.boldtext, { color: appData.color_theme, fontSize: 18 }]}>{state.totalItem} {state.totalItem > 1 ? 'Items' : 'Item'}</Text>
                            <Text style={[CommonStyle.boldtext, { color: Colors.grey, fontSize: 10 }]}>Estimated Time {state.totalTime}</Text>
                        </View>
                        <TouchableOpacity onPress={onCartList} activeOpacity={0.5} style={[styles.cartbtn, { backgroundColor: appData?.color_theme }]}>
                            <Text style={[CommonStyle.boldtext, { color: Colors.white, fontSize: 14 }]}>VIEW CART</Text>
                        </TouchableOpacity>
                    </View>
                )}
            </View>
            {(state.loading) && (
                <LoaderNew loading={state.loading} />
            )}
        </SafeAreaView>
    )
}

export default HouseKeeping