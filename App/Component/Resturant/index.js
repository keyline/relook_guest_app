import { View, Text, SafeAreaView, FlatList } from 'react-native'
import React, { useState, useCallback, useContext } from 'react'
import { styles } from './styles'
import { CommonStyle } from '../../Utils/CommonStyle'
import Header from '../../Container/Header'
import { ImagePath } from '../../Utils/ImagePath'
import List from './List'
import { Colors } from '../../Utils/Colors'
import AuthContext from '../../Services/Context'

const itemList = [
    { id: 1, name: 'Rice', img: ImagePath.food1, desc: 'Delicious rice dish with savory flavors.', price: '30', category: 1 },
    { id: 2, name: 'Burger', img: ImagePath.food2, desc: 'Delicious, juicy burger', price: '40', category: 2 },
    { id: 3, name: 'Dossa', img: ImagePath.food3, price: '50', category: 1, desc: 'South Indian crepe made from fermented rice and lentil batter, typically served with various chutneys and sambar' },
    { id: 4, name: 'Chicken', img: ImagePath.food4, price: '100', category: 2, desc: ' This dish made with tender chicken pieces, cooked in a spicy and aromatic tomato-based gravy' },

]

const Resturant = ({ navigation }) => {

    const context = useContext(AuthContext);
    const { appData, accesstoken, isLogin } = context.allData

    const onLeftMenu = useCallback(async () => {
        navigation.goBack();
    })

    const ItemSeperator = () => (
        <View style={{ borderWidth: 0.5, borderColor: Colors.them_color, marginVertical: '1%' }} />
    )

    return (
        <SafeAreaView style={CommonStyle.container}>
            <Header
                leftIcon={ImagePath.back_new}
                leftonPress={onLeftMenu}
                rightIcon={ImagePath.bell}
            />
            <Text style={[CommonStyle.headingText, { marginVertical: '4%', textAlign: 'center',color:appData?.color_theme }]}>Relish Restaurant</Text>
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

export default Resturant