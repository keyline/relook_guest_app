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

    const RenderItem = ({ item }) => (
        <View style={styles.itemContainer}>
            <View>
                <Text style={[CommonStyle.boldtext, { color: Colors.black }]}>{item?.name}</Text>
                <Text style={[CommonStyle.lightText]}>Qty : {item?.count}</Text>
            </View>
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
            <Image source={ImagePath.timer} style={styles.timer} />
            <Text style={[CommonStyle.lightText, { fontSize: 12 }]}>  Ordered : {items?.order_on} | {items?.status == 'Delivered' ? 'Delivered' : 'Expected Delivery'}: {items?.delivery}</Text>
        </View>
    )

    return (
        <View style={items.status == 'Delivered' ? styles.delistContainer : items.status == 'Ordered' ? styles.orlistContainer : styles.prlistContainer}>
            <TouchableOpacity onPress={onShowChange} activeOpacity={0.5} style={items.status == 'Delivered' ? styles.deliverHeader : items.status == 'Ordered' ? styles.orderHeader : styles.processHeader}>
                <Text style={[CommonStyle.boldtext, { color: items?.status == 'Ordered' ? Colors.black : Colors.white, fontWeight: 'bold' }]}>Order ID: {index + 1}</Text>
                <View style={styles.flex}>
                    <Text style={[CommonStyle.boldtext, { color: items?.status == 'Ordered' ? Colors.black : Colors.white, fontWeight: 'bold', marginRight: 10 }]}>{items?.status}</Text>
                    <Image source={show ? ImagePath.arrow_up : ImagePath.arrow_down} style={styles.arrow} />
                </View>
            </TouchableOpacity>
            {(show) && (
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
            )}
        </View>
    )
}

export default List