import { View, Text, BackHandler, StatusBar, AppState, Alert, Linking } from 'react-native';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import SplashScreen from 'react-native-splash-screen';
import { NavigationContainer } from '@react-navigation/native';
import DrawerStack from './App/Navigation/DrawerStack';
import AuthStack from './App/Navigation/AuthStack';
import AuthContext from './App/Services/Context';
import { clearAllData, clearUserData, getAccessToken, getUserData, setAppData } from './App/Services/AsyncStorage';
import { getFcmPermission, getFcmToken } from './App/Services/DeviceToken';
import messaging from '@react-native-firebase/messaging';
import { Notification } from './App/Services/Notification';
import notifee, { EventType } from '@notifee/react-native';
import { navigate, navigationRef } from './App/Services/NavigationRef';
import Apis from './App/Services/Apis';
import { KEY, SOURCE } from './App/Services/Constant';
import Toast from 'react-native-simple-toast';
import { ToastError, ToastMessage } from './App/Services/CommonFunction';
import VersionCheck from 'react-native-version-check';
import { fetch as fetchPolyfill } from 'whatwg-fetch'

const App = () => {
  const [state, setState] = useState({
    loading: true,
    isLogin: false,
    userdata: null,
    accesstoken: null,
    appData: null,
    userProfile: null,
    bookingDetail: null,
    appVersion: '1.0'
  })
  const appState = useRef(AppState.currentState);

  useEffect(() => {
    const subscription = AppState.addEventListener('change', nextAppState => {
      if (
        appState.current.match(/inactive|background/) &&
        nextAppState === 'active'
      ) {
        // console.log('App has come to the foreground!');
        onAppUpdate();
      }
      appState.current = nextAppState;
    });

    return () => subscription.remove();
  }, []);

  const onAppUpdate = async () => {
    global.fetch = fetchPolyfill
    VersionCheck.needUpdate()
      .then(async res => {
        if (__DEV__) {
          console.log('UpdateChecker', JSON.stringify(res))
        }
        if (res?.currentVersion) {
          setState(prev => ({
            ...prev,
            appVersion: res?.currentVersion
          }))
        }
        if (res?.isNeeded && res?.storeUrl) {
          Alert.alert(
            'Update Available',
            'A new version of the app is available. Please update for the best experience.',
            [
              {
                text: 'Update Now',
                onPress: () => Linking.openURL(res?.storeUrl)
              }
            ],
            { cancelable: false }
          )
        } else {
          // No update is required
          if (__DEV__) {
            console.log('You are using the latest version.');
          }
        }
      })
      .catch(err => {
        if (__DEV__) {
          console.error('Error checking for updates:', err)
        }
      });
  }

  useEffect(() => {
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      if (__DEV__) {
        console.log('ForgroundMessage', JSON.stringify(remoteMessage));
      }
      let title = remoteMessage.notification.title
      let body = remoteMessage.notification.body
      let data = remoteMessage.data
      Notification(title, body, data);
    })
    return unsubscribe
  }, [])

  useEffect(() => {
    //for Background state Notification
    const unsubscribes = messaging().onNotificationOpenedApp(remoteMessage => {
      if (__DEV__) {
        console.log('Notification caused app to open from background states:', remoteMessage);
      }
      if (remoteMessage) {
        navigate(remoteMessage.data)
      }
    });
    return unsubscribes
  }, [])

  useEffect(() => {
    //for Quit state Notification
    messaging()
      .getInitialNotification()
      .then(remoteMessage => {
        if (remoteMessage) {
          if (__DEV__) {
            console.log('Notification caused app to open from quit state:', remoteMessage);
          }
          navigate(remoteMessage.data)
        }
      });
  }, []);

  useEffect(() => {
    //for Foreground State Notification
    return notifee.onForegroundEvent(({ type, detail }) => {
      switch (type) {
        case EventType.DISMISSED:
          if (__DEV__) {
            console.log('User dismissed notification', detail.notification);
          }
          break;
        case EventType.PRESS:
          if (__DEV__) {
            console.log('User pressed notification', detail.notification);
          }
          let datas = detail.notification.data
          if (datas) {
            navigate(datas)
          }
          break;
      }
    });
  }, []);

  useEffect(() => {
    onGetData();
    onGetDeviceToken();
    onAppUpdate();
  }, [])

  const onGetData = useCallback(async () => {
    try {
      setState(prevState => ({
        ...prevState,
        loading: true
      }))
      let datas = {
        key: KEY,
        source: SOURCE
      }
      const response = await Apis.app_setting(datas)
      if (__DEV__) {
        console.log('AppSettingApp.js', JSON.stringify(response))
      }
      if (response.status) {
        // await setAppData(response?.data);
        await onGetStoreData();
        setState(prevState => ({
          ...prevState,
          appData: response?.data,
          loading: false
        }))
        SplashScreen.hide();
      } else {
        Toast.show(response.message, Toast.LONG);
        BackHandler.exitApp();
      }
    } catch (error) {
      setState(prevState => ({
        ...prevState,
        loading: false
      }))
      if (__DEV__) {
        console.log(error)
      }
      Toast.show('Something Went Wrong', Toast.LONG);
      BackHandler.exitApp();
    }
  })

  const onGetDeviceToken = async () => {
    let premission = await getFcmPermission();
    let token = await getFcmToken();
    // if (__DEV__) {
    //   console.log('deviceToken', token);
    //   console.log('FcmPremission', premission)
    // }
  }

  const onGetStoreData = async () => {
    let userdata = await getUserData();
    let accesstoken = await getAccessToken();
    // if (__DEV__) {
    //   console.log('UserData', userdata);
    //   console.log('token', accesstoken)
    // }
    if (userdata && accesstoken) {
      setState(prevState => ({
        ...prevState,
        userdata: userdata,
        accesstoken: accesstoken,
        isLogin: true
      }))
      onGetProfileData()
    } else {
      setState(prevState => ({
        ...prevState,
        userdata: null,
        accesstoken: null,
        isLogin: false
      }))
    }
  }

  const onClearStoreData = async () => {
    setState(prevState => ({
      ...prevState,
      isLogin: false,
      userdata: null,
      accesstoken: null,
      userProfile: null,
      bookingDetail: null
    }))
    await clearUserData();
  }

  const onGetProfileData = useCallback(async () => {
    try {
      let datas = {
        key: KEY,
        source: SOURCE
      }
      const response = await Apis.profile_get(datas);
      if (__DEV__) {
        console.log('AppMyProfile', JSON.stringify(response))
      }
      if (response.status) {
        setState(prev => ({
          ...prev,
          userProfile: response?.data
        }))
      } else {
        ToastMessage(response?.message);
      }
    } catch (error) {
      if (__DEV__) {
        console.log(error)
      }
      ToastError();
    }
  })

  return (
    <AuthContext.Provider value={{ allData: state, setData: setState, onGetStoreData, onClearStoreData, onGetProfileData }}>
      <NavigationContainer ref={navigationRef}>
        <StatusBar backgroundColor={state.appData?.color_theme} barStyle={'light-content'} />
        {(!state.loading) && (
          <DrawerStack />
        )}
      </NavigationContainer>
    </AuthContext.Provider>
  )
}

export default App