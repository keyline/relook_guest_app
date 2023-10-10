import { View, Text, SafeAreaView, FlatList } from 'react-native'
import React, { useCallback, useState, useContext } from 'react'
import { Colors } from '../../Utils/Colors';
import Header from '../../Container/Header';
import { ImagePath } from '../../Utils/ImagePath';
import { CommonStyle } from '../../Utils/CommonStyle';
import { styles } from './styles';
import List from './List';
import AuthContext from '../../Services/Context';

const itemList = [
    { id: 1, name: 'Pillow', img: ImagePath.pillow, desc: 'High-quality and soft pillows for comfort', price: '20' },
    { id: 2, name: 'Blanket', img: ImagePath.blanket, desc: 'Soft, cozy blankets', price: '40' },
    { id: 3, name: 'Bedsheet', img: ImagePath.bedsheet, desc: 'High-quality and durable bedsheets', price: '30' },
    { id: 4, name: 'Room Cleaning', img: ImagePath.room_clean, desc: 'Efficient room cleaning for your comfort', price: '20' },

]

const HouseKeeping = ({ navigation }) => {

    const context = useContext(AuthContext);
    const { appData, accesstoken, isLogin } = context.allData

    const onLeftMenu = useCallback(async () => {
        navigation.goBack();
    })

    const ItemSeperator = () => (
        <View style={{ borderWidth: 0.5, borderColor: appData?.color_theme, marginVertical: '1%' }} />
    )

    return (
        <SafeAreaView style={CommonStyle.container}>
            <Header
                leftIcon={ImagePath.back_new}
                leftonPress={onLeftMenu}
                rightIcon={ImagePath.bell}
            />
            <Text style={[CommonStyle.headingText, { marginVertical: '4%', textAlign: 'center', color: appData?.color_theme }]}>House Keeping</Text>
            <View style={styles.bodyContent}>
                <FlatList
                    data={itemList}
                    keyExtractor={(item, index) => item.id}
                    renderItem={({ item }) =>
                        <List item={item} />
                    }
                    ItemSeparatorComponent={ItemSeperator}
                />
            </View>
        </SafeAreaView>
    )
}

export default HouseKeeping