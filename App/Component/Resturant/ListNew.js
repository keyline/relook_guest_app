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
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                <Text style={CommonStyle.boldtextgrey}>{items.name}</Text>
                <Text style={CommonStyle.boldtextgrey}>₹{items.price}</Text>
            </View>
            <Text style={styles.lightText}>{items.details}</Text>
            <View style={{ alignSelf: 'flex-end', marginTop: '1%' }}>
                {(items?.order_qty > 0) ?
                    <View style={styles.modifyBtn}>
                        <Text onPress={() => onUpdateCart(item, items, 'remove')} style={[styles.plusBtn, { color: appData?.color_theme }]}>-  </Text>
                        <Text style={[styles.plusBtn, { color: appData?.color_theme, fontSize: 18 }]}>{items?.order_qty}</Text>
                        <Text onPress={() => onUpdateCart(item, items, 'add')} style={[styles.plusBtn, { color: appData?.color_theme }]}>  +</Text>
                    </View>
                    :
                    <TouchableOpacity onPress={() => onUpdateCart(item, items, 'add')} disabled={!onUpdateCart} activeOpacity={0.5} style={styles.addBtn}>
                        <Text style={[CommonStyle.boldtext, { color: appData?.color_theme, fontSize: 16 }]}>ADD</Text>
                        <View style={{ position: 'absolute', top: -2, right: 5 }}>
                            <Text style={{ color: appData?.color_theme }}>+</Text>
                        </View>
                    </TouchableOpacity>
                }
            </View>
        </View>
    )

    const ItemSeperatorNew = () => (
        <View style={{ borderWidth: 0.8, borderColor: Colors.light_gery, marginVertical: '1%' }} />
    )

    return (
        <View>
            <TouchableOpacity onPress={onArrowPress} style={[styles.flex, { paddingVertical: '2%', backgroundColor: Colors.light_gery, paddingHorizontal: '2%', borderRadius: 5 }]} activeOpacity={0.5}>
                <Text style={[CommonStyle.boldtext, { color: appData?.color_theme, fontSize: 16 }]}>{item?.category_name}</Text>
                <Image source={state.show ? ImagePath.arrow_up : ImagePath.arrow_down} style={styles.arrow} />
            </TouchableOpacity>
            {(state.show && item.food_items) && (
                <FlatList
                    data={item.food_items}
                    keyExtractor={(items, index) => items.id}
                    renderItem={({ item }) => (
                        <RenderItem items={item} />
                    )}
                    ItemSeparatorComponent={ItemSeperatorNew}
                />
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