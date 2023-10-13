import { View, Text, Image, TouchableOpacity } from 'react-native'
import React, { memo, useContext, useState } from 'react'
import { styles } from './styles'
import AuthContext from '../../Services/Context';
import SelectDropdown from 'react-native-select-dropdown'
import { CommonStyle } from '../../Utils/CommonStyle';

const List = ({ item, onPress }) => {

    const context = useContext(AuthContext);
    const { appData, accesstoken, isLogin } = context.allData
    const QtyList = ["1", "2", "3", "4", "5"]
    const [qty, setqty] = useState("1")

    return (
        <View style={styles.listContainer}>
            <View style={styles.imgcontainer}>
                <Image source={{ uri: item.image }} style={styles.img} />
            </View>
            <View style={styles.detailscontent}>
                <Text style={[styles.nametext, { color: appData?.color_theme }]}>{item.name}</Text>
                <Text style={styles.desctext}>{item.details}</Text>
                {/* <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <Text style={styles.pricetext}>₹ {item.price}</Text>
                </View> */}
                <View style={styles.btncontent}>
                    <View style={styles.flex}>
                        <Text style={[CommonStyle.boldtext, { color: appData?.color_theme }]}>Qty : </Text>
                        <SelectDropdown
                            data={QtyList}
                            onSelect={(selectedItem, index) => {
                                setqty(selectedItem)
                            }}
                            defaultValue={qty}
                            buttonStyle={{
                                // backgroundColor:'blue',
                                width: 50,
                                height: 30,
                                borderRadius: 5
                            }}
                        />
                    </View>
                    <TouchableOpacity onPress={() => onPress(item, qty)} activeOpacity={0.5} style={[styles.itembtn, { backgroundColor: appData?.color_complete_button }]}>
                        <Text style={styles.btntext}>Request</Text>
                    </TouchableOpacity>
                </View>
                {/* <TouchableOpacity onPress={() => onPress(item)} activeOpacity={0.5} style={[styles.btnContainer, { backgroundColor: appData?.color_complete_button }]}>
                    <Text style={styles.btntext}>Request</Text>
                </TouchableOpacity> */}
            </View>
        </View>
    )
}

export default memo(List)