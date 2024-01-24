import { StyleSheet } from "react-native";
import { Colors } from "./Colors";
import { Font_Family } from "./Fonts";

export const CommonStyle = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.highlight,
        paddingBottom: 0
    },
    boldtext: {
        fontFamily: Font_Family.NunitoSans_Bold,
        color: Colors.them_color
    },
    boldtextgrey: {
        fontFamily: Font_Family.NunitoSans_Bold,
        color: Colors.textColor
    },
    headingText: {
        fontFamily: Font_Family.NunitoSans_Bold,
        color: Colors.them_color,
        fontSize: 20,
        // fontWeight:'bold'
    },
    lightText: {
        fontFamily: Font_Family.NunitoSans_Regular,
        color: Colors.grey
    },
    errortxt: {
        color: 'red',
        fontFamily: Font_Family.NunitoSans_Italic,
        paddingLeft: 10
    },
    btncontainer: {
        backgroundColor: Colors.them_color,
        borderRadius: 30,
        alignSelf: 'center',
        paddingVertical: '4%',
        marginVertical: '4%'
    },
    btnText: {
        fontFamily: Font_Family.NunitoSans_ExtraBold,
        color: Colors.highlight,
        textAlign: 'center',
        fontSize: 18
    },
    themColor: {
        color: Colors.them_color
    },
    themColor_background: {
        backgroundColor: Colors.them_color
    },
    highlightColor: {
        color: Colors.highlight
    }
})