import { View, Text, Image } from 'react-native'
import React from 'react'
import { styles } from './styles'
import { ImagePath } from '../../Utils/ImagePath'

const StarView = ({ rating }) => {
    return (
        <View style={styles.starContainer}>
            <Image source={ImagePath.star} style={styles.star} />
            <Text style={styles.ratingText}> {rating}</Text>
        </View>
    )
}

export default StarView