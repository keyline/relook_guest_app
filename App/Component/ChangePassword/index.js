import { View, Text, SafeAreaView, TouchableOpacity, Image, ScrollView } from 'react-native'
import React, { useState, useCallback, useContext } from 'react'
import { ImagePath } from '../../Utils/ImagePath'
import { CommonStyle } from '../../Utils/CommonStyle'
import Header from '../../Container/Header'
import { styles } from './styles'
import AuthContext from '../../Services/Context'
import InputField from '../../Container/InputField'
import SingleBottom from '../../Container/SingleBottom'
import { ToastError, ToastMessage } from '../../Services/CommonFunction'
import { KEY, SOURCE } from '../../Services/Constant'
import Apis from '../../Services/Apis'

const ChangePassword = ({ navigation }) => {

  const context = useContext(AuthContext);
  const { appData, accesstoken, isLogin, userProfile } = context.allData

  const [state, setState] = useState({
    loading: false,
    data: userProfile,
    oldPass: '',
    oldPassErr: '',
    oldPassVisible: false,
    newPass: '',
    newPassErr: '',
    newPassVisible: false,
    cnfPass: '',
    cnfPassErr: '',
    cnfPassVisible: false
  })

  const onChangeOldPass = useCallback(async (val) => {
    setState(prev => ({
      ...prev,
      oldPass: val,
      oldPassErr: ''
    }))
  })

  const onChangeNewPass = useCallback(async (val) => {
    setState(prev => ({
      ...prev,
      newPass: val,
      newPassErr: ''
    }))
  })

  const onChangeCnfPass = useCallback(async (val) => {
    setState(prev => ({
      ...prev,
      cnfPass: val,
      cnfPassErr: ''
    }))
  })

  const onChangeOldPassVisible = useCallback(async () => {
    setState(prev => ({
      ...prev,
      oldPassVisible: !state.oldPassVisible,
    }))
  })

  const onChangeNewPassVisible = useCallback(async () => {
    setState(prev => ({
      ...prev,
      newPassVisible: !state.newPassVisible,
    }))
  })

  const onChangeCnfPassVisible = useCallback(async () => {
    setState(prev => ({
      ...prev,
      cnfPassVisible: !state.cnfPassVisible,
    }))
  })

  const onLeftMenu = useCallback(async () => {
    navigation.goBack();
  })

  const onSubmit = useCallback(async () => {
    if (state.oldPass.trim() == '') {
      setState(prev => ({
        ...prev,
        oldPassErr: 'Enter Old Password'
      }))
      return;
    } else if (state.newPass.trim() == '') {
      setState(prev => ({
        ...prev,
        newPassErr: 'Enter New Password'
      }))
      return;
    } else if (state.cnfPass.trim() == '') {
      setState(prev => ({
        ...prev,
        cnfPassErr: 'Enter Confirm Password'
      }))
      return;
    } else if (state.cnfPass != state.newPass) {
      ToastMessage('New & Confirm Password Not Matched');
    } else {
      try {
        setState(prev => ({
          ...prev,
          loading: true
        }))
        let datas = {
          key: KEY,
          source: SOURCE,
          old_password: state.oldPass,
          new_password: state.newPass,
          confirm_password: state.cnfPass
        }
        const response = await Apis.change_password(datas)
        if (__DEV__) {
          console.log('ChangePassword', JSON.stringify(response))
        }
        if (response?.status) {
          navigation.goBack();
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
    }
  })

  return (
    <SafeAreaView style={CommonStyle.container}>
      <Header
        leftIcon={ImagePath.back_new}
        leftonPress={onLeftMenu}
      />
      <ScrollView>
        <View style={styles.bodyContent}>
          <Text style={[CommonStyle.headingText, { marginBottom: '2%', textAlign: 'center', color: appData.color_theme }]}>Change Password</Text>
          <View style={styles.headingContent}>
            <Image source={state.data?.profile_image ? { uri: state.data?.profile_image } : ImagePath.user} style={styles.logo} />
            <Text style={[CommonStyle.boldtext, { marginTop: '2%', color: appData?.color_title }]}>{state.data?.first_name + ' ' + state.data?.last_name}</Text>
          </View>
          <View style={styles.inputContent}>
            <InputField
              name={'Old Password'}
              value={state.oldPass}
              onChangeText={onChangeOldPass}
              leftIcon={ImagePath.lock}
              secureTextEntry={!state.oldPassVisible}
              rightIcon={state.oldPassVisible ? ImagePath.eye_off : ImagePath.eye_on}
              rightonPress={onChangeOldPassVisible}
              error={state.oldPassErr}
            />
            <InputField
              name={'New Password'}
              value={state.newPass}
              onChangeText={onChangeNewPass}
              leftIcon={ImagePath.lock}
              secureTextEntry={!state.newPassVisible}
              rightIcon={state.newPassVisible ? ImagePath.eye_off : ImagePath.eye_on}
              rightonPress={onChangeNewPassVisible}
              error={state.newPassErr}
            />
            <InputField
              name={'Confirm Password'}
              value={state.cnfPass}
              onChangeText={onChangeCnfPass}
              leftIcon={ImagePath.lock}
              secureTextEntry={!state.cnfPassVisible}
              rightIcon={state.cnfPassVisible ? ImagePath.eye_off : ImagePath.eye_on}
              rightonPress={onChangeCnfPassVisible}
              error={state.cnfPassErr}
            />
          </View>
          <SingleBottom
            name={'Submit'}
            loading={state.loading}
            onPress={onSubmit}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default ChangePassword