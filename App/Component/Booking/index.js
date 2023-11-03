import { View, Text, SafeAreaView, Image, TouchableOpacity, ScrollView } from 'react-native'
import React, { useCallback, useState, useContext } from 'react'
import { CommonStyle } from '../../Utils/CommonStyle'
import Header from '../../Container/Header'
import { ImagePath } from '../../Utils/ImagePath'
import { styles } from './styles'
import StarView from '../../Container/StarView'
import InputField from '../../Container/InputField'
import DateTimePickers from '../../Container/DateTimePickers'
import { ToastMessage, dateConvertNew, dateConvertYear } from '../../Services/CommonFunction'
import CustomDropDown from '../../Container/CustomDropDown'
import { Colors } from '../../Utils/Colors'
import AuthContext from '../../Services/Context'
import { useFocusEffect } from '@react-navigation/native'

const Booking = ({ navigation, route }) => {

    const context = useContext(AuthContext);
    const { appData, accesstoken, isLogin } = context.allData

    const [state, setState] = useState({
        loading: false,
        data: route?.params?.data,
        item: route?.params?.item,
        checkinDate: '',
        checkinDateErr: '',
        checkinDatePicker: false,
        checkoutDate: '',
        checkoutDateErr: '',
        checkoutDatePicker: false,
        roomCategory: route?.params?.item?.room_type_name,
        room: 1,
        roomErr: '',
        adults: '',
        adultsErr: '',
        child: '',
        childErr: '',
        roomtype: '',
        roomtypeErr: '',
        totalAmount: 0
    })
    const [roomPicker, setroomPicker] = useState(false)
    const [roomList, setroomList] = useState([
        { label: '1', value: 1 },
        { label: '2', value: 2 },
        { label: '3', value: 3 },
        { label: '4', value: 4 },
        { label: '5', value: 5 }
    ])
    const [adultsPicker, setadultsPicker] = useState(false)
    const [childPicker, setchildPicker] = useState(false)
    const [childList, setchildList] = useState([
        { label: '1', value: 1 },
        { label: '2', value: 2 },
        { label: '3', value: 3 },
        { label: '4', value: 4 },
        { label: '5', value: 5 }
    ])
    const [roomtypePicker, setroomtypePicker] = useState(false)
    const [roomtypeList, setroomtypeList] = useState([
        { label: 'Room Only', value: 'room_only' },
        { label: 'Room With Breakfast', value: 'room_breakfast' },
    ])

    useFocusEffect(
        useCallback(() => {
            const unsubscribe = onLoad();
            return () => unsubscribe
        }, [navigation])
    )

    const onLoad = useCallback(async (room = state.room) => {
        let unitprice = route?.params?.item?.room_rent;
        setState(prev => ({
            ...prev,
            totalAmount: unitprice * room
        }))
    })

    const onLeftMenu = useCallback(async () => {
        navigation.goBack();
    })

    const onOpenCheckinDate = useCallback(async () => {
        setState(prev => ({
            ...prev,
            checkinDatePicker: true
        }))
    })

    const onOpenCheckoutDate = useCallback(async () => {
        setState(prev => ({
            ...prev,
            checkoutDatePicker: true
        }))
    })

    const onChangeCheckinDate = useCallback(async (value) => {
        // console.log(date)
        // console.log(new Date(dateConvertYear('15-09-2023')))
        let time = value?.nativeEvent?.timestamp;
        if (value.type == 'set') {
            setState(prev => ({
                ...prev,
                checkinDate: time,
                checkinDateErr: '',
                checkinDatePicker: false
            }))
        } else {
            setState(prev => ({
                ...prev,
                checkinDatePicker: false
            }))
        }
    })

    const onChangeCheckoutDate = useCallback(async (value) => {
        // console.log(date)
        let time = value?.nativeEvent?.timestamp;
        if (value.type == 'set') {
            setState(prev => ({
                ...prev,
                checkoutDate: time,
                checkoutDateErr: '',
                checkoutDatePicker: false
            }))
        } else {
            setState(prev => ({
                ...prev,
                checkoutDatePicker: false
            }))
        }
    })

    const onChangeRoom = useCallback(async (value) => {
        setState(prev => ({
            ...prev,
            room: value?.value,
            roomErr: ''
        }))
        await onLoad(value?.value);
    })

    const onChangeAdults = useCallback(async (value) => {
        setState(prev => ({
            ...prev,
            adults: value?.value,
            adultsErr: ''
        }))
    })

    const onChangeChild = useCallback(async (value) => {
        setState(prev => ({
            ...prev,
            child: value?.value,
            childErr: ''
        }))
    })

    const onChangeRoomtype = useCallback(async (value) => {
        setState(prev => ({
            ...prev,
            roomtype: value?.value,
            roomtypeErr: ''
        }))
    })

    const onBook = useCallback(async () => {
        ToastMessage('Comming Soon');
        // navigation.replace('BookingConfirm')
    })

    return (
        <SafeAreaView style={CommonStyle.container}>
            <Header
                leftIcon={ImagePath.back_new}
                leftonPress={onLeftMenu}
                rightIcon={ImagePath.bell}
            />
            <ScrollView showsVerticalScrollIndicator={false}>
                <Image source={ImagePath.banner1} style={styles.img} />
                <View style={styles.bodyContent}>
                    <Text style={[CommonStyle.headingText, { color: appData?.color_theme }]}>{state.data?.name}</Text>
                    {/* <TouchableOpacity activeOpacity={0.5} style={styles.flex}>
                        <View style={styles.flexNew}>
                            <StarView rating={state.data?.rating} />
                            <Text style={[CommonStyle.boldtext, { marginLeft: '4%', color: appData?.color_theme }]}>Very Good</Text>
                        </View>
                        <Image source={ImagePath.right_arrow} style={[styles.location, { tintColor: appData?.color_theme }]} />
                    </TouchableOpacity> */}
                    <View style={styles.locationContainer}>
                        <Image source={ImagePath.location} style={[styles.location, { tintColor: appData?.color_theme }]} />
                        <Text style={CommonStyle.boldtextgrey}> {state.data?.location}</Text>
                    </View>
                    <View style={[styles.border, { borderColor: appData?.color_theme }]} />
                    <View>
                        <Text style={[CommonStyle.headingText, { color: appData?.color_theme }]}>Travel Dates & Guests</Text>
                        <View style={styles.inputContent}>
                            <InputField
                                name={'Room Category'}
                                headingColor={Colors.textColor}
                                value={state.roomCategory}
                                // placeholder={'Select Check In Date'}
                                editable={false}
                            />
                            <CustomDropDown
                                name={'No of Room'}
                                headingColor={Colors.textColor}
                                value={state.room}
                                items={roomList}
                                setItems={setroomList}
                                open={roomPicker}
                                setOpen={setroomPicker}
                                onChangeValue={onChangeRoom}
                                error={state.roomErr}
                            />
                            <InputField
                                name={'Check In'}
                                headingColor={Colors.textColor}
                                value={dateConvertNew(state.checkinDate)}
                                placeholder={'Select Check In Date'}
                                editable={false}
                                rightIcon={ImagePath.calendar}
                                rightonPress={onOpenCheckinDate}
                                error={state.checkinDateErr}
                            />
                            <InputField
                                name={'Check Out'}
                                headingColor={Colors.textColor}
                                value={dateConvertNew(state.checkoutDate)}
                                placeholder={'Select Check Out Date'}
                                editable={false}
                                rightIcon={ImagePath.calendar}
                                rightonPress={onOpenCheckoutDate}
                                error={state.checkoutDateErr}
                            />
                            {/* <CustomDropDown
                                name={'Room'}
                                headingColor={Colors.textColor}
                                value={state.room}
                                items={roomList}
                                setItems={setroomList}
                                open={roomPicker}
                                setOpen={setroomPicker}
                                onChangeValue={onChangeRoom}
                                error={state.roomErr}
                            /> */}
                            <CustomDropDown
                                name={'Adults'}
                                headingColor={Colors.textColor}
                                value={state.adults}
                                items={roomList}
                                setItems={setroomList}
                                open={adultsPicker}
                                setOpen={setadultsPicker}
                                onChangeValue={onChangeAdults}
                                error={state.adultsErr}
                            />
                            <CustomDropDown
                                name={'Children'}
                                headingColor={Colors.textColor}
                                value={state.child}
                                items={childList}
                                setItems={setchildList}
                                open={childPicker}
                                setOpen={setchildPicker}
                                onChangeValue={onChangeChild}
                                error={state.childErr}
                            />
                            {/* <CustomDropDown
                                name={'Room Type'}
                                headingColor={Colors.textColor}
                                value={state.roomtype}
                                items={roomtypeList}
                                setItems={setroomtypeList}
                                open={roomtypePicker}
                                setOpen={setroomtypePicker}
                                onChangeValue={onChangeRoomtype}
                                error={state.roomtypeErr}
                            /> */}
                        </View>
                    </View>
                </View>
            </ScrollView>
            <View style={[styles.btnContainer, { borderColor: appData?.color_theme }]}>
                <Text style={[CommonStyle.headingText, { color: appData?.color_theme }]}>Total: ₹ {state.totalAmount}</Text>
                <TouchableOpacity onPress={onBook} activeOpacity={0.5} style={[styles.btn, { backgroundColor: appData?.color_theme }]}>
                    <Text style={[CommonStyle.boldtext, { color: Colors.highlight }]}>BOOK</Text>
                </TouchableOpacity>
            </View>
            {(state.checkinDatePicker) && (
                <DateTimePickers
                    value={state?.checkinDate ? new Date(state?.checkinDate) : new Date()}
                    mode={'date'}
                    onConfirm={onChangeCheckinDate}
                    minimumDate={new Date()}
                />
            )}
            {(state.checkoutDatePicker) && (
                <DateTimePickers
                    value={state.checkoutDate ? new Date(state.checkoutDate) : new Date()}
                    mode={'date'}
                    onConfirm={onChangeCheckoutDate}
                    minimumDate={new Date()}
                />
            )}
        </SafeAreaView>
    )
}

export default Booking