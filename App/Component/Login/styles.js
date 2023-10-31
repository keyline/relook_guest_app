import { StyleSheet } from "react-native";
import { Font_Family } from "../../Utils/Fonts";
import { Colors } from "../../Utils/Colors";


export const styles = StyleSheet.create({
    content: {
        marginTop: '10%',
        marginBottom: '4%'
    },
    logoContainer: {
        marginTop: '4%',
        marginBottom: '6%'
    },
    logo: {
        width: '50%',
        height: 100,
        resizeMode: 'contain',
        alignSelf: 'center'
    },
    mainContent: {
        paddingHorizontal: '6%',
        marginTop: '12%'
    },
    forgottext: {
        fontFamily: Font_Family.NunitoSans_Bold,
        color: Colors.them_color,
        marginVertical: '4%',
        textAlign: 'right'
    },
    btnContainer: {
        marginTop: '2%'
    },
    signuptext: {
        fontFamily: Font_Family.NunitoSans_Bold,
        textAlign: 'center',
        marginTop: '6%',
        color: Colors.grey

    },
    otptxt: {
        fontFamily: Font_Family.NunitoSans_Bold,
        textAlign: 'center',
        textDecorationLine: 'underline',
        marginVertical: '3%'
    }
})