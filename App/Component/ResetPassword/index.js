import { View, Text, SafeAreaView, TouchableOpacity, Image, ScrollView } from 'react-native'
import React, { useContext, useCallback, useState } from 'react'
import { styles } from './styles'
import { CommonStyle } from '../../Utils/CommonStyle'
import { ImagePath } from '../../Utils/ImagePath'
import AuthContext from '../../Services/Context'
import InputField from '../../Container/InputField'
import SingleBottom from '../../Container/SingleBottom'
import { ToastMessage } from '../../Services/CommonFunction'
import { KEY, SOURCE } from '../../Services/Constant'
import Apis from '../../Services/Apis'

const ResetPassword = ({ navigation, route }) => {

    const context = useContext(AuthContext)
    const appData = context.allData.appData
    const params = route?.params?.data

    const [state, setState] = useState({
        loading: false,
        password: '',
        passwordErr: '',
        passwordVisible: false,
        cnfPassword: '',
        cnfPasswordErr: '',
        cnfPasswordVisible: false
    })

    const onBack = useCallback(async () => {
        navigation.goBack();
    })

    const onChangePassword = useCallback(async (val) => {
        setState(prev => ({
            ...prev,
            password: val,
            passwordErr: ''
        }))
    }, [state.password])

    const onChangePassvisible = useCallback(async () => {
        setState(prev => ({
            ...prev,
            passwordVisible: !state.passwordVisible
        }))
    }, [state.passwordVisible])

    const onChangeCnfPassword = useCallback(async (val) => {
        setState(prev => ({
            ...prev,
            cnfPassword: val,
            cnfPasswordErr: ''
        }))
    }, [state.cnfPassword])

    const onChangeCnfPassvisible = useCallback(async () => {
        setState(prev => ({
            ...prev,
            cnfPasswordVisible: !state.cnfPasswordVisible
        }))
    }, [state.cnfPasswordVisible])

    const onSubmit = useCallback(async () => {
        if (state.password.trim() == '') {
            setState(prev => ({
                ...prev,
                passwordErr: 'Enter New Password'
            }));
            return;
        } else if (state.cnfPassword.trim() == '') {
            setState(prev => ({
                ...prev,
                cnfPasswordErr: 'Enter Confirm Password'
            }));
            return;
        } else if (state.password != state.cnfPassword) {
            ToastMessage('Password Mismatch');
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
                    id: params?.id,
                    password: state.password,
                    confirm_password: state.cnfPassword
                }
                const response = await Apis.reset_password(datas);
                if (__DEV__) {
                    console.log('ResetPassResponse', JSON.stringify(response))
                }
                setState(prev => ({
                    ...prev,
                    loading: false
                }))
                ToastMessage(response?.message);
                if (response.status) {
                    navigation.replace('Login');
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
            <TouchableOpacity style={styles.backContainer} onPress={onBack} activeOpacity={0.5}>
                <Image source={ImagePath.back} style={[styles.backicon, { tintColor: appData?.color_theme }]} />
            </TouchableOpacity>
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={styles.content}>
                    <View style={styles.logoContainer}>
                        <Image source={{ uri: appData?.site_logo }} style={styles.logo} />
                    </View>
                    <View style={styles.mainContent}>
                        <Text style={[CommonStyle.headingText, { marginBottom: '5%', textAlign: 'center', color: appData?.color_title }]}>Reset Password</Text>
                        <InputField
                            name={'New Password'}
                            value={state.password}
                            onChangeText={onChangePassword}
                            leftIcon={ImagePath.lock}
                            secureTextEntry={!state.passwordVisible}
                            rightIcon={state.passwordVisible ? ImagePath.eye_off : ImagePath.eye_on}
                            rightonPress={onChangePassvisible}
                            error={state.passwordErr}
                        />
                        <InputField
                            name={'Confirm Password'}
                            value={state.cnfPassword}
                            onChangeText={onChangeCnfPassword}
                            leftIcon={ImagePath.lock}
                            secureTextEntry={!state.cnfPasswordVisible}
                            rightIcon={state.cnfPasswordVisible ? ImagePath.eye_off : ImagePath.eye_on}
                            rightonPress={onChangeCnfPassvisible}
                            error={state.cnfPasswordErr}
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

export default ResetPassword