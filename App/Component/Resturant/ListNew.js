import { View, Text, Image, TouchableOpacity, FlatList } from 'react-native'
import React, { useCallback, useState, useContext, useEffect } from 'react'
import { ImagePath } from '../../Utils/ImagePath'
import { styles } from './styles'
import { CommonStyle } from '../../Utils/CommonStyle'
import AuthContext from '../../Services/Context'
import { Colors } from '../../Utils/Colors'
import { Font_Family } from '../../Utils/Fonts'

const ListNew = ({ item, index, onUpdateCart }) => {

    const [state, setState] = useState({
        show: false
    })

    const context = useContext(AuthContext);
    const { appData, accesstoken, isLogin } = context.allData

    const onArrowPress = useCallback(async () => {
        setState(prev => ({
            ...prev,
            show: !state.show
        }))
    }, [state.show])

    useEffect(() => {
        setState(prev => ({
            ...prev,
            show: (index == 0) ? true : false
        }))
    }, [])

    const RenderItem = ({ items }) => (
        <View style={styles.itemsContainer}>
            <View style={{ width: '70%' }}>
                <Text style={CommonStyle.boldtextgrey}>{items.name}</Text>
                <Text style={[CommonStyle.boldtextgrey, { marginVertical: '1%' }]}>₹ {items.price}</Text>
                <Text style={styles.lightText}>{items.details}</Text>
            </View>
            <View style={{}}>
                {(items?.order_qty > 0) ?
                    <View style={[styles.modifyBtn, { borderColor: appData?.color_theme }]}>
                        <Text onPress={() => onUpdateCart(item, items, 'remove')} style={[styles.plusBtn, { color: appData?.color_theme }]}>-  </Text>
                        <Text style={[styles.plusBtn, { color: Colors.black, fontSize: 16 }]}>{items?.order_qty}</Text>
                        <Text onPress={() => onUpdateCart(item, items, 'add')} style={[styles.plusBtn, { color: appData?.color_theme }]}>  +</Text>
                    </View>
                    :
                    <TouchableOpacity onPress={() => onUpdateCart(item, items, 'add')} disabled={!onUpdateCart} activeOpacity={0.5} style={[styles.addBtn, { borderColor: appData?.color_theme }]}>
                        <Text style={[CommonStyle.boldtext, { color: Colors.black, fontSize: 14 }]}>ADD</Text>
                        {/* <View style={{ position: 'absolute', top: -2, right: 5 }}>
                            <Text style={{ color: appData?.color_theme }}>+</Text>
                        </View> */}
                    </TouchableOpacity>
                }
            </View>
        </View>
    )

    const ItemSeperatorNew = () => (
        <View style={{ borderWidth: 0.8, borderColor: Colors.light_gery, marginVertical: '1%' }} />
    )

    return (
        <View style={{ backgroundColor: Colors.white, borderRadius: 10, paddingVertical: '2.5%', paddingHorizontal: '3%' }}>
            <TouchableOpacity onPress={onArrowPress} style={[styles.flex, { paddingVertical: '1%' }]} activeOpacity={0.5}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Image source={ImagePath.veg} style={{ width: 20, height: 20 }} />
                    <Text style={[CommonStyle.boldtext, { color: appData?.color_theme, fontSize: 16, width: '85%' }]}>  {item?.category_name}</Text>
                </View>
                <Image source={state.show ? ImagePath.arrow_up : ImagePath.arrow_down} style={[styles.arrow, { tintColor: appData?.color_theme }]} />
            </TouchableOpacity>
            {(state.show && item.food_items) && (
                <>
                    <View style={{ borderWidth: 0.6, marginVertical: '2%', borderColor: appData?.color_theme }} />
                    <FlatList
                        data={item.food_items}
                        keyExtractor={(items, index) => items.id}
                        renderItem={({ item }) => (
                            <RenderItem items={item} />
                        )}
                        ItemSeparatorComponent={ItemSeperatorNew}
                    />
                </>
            )}
            {/* {item.items.map((items, key) => (
                <View key={key} style={styles.itemsContainer}>
                    <View>
                        <Text style={CommonStyle.boldtextgrey}>{items.itemname}</Text>
                        <Text style={CommonStyle.boldtextgrey}>₹{items.price}</Text>
                        <Text style={styles.lightText}>{items.desc}</Text>
                    </View>
                    <TouchableOpacity>

                    </TouchableOpacity>
                </View>
            ))} */}
        </View>
    )
}

export default ListNew