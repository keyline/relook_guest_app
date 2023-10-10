import { View, Text, SafeAreaView, Image, TouchableOpacity, FlatList } from 'react-native'
import React, { useCallback, useState, useContext } from 'react'
import { CommonStyle } from '../../Utils/CommonStyle'
import Header from '../../Container/Header'
import { ImagePath } from '../../Utils/ImagePath'
import { Colors } from '../../Utils/Colors'
import { styles } from './styles'
import List from './List'
import AuthContext from '../../Services/Context'

const itemList = [
    { id: 1, label: 'Rquest for bill' },
    { id: 2, label: 'Book a Car' },
    { id: 3, label: 'Have a question? Call us' },

]

const FrontOffice = ({ navigation }) => {

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
            <Text style={[CommonStyle.headingText, { marginVertical: '4%', textAlign: 'center', color: appData?.color_theme }]}>Front Office</Text>
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

export default FrontOffice