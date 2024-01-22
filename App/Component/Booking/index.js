import { View, Text, SafeAreaView, Image, TouchableOpacity, ScrollView, Dimensions } from 'react-native'
import React, { useCallback, useState, useContext, useEffect } from 'react'
import { CommonStyle } from '../../Utils/CommonStyle'
import Header from '../../Container/Header'
import { ImagePath } from '../../Utils/ImagePath'
import { styles } from './styles'
import StarView from '../../Container/StarView'
import InputField from '../../Container/InputField'
import DateTimePickers from '../../Container/DateTimePickers'
import { ToastError, ToastMessage, dateConvertMnth, dateConvertNew, dateConvertYear } from '../../Services/CommonFunction'
import CustomDropDown from '../../Container/CustomDropDown'
import { Colors } from '../../Utils/Colors'
import AuthContext from '../../Services/Context'
import { useFocusEffect } from '@react-navigation/native'
import Modal from 'react-native-modal'
import SingleBottom from '../../Container/SingleBottom'
import OTPInputView from '@twotalltotems/react-native-otp-input'
import { getUserData } from '../../Services/AsyncStorage'
import { KEY, SOURCE } from '../../Services/Constant'
import Apis from '../../Services/Apis'
import LoaderNew from '../../Container/LoaderNew'
import { removeListener, startOtpListener } from 'react-native-otp-verify'
const screenHeight = Dimensions.get('window').height;

const Booking = ({ navigation, route }) => {

    const context = useContext(AuthContext);
    const { appData, accesstoken, isLogin } = context.allData

    const [state, setState] = useState({
        loading: false,
        loadingNew: false,
        data: route?.params?.data,
        item: route?.params?.item,
        checkinDate: new Date(),
        checkinDateErr: '',
        checkinDatePicker: false,
        checkoutDate: new Date(),
        checkoutDateErr: '',
        checkoutDatePicker: false,
        roomCategory: route?.params?.item?.room_type_name,
        room: 1,
        roomErr: '',
        adults: '',
        adultsErr: '',
        child: 0,
        childErr: '',
        roomtype: '',
        roomtypeErr: '',
        totalAmount: 0,
        modalVisible: false,
        fname: '',
        fnameErr: '',
        lname: '',
        lnameErr: '',
        phnno: '',
        phnnoErr: '',
        email: '',
        emailErr: '',
        otp: '',
        otpErr: '',
        otpView: false
    })

    const [timer, setTimer] = useState(60)
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
        { label: '0', value: 0 },
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

    useEffect(() => {
        startOtpListener(handelOtp);

        return () => removeListener();
    }, []);

    const handelOtp = useCallback((message) => {
        if (message) {
            let otps = /(\d{4})/g.exec(message)[1];
            if (otps) {
                setState(prev => ({
                    ...prev,
                    otp: otps
                }))
                // onSubmitOTP(otps);
            }
        }
    })

    // useEffect(() => {
    //     const interval = setInterval(() => {
    //         if (timer > 0) {
    //             setTimer(lastTimerCount => {
    //                 lastTimerCount <= 1 && clearInterval(interval)
    //                 return lastTimerCount - 1
    //             })
    //         }
    //     }, 1000) //each count lasts for a second
    //     return () => clearInterval(interval)
    // }, []);

    const resendTimer = useCallback(() => {
        const interval = setInterval(() => {
            if (timer > 0) {
                setTimer(lastTimerCount => {
                    lastTimerCount <= 1 && clearInterval(interval)
                    return lastTimerCount - 1
                })
            }
        }, 1000) //each count lasts for a second
    })

    const onLoad = useCallback(async (room = state.room, inDate = state.checkinDate, outDate = state.checkoutDate) => {
        try {
            let unitprice = route?.params?.item?.room_rent;
            let days = await getDays(inDate, outDate)
            setState(prev => ({
                ...prev,
                totalAmount: unitprice * room * days
            }))
        } catch (error) {
            if (__DEV__) {
                console.log('onLoadErr', error)
            }
        }
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
            await onLoad(state.room, time, state.checkoutDate);
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
            await onLoad(state.room, state.checkinDate, time);
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

    const onModalHide = useCallback(async () => {
        setState(prev => ({
            ...prev,
            modalVisible: false
        }))
    })

    const onChangePhnno = useCallback(async (val) => {
        setState(prev => ({
            ...prev,
            phnno: val,
            phnnoErr: ''
        }))
    })

    const onChangeFname = useCallback(async (val) => {
        setState(prev => ({
            ...prev,
            fname: val,
            fnameErr: ''
        }))
    }, [state.fname])

    const onChangeLname = useCallback(async (val) => {
        setState(prev => ({
            ...prev,
            lname: val,
            lnameErr: ''
        }))
    }, [state.lname])

    const onChangeOtp = useCallback(async (val) => {
        setState(prev => ({
            ...prev,
            otp: val,
            otpErr: ''
        }))
    }, [state.otp])

    const getDays = useCallback(async (inDate = state.checkinDate, outDate = state.checkoutDate) => {
        try {
            let ndate = new Date(inDate);
            let odate = new Date(outDate);
            let diff = Math.abs(odate - ndate)
            let day_diff = Math.ceil(diff / (1000 * 60 * 60 * 24));
            if (diff == 0) {
                return 1
            } else if (ndate < odate) {
                return (day_diff + 1)
            } else {
                return 0
            }
        } catch (error) {
            if (__DEV__) {
                console.log('datediffErr', error)
            }
            return 0
        }
    })

    const dayDiff = () => {
        let ndate = new Date(state.checkoutDate);
        let odate = new Date(state.checkinDate);
        let diff = Math.abs(odate - ndate)
        if (diff == 0) {
            return true;
        } else if (state.checkinDate < state.checkoutDate) {
            return true
        } else if (state.checkinDate > state.checkoutDate) {
            return false
        } else {
            return false
        }
    }

    const onBook = useCallback(async () => {
        if (!dayDiff()) {
            ToastMessage('Inavlid Check In & Out Date');
            return
        } else if (state.adults == '') {
            setState(prev => ({
                ...prev,
                adultsErr: 'Select Adults'
            }))
            return
        } else {
            let userData = await getUserData();
            if (userData) {
                // console.log('userdata',userData)
                onSubmit(1);
            } else {
                setState(prev => ({
                    ...prev,
                    otpView: false,
                    modalVisible: true
                }))
            }
            // ToastMessage('Comming Soon');
            // navigation.replace('BookingConfirm')
        }
    })

    const onSendOTP = useCallback(async (type) => {
        if (state.fname.trim() == '') {
            setState(prev => ({
                ...prev,
                fnameErr: 'Enter First Name'
            }))
            return
        }
        // else if (state.lname.trim() == '') {
        //     setState(prev => ({
        //         ...prev,
        //         lnameErr: 'Enter Last Name'
        //     }))
        //     return
        // } 
        else if (state.phnno.trim() == '') {
            setState(prev => ({
                ...prev,
                phnnoErr: 'Enter Phone No'
            }))
            return
        } else {
            try {
                setState(prev => ({
                    ...prev,
                    loading: true
                }))
                let datas = {
                    key: KEY,
                    source: SOURCE,
                    phone: state.phnno
                }
                let res = await Apis.room_booking_sendotp(datas)
                if (__DEV__) {
                    console.log('SendOtp', JSON.stringify(res))
                }
                if (res.status) {
                    if (type == 'send') {
                        setTimer(60)
                    }
                    setState(prev => ({
                        ...prev,
                        otpView: true,
                        loading: false
                    }))
                    if (type == 'send') {
                        resendTimer();
                    }
                } else {
                    setState(prev => ({
                        ...prev,
                        loading: false
                    }))
                }
                ToastMessage(res?.message);
            } catch (error) {
                ToastError();
                setState(prev => ({
                    ...prev,
                    loading: false
                }))
            }
        }
    })

    const onSubmitOTP = useCallback(async (otp = state.otp) => {
        // console.log('otp', otp)
        // console.log('phone', state.phnno)
        // return
        if (otp == '') {
            ToastMessage('Enter OTP');
            return
        } else if (otp.length < 4) {
            ToastMessage('Enter A Valid OTP')
            return
        } else {
            try {
                setState(prev => ({
                    ...prev,
                    loading: true
                }))
                let datas = {
                    key: KEY,
                    source: SOURCE,
                    otp: otp,
                    number: state.phnno
                }
                let res = await Apis.room_booking_verifyotp(datas)
                if (__DEV__) {
                    console.log('VerifyOtp', JSON.stringify(res))
                }
                if (res.status) {
                    setState(prev => ({
                        ...prev,
                        modalVisible: false,
                        otpView: false,
                        loading: false
                    }))
                    onSubmit(2);
                } else {
                    setState(prev => ({
                        ...prev,
                        loading: false
                    }))
                }
                ToastMessage(res?.message)
            } catch (error) {
                ToastError();
                setState(prev => ({
                    ...prev,
                    loading: false
                }))
            }
        }
    })

    const onSubmit = useCallback(async (val) => {
        try {
            setState(prev => ({
                ...prev,
                loadingNew: true
            }))
            if (val == 1) {
                var userData = await getUserData();
            }
            let datas = {
                key: KEY,
                source: SOURCE,
                room_id: route?.params?.item?.type_id,
                check_in: dateConvertNew(state.checkinDate),
                check_out: dateConvertNew(state.checkoutDate),
                adults_count: state.adults,
                children_count: state.child,
                room_count: state.room,
                fname: val == 1 ? userData?.first_name : state.fname,
                lname: val == 1 ? userData?.last_name : state.lname,
                mobile_no: val == 1 ? userData?.phone : state.phnno,
                email: val == 1 ? userData?.email : ''
            }
            // console.log('datas', JSON.stringify(datas))
            let res = await Apis.room_booking_request(datas);
            if (__DEV__) {
                console.log('BookingRequest', JSON.stringify(res))
            }
            if (res.status) {
                navigation.replace('BookingConfirm', { data: res?.data });
                setState(prev => ({
                    ...prev,
                    loadingNew: false
                }))
            } else {
                setState(prev => ({
                    ...prev,
                    loadingNew: false
                }))
                ToastMessage(res?.message);
            }
        } catch (error) {
            ToastError();
            setState(prev => ({
                ...prev,
                loadingNew: false
            }))
        }
    })

    return (
        <SafeAreaView style={[CommonStyle.container, { backgroundColor: appData?.color_theme }]}>
            <Header
                leftIcon={ImagePath.back_new}
                leftonPress={onLeftMenu}
                rightIcon={ImagePath.bell}
            />
            <View style={styles.mainContent}>
                <ScrollView showsVerticalScrollIndicator={false}>
                    <View style={[styles.bodyContent, { backgroundColor: appData?.color_theme }]}>
                        <Image source={state.data.cover_image ? { uri: state.data?.cover_image } : ImagePath.banner1} style={styles.img} />
                        <View style={{ paddingHorizontal: '3%' }}>
                            <View style={styles.locationContainer}>
                                <Image source={ImagePath.location} style={[styles.location, { tintColor: Colors.white }]} />
                                <View style={styles.locationContent}>
                                    <Text style={[CommonStyle.headingText, { color: Colors.white, fontSize: 18 }]}>{state.data?.name}</Text>
                                    <Text style={[CommonStyle.lightText, { color: Colors.white }]}> {state.data?.location}</Text>
                                </View>
                            </View>
                            <View style={styles.border} />
                            <View>
                                <Text style={[CommonStyle.headingText, { color: Colors.white, fontSize: 18, textAlign: 'center' }]}>Travel Dates & Guests</Text>
                                <View style={styles.inputContent}>
                                    <InputField
                                        name={'Room Type'}
                                        headingColor={appData?.color_theme}
                                        value={state.roomCategory}
                                        // placeholder={'Select Check In Date'}
                                        editable={false}
                                    />
                                    <View style={{zIndex:99}}>
                                    <CustomDropDown
                                        name={'No of Room'}
                                        headingColor={appData?.color_theme}
                                        value={state.room}
                                        items={roomList}
                                        setItems={setroomList}
                                        open={roomPicker}
                                        setOpen={setroomPicker}
                                        onChangeValue={onChangeRoom}
                                        error={state.roomErr}
                                    />
                                    </View>
                                    <InputField
                                        name={'Check In'}
                                        headingColor={appData?.color_theme}
                                        value={dateConvertNew(state.checkinDate)}
                                        placeholder={'Select Check In Date'}
                                        editable={false}
                                        rightIcon={ImagePath.calendar}
                                        rightonPress={onOpenCheckinDate}
                                        error={state.checkinDateErr}
                                    />
                                    <InputField
                                        name={'Check Out'}
                                        headingColor={appData?.color_theme}
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
                                        headingColor={appData?.color_theme}
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
                                        headingColor={appData?.color_theme}
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
                    </View>
                </ScrollView>
            </View>
            <View style={[styles.btnContainer, { borderColor: appData?.color_theme }]}>
                <Text style={[CommonStyle.headingText, { color: appData?.color_theme }]}>Total: ₹ {state.totalAmount}</Text>
                <TouchableOpacity onPress={onBook} activeOpacity={0.5} style={[styles.btn, { backgroundColor: appData?.color_theme }]}>
                    <Text style={[CommonStyle.boldtext, { color: Colors.highlight }]}>BOOK   </Text>
                    <Image source={ImagePath.arrow_right} style={{ width: 20, height: 20, tintColor: Colors.white }} />
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
            <Modal
                isVisible={state.modalVisible}
                animationInTiming={800}
                animationOutTiming={800}
                coverScreen={false}
                style={styles.modalStyle}
                onBackdropPress={() => onModalHide()}
                onBackButtonPress={() => onModalHide()}
            >
                <View style={[styles.modalContainer, { maxHeight: state.otpView ? screenHeight * 0.40 : screenHeight * 0.48 }]}>
                    <ScrollView>
                        {(state.otpView) ?
                            <View style={{ flex: 1, marginBottom: '4%' }}>
                                <Text style={[CommonStyle.boldtext, { marginTop: '4%', marginBottom: '4%', color: Colors.black, textAlign: 'center' }]}>Enter OTP</Text>
                                <OTPInputView
                                    pinCount={4}
                                    code={state.otp}
                                    autoFocusOnLoad={false}
                                    onCodeChanged={code => onChangeOtp(code)}
                                    style={styles.otp}
                                    codeInputFieldStyle={[styles.underlineStyleBase, { color: appData?.color_theme }]}
                                    codeInputHighlightStyle={[styles.underlineStyleHighLighted, { borderColor: appData?.color_theme }]}
                                    placeholderTextColor={Colors.black}
                                    onCodeFilled={(code) => onSubmitOTP(code)}
                                />

                            </View>
                            :
                            <View style={{ paddingTop: '4%' }}>
                                <Text style={[CommonStyle.headingText, { color: appData?.color_theme, fontSize: 18, textAlign: 'center' }]}>Please fill the form</Text>
                                <InputField
                                    placeholder={'Enter First Name'}
                                    value={state.fname}
                                    headingColor={Colors.textColor}
                                    onChangeText={onChangeFname}
                                    leftIcon={ImagePath.user}
                                    borderColor={Colors.grey}
                                    error={state.fnameErr}
                                />
                                <InputField
                                    placeholder={'Enter Last Name'}
                                    value={state.lname}
                                    headingColor={Colors.textColor}
                                    onChangeText={onChangeLname}
                                    leftIcon={ImagePath.user}
                                    borderColor={Colors.grey}
                                    error={state.lnameErr}
                                />
                                <InputField
                                    placeholder={'Enter Mobile No'}
                                    value={state.phnno}
                                    headingColor={Colors.textColor}
                                    onChangeText={onChangePhnno}
                                    leftIcon={ImagePath.phone}
                                    error={state.phnnoErr}
                                    borderColor={Colors.grey}
                                    keyboardType={'phone-pad'}
                                />
                            </View>
                        }
                        <View style={{ marginTop: '6%' }}>
                            <SingleBottom
                                name={state.otpView ? 'Submit' : 'Send OTP'}
                                onPress={() => state.otpView ? onSubmitOTP() : onSendOTP('send')}
                                loading={state.loading}
                                width={'100%'}
                            />
                        </View>
                        {(state.otpView) && (
                            <View style={styles.resendContainer}>
                                {(timer > 0) ?
                                    <Text style={styles.resendTimer}>Resend OTP in <Text style={{ color: appData?.color_title }}>{timer} Sec</Text></Text>
                                    :
                                    <Text onPress={onSendOTP} style={[styles.resendText, { color: appData?.color_title }]}>Resend OTP</Text>
                                }
                            </View>
                        )}
                    </ScrollView>
                </View>
            </Modal>
            {(state.loadingNew) && (
                <LoaderNew loading={state.loadingNew} />
            )}
        </SafeAreaView>
    )
}

export default Booking