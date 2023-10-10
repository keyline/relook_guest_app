import { View, Text, ActivityIndicator } from 'react-native'
import React, { useContext } from 'react'
import { styles } from './styles'
import { Colors } from '../../Utils/Colors'
import AuthContext from '../../Services/Context'

const Loader = ({ loading, color }) => {

    const context = useContext(AuthContext);
    const { appData } = context.allData

    return (
        <View style={styles.container}>
            <View style={styles.content}>
                <ActivityIndicator animating={loading} color={color ? color : appData.color_theme} size={'large'} />
            </View>
        </View>
    )
}

export default Loader