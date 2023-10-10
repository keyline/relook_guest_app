import { StyleSheet } from 'react-native'
import { Colors } from '../../Utils/Colors'
import { Font_Family } from '../../Utils/Fonts'


export const styles = StyleSheet.create({
    modalStyle: {
        margin: 0
    },
    container: {
        flex: 1,
        position: 'absolute',
        width: '100%',
        bottom: 0,
        left: 0,
        backgroundColor: Colors.white,
        paddingHorizontal:'4%',
        paddingVertical:'4%',
        // borderTopWidth:4,
        // borderColor:Colors.them_color,
        borderTopRightRadius:15,
        borderTopLeftRadius:15
    },
    content: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical:'3%'
    },
    icon: {
        width: 25,
        height: 25,
        resizeMode: 'contain'
    },
    text: {
        fontFamily: Font_Family.NunitoSans_Bold,
        color: Colors.black,
        marginLeft:'4%'
    }
})