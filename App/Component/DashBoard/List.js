import { View, Text, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { styles } from './styles'
import { CommonStyle } from '../../Utils/CommonStyle'
import { ImagePath } from '../../Utils/ImagePath'
import { Colors } from '../../Utils/Colors'

const List = ({ item, onPress, appdata, index }) => {
    return (
        <View style={styles.listContainer}>
            {(index == 0 || index % 2 == 0) ?
                <>
                    <View style={styles.listLeftContent}>
                        <Image source={{ uri: item?.cover_image }} style={styles.listimg} />
                    </View>
                    <View style={[styles.listRightContent, { backgroundColor: appdata?.color_theme }]}>
                        <Text style={[CommonStyle.boldtext, { color: Colors.white, fontSize: 16, width: '80%' }]}>{item?.name}</Text>
                        <Text style={[CommonStyle.boldtext, { color: Colors.white, fontSize: 10, marginTop: 2 }]}>{item?.location}</Text>
                        <TouchableOpacity onPress={() => onPress(item)} disabled={!onPress} activeOpacity={0.5} style={styles.listbtn}>
                            <Text style={[CommonStyle.boldtext, { color: Colors.white, fontSize: 12 }]}>BOOK NOW</Text>
                            <Image source={ImagePath.arrow_right} style={styles.btnArrow} />
                        </TouchableOpacity>
                    </View>
                </>
                :
                <>
                    <View style={[styles.listRightContent, { backgroundColor: appdata?.color_theme }]}>
                        <Text style={[CommonStyle.boldtext, { color: Colors.white, fontSize: 16, width: '80%' }]}>{item?.name}</Text>
                        <Text style={[CommonStyle.boldtext, { color: Colors.white, fontSize: 10, marginTop: 2 }]}>{item?.location}</Text>
                        <TouchableOpacity onPress={() => onPress(item)} disabled={!onPress} activeOpacity={0.5} style={styles.listbtn}>
                            <Text style={[CommonStyle.boldtext, { color: Colors.white, fontSize: 12 }]}>BOOK NOW</Text>
                            <Image source={ImagePath.arrow_right} style={styles.btnArrow} />
                        </TouchableOpacity>
                    </View>
                    <View style={styles.listLeftContent}>
                        <Image source={{ uri: item?.cover_image }} style={styles.listimg} />
                    </View>
                </>
            }
        </View>
    )
}

export default List