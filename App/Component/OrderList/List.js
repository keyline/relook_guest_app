import { View, Text } from 'react-native'
import React, { useContext } from 'react'
import AuthContext from '../../Services/Context';
import { styles } from './styles';
import { CommonStyle } from '../../Utils/CommonStyle';
import { Colors } from '../../Utils/Colors';

const List = ({ item }) => {

    const context = useContext(AuthContext);
    const { appData, accesstoken, isLogin } = context.allData

    return (
        <View style={styles.listContainer}>
            <View style={styles.listHeader}>
                <Text style={[CommonStyle.boldtext, { fontSize: 16, color: Colors.black }]}>{item.name}</Text>
                {(item?.status == '3') && (
                    <Text style={[CommonStyle.boldtextgrey, { color: 'green' }]}>Delivered</Text>
                )}
                {(item?.status == '2') && (
                    <Text style={[CommonStyle.boldtextgrey, { color: 'orange' }]}>Pending</Text>
                )}
                {(item?.status == '1') && (
                    <Text style={[CommonStyle.boldtextgrey, { color: 'red' }]}>Canclled</Text>
                )}
            </View>
            <Text style={CommonStyle.lightText}>Qty : {item.qty}</Text>
            <Text style={[CommonStyle.boldtext, { color: appData?.color_theme, fontSize: 16, textAlign: 'right' }]}>₹{item.price}</Text>
        </View>
    )
}

export default List