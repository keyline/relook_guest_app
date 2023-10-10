import { View, Text, TouchableOpacity, Image } from 'react-native'
import React, { useContext, useCallback } from 'react'
import Modal from 'react-native-modal'
import { Colors } from '../../Utils/Colors'
import { styles } from './styles'
import { ImagePath } from '../../Utils/ImagePath'
import AuthContext from '../../Services/Context'
import { CommonStyle } from '../../Utils/CommonStyle'

const ImageOptionModal = ({ isVisible, onModalHide, onMenuPress }) => {

    const context = useContext(AuthContext);
    const { appData, accesstoken, isLogin, userProfile } = context.allData

    const menuList = [
        { id: 1, name: 'Camera', icon: ImagePath.camera },
        { id: 2, name: 'Gallery', icon: ImagePath.gallery },
        { id: 3, name: 'Cancle', icon: ImagePath.close },
    ]

    // const onPress = useCallback(async (item) => {
    //     if (item.id == '3') {
    //         onModalHide();
    //     } else {
    //         onMenuPress(item.id)
    //     }
    // })

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
            <View style={styles.container}>
                <Text style={[CommonStyle.headingText, { marginBottom: '2%', textAlign: 'center', color: appData.color_theme }]}>Choose photo from</Text>
                {menuList.map((item, key) => (
                    <TouchableOpacity onPress={() => onMenuPress(item.id)} key={key} activeOpacity={0.5} style={styles.content}>
                        <Image source={item.icon} style={[styles.icon, { tintColor: appData?.color_theme }]} />
                        <Text style={styles.text}>{item.name}</Text>
                    </TouchableOpacity>
                ))}
            </View>
        </Modal>
    )
}

export default ImageOptionModal