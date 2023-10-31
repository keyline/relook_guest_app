import { View, Text, ScrollView } from 'react-native'
import React, { useContext } from 'react'
import Modal from 'react-native-modal'
import { styles } from './styles'
import { CommonStyle } from '../../Utils/CommonStyle'
import { Colors } from '../../Utils/Colors'
import AuthContext from '../../Services/Context'

const heighLight = [
    { id: 1, name: '330 Sq. Foot approx' },
    { id: 2, name: 'Up to 3* Guests' },
    { id: 3, name: 'King Bed' }
]

const feature = [
    { id: 1, name: 'Double Occupany Room' },
    { id: 2, name: 'Bathroom' },
    { id: 3, name: 'King Bed' },
    { id: 4, name: 'Sofa Cum Bed' },
    { id: 5, name: 'Air Conditoner' },
    { id: 6, name: 'Gezer' },
    { id: 6, name: 'LED / LCD with HD Set-Top Box' }
]

const service = [
    { id: 1, name: 'Room Service' },
    { id: 2, name: 'Television' },
    { id: 3, name: ' Parking' }
]

const Details = ({ data, isVisible, onModalHide }) => {

    const context = useContext(AuthContext);
    const { appData, accesstoken, isLogin } = context.allData

    return (
        <Modal
            isVisible={isVisible}
            animationInTiming={800}
            animationOutTiming={800}
            coverScreen={false}

            style={styles.modalStyle}
            onBackdropPress={() => onModalHide()}
            onBackButtonPress={() => onModalHide()}
        >
            <View style={styles.modalContainer}>
                <Text style={[CommonStyle.headingText, { marginBottom: '2%', textAlign: 'center', color: appData?.color_theme }]}>Premium</Text>
                <ScrollView showsVerticalScrollIndicator={false}>
                    {(data?.highlights && data?.highlights.length > 0) && (
                        <View>
                            <Text style={[CommonStyle.boldtext, { color: appData?.color_theme }]}>KEY HIGHLIGHTS</Text>
                            {data?.highlights.map((item, key) => (
                                <View style={styles.itemContent} key={key}>
                                    <View style={styles.dot} />
                                    <Text style={CommonStyle.lightText}>  {item}</Text>
                                </View>
                            ))}
                        </View>
                    )}
                    {(data?.features && data?.features.length > 0) && (
                        <View style={{ marginTop: '5%' }}>
                            <Text style={[CommonStyle.boldtext, { color: appData?.color_theme }]}>ROOM FEATURES</Text>
                            {data?.features.map((item, key) => (
                                <View style={styles.itemContent} key={key}>
                                    <View style={styles.dot} />
                                    <Text style={CommonStyle.lightText}>  {item}</Text>
                                </View>
                            ))}
                        </View>
                    )}
                    {(data?.services && data?.services.length > 0) && (
                        <View style={{ marginTop: '5%' }}>
                            <Text style={[CommonStyle.boldtext, { color: appData?.color_theme }]}>SERVICES INCLUDED</Text>
                            {data?.services.map((item, key) => (
                                <View style={styles.itemContent} key={key}>
                                    <View style={styles.dot} />
                                    <Text style={CommonStyle.lightText}>  {item}</Text>
                                </View>
                            ))}
                        </View>
                    )}
                </ScrollView>
            </View>
        </Modal>
    )
}

export default Details