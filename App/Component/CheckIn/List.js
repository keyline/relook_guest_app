import { View, Text, Image, TouchableOpacity } from 'react-native'
import React, { memo, useContext } from 'react'
import { styles } from './styles'
import { ImagePath } from '../../Utils/ImagePath'
import AuthContext from '../../Services/Context'

const List = ({ item, onPress }) => {

    const context = useContext(AuthContext);
    const { appData, accesstoken, isLogin } = context.allData

    return (
        <TouchableOpacity onPress={() => onPress(item)} disabled={!onPress} activeOpacity={0.5} style={[styles.listContainer, { backgroundColor: appData?.color_panel_bg }]}>
            <View>
                <Text style={[styles.labelText, { color: appData?.color_panel_text }]}>{item.label}</Text>
                <Text style={[styles.descText, { color: appData?.color_panel_text }]}>{item.desc}</Text>
            </View>
            <Image source={ImagePath.right_arrow} style={[styles.arrow, { tintColor: appData?.color_panel_text }]} />
        </TouchableOpacity>
    )
}

export default memo(List)