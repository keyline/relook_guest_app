import { View, Text, SafeAreaView, FlatList, TouchableOpacity } from 'react-native'
import React, { useCallback, useState, useContext } from 'react'
import { styles } from './styles'
import { CommonStyle } from '../../Utils/CommonStyle'
import Header from '../../Container/Header'
import { ImagePath } from '../../Utils/ImagePath'
import List from './List'
import AuthContext from '../../Services/Context'

const menuList = [
    { id: 1, label: 'House Keeping', desc: 'Need a Extra Pillow?' },
    { id: 2, label: 'Relish Restaurant', desc: 'Order tasty food from your Room' },
    // { id: 3, label: 'Front Office', desc: 'Ask for bill, have a question?, need a car?' }
]

const CheckIn = ({ navigation }) => {

    const context = useContext(AuthContext);
    const { appData, accesstoken, isLogin, bookingDetail } = context.allData

    const onLeftMenu = useCallback(async () => {
        navigation.openDrawer();
    })

    const ItemSeperator = () => (
        <View style={{ marginVertical: '2%' }} />
    )

    const onItemPress = useCallback(async (item) => {
        // console.log('Item', item)
        if (item.id == 1) {
            navigation.navigate('HouseKeeping')
        } else if (item.id == 2) {
            navigation.navigate('Resturant')
        } else if (item.id == 3) {
            navigation.navigate('FrontOffice')
        }
    })

    return (
        <SafeAreaView style={CommonStyle.container}>
            <Header
                leftIcon={ImagePath.menu}
                leftonPress={onLeftMenu}
                rightIcon={ImagePath.bell}
            />
            <View style={styles.bodyContent}>
                <TouchableOpacity activeOpacity={0.5} style={[styles.checkinContainer]}>
                    <Text style={[styles.checkinText, { color: appData?.color_theme, fontSize: 18 }]}>Welcome {bookingDetail?.user_name}</Text>
                    <Text style={[styles.checkinText, { color: appData?.color_theme, fontSize: 18 }]}>to Relook Hotel</Text>
                    <Text style={[styles.checkinText, { color: appData?.color_theme, fontSize: 18 }]}>{bookingDetail?.hotel_name}</Text>
                </TouchableOpacity>
                <View style={{ flex: 1 }}>
                    <FlatList
                        data={menuList}
                        keyExtractor={(item, index) => item.id}
                        renderItem={({ item }) =>
                            <List item={item} onPress={onItemPress} />
                        }
                        ItemSeparatorComponent={ItemSeperator}
                    />
                </View>
            </View>
        </SafeAreaView>
    )
}

export default CheckIn