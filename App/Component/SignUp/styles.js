import { StyleSheet } from "react-native";
import { Colors } from "../../Utils/Colors";
import { Font_Family } from "../../Utils/Fonts";


export const styles = StyleSheet.create({
    content: {
        marginTop: '3%',
        marginBottom: '4%'
    },
    backContainer: {
        marginTop: '2%'
    },
    backicon: {
        width: 50,
        height: 50,
        tintColor: Colors.them_color,
    },
    logoContainer: {
        // marginTop: '2%',
        // marginBottom: '2%'
    },
    logo: {
        width: '50%',
        height: 100,
        resizeMode: 'contain',
        alignSelf: 'center'
    },
    mainContent: {
        paddingHorizontal: '6%',
        marginTop: '6%'
    },
    btnContainer: {
        marginTop: '4%'
    },
    signuptext: {
        fontFamily: Font_Family.NunitoSans_Bold,
        textAlign: 'center',
        marginTop: '4%'
    }
})