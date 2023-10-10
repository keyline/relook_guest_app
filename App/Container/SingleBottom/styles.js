import { StyleSheet } from 'react-native';
import { Colors, primaryColor } from '../../Utils/Colors';
import { Font_Family } from '../../Utils/Fonts';
import { CommonStyle } from '../../Utils/CommonStyle'

export const styles = StyleSheet.create({
    container: {
        // backgroundColor: Colors.them_color,
        backgroundColor: primaryColor,
        borderRadius: 30,
        alignSelf: 'center',
        paddingVertical: '4%',
        marginVertical: '4%',
        // ...CommonStyle.themColor_background
    },
    btnText: {
        fontFamily: Font_Family.NunitoSans_ExtraBold,
        color: Colors.highlight,
        textAlign: 'center',
        fontSize: 18
    }
})