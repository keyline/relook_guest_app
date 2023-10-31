import { View, Text, SafeAreaView, TouchableOpacity, Image, ScrollView } from 'react-native'
import React, { useState, useCallback, useContext } from 'react'
import { CommonStyle } from '../../Utils/CommonStyle'
import { styles } from './styles'
import AuthContext from '../../Services/Context'
import { ImagePath } from '../../Utils/ImagePath'
import SingleBottom from '../../Container/SingleBottom'

const BookingConfirm = () => {

    const context = useContext(AuthContext);
    const { appData, accesstoken, isLogin } = context.allData

    const [state, setState] = useState({
        loading: false,
        data: null
    })

    const onBookingDetails = useCallback(async () => {

    })

    return (
        <SafeAreaView style={CommonStyle.container}>
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={styles.bodyContent}>
                    <Text style={[CommonStyle.headingText, { color: appData?.color_theme, textAlign: 'center', fontSize: 24 }]}>Booking Successful</Text>
                    <View style={{ marginBottom: '8%' }}>
                        <Image source={ImagePath.success} style={styles.logo} />
                        <Text style={[CommonStyle.headingText, { marginTop: '4%', color: appData?.color_theme, textAlign: 'center', fontSize: 20 }]}>Relook Hotels New Digha</Text>
                    </View>
                    <View style={styles.border} />
                    <Text style={[CommonStyle.boldtext, { marginTop: '2%', color: appData?.color_theme, textAlign: 'center' }]}>Booking Details</Text>
                    <View style={styles.infoContent}>
                        <View style={styles.itemContainer}>
                            <Text style={[CommonStyle.boldtext, { color: appData?.color_theme }]}>1 Room (Deluxe)</Text>
                            <Text style={CommonStyle.boldtextgrey}>2 Adults 1 Children</Text>
                        </View>
                        <View style={[styles.itemContainer, { borderLeftWidth: 1 }]}>
                            <Text style={[CommonStyle.boldtext, { color: appData?.color_theme }]}>Oct 20 - Oct 24</Text>
                            <Text style={CommonStyle.boldtextgrey}>4 Nights</Text>
                        </View>
                    </View>
                    <View style={styles.border} />
                    <View>
                        <SingleBottom
                            name={'Booking Details'}
                            loading={state.loading}
                            onPress={onBookingDetails}
                        />
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

export default BookingConfirm