import { View, Text, SafeAreaView, ScrollView, Image, TouchableOpacity } from 'react-native'
import React, { useContext, useCallback, useState } from 'react'
import { Colors } from '../../Utils/Colors'
import { CommonStyle } from '../../Utils/CommonStyle'
import InputField from '../../Container/InputField'
import { styles } from './styles'
import AuthContext from '../../Services/Context'
import { ImagePath } from '../../Utils/ImagePath'
import SingleBottom from '../../Container/SingleBottom'
import { isValidMobile } from '../../Services/Valid'
import { ToastError, ToastMessage } from '../../Services/CommonFunction'
import { KEY, SOURCE } from '../../Services/Constant'
import Apis from '../../Services/Apis'

const LoginWithOTP = ({ navigation }) => {

    const context = useContext(AuthContext)
    const appData = context.allData.appData

    const [state, setState] = useState({
        loading: false,
        phnno: '',
        phnnoErr: '',
        otpVisible: false,
        otp: '',
        otpErr: ''
    })

    const onBack = useCallback(async () => {
        navigation.goBack();
    })

    const onChangePhnno = useCallback(async (val) => {
        setState(prev => ({
            ...prev,
            phnno: val,
            phnnoErr: ''
        }))
    })

    const onSubmit = useCallback(async () => {
        if (state.phnno.trim() == '') {
            setState(prev => ({
                ...prev,
                phnnoErr: 'Enter Phone No'
            }))
            return
        }
        // else if (!isValidMobile(state.phnno)) {
        //     setState(prev => ({
        //         ...prev,
        //         phnnoErr: 'Enter a Valid Phone No'
        //     }))
        //     return
        // } 
        else {
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
                const response = await Apis.sign_up(datas);
                if (__DEV__) {
                    console.log('SignUp', JSON.stringify(response))
                }
                if (response.status) {
                    let params = {
                        mobile: state.phnno
                    }
                    navigation.navigate('OtpVerify', { data: params, type: 'Mobile', mobile: state.phnno })
                }
                setState(prev => ({
                    ...prev,
                    loading: false
                }))
                ToastMessage(response?.message);
            } catch (error) {
                if (__DEV__) {
                    console.log(error)
                }
                setState(prev => ({
                    ...prev,
                    loading: false
                }))
                ToastError();
            }
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
                        <Image source={{ uri: appData.site_logo }} style={styles.logo} />
                    </View>
                    <Text style={styles.headingText}>Login Using OTP</Text>
                    <View style={styles.mainContent}>
                        {/* <Text style={[CommonStyle.headingText, { marginBottom: '4%', textAlign: 'center', color: appData.color_theme }]}>Login Using OTP</Text> */}
                        <InputField
                            // name={'Phone No'}
                            value={state.phnno}
                            placeholder={'Enter your mobile no.'}
                            onChangeText={onChangePhnno}
                            leftIcon={ImagePath.phone}
                            error={state.phnnoErr}
                            maxLength={10}
                            keyboardType={'phone-pad'}
                        />
                        <View style={styles.btnContainer}>
                            <SingleBottom
                                name={'SUBMIT'}
                                loading={state.loading}
                                onPress={onSubmit}
                                width={'100%'}
                            />
                        </View>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

export default LoginWithOTP