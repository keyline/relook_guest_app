import { View, Text, SafeAreaView, ScrollView, Image, TouchableOpacity } from 'react-native'
import React, { useCallback, useState, useContext } from 'react'
import { CommonStyle } from '../../Utils/CommonStyle'
import { ImagePath } from '../../Utils/ImagePath'
import { styles } from './styles'
import InputField from '../../Container/InputField'
import SingleBottom from '../../Container/SingleBottom'
import AuthContext from '../../Services/Context'
import { isValidEmail } from '../../Services/Valid'
import { KEY, SOURCE } from '../../Services/Constant'
import Apis from '../../Services/Apis'
import { ToastError, ToastMessage } from '../../Services/CommonFunction'

const SignUp = ({ navigation }) => {

  const context = useContext(AuthContext)
  const appData = context.allData.appData

  const [state, setState] = useState({
    loading: false,
    fname: '',
    fnameErr: '',
    lname: '',
    lnameErr: '',
    email: '',
    emailErr: '',
    phone: '',
    phoneErr: '',
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

  const onChangePhone = useCallback(async (val) => {
    setState(prev => ({
      ...prev,
      phone: val,
      phoneErr: ''
    }))
  }, [state.phone])

  const onChangePassword = useCallback(async (val) => {
    setState(prev => ({
      ...prev,
      password: val,
      passwordErr: ''
    }))
  }, [state.password])

  const onChangeCnfpassword = useCallback(async (val) => {
    setState(prev => ({
      ...prev,
      cnfPassword: val,
      cnfPasswordErr: ''
    }))
  }, [state.cnfPassword])

  const onChangePassvisible = useCallback(async () => {
    setState(prev => ({
      ...prev,
      passwordVisible: !state.passwordVisible
    }))
  }, [state.passwordVisible])

  const onChangeCnfPassvisible = useCallback(async () => {
    setState(prev => ({
      ...prev,
      cnfPasswordVisible: !state.cnfPasswordVisible
    }))
  }, [state.cnfPasswordVisible])

  const onSubmit = useCallback(async () => {
    if (state.fname.trim() == '') {
      setState(prev => ({
        ...prev,
        fnameErr: 'Enter First Name'
      }))
      return;
    } else if (state.lname.trim() == '') {
      setState(prev => ({
        ...prev,
        lnameErr: 'Enter Last Name'
      }))
      return;
    } else if (state.email.trim() == '') {
      setState(prev => ({
        ...prev,
        emailErr: 'Enter Email'
      }))
      return;
    } else if (!isValidEmail(state.email)) {
      setState(prev => ({
        ...prev,
        emailErr: 'Enter Valid Email'
      }))
      return;
    } else if (state.phone.trim() == '') {
      setState(prev => ({
        ...prev,
        phoneErr: 'Enter Phone No'
      }))
      return;
    } else if (state.password.trim() == '') {
      setState(prev => ({
        ...prev,
        passwordErr: 'Enter Password'
      }))
      return;
    } else if (state.cnfPassword.trim() == '') {
      setState(prev => ({
        ...prev,
        cnfPasswordErr: 'Enter Confirm Password'
      }))
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
          first_name: state.fname,
          last_name: state.lname,
          email: state.email,
          phone: state.phone,
          password: state.password,
          confirm_password: state.cnfPassword
        }
        const response = await Apis.sign_up(datas);
        if (__DEV__) {
          console.log('SignUpResponse', JSON.stringify(response))
        }
        setState(prev => ({
          ...prev,
          loading: false
        }))
        ToastMessage(response.message);
        if (response.status) {
          navigation.goBack();
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
        <Image source={ImagePath.back} style={[styles.backicon, { tintColor: appData.color_theme }]} />
      </TouchableOpacity>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.content}>
          <View style={styles.logoContainer}>
            <Image source={{ uri: appData?.site_logo }} style={styles.logo} />
          </View>
          <View style={styles.mainContent}>
            <Text style={[CommonStyle.headingText, { marginBottom: '3%', textAlign: 'center', color: appData.color_title }]}>Sign up</Text>
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
              onChangeText={onChangeEmail}
              leftIcon={ImagePath.email}
              keyboardType={'email-address'}
              error={state.emailErr}
            />
            <InputField
              name={'Phone No'}
              value={state.phone}
              onChangeText={onChangePhone}
              leftIcon={ImagePath.call}
              keyboardType={'phone-pad'}
              error={state.phoneErr}
            />
            <InputField
              name={'Password'}
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
              onChangeText={onChangeCnfpassword}
              leftIcon={ImagePath.lock}
              secureTextEntry={!state.cnfPasswordVisible}
              rightIcon={state.cnfPasswordVisible ? ImagePath.eye_off : ImagePath.eye_on}
              rightonPress={onChangeCnfPassvisible}
              error={state.cnfPasswordErr}
            />
            <View style={styles.btnContainer}>
              <SingleBottom
                name={'Sign Up'}
                loading={state.loading}
                onPress={onSubmit}
              />
            </View>
            <Text style={styles.signuptext}>Already have account? <Text onPress={onBack} style={[CommonStyle.boldtext, { color: appData.color_title }]}>Login</Text></Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default SignUp