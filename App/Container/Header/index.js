import { View, Text, Image, TouchableOpacity } from 'react-native'
import React, { memo, useCallback, useContext } from 'react'
import { ImagePath } from '../../Utils/ImagePath'
import { styles } from './styles'
import { useNavigation } from '@react-navigation/native'
import AuthContext from '../../Services/Context'

const Header = ({ leftIcon, leftonPress, rightIcon, rightonPress }) => {

    const navigation = useNavigation();

    const context = useContext(AuthContext);
    const { appData, isLogin } = context.allData

    const onPressLogo = useCallback(async () => {
        navigation.navigate('DashBoard');
    })

    const onRightPress = useCallback(async () => {
        if (isLogin) {
            console.log('Notification');
        } else {
            navigation.navigate('Login');
        }
    })

    return (
        <View style={[styles.container, { borderColor: appData?.color_theme }]}>
            <View style={styles.flex}>
                {(leftIcon) && (
                    <TouchableOpacity onPress={() => leftonPress()} disabled={!leftonPress} activeOpacity={0.5}>
                        <Image source={leftIcon} style={[styles.lefticon, { tintColor: appData?.color_theme }]} />
                    </TouchableOpacity>
                )}
                {(appData?.site_logo) && (
                    <TouchableOpacity onPress={onPressLogo} activeOpacity={0.5}>
                        <Image source={{ uri: appData?.site_logo }} style={styles.logo} />
                    </TouchableOpacity>
                )}
            </View>
            <TouchableOpacity onPress={onRightPress} activeOpacity={0.5}>
                <Image source={isLogin ? ImagePath.bell : ImagePath.user_round} style={[styles.righticon, { tintColor: appData?.color_theme }]} />
            </TouchableOpacity>
            {/* {(rightIcon) && (
                <TouchableOpacity onPress={() => rightonPress()} disabled={!rightonPress} activeOpacity={0.5}>
                    <Image source={rightIcon} style={[styles.righticon, { tintColor: appData?.color_theme }]} />
                </TouchableOpacity>
            )} */}
        </View>
    )
}

export default memo(Header)