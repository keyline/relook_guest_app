import { View, Text, Image, TouchableOpacity } from 'react-native'
import React, { memo, useContext, useState } from 'react'
import { styles } from './styles'
import AuthContext from '../../Services/Context';
import SelectDropdown from 'react-native-select-dropdown'
import { CommonStyle } from '../../Utils/CommonStyle';
import { Colors } from '../../Utils/Colors';

const List = ({ item, onPress, onUpdateCart }) => {

    const context = useContext(AuthContext);
    const { appData, accesstoken, isLogin } = context.allData

    return (
        <View style={styles.listContainer}>
            <View style={styles.imgcontainer}>
                <Image source={{ uri: item.image }} style={styles.img} />
            </View>
            <View style={styles.detailscontent}>
                <Text style={[styles.nametext, { color: Colors.black }]}>{item.name}</Text>
                <Text style={styles.desctext}>{item.details}</Text>
                {(item?.order_qty > 0) ?
                    <View style={styles.modifyBtn}>
                        <Text onPress={() => onUpdateCart(item, 'remove')} style={[styles.plusBtn, { color: appData?.color_theme }]}>-  </Text>
                        <Text style={[styles.plusBtn, { color: appData?.color_theme, fontSize: 18 }]}>{item?.order_qty}</Text>
                        {(item?.order_limit > item?.order_qty) ?
                            <Text onPress={() => onUpdateCart(item, 'add')} style={[styles.plusBtn, { color: appData?.color_theme }]}>  +</Text>
                            :
                            <Text style={[styles.plusBtn, { color: appData?.color_theme, width: '35%' }]}>  </Text>
                        }
                    </View>
                    :
                    <TouchableOpacity onPress={() => onUpdateCart(item, 'add')} disabled={!onUpdateCart} activeOpacity={0.5} style={styles.addBtn}>
                        <Text style={[CommonStyle.boldtext, { color: appData?.color_theme, fontSize: 16 }]}>ADD</Text>
                        <View style={{ position: 'absolute', top: -2, right: 5 }}>
                            <Text style={{ color: appData?.color_theme }}>+</Text>
                        </View>
                    </TouchableOpacity>
                }
            </View>
        </View>
    )
}

export default memo(List)