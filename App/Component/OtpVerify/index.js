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
        const interval = setInterval(() => {
            if (timer > 0) {
                setTimer(lastTimerCount => {
                    lastTimerCount <= 1 && clearInterval(interval)
                    return lastTimerCount - 1
                })
            }
        }, 1000) //each count lasts for a second
        return () => clearInterval(interval)
    }, []);

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

    const onSubmit = useCallback(async () => {
        if (state.otp == '') {
            ToastMessage('Enter OTP')
            return;
        } else if (state.otp.length < 6) {
            ToastMessage('Enter Valid OTP');
            return;
        } else {
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
        }
    })

    return (
        <SafeAreaView style={CommonStyle.container}>
            <TouchableOpacity style={styles.backContainer} onPress={onBack} activeOpacity={0.5}>
                <Image source={ImagePath.back} style={[styles.backicon, { tintColor: appData?.color_theme }]} />
            </TouchableOpacity>
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={styles.content}>
                    <View style={styles.logoContainer}>
                        <Image source={{ uri: appData?.site_logo }} style={styles.logo} />
                    </View>
                    <View style={styles.mainContent}>
                        <Text style={[CommonStyle.headingText, { marginBottom: '1%', textAlign: 'center', color: appData?.color_title }]}>OTP</Text>
                        <Text style={styles.subtext}>Check Your Mobile/Email for OTP</Text>
                        <View style={{ flex: 1 }}>
                            <Text style={[CommonStyle.boldtext, { marginBottom: '4%', color: appData?.color_title }]}>Enter OTP :</Text>
                            <OTPInputView
                                pinCount={6}
                                code={state.otp}
                                autoFocusOnLoad
                                onCodeChanged={code => onChangeOtp(code)}
                                style={styles.otp}
                                codeInputFieldStyle={[styles.underlineStyleBase, { borderColor: appData?.color_theme }]}
                                // codeInputHighlightStyle={styles.underlineStyleHighLighted}
                                placeholderTextColor={Colors.black}
                            // onCodeFilled={(code) => onSubmitOtp(code)}
                            />
                        </View>
                        <View style={styles.resendContainer}>
                            {(timer > 0) ?
                                <Text style={styles.resendTimer}>Resend OTP in <Text style={{ color: appData?.color_title }}>{timer} Sec</Text></Text>
                                :
                                <Text onPress={onResendOtp} style={[styles.resendText, { color: appData?.color_title }]}>Resend OTP</Text>
                            }
                        </View>
                        <View style={styles.btnContainer}>
                            <SingleBottom
                                name={'Submit'}
                                loading={state.btnLoading}
                                onPress={onSubmit}
                            />
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