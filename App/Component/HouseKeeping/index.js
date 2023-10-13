import { View, Text, SafeAreaView, FlatList } from 'react-native'
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
            const response = await Apis.housekeeping_list(datas)
            if (__DEV__) {
                console.log('HouseKeeping', JSON.stringify(response))
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

    const onRequest = useCallback(async (item,qty) => {
        console.log(item)
        console.log(qty)
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
                    <Text style={[CommonStyle.headingText, { marginVertical: '4%', textAlign: 'center', color: appData?.color_theme }]}>House Keeping</Text>
                    {(state.data) && (
                        <View style={styles.bodyContent}>
                            <FlatList
                                data={state.data}
                                keyExtractor={(item, index) => item.id}
                                renderItem={({ item }) =>
                                    <List item={item} onPress={onRequest} />
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

export default HouseKeeping