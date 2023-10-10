import { StyleSheet } from 'react-native'
import { Colors } from '../../Utils/Colors'
import { Font_Family } from '../../Utils/Fonts'


export const styles = StyleSheet.create({
    bodyContent: {
        paddingHorizontal: '4%',
        marginVertical: '3%'
    },
    listContiner: {
        paddingVertical: '4%',
        paddingHorizontal: '2%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    labeltext: {
        fontFamily: Font_Family.NunitoSans_ExtraBold,
        color: Colors.them_color,
        fontSize: 16
    },
    arrow: {
        width: 20,
        height: 20,
        tintColor: Colors.them_color
    }
})