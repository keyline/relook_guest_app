import { View, Text, SafeAreaView, TouchableOpacity, Image, ScrollView } from 'react-native'
import React, { useState, useCallback, useContext } from 'react'
import { CommonStyle } from '../../Utils/CommonStyle'
import { ImagePath } from '../../Utils/ImagePath'
import Header from '../../Container/Header'
import { useFocusEffect } from '@react-navigation/native'
import { ToastError, ToastMessage, convertDateFormat, dateConvertNew, dateConvertYear, onLunchCamera, onLunchLibary } from '../../Services/CommonFunction'
import { KEY, SOURCE } from '../../Services/Constant'
import Apis from '../../Services/Apis'
import { styles } from './styles'
import AuthContext from '../../Services/Context'
import InputField from '../../Container/InputField'
import SingleBottom from '../../Container/SingleBottom'
import LoaderNew from '../../Container/LoaderNew'
import ImageOptionModal from '../../Container/ImageOptionModal'
import DateTimePickers from '../../Container/DateTimePickers'
import { isValidEmail } from '../../Services/Valid'
import DatePickerModal from '../../Container/DatePickerModal'

const EditProfile = ({ navigation }) => {

    const context = useContext(AuthContext);
    const { appData, accesstoken, isLogin, userProfile } = context.allData

    const [state, setState] = useState({
        loading: false,
        btnLoading: false,
        data: '',
        fname: '',
        fnameErr: '',
        lname: '',
        lnameErr: '',
        email: '',
        emailErr: '',
        phnno: '',
        phnnoErr: '',
        dob: '',
        dobErr: '',
        datePicker: false,
        image: '',
        modalVisible: false
    })

    useFocusEffect(
        useCallback(() => {
            const unsubscribe = onGetData();
            return () => unsubscribe
        }, [navigation])
    )

    const onGetData = useCallback(async () => {
        // console.log('dateConvert', convertDateFormat('22-11-2023'))
        if (userProfile) {
            let value = userProfile
            setState(prev => ({
                ...prev,
                fname: value?.first_name,
                lname: value?.last_name,
                email: value?.email,
                phnno: value?.phone,
                dob: value.dob ? value.dob : '',
                data: value,
                loading: false
            }))
        } else {
            try {
                setState(prev => ({
                    ...prev,
                    loading: true
                }))
                let datas = {
                    key: KEY,
                    source: SOURCE
                }
                const response = await Apis.profile_get(datas);
                if (__DEV__) {
                    console.log('EditProfile', JSON.stringify(response))
                }
                if (response.status) {
                    let value = response?.data
                    setState(prev => ({
                        ...prev,
                        fname: value?.first_name,
                        lname: value?.last_name,
                        email: value?.email,
                        phnno: value?.phone,
                        dob: value?.dob,
                        data: value,
                        loading: false
                    }))
                } else {
                    setState(prev => ({
                        ...prev,
                        data: null,
                        loading: false
                    }));
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
        }
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

    const onChangeEmail = useCallback(async (val) => {
        setState(prev => ({
            ...prev,
            email: val,
            emailErr: ''
        }))
    }, [state.email])

    const onChangePhnno = useCallback(async (val) => {
        setState(prev => ({
            ...prev,
            phnno: val,
            phnnoErr: ''
        }))
    }, [state.phnno])

    const onLeftMenu = useCallback(async () => {
        navigation.goBack();
    })

    const onSubmit = useCallback(async () => {
        if (state.fname.trim() == '') {
            setState(prev => ({
                ...prev,
                fnameErr: 'Enter First Name'
            }))
        }
        // else if (state.lname.trim() == '') {
        //     setState(prev => ({
        //         ...prev,
        //         lnameErr: 'Enter Last Name'
        //     }))
        // } 
        else if (state.email && !isValidEmail(state.email)) {
            setState(prev => ({
                ...prev,
                emailErr: 'Enter Valid Email'
            }))
            return;
        } else if (state.phnno.trim() == '') {
            setState(prev => ({
                ...prev,
                phnnoErr: 'Enter Phone No'
            }))
        } else {
            try {
                setState(prev => ({
                    ...prev,
                    btnLoading: true
                }))
                let datas = {
                    key: KEY,
                    source: SOURCE,
                    first_name: state.fname,
                    last_name: state.lname,
                    phone: state.phnno,
                    email: state.email ? state.email : '',
                    dob: state.dob ? state.dob : ''
                }
                const res = await Apis.profile_update(datas)
                if (__DEV__) {
                    console.log('UpdateProfile', JSON.stringify(res))
                }
                if (res.status) {
                    await context.onGetProfileData();
                    // navigation.goBack();
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
                    console.log('errors', error)
                }
                ToastError();
            }
        }
    })

    const onModalShow = useCallback(async () => {
        setState(prev => ({
            ...prev,
            modalVisible: true
        }))
    })

    const onModalHide = useCallback(async () => {
        setState(prev => ({
            ...prev,
            modalVisible: false
        }))
    })

    const onModalItemPress = useCallback(async (id) => {
        if (id == 1) {
            let cameraRes = await onLunchCamera();
            onModalHide();
            if (__DEV__) {
                console.log('CameraResponse', JSON.stringify(cameraRes))
            }
            if (cameraRes) {
                setState(prev => ({
                    ...prev,
                    image: cameraRes
                }))
                onChangeImage(cameraRes);
            }
        } else if (id == 2) {
            let libaryRes = await onLunchLibary();
            onModalHide();
            if (__DEV__) {
                console.log('LibaryResponse', JSON.stringify(libaryRes))
            }
            if (libaryRes) {
                setState(prev => ({
                    ...prev,
                    image: libaryRes
                }))
                onChangeImage(libaryRes);
            }
        } else {
            onModalHide();
        }
    })

    const onChangeImage = useCallback(async (image = state.image) => {
        try {
            setState(prev => ({
                ...prev,
                loading: true
            }))
            let datas = {
                key: KEY,
                source: SOURCE,
                profile_image: image.base64
            }
            const res = await Apis.profile_updateimage(datas)
            if (__DEV__) {
                console.log('UploadImage', JSON.stringify(res))
            }
            if (res.status) {
                await context.onGetProfileData();
                // navigation.goBack();
            }
            setState(prev => ({
                ...prev,
                loading: false
            }))
            ToastMessage(res?.message);
        } catch (error) {
            setState(prev => ({
                ...prev,
                loading: false
            }))
            if (__DEV__) {
                console.log('errors', error)
            }
            ToastError();
        }
    })

    const onOpenDatePicker = useCallback(async () => {
        setState(prev => ({
            ...prev,
            datePicker: true
        }))
    }, [state.datePicker])

    const onCloseDatePicker = useCallback(async () => {
        setState(prev => ({
            ...prev,
            datePicker: false
        }))
    }, [state.datePicker])

    const onDateChng = useCallback(async (value) => {
        if (value) {
            setState(prev => ({
                ...prev,
                dob: dateConvertNew(value),
                dobErr: '',
                datePicker: false
            }))
        } else {
            setState(prev => ({
                ...prev,
                datePicker: false
            }))
        }
        // let time = value?.nativeEvent?.timestamp;
        // if (value.type == 'set') {
        //     setState(prev => ({
        //         ...prev,
        //         dob: dateConvertNew(time),
        //         dobErr: '',
        //         datePicker: false
        //     }))
        // } else {
        //     setState(prev => ({
        //         ...prev,
        //         datePicker: false
        //     }))
        // }
    })

    return (
        <SafeAreaView style={CommonStyle.container}>
            <Header
                leftIcon={ImagePath.back_new}
                leftonPress={onLeftMenu}
            />
            {(state.data) && (
                <ScrollView showsVerticalScrollIndicator={false}>
                    <View style={styles.bodyContent}>
                        <Text style={[CommonStyle.headingText, { marginBottom: '2%', textAlign: 'center', color: appData.color_theme }]}>Edit Profile</Text>
                        <View style={styles.headingContent}>
                            {(state.image) ?
                                <Image source={{ uri: state.image?.uri }} style={styles.logo} />
                                :
                                <Image source={state.data?.profile_image ? { uri: state.data?.profile_image } : ImagePath.user} style={styles.logo} />
                            }
                            <TouchableOpacity onPress={onModalShow} activeOpacity={0.5} style={styles.editContainer}>
                                <Image source={ImagePath.edit_img} style={[styles.editicon, { tintColor: appData?.color_theme }]} />
                            </TouchableOpacity>
                        </View>
                        <View style={styles.inputContent}>
                            <InputField
                                name={'First Name'}
                                value={state.fname}
                                onChangeText={onChangeFname}
                                leftIcon={ImagePath.user}
                                error={state.fnameErr}
                            />
                            <InputField
                                name={'Last Name'}
                                value={state.lname}
                                onChangeText={onChangeLname}
                                leftIcon={ImagePath.user}
                                error={state.lnameErr}
                            />
                            <InputField
                                name={'Email'}
                                value={state.email}
                                placeholder={state.email}
                                onChangeText={onChangeEmail}
                                leftIcon={ImagePath.email}
                                error={state.emailErr}
                            />
                            <InputField
                                name={'Phone No'}
                                value={state.phnno}
                                onChangeText={onChangePhnno}
                                leftIcon={ImagePath.call}
                                keyboardType={'phone-pad'}
                                editable={false}
                                error={state.phnnoErr}
                            />
                            <InputField
                                name={'Date of Birth'}
                                value={state.dob}
                                leftIcon={ImagePath.calendar}
                                rightIcon={ImagePath.calendar}
                                editable={false}
                                rightonPress={onOpenDatePicker}
                                error={state.dobErr}
                            />
                        </View>
                        <View>
                            <SingleBottom
                                name={'Update'}
                                loading={state.btnLoading}
                                onPress={onSubmit}
                            />
                        </View>
                    </View>
                </ScrollView>
            )}
            {(state.loading) && (
                <LoaderNew loading={state.loading} />
            )}
            <ImageOptionModal
                isVisible={state.modalVisible}
                onModalHide={onModalHide}
                onMenuPress={onModalItemPress}
            />
            {(state.datePicker) && (
                // <DateTimePickers
                //     value={state?.dob ? new Date(convertDateFormat(state.dob)) : new Date()}
                //     // value={new Date()}
                //     mode={'date'}
                //     maximumDate={new Date()}
                //     onConfirm={onDateChng}
                // />
                <DatePickerModal
                    isVisible={state.datePicker}
                    value={state.dob ? new Date(convertDateFormat(state.dob)) : new Date()}
                    onConfirm={onDateChng}
                    maximumDate={new Date()}
                    onClose={onCloseDatePicker}
                />
            )}
        </SafeAreaView>
    )
}

export default EditProfile