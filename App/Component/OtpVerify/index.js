import { View, Text, SafeAreaView, TouchableOpacity, Image, ScrollView } from 'react-native'
import React, { useCallback, useState, useEffect, useContext } from 'react'
import { styles } from './styles'
import { CommonStyle } from '../../Utils/CommonStyle'
import { ImagePath } from '../../Utils/ImagePath'
import OTPInputView from '@twotalltotems/react-native-otp-input';
import { Colors } from '../../Utils/Colors'
import SingleBottom from '../../Container/SingleBottom'
import { ToastError, ToastMessage } from '../../Services/CommonFunction'
import { KEY, SOURCE } from '../../Services/Constant'
import Apis from '../../Services/Apis'
import AuthContext from '../../Services/Context'
import LoaderNew from '../../Container/LoaderNew'
import { navigationRef } from '../../Services/NavigationRef'
import DeviceInfo from 'react-native-device-info'
import { getFcmPermission, getFcmToken } from '../../Services/DeviceToken'
import { setAccessToken, setUserData } from '../../Services/AsyncStorage'
import { getHash, startOtpListener, removeListener } from 'react-native-otp-verify'

const OtpVerify = ({ navigation, route }) => {

    const context = useContext(AuthContext)
    const appData = context.allData.appData

    const [state, setState] = useState({
        loading: false,
        btnLoading: false,
        otp: '',
        otpErr: 'err'
    })
    const [timer, setTimer] = useState(60)

    const params = route?.params?.data

    useEffect(() => {
        // getHash().then(hash => {
        //     // use this hash in the message.
        //     console.log('hash', hash)
        // }).catch(console.log);

        startOtpListener(message => {
            // extract the otp using regex e.g. the below regex extracts 4 digit otp from message
            if (message) {
                const otp = /(\d{4})/g.exec(message)[1];
                setState(prev => ({
                    ...prev,
                    otp: otp
                }))
                onSubmit(otp);
            }
        });
        return () => removeListener();
    }, [navigation]);

    useEffect(() => {
        const interval = setInterval(() => {
            if (timer > 0) {
                setTimer(lastTimerCount => {
                    lastTimerCount <= 1 && clearInterval(interval)
                    return lastTimerCount - 1
                })
            }
        }, 1000) //each count lasts for a second
        return () => clearInterval(interval)
    }, [timer]);

    const onBack = useCallback(async () => {
        navigation.goBack();
    })

    const onChangeOtp = useCallback(async (val) => {
        setState(prev => ({
            ...prev,
            otp: val,
            otpErr: ''
        }))
    }, [state.otp])

    const onResendOtp = useCallback(async () => {
        if (route.params?.type == 'Mobile') {
            onResendOtpMobile();
        } else {
            onResendOtpEmail();
        }
    })

    const onResendOtpMobile = useCallback(async () => {
        try {
            setState(prev => ({
                ...prev,
                loading: true
            }))
            let datas = {
                key: KEY,
                source: SOURCE,
                phone: params?.mobile
            }
            const response = await Apis.sign_up(datas)
            if (__DEV__) {
                console.log('ResendOTPResponse', JSON.stringify(response))
            }
            if (response.status) {
                setTimer(60)
            }
            setState(prev => ({
                ...prev,
                loading: false
            }))
            ToastMessage(response?.message);
        } catch (error) {
            setState(prev => ({
                ...prev,
                loading: false
            }))
            if (__DEV__) {
                console.log(error)
            }
            ToastError();
        }
    })

    const onResendOtpEmail = useCallback(async () => {
        try {
            setState(prev => ({
                ...prev,
                loading: true
            }))
            let datas = {
                key: KEY,
                source: SOURCE,
                email: params.email
            }
            const response = await Apis.forgot_password(datas)
            if (__DEV__) {
                console.log('ResendOTPResponse', JSON.stringify(response))
            }
            setState(prev => ({
                ...prev,
                loading: false
            }))
            ToastMessage(response?.message);
        } catch (error) {
            setState(prev => ({
                ...prev,
                loading: false
            }))
            if (__DEV__) {
                console.log(error)
            }
            ToastError();
        }
    })

    const onSubmit = useCallback(async (otp = state.otp) => {
        if (otp == '') {
            ToastMessage('Enter OTP')
            return;
        } else if (otp.length < 4) {
            ToastMessage('Enter Valid OTP');
            return;
        } else {
            if (route.params?.type == 'Mobile') {
                onSubmitMobile(otp);
            } else {
                onSubmitEmail();
            }
        }
    })

    const onSubmitMobile = useCallback(async (otp) => {
        // navigation.navigate('SignUp')
        // return
        try {
            setState(prev => ({
                ...prev,
                btnLoading: true
            }))
            let deviceId = DeviceInfo.getDeviceId();
            let permission = await getFcmPermission();
            let fcmToken = await getFcmToken();
            let datas = {
                key: KEY,
                source: SOURCE,
                number: params?.mobile,
                otp: otp,
                device_token: deviceId,
                fcm_token: fcmToken
            }
            const res = await Apis.otp_validate_new(datas);
            if (__DEV__) {
                console.log('OTPValidateRes', JSON.stringify(res))
            }
            if (res.status) {
                if (res?.data?.existing_user) {
                    await setUserData(res?.data?.user);
                    await setAccessToken(res?.data?.user?.app_access_token);
                    await context.onGetStoreData();
                    // navigation.goBack();
                    navigation.navigate('DashBoard')
                } else {
                    navigation.navigate('SignUp', { id: res?.data?.id })
                }
            }
            setState(prev => ({
                ...prev,
                btnLoading: false
            }))
            ToastMessage(res?.message);
        } catch (error) {
            setState(prev => ({
                ...prev,
                btnLoading: false
            }))
            if (__DEV__) {
                console.log(error)
            }
            ToastError();
        }
    })

    const onSubmitEmail = useCallback(async () => {
        try {
            setState(prev => ({
                ...prev,
                btnLoading: true
            }))
            let datas = {
                key: KEY,
                source: SOURCE,
                id: params?.id,
                otp: state.otp
            }
            const res = await Apis.otp_validate(datas);
            if (__DEV__) {
                console.log('OTPValidateRes', JSON.stringify(res))
            }
            setState(prev => ({
                ...prev,
                btnLoading: false
            }))
            ToastMessage(res?.message);
            if (res.status) {
                navigation.replace('ResetPassword', { data: res?.data })
            }

        } catch (error) {
            setState(prev => ({
                ...prev,
                btnLoading: false
            }))
            if (__DEV__) {
                console.log(error)
            }
            ToastError();
        }
    })

    return (
        <SafeAreaView style={[CommonStyle.container, { backgroundColor: appData?.color_theme }]}>
            <TouchableOpacity style={styles.backContainer} onPress={onBack} activeOpacity={0.5}>
                <Image source={ImagePath.back_new} style={[styles.backicon, { tintColor: Colors.white }]} />
            </TouchableOpacity>
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={styles.content}>
                    <View style={styles.logoContainer}>
                        <Image source={{ uri: appData?.site_logo }} style={styles.logo} />
                    </View>
                    <Text style={[CommonStyle.headingText, { marginBottom: '10%', textAlign: 'center', color: Colors.white }]}>OTP</Text>
                    {/* <Text style={styles.subtext}>Check Your Mobile/Email for OTP</Text> */}
                    <View style={styles.mainContent}>
                        <View style={{ flex: 1 }}>
                            <Text style={[CommonStyle.boldtext, { marginBottom: '8%', color: Colors.black, textAlign: 'center' }]}>Enter OTP</Text>
                            <OTPInputView
                                pinCount={4}
                                code={state.otp}
                                autoFocusOnLoad={false}
                                onCodeChanged={code => onChangeOtp(code)}
                                style={styles.otp}
                                codeInputFieldStyle={[styles.underlineStyleBase, { borderColor: Colors.light_gery, color: appData?.color_theme }]}
                                codeInputHighlightStyle={[styles.underlineStyleHighLighted, { borderColor: appData?.color_theme }]}
                                placeholderTextColor={Colors.grey}
                            // onCodeFilled={(code) => onSubmitOtp(code)}
                            />
                        </View>
                        <View style={styles.btnContainer}>
                            <SingleBottom
                                name={'Submit'}
                                loading={state.btnLoading}
                                onPress={onSubmit}
                                width={'100%'}
                            />
                        </View>
                        <View style={styles.resendContainer}>
                            {(timer > 0) ?
                                <Text style={styles.resendTimer}>Resend OTP in <Text style={{ color: appData?.color_title }}>{timer} Sec</Text></Text>
                                :
                                <Text onPress={onResendOtp} style={[styles.resendText, { color: appData?.color_title }]}>Resend OTP</Text>
                            }
                        </View>
                    </View>
                </View>
            </ScrollView>
            {(state.loading) && (
                <LoaderNew loading={state.loading} />
            )}
        </SafeAreaView>
    )
}

export default OtpVerify