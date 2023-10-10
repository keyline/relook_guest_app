import { View, Text, Image, TouchableOpacity } from 'react-native'
import React, { useContext } from 'react'
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
                <Text style={[styles.nametext,{color:appData?.color_theme}]}>{item.name}</Text>
                <Text style={styles.desctext}>{item.desc}</Text>
                <Text style={[styles.desctext, { color: item.category == 1 ? 'green' : 'red', fontWeight: 'bold' }]}>{item.category == 1 ? 'Veg' : 'Non-Veg'}</Text>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <Text style={[styles.pricetext,{color:appData?.color_theme}]}>₹ {item.price}</Text>
                    <TouchableOpacity activeOpacity={0.5} style={[styles.btnContainer,{backgroundColor:appData?.color_complete_button}]}>
                        <Text style={styles.btntext}>Order</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}

export default List