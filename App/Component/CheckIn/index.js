import { View, Text, SafeAreaView, FlatList, TouchableOpacity } from 'react-native'
import React, { useCallback, useState, useContext } from 'react'
import { styles } from './styles'
import { CommonStyle } from '../../Utils/CommonStyle'
import Header from '../../Container/Header'
import { ImagePath } from '../../Utils/ImagePath'
import List from './List'
import AuthContext from '../../Services/Context'
import { Colors } from '../../Utils/Colors'
import { Font_Family } from '../../Utils/Fonts'

const menuList = [
    // { id: 1, screen: 'FrontOffice', label: 'Front Office', desc: 'Ask for bill, have a question?, need a car?', icon: ImagePath.housekeeping_logo },
    { id: 2, screen: 'HouseKeeping', label: 'House Keeping', desc: 'Need some Extra?', icon: ImagePath.housekeeping_logo },
    { id: 3, screen: 'Resturant', label: 'Relish Restaurant', desc: 'Order delicious foods from your room', icon: ImagePath.resturant_logo }
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
        if (item.screen) {
            navigation.navigate(item.screen)
        }
    })

    return (
        <SafeAreaView style={[CommonStyle.container, { backgroundColor: appData?.color_theme }]}>
            <Header
                // leftIcon={ImagePath.menu}
                // leftonPress={onLeftMenu}
                // rightIcon={ImagePath.bell}
            />
            <View style={styles.mainContent}>
                <View style={[styles.bodyContent, { backgroundColor: appData?.color_theme }]}>
                    <View style={[styles.checkinContainer]}>
                        <Text style={styles.checkinText}>Welcome</Text>
                        <Text style={[styles.checkinText, { fontFamily: Font_Family.NunitoSans_Bold }]}>{bookingDetail?.user_name}</Text>
                        <Text style={styles.checkinText}>To Relook Hotels, {bookingDetail?.hotel_name}</Text>
                    </View>
                    <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', flexWrap: 'wrap', overflow: 'hidden', justifyContent: 'space-between' }}>
                        {menuList.map((item, key) => (
                            <List key={key} item={item} onPress={onItemPress} />
                        ))}
                        {/* <FlatList
                            data={menuList}
                            keyExtractor={(item, index) => item.id}
                            renderItem={({ item }) =>
                                <List item={item} onPress={onItemPress} />
                            }
                            // numColumns={2}
                            ItemSeparatorComponent={ItemSeperator}
                        /> */}
                    </View>
                </View>
            </View>
        </SafeAreaView>
    )
}

export default CheckIn