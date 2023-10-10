import { View, Text, Image, TouchableOpacity } from 'react-native'
import React, { memo, useContext } from 'react'
import { styles } from './styles'
import { ImagePath } from '../../Utils/ImagePath'
import AuthContext from '../../Services/Context'

const List = ({ item }) => {

    const context = useContext(AuthContext);
    const { appData, accesstoken, isLogin } = context.allData

    return (
        <TouchableOpacity activeOpacity={0.5} style={styles.listContiner}>
            <Text style={[styles.labeltext, { color: appData?.color_theme }]}>{item.label}</Text>
            <Image source={ImagePath.right_arrow} style={[styles.arrow, { tintColor: appData?.color_theme }]} />
        </TouchableOpacity>
    )
}

export default memo(List)