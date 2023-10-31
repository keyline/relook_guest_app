import moment from "moment"
import { launchCamera, launchImageLibrary } from "react-native-image-picker"
import Toast from 'react-native-simple-toast'

export const dateConvert = (value) => {
    if (value) {
        return moment(new Date(value)).format("MMM DD, YYYY")
    } else {
        return null
    }
}

export const dateConvertNew = (value) => {
    if (value) {
        return moment(new Date(value)).format("DD-MM-YYYY")
    } else {
        return null
    }
}

export const dateConvertYear = (value) => {
    if (value) {
        return moment(new Date(value)).format("YYYY-MM-DD")
    } else {
        return null
    }
}

export const ToastMessage = (message, type) => {
    Toast.show(message, type == 'short' ? Toast.SHORT : Toast.LONG);
}

export const ToastError = () => {
    Toast.show('Something Went Wrong', Toast.LONG);
}

export const onLunchCamera = async () => {
    const cameraRes = await launchCamera({
        mediaType: 'photo',
        maxHeight: 200,
        maxWidth: 200,
        quality: 0.5,
        includeBase64: true
    })
    // if (__DEV__) {
    //     console.log('cameraRes', JSON.stringify(cameraRes))
    // }
    if (cameraRes.didCancel) {
        console.log('Cancled by User')
        return null
    } else if (cameraRes.errorCode) {
        console.log(`Error ${cameraRes.errorCode}`)
        return null
    } else if (cameraRes.assets) {
        let val = {
            uri: cameraRes?.assets[0]?.uri,
            type: cameraRes?.assets[0]?.type,
            name: cameraRes?.assets[0]?.fileName,
            base64: cameraRes?.assets[0]?.base64
        }
        return val;
    }
}

export const onLunchLibary = async () => {
    const libaryRes = await launchImageLibrary({
        mediaType: 'photo',
        maxHeight: 200,
        maxWidth: 200,
        quality: 0.5,
        includeBase64: true
    })
    // if (__DEV__) {
    //     console.log('libaryRes', JSON.stringify(cameraRes))
    // }
    if (libaryRes.didCancel) {
        console.log('Cancled by User')
        return null
    } else if (libaryRes.errorCode) {
        console.log(`Error ${libaryRes.errorCode}`)
        return null
    } else if (libaryRes.assets) {
        let val = {
            uri: libaryRes?.assets[0]?.uri,
            type: libaryRes?.assets[0]?.type,
            name: libaryRes?.assets[0]?.fileName,
            base64: libaryRes?.assets[0]?.base64
        }
        return val;
    }
}