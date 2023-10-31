import { View, Text, SafeAreaView, ScrollView, Image, TouchableOpacity } from 'react-native'
import React, { useState, useCallback, useContext } from 'react'
import { CommonStyle } from '../../Utils/CommonStyle'
import { styles } from './styles'
import { ImagePath } from '../../Utils/ImagePath'
import InputField from '../../Container/InputField'
import SingleBottom from '../../Container/SingleBottom'
import AuthContext from '../../Services/Context'
import { isValidEmail } from '../../Services/Valid'
import { ToastError, ToastMessage } from '../../Services/CommonFunction'
import Apis from '../../Services/Apis'
import { KEY, SOURCE } from '../../Services/Constant'

const ForgotPassword = ({ navigation }) => {

    const context = useContext(AuthContext)
    const appData = context.allData.appData

    const [state, setState] = useState({
        loading: false,
        email: '',
        emailErr: ''
    })

    const onChangeemail = useCallback(async (val) => {
        setState(prev => ({
            ...prev,
            email: val,
            emailErr: ''
        }))
    }, [state.email])

    const onBack = useCallback(async () => {
        navigation.goBack();
    })

    const onSubmit = useCallback(async () => {
        if (state.email.trim() == '') {
            setState(prev => ({
                ...prev,
                emailErr: 'Enter Email'
            }));
            return;
        } else if (!isValidEmail(state.email)) {
            setState(prev => ({
                ...prev,
                emailErr: 'Enter Valid Email'
            }));
            return;
        } else {
            try {
                setState(prev => ({
                    ...prev,
                    loading: true
                }))
                let datas = {
                    key: KEY,
                    source: SOURCE,
                    email: state.email
                }
                const response = await Apis.forgot_password(datas);
                if (__DEV__) {
                    console.log('ForgotResponse', JSON.stringify(response))
                }
                setState(prev => ({
                    ...prev,
                    loading: false
                }))
                ToastMessage(response?.message)
                if (response.status) {
                    navigation.navigate('OtpVerify', { data: response?.data })
                }
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
        }
    })

    return (
        <SafeAreaView style={CommonStyle.container}>
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={styles.content}>
                    <TouchableOpacity onPress={onBack} activeOpacity={0.5}>
                        <Image source={ImagePath.back} style={[styles.backicon, { tintColor: appData?.color_theme }]} />
                    </TouchableOpacity>
                    <View style={styles.logoContainer}>
                        <Image source={{ uri: appData?.site_logo }} style={styles.logo} />
                    </View>
                    <View style={styles.mainContent}>
                        <Text style={[CommonStyle.headingText, { marginBottom: '3%', textAlign: 'center', color: appData?.color_title }]}>Forgot Password</Text>
                        <InputField
                            name={'Email'}
                            value={state.email}
                            onChangeText={onChangeemail}
                            leftIcon={ImagePath.email}
                            error={state.emailErr}
                        />
                        <View style={styles.btnContainer}>
                            <SingleBottom
                                name={'Submit'}
                                loading={state.loading}
                                onPress={onSubmit}
                            />
                        </View>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

export default ForgotPassword