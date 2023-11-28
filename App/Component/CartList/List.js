import { View, Text } from 'react-native'
import React, { useContext, useCallback } from 'react'
import { styles } from './styles'
import { CommonStyle } from '../../Utils/CommonStyle'
import AuthContext from '../../Services/Context'
import { Colors } from '../../Utils/Colors'

const List = ({ item, onUpdateCart }) => {

    const context = useContext(AuthContext);
    const { appData, accesstoken, isLogin } = context.allData

    return (
        <View style={styles.listContainer}>
            <View style={{ width: '50%' }}>
                <Text numberOfLines={1} style={[CommonStyle.boldtext, { color: Colors.black, fontSize: 14, width: '100%' }]}>{item?.cart_item_name}</Text>
                <Text style={[CommonStyle.lightText, { fontSize: 12 }]}>{item?.details}</Text>
            </View>
            <Text style={[CommonStyle.boldtext, { color:Colors.black , fontSize: 16 }]}>₹{item?.total_amount}</Text>
            <View style={styles.innerContent}>
                <View style={[styles.modifyBtn, { borderColor: appData?.color_theme }]}>
                    <Text onPress={() => onUpdateCart(item, 'remove')} style={[styles.plusBtn, { color: appData?.color_theme }]}>-  </Text>
                    <Text style={[styles.plusBtn, { color: appData?.color_theme, fontSize: 16 }]}>{item?.count}</Text>
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
            </View>
        </View>
    )
}

export default List