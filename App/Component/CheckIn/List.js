import { View, Text, Image, TouchableOpacity } from 'react-native'
import React, { memo, useContext } from 'react'
import { styles } from './styles'
import { ImagePath } from '../../Utils/ImagePath'
import AuthContext from '../../Services/Context'
import { Colors } from '../../Utils/Colors'

const List = ({ item, onPress }) => {

    const context = useContext(AuthContext);
    const { appData, accesstoken, isLogin } = context.allData

    return (
        <TouchableOpacity onPress={() => onPress(item)} disabled={!onPress} activeOpacity={0.5} style={styles.listContainer}>
            <Image source={item.icon} style={[styles.icon, { tintColor: appData?.color_theme }]} />
            <Text style={[styles.labelText, { color: Colors.black }]}>{item.label}</Text>
            <Text style={[styles.descText, { color: appData?.color_theme }]}>{item.desc}</Text>
        </TouchableOpacity>
    )
}

export default memo(List)