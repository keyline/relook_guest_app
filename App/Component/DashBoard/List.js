import { View, Text, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { styles } from './styles'
import { CommonStyle } from '../../Utils/CommonStyle'
import { ImagePath } from '../../Utils/ImagePath'

const List = ({ item, onPress, appdata }) => {
    return (
        <View style={styles.listContainer}>
            <Image source={{ uri: item?.cover_image }} style={styles.listimg} />
            <View style={[styles.flexSpacebtwn, { marginTop: '1%', paddingHorizontal: '1%' }]}>
                <View style={styles.locationText}>
                    <Text style={[CommonStyle.boldtext, { fontSize: 16, color: appdata?.color_title }]}>{item?.name}</Text>
                    <Text style={styles.locationtxt}>{item?.location}</Text>
                </View>
                <TouchableOpacity onPress={() => onPress(item)} disabled={!onPress} style={styles.flex}>
                    <Text style={[CommonStyle.boldtext, { color: appdata?.color_title }]}>Book Now </Text>
                    <Image source={ImagePath.right_arrow} style={[styles.arrow,{tintColor:appdata.color_title}]} />
                </TouchableOpacity>
            </View>

        </View>
    )
}

export default List