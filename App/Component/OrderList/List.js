import { View, Text, Image, FlatList, TouchableOpacity } from 'react-native'
import React, { useCallback, useContext, useEffect, useState } from 'react'
import AuthContext from '../../Services/Context';
import { styles } from './styles';
import { CommonStyle } from '../../Utils/CommonStyle';
import { Colors } from '../../Utils/Colors';
import { ImagePath } from '../../Utils/ImagePath';

const List = ({ items, index }) => {

    const context = useContext(AuthContext);
    const { appData, accesstoken, isLogin } = context.allData

    const [show, setshow] = useState(false)

    useEffect(() => {
        if (index == 0) {
            setshow(true)
        }
    }, [])

    const getStatus = (status) => {
        if (status == 'Ordered') {
            return 'Ordered';
        } else if (status == '2') {
            return 'Processing';
        } else {
            return 'Delivered'
        }
    }

    const getColor = (status) => {
        if (status == 'Ordered') {
            return '#696969'
        } else if (status == 'Delivered') {
            return '#007E05'
        } else {
            return '#FF8D08'
        }
    }

    const RenderItem = ({ item }) => (
        <View style={styles.itemContainer}>
            <View style={{ width: '50%' }}>
                <Text style={[CommonStyle.boldtext, { color: Colors.black }]}>{item?.name}</Text>
                <Text style={[CommonStyle.lightText]}>{item?.details}</Text>
            </View>
            <Text style={[CommonStyle.boldtext, { color: Colors.black }]}>Qty : {item?.count}</Text>
            <Text style={[CommonStyle.boldtext, { color: Colors.black }]}>₹{item?.amount}</Text>
        </View>
    )

    const ItemSeperatorNew = () => (
        <View style={{ borderWidth: 0.2, borderColor: Colors.grey, marginVertical: '2%', width: '95%', alignSelf: 'center' }} />
    )

    const onShowChange = useCallback(async () => {
        setshow(!show)
    }, [show])

    const Footer = () => (
        <View style={styles.footer}>
            <Image source={ImagePath.timer} style={[styles.timer, { tintColor: getColor(items?.status) }]} />
            <Text style={[CommonStyle.lightText, { fontSize: 12, width: '98%' }]}>  Ordered : {items?.order_on} | {items?.status == 'Delivered' ? 'Delivered' : 'Expected Delivery'}: {items?.delivery}</Text>
        </View>
    )

    return (
        <View style={styles.listContainer}>
            <TouchableOpacity onPress={onShowChange} activeOpacity={0.5} style={styles.listHeader}>
                <Text style={[CommonStyle.boldtext, { color: appData?.color_theme, fontWeight: 'bold' }]}>ORDER ID: {index + 1}</Text>
                <View style={styles.flex}>
                    <Text style={[CommonStyle.boldtext, { color: getColor(items.status), fontWeight: 'bold', marginRight: 10 }]}>{items?.status}</Text>
                    <Image source={show ? ImagePath.arrow_up : ImagePath.arrow_down} style={styles.arrow} />
                </View>
            </TouchableOpacity>
            {(show) && (
                <>
                    <View style={[styles.border, { borderColor: appData?.color_theme }]} />
                    <FlatList
                        data={items.items}
                        keyExtractor={(item, index) => index}
                        renderItem={({ item }) =>
                            <RenderItem item={item} />
                        }
                        // ItemSeparatorComponent={ItemSeperatorNew}
                        style={{ paddingVertical: '1%' }}
                        ListFooterComponent={Footer}
                    />
                </>
            )}
        </View>
    )
}

export default List