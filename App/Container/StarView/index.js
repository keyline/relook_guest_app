import { View, Text, Image } from 'react-native'
import React, { useContext } from 'react'
import { styles } from './styles'
import { ImagePath } from '../../Utils/ImagePath'
import AuthContext from '../../Services/Context'

const StarView = ({ rating }) => {

    const context = useContext(AuthContext);
    const { appData, accesstoken, isLogin } = context.allData

    return (
        <View style={[styles.starContainer, { backgroundColor: appData?.color_theme }]}>
            <Image source={ImagePath.star} style={styles.star} />
            <Text style={styles.ratingText}> {rating}</Text>
        </View>
    )
}

export default StarView