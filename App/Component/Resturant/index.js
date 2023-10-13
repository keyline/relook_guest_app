import { View, Text, SafeAreaView, FlatList } from 'react-native'
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

const itemList = [
    { id: 1, name: 'Rice', img: ImagePath.food1, desc: 'Delicious rice dish with savory flavors.', price: '30', category: 1 },
    { id: 2, name: 'Burger', img: ImagePath.food2, desc: 'Delicious, juicy burger', price: '40', category: 2 },
    { id: 3, name: 'Dossa', img: ImagePath.food3, price: '50', category: 1, desc: 'South Indian crepe made from fermented rice and lentil batter, typically served with various chutneys and sambar' },
    { id: 4, name: 'Chicken', img: ImagePath.food4, price: '100', category: 2, desc: ' This dish made with tender chicken pieces, cooked in a spicy and aromatic tomato-based gravy' },

]

const Resturant = ({ navigation }) => {

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
                loading: true
            }))
            let datas = {
                key: KEY,
                source: SOURCE,
                id: '1'
            }
            const response = await Apis.resturant_list(datas)
            if (__DEV__) {
                console.log('ResturantList', JSON.stringify(response))
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
        <View style={{ borderWidth: 0.5, borderColor: appData?.color_theme, marginVertical: '1%' }} />
    )

    const onOrder = useCallback(async (item) => {
        console.log(item)
    })

    return (
        <SafeAreaView style={CommonStyle.container}>
            <Header
                leftIcon={ImagePath.back_new}
                leftonPress={onLeftMenu}
                rightIcon={ImagePath.bell}
            />
            {(state.loading) ? <LoaderNew loading={state.loading} /> :
                <>
                    <Text style={[CommonStyle.headingText, { marginVertical: '4%', textAlign: 'center', color: appData?.color_theme }]}>Relish Restaurant</Text>
                    {(state.data) && (
                        <View style={styles.bodyContent}>
                            <FlatList
                                data={state.data}
                                keyExtractor={(item, index) => item.id}
                                renderItem={({ item }) =>
                                    <List item={item} onPress={onOrder} />
                                }
                                ItemSeparatorComponent={ItemSeperator}
                            />
                        </View>
                    )}
                </>
            }
        </SafeAreaView>
    )
}

export default Resturant