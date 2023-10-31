import { View, Text, SafeAreaView, FlatList, TouchableOpacity, Image } from 'react-native'
import React, { useState, useContext, useCallback } from 'react'
import { CommonStyle } from '../../Utils/CommonStyle'
import { ImagePath } from '../../Utils/ImagePath'
import Header from '../../Container/Header'
import { styles } from './styles'
import List from './List'
import { Colors } from '../../Utils/Colors'
import AuthContext from '../../Services/Context'

const listitem = [
    { id: 1, name: 'Coffee', price: 100, qty: 1, status: '3' },
    { id: 2, name: 'Chicken Biriyani', price: 200, qty: 2, status: '2' },
    { id: 3, name: 'Paneer', price: 170, qty: 1, status: '1' },
    { id: 4, name: 'Veg Pakora', price: 100, qty: 2, status: '3' },
    { id: 5, name: 'Coffee', price: 100, qty: 1, status: '3' },
    { id: 6, name: 'Chicken Biriyani', price: 200, qty: 2, status: '2' },
    { id: 7, name: 'Paneer', price: 170, qty: 1, status: '1' },
    { id: 8, name: 'Veg Pakora', price: 100, qty: 2, status: '3' },
]

const OrderList = ({ navigation, route }) => {

    const params = route?.params?.page
    const context = useContext(AuthContext);
    const { appData, accesstoken, isLogin } = context.allData

    const onLeftMenu = useCallback(async () => {
        if (params) {
            navigation.goBack();
        } else {
            navigation.openDrawer();
        }
    })

    const ItemSeperatorNew = () => (
        <View style={{ borderWidth: 1, borderColor: Colors.grey, marginVertical: '3%' }} />
    )

    return (
        <SafeAreaView style={CommonStyle.container}>
            <Header
                leftIcon={params ? ImagePath.back_new : ImagePath.menu}
                leftonPress={onLeftMenu}
                rightIcon={ImagePath.bell}
            />
            <View style={styles.bodyContent}>
                <Text style={[CommonStyle.headingText, { marginBottom: '6%', textAlign: 'center', color: appData?.color_theme }]}>My Orders</Text>
                <FlatList
                    data={listitem}
                    keyExtractor={(item, index) => item.id}
                    renderItem={({ item }) =>
                        <List item={item} />
                    }
                    showsVerticalScrollIndicator={false}
                    ItemSeparatorComponent={ItemSeperatorNew}
                />
            </View>
        </SafeAreaView>
    )
}

export default OrderList