import { View, Text, SafeAreaView, TouchableOpacity, Image, ScrollView, Linking } from 'react-native'
import React, { useState, useCallback, useContext } from 'react'
import { CommonStyle } from '../../Utils/CommonStyle'
import { styles } from './styles'
import AuthContext from '../../Services/Context'
import { ImagePath } from '../../Utils/ImagePath'
import SingleBottom from '../../Container/SingleBottom'

const BookingConfirm = ({ navigation, route }) => {

    const context = useContext(AuthContext);
    const { appData, accesstoken, isLogin } = context.allData

    const [state, setState] = useState({
        loading: false,
        data: route?.params?.data
    })

    const onCall = useCallback(async () => {
        let phoneNumber = 'tel:+919775512340';
        Linking.openURL(phoneNumber)
    })

    const onGoBack = useCallback(async () => {
        navigation.replace('DashBoard')
    })

    return (
        <SafeAreaView style={CommonStyle.container}>
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={styles.bodyContent}>
                    <Text style={[CommonStyle.headingText, { color: appData?.color_theme, textAlign: 'center', fontSize: 24 }]}>Booking Request Successful</Text>
                    <View style={{ marginBottom: '8%' }}>
                        <Image source={ImagePath.success} style={styles.logo} />
                        <Text style={[CommonStyle.headingText, { marginTop: '4%', color: appData?.color_theme, textAlign: 'center', fontSize: 20 }]}>Relook Hotels {state?.data?.hotel_name}</Text>
                        <View style={{ paddingHorizontal: '4%', marginTop: '4%' }}>
                            <Text style={[CommonStyle.lightText, { textAlign: 'center', }]}>Thank You for your booking request. We'll be in touch shortly to finalize your reservation. If you have any question, Please don't hesiate to reach out at <Text onPress={onCall} style={[CommonStyle.boldtextgrey, { color: appData?.color_theme }]}>9775512340</Text></Text>
                        </View>
                    </View>
                    <View style={styles.border} />
                    <Text style={[CommonStyle.boldtext, { marginTop: '2%', color: appData?.color_theme, textAlign: 'center' }]}>Booking Details</Text>
                    <View style={styles.infoContent}>
                        <View style={styles.itemContainer}>
                            <Text style={[CommonStyle.boldtext, { color: appData?.color_theme }]}>{state?.data?.room}</Text>
                            <Text style={CommonStyle.boldtextgrey}>{state?.data?.person_count}</Text>
                        </View>
                        <View style={[styles.itemContainer, { borderLeftWidth: 1 }]}>
                            <Text style={[CommonStyle.boldtext, { color: appData?.color_theme }]}>{state.data?.booking_dates}</Text>
                            <Text style={CommonStyle.boldtextgrey}>{state?.data?.date_difference} Nights</Text>
                        </View>
                    </View>
                    <View style={styles.border} />
                    <View>
                        <SingleBottom
                            name={'Go Back'}
                            loading={state.loading}
                            onPress={onGoBack}
                        />
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

export default BookingConfirm