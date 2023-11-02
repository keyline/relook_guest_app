import { View, Text } from 'react-native'
import React, { useContext, useCallback } from 'react'
import { styles } from './styles'
import { CommonStyle } from '../../Utils/CommonStyle'
import AuthContext from '../../Services/Context'

const List = ({ item, onUpdateCart }) => {

    const context = useContext(AuthContext);
    const { appData, accesstoken, isLogin } = context.allData

    return (
        <View style={styles.listContainer}>
            <Text numberOfLines={1} style={[CommonStyle.boldtext, { color: appData?.color_theme, fontSize: 14, width: '55%' }]}>{item?.cart_item_name}</Text>
            <View style={styles.innerContent}>
                <View style={styles.modifyBtn}>
                    <Text onPress={() => onUpdateCart(item, 'remove')} style={[styles.plusBtn, { color: appData?.color_theme }]}>-  </Text>
                    <Text style={[styles.plusBtn, { color: appData?.color_theme, fontSize: 18 }]}>{item?.count}</Text>
                    {(item.max_allowed == null) ?
                        <Text onPress={() => onUpdateCart(item, 'add')} style={[styles.plusBtn, { color: appData?.color_theme }]}>  +</Text>
                        :
                        <>
                            {(item.max_allowed > item.count) ?
                                <Text onPress={() => onUpdateCart(item, 'add')} style={[styles.plusBtn, { color: appData?.color_theme }]}>  +</Text>
                                :
                                <Text style={[styles.plusBtn, { color: appData?.color_theme }]}>   </Text>
                            }
                        </>
                    }
                </View>
                <Text style={[CommonStyle.boldtext, { color: appData?.color_theme, fontSize: 16 }]}>₹{item?.total_amount}</Text>
            </View>
        </View>
    )
}

export default List