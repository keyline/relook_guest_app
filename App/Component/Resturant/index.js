import { View, Text, SafeAreaView, FlatList, TextInput, Image, TouchableOpacity } from 'react-native'
import React, { useState, useCallback, useContext } from 'react'
import { styles } from './styles'
import { CommonStyle } from '../../Utils/CommonStyle'
import Header from '../../Container/Header'
import { ImagePath } from '../../Utils/ImagePath'
import List from './List'
import { Colors } from '../../Utils/Colors'
import AuthContext from '../../Services/Context'
import { useFocusEffect } from '@react-navigation/native'
import Apis from '../../Services/Apis'
import { KEY, SOURCE } from '../../Services/Constant'
import { ToastError, ToastMessage } from '../../Services/CommonFunction'
import LoaderNew from '../../Container/LoaderNew'
import ListNew from './ListNew'
import Loader from '../../Container/Loader'

const itemList = [
    { id: 1, name: 'Rice', img: ImagePath.food1, desc: 'Delicious rice dish with savory flavors.', price: '30', category: 1 },
    { id: 2, name: 'Burger', img: ImagePath.food2, desc: 'Delicious, juicy burger', price: '40', category: 2 },
    { id: 3, name: 'Dossa', img: ImagePath.food3, price: '50', category: 1, desc: 'South Indian crepe made from fermented rice and lentil batter, typically served with various chutneys and sambar' },
    { id: 4, name: 'Chicken', img: ImagePath.food4, price: '100', category: 2, desc: ' This dish made with tender chicken pieces, cooked in a spicy and aromatic tomato-based gravy' },

]

const list = [
    {
        catid: '1', name: 'Veg Main Course', items: [
            { id: '1', itemname: 'Palak Paneer', price: '170', desc: 'Veg', qty: 1 },
            { id: '2', itemname: 'Chilly Paneer', price: '180', desc: 'Veg' },
        ]
    },
    {
        catid: '2', name: 'Biryani', items: [
            { id: '3', itemname: 'Veg Biryani', price: '120', desc: 'Veg' },
            { id: '4', itemname: 'Chicken Biryani', price: '180', desc: 'Non-Veg' },
            { id: '5', itemname: 'Motton Biryani', price: '220', desc: 'Non-Veg', qty: 2 },
        ]
    },
    {
        catid: '3', name: 'Snack', items: [
            { id: '6', itemname: 'Veg Pakora(8 pcs)', price: '100', desc: 'Veg' },
            { id: '7', itemname: 'Paneer Pakora(8 pcs)', price: '120', desc: 'Veg' },
            { id: '8', itemname: 'Veg Cutlet(8 pcs)', price: '120', desc: 'Veg' },
        ]
    },
]

const Resturant = ({ navigation }) => {

    const context = useContext(AuthContext);
    const { appData, accesstoken, isLogin, bookingDetail } = context.allData

    const [state, setState] = useState({
        loading: false,
        data: null,
        item: null,
        totalItem: 0,
        totalAmount: 0,
        totalTime: "",
        search: ""
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
            const response = await Apis.resturant_list(datas)
            if (__DEV__) {
                // console.log('ResturantList', JSON.stringify(response))
            }
            if (response.status) {
                if (response.data && response?.data?.items.length > 0) {
                    let items = response?.data?.items.filter(obj => obj.food_items_count > 0)
                    setState(prev => ({
                        ...prev,
                        // data: response?.data,
                        item: items,
                        totalItem: response?.data?.total_item,
                        totalAmount: response?.data?.total_amount,
                        totalTime: response?.data?.total_time,
                        loading: false
                    }))
                }
            } else {
                setState(prev => ({
                    ...prev,
                    item: null,
                    totalAmount: 0,
                    totalItem: 0,
                    totalTime: '',
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
        <View style={{ borderWidth: 0.5, borderColor: appData?.color_theme, marginVertical: '1%' }} />
    )

    const ItemSeperatorNew = () => (
        <View style={{ borderWidth: 0, borderColor: Colors.light_gery, marginVertical: '1.5%' }} />
    )

    const onOrder = useCallback(async (item) => {
        console.log(item)
    })

    const onCartList = useCallback(async () => {
        navigation.navigate('CartList', { page: 'Resturant' })
    })

    const onSearch = useCallback(async (value) => {
        setState(prev => ({
            ...prev,
            search: value
        }))
        onGetData(value)
    })

    const onUpdateValue = useCallback(async (catlist, items, type) => {
        const index = state.item.findIndex(item => item.category_id === catlist?.category_id);
        if (index !== -1) {
            const itemindex = state.item[index].food_items.findIndex(item => item.id === items?.id)
            if (itemindex !== -1) {
                let qty = state.item[index].food_items[itemindex].order_qty
                state.item[index].food_items[itemindex].order_qty = type == 'add' ? qty + 1 : qty - 1
            }
        }
    })

    const onUpdateCart = useCallback(async (catlist, item, type) => {
        try {
            setState(prev => ({
                ...prev,
                loading: true
            }))
            let datas = {
                key: KEY,
                source: SOURCE,
                cart_type: '1',
                item_id: item?.id,
                count: type == 'add' ? item?.order_qty + 1 : item?.order_qty - 1,
                action: type
            }
            const res = await Apis.update_cart(datas)
            if (__DEV__) {
                console.log('UpdateCart', JSON.stringify(res))
            }
            if (res.status) {
                onUpdateValue(catlist, item, type);
                setState(prev => ({
                    ...prev,
                    totalAmount: type == 'add' ? state.totalAmount + item?.price : state.totalAmount - item?.price,
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
        <SafeAreaView style={CommonStyle.container}>
            <Header
                leftIcon={ImagePath.back_new}
                leftonPress={onLeftMenu}
                rightIcon={ImagePath.bell}
            />
            <>
                <Text style={[CommonStyle.headingText, { marginVertical: '4%', textAlign: 'center', color: appData?.color_theme }]}>Relish Restaurant</Text>
                {/* {(state.data) && (
                        <View style={styles.bodyContent}>
                            <FlatList
                            data={state.data}
                            keyExtractor={(item, index) => item.id}
                            renderItem={({ item }) =>
                                    <List item={item} onPress={onOrder} />
                                }
                                ItemSeparatorComponent={ItemSeperator}
                                showsVerticalScrollIndicator={false}
                                />
                                </View>
                            )} */}
                <View style={styles.bodyContent}>
                    <View style={styles.searchContainer}>
                        <TextInput
                            style={{ paddingHorizontal: '4%', color: Colors.black, width: '80%' }}
                            placeholder='Search items'
                            value={state.search}
                            placeholderTextColor={Colors.grey}
                            onChangeText={e => onSearch(e)}
                        />
                        <Image source={ImagePath.search} style={styles.searchIcon} />
                    </View>
                    {/* {(state.loading) ? <LoaderNew loading={state.loading} /> : */}
                    <View style={{ marginBottom: state.totalItem > 0 ? 120 : 10 }}>
                        <FlatList
                            data={state.item}
                            keyExtractor={(item, index) => item.category_id}
                            renderItem={({ item, index }) =>
                                <ListNew item={item} index={index} onUpdateCart={onUpdateCart} />
                            }
                            ItemSeparatorComponent={ItemSeperatorNew}
                            showsVerticalScrollIndicator={false}
                        // style={{ paddingBottom: 80 }}
                        />
                    </View>
                    {/* } */}
                    {(state.totalItem > 0) && (
                        <View style={[styles.btmContainer, { backgroundColor: appData?.color_theme }]}>
                            <View>
                                <Text style={[CommonStyle.boldtext, { color: Colors.white, fontSize: 16 }]}>{state.totalItem} {state.totalItem > 1 ? 'Items' : 'Item'} | Rs. {state.totalAmount}</Text>
                                <Text style={[CommonStyle.boldtext, { color: Colors.white, fontSize: 16 }]}>Estimated Time {state.totalTime}</Text>
                            </View>
                            <TouchableOpacity onPress={onCartList} activeOpacity={0.5} style={styles.cartbtn}>
                                <Text style={[CommonStyle.boldtext, { color: appData?.color_theme, fontSize: 16 }]}>View Cart</Text>
                            </TouchableOpacity>
                        </View>
                    )}
                </View>
                {(state.loading) && (
                    <LoaderNew loading={state.loading} />
                )}
            </>
        </SafeAreaView>
    )
}

export default Resturant