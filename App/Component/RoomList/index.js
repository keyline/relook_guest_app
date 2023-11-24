import { View, Text, SafeAreaView, ScrollView, Image, TouchableOpacity, FlatList } from 'react-native'
import React, { useContext, useCallback, useState } from 'react'
import { CommonStyle } from '../../Utils/CommonStyle'
import Header from '../../Container/Header'
import { ImagePath } from '../../Utils/ImagePath'
import { styles } from './styles'
import StarView from '../../Container/StarView'
import AuthContext from '../../Services/Context'
import List from './List'
import { useFocusEffect } from '@react-navigation/native'
import { ToastError, ToastMessage } from '../../Services/CommonFunction'
import { KEY, SOURCE } from '../../Services/Constant'
import Apis from '../../Services/Apis'
import Details from './Details'
import LoaderNew from '../../Container/LoaderNew'
import Loader from '../../Container/Loader'
import { Colors } from '../../Utils/Colors'

const room = [
    { id: 1, type: 'Single Rooms', img: ImagePath.room1, price: '1000' },
    { id: 2, type: 'Double Rooms', img: ImagePath.room2, price: '1400' },
    { id: 3, type: 'Deluxe Rooms', img: ImagePath.room1, price: '2000' },

]

const RoomList = ({ navigation, route }) => {

    const context = useContext(AuthContext);
    const { appData, accesstoken, isLogin } = context.allData
    const params = route?.params?.item
    const [state, setState] = useState({
        loading: true,
        data: null,
        modalVisible: false,
        modalData: null
    })

    useFocusEffect(
        useCallback(() => {
            const unsubscribe = onGetData();
            return () => unsubscribe
        }, [navigation])
    )

    const onGetData = useCallback(async () => {
        try {
            setState(prevState => ({
                ...prevState,
                loading: true
            }))
            let datas = {
                key: KEY,
                source: SOURCE,
                id: params.id
            }
            const response = await Apis.get_hotelroom(datas)
            if (__DEV__) {
                console.log('RoomList', JSON.stringify(response))
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
                    loading: false
                }))
                ToastMessage(response?.message);
            }
        } catch (error) {
            setState(prevState => ({
                ...prevState,
                data: [],
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

    const onNext = useCallback(async (item) => {
        navigation.navigate('Booking', { item: item, data: state.data })
    })

    const onShowModal = useCallback(async (item) => {
        setState(prev => ({
            ...prev,
            modalData: item,
            modalVisible: true
        }))
    })

    const onHideModal = useCallback(async () => {
        setState(prev => ({
            ...prev,
            modalVisible: false,
            modalData: null
        }))
    })

    return (
        <SafeAreaView style={[CommonStyle.container, { backgroundColor: appData?.color_theme }]}>
            <Header
                leftIcon={ImagePath.back_new}
                leftonPress={onLeftMenu}
            />
            {(state.loading) ? <Loader loading={state.loading} /> :
                <View style={styles.mainContent}>
                    <ScrollView showsVerticalScrollIndicator={false}>
                    <View style={[styles.bodyContent, { backgroundColor: appData?.color_theme }]}>
                        <Image source={{ uri: state.data?.cover_image }} style={styles.imgBanner} />
                        <View style={{ paddingHorizontal: '3%' }}>
                            <View style={styles.locationContainer}>
                                <Image source={ImagePath.location} style={[styles.location, { tintColor: Colors.white }]} />
                                <View style={styles.locationContent}>
                                    <Text style={[CommonStyle.headingText, { color: Colors.white, fontSize: 18 }]}>{state.data?.name}</Text>
                                    <Text style={[CommonStyle.lightText, { color: Colors.white }]}> {state.data?.location}</Text>
                                </View>
                            </View>
                            <View style={[styles.border, { borderColor: Colors.white }]} />
                            <View style={{ flex: 1, }}>
                                <Text style={[CommonStyle.headingText, { textAlign: 'center', color: Colors.white, fontSize: 18 }]}>Room Type</Text>
                                {(state.data?.room_type_list && state.data?.room_type_list.length > 0) && (
                                    <View style={{ flex: 1, marginTop: '4%' }}>
                                        {(state.data?.room_type_list).map((item, key) => (
                                            <List key={key} item={item} onPress={onNext} onDetails={onShowModal} />
                                        ))}
                                        {/* <FlatList
                                                data={state.data?.room_type_list}
                                                keyExtractor={(item, index) => item.room_id}
                                                renderItem={({ item }) =>
                                                    // <List item={item} onPress={onNext} />
                                                    <List item={item} onPress={onNext} onDetails={onShowModal} />
                                                }
                                                showsVerticalScrollIndicator={false}
                                            /> */}
                                    </View>
                                )}
                            </View>
                        </View>
                    </View>
                    </ScrollView>
                </View>
            }
            <Details
                data={state.modalData}
                isVisible={state.modalVisible}
                onModalHide={onHideModal}
            />
        </SafeAreaView>
    )
}

export default RoomList