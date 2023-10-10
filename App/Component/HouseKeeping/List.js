import { View, Text, Image, TouchableOpacity } from 'react-native'
import React, { memo, useContext } from 'react'
import { styles } from './styles'
import AuthContext from '../../Services/Context';

const List = ({ item }) => {

    const context = useContext(AuthContext);
    const { appData, accesstoken, isLogin } = context.allData

    return (
        <View style={styles.listContainer}>
            <View style={styles.imgcontainer}>
                <Image source={item.img} style={styles.img} />
            </View>
            <View style={styles.detailscontent}>
                <Text style={[styles.nametext, { color: appData?.color_theme }]}>{item.name}</Text>
                <Text style={styles.desctext}>{item.desc}</Text>
                {/* <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <Text style={styles.pricetext}>₹ {item.price}</Text>
                </View> */}
                <TouchableOpacity activeOpacity={0.5} style={[styles.btnContainer,{backgroundColor:appData?.color_complete_button}]}>
                    <Text style={styles.btntext}>Request</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default memo(List)