import { View, Text, Image, TouchableOpacity } from 'react-native'
import React, { memo, useCallback, useContext } from 'react'
import { ImagePath } from '../../Utils/ImagePath'
import { styles } from './styles'
import { useNavigation } from '@react-navigation/native'
import AuthContext from '../../Services/Context'
import { Colors } from '../../Utils/Colors'

const Header = ({ leftIcon, leftonPress, rightIcon, rightonPress }) => {

    const navigation = useNavigation();

    const context = useContext(AuthContext);
    const { appData, isLogin, userProfile, bookingDetail } = context.allData

    const onPressLogo = useCallback(async () => {
        navigation.navigate('DashBoard');
    })

    const onRightPress = useCallback(async () => {
        if (isLogin) {
            navigation.navigate('MyProfile');
        } else {
            navigation.navigate('LoginWithOTP');
        }
    })

    const onMenuPress = useCallback(async () => {
        navigation.openDrawer();
    })

    return (
        <View style={[styles.container, { backgroundColor: appData?.color_theme }]}>
            <View style={styles.flex}>
                {(leftIcon) && (
                    <TouchableOpacity onPress={() => leftonPress()} disabled={!leftonPress} activeOpacity={0.5} style={{ marginRight: 15 }}>
                        <Image source={leftIcon} style={[styles.lefticon, { tintColor: Colors.white }]} />
                    </TouchableOpacity>
                )}
                <TouchableOpacity onPress={onPressLogo} activeOpacity={0.5}>
                    <Image source={ImagePath.logo_white} style={styles.logo} />
                </TouchableOpacity>
            </View>
            <View style={styles.flex}>
                {(isLogin && userProfile) && (
                    <View style={styles.detailsContainer}>
                        <Text style={styles.nametext}>Hi, {userProfile?.first_name}</Text>
                        {(bookingDetail) && (
                            <Text style={styles.desctext}>Room : {bookingDetail?.room_no}</Text>
                        )}
                    </View>
                )}
                <TouchableOpacity onPress={onRightPress} activeOpacity={0.5} style={{ marginRight: 20 }}>
                    <Image source={ImagePath.user} style={[styles.righticon, { tintColor: Colors.white }]} />
                </TouchableOpacity>
                <TouchableOpacity onPress={onMenuPress} activeOpacity={0.5}>
                    <Image source={ImagePath.menu} style={[styles.righticon, { tintColor: Colors.white }]} />
                </TouchableOpacity>
            </View>
            {/* {(rightIcon) && (
                <TouchableOpacity onPress={() => rightonPress()} disabled={!rightonPress} activeOpacity={0.5}>
                    <Image source={rightIcon} style={[styles.righticon, { tintColor: appData?.color_theme }]} />
                </TouchableOpacity>
            )} */}
        </View>
    )
}

export default memo(Header)