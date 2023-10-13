import { View, Text, Image, TouchableOpacity } from 'react-native'
import React, { useContext } from 'react'
import { styles } from './styles'
import { CommonStyle } from '../../Utils/CommonStyle'
import AuthContext from '../../Services/Context'
import { Colors } from '../../Utils/Colors'

const List = ({ item, onPress }) => {

    const context = useContext(AuthContext);
    const { appData, accesstoken, isLogin } = context.allData
console.log('item',item)
    return (
        <View style={styles.listContainer}>
            <Text style={[CommonStyle.boldtext, { color: appData?.color_theme, textAlign: 'center', marginVertical: '2%' }]}>{item.room_type_name}</Text>
            <Image
                source={{uri:item?.room_image}}
                style={styles.img}
            />
            <View style={styles.btnContent}>
                <Text style={[CommonStyle.boldtext, { color: appData?.color_theme }]}>Rs.{item.room_rent}/Day</Text>
                <TouchableOpacity onPress={() => onPress(item)} activeOpacity={0.5} style={[styles.bookbtn, { backgroundColor: appData?.color_theme }]}>
                    <Text style={[CommonStyle.boldtext, { color: Colors.highlight }]}>Book</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default List