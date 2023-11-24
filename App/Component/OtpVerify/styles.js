import { StyleSheet } from 'react-native';
import { Colors } from '../../Utils/Colors';
import { Font_Family } from '../../Utils/Fonts';


export const styles = StyleSheet.create({
    content: {
        flex: 1,
        marginTop: '3%',
        marginBottom: '4%'
    },
    backContainer: {
        marginTop: '6%',
        marginLeft: '4%'
    },
    backicon: {
        width: 30,
        height: 30,
        tintColor: Colors.them_color,
    },
    logoContainer: {
        marginTop: '2%',
        marginBottom: '6%',
        backgroundColor: Colors.white,
        width: 200,
        height: 200,
        borderRadius: 100,
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center'
    },
    logo: {
        width: '70%',
        height: 120,
        resizeMode: 'contain',
        alignSelf: 'center'
    },
    mainContent: {
        paddingHorizontal: '6%',
        marginTop: '2%',
        backgroundColor: Colors.white,
        paddingVertical: '6%',
        width: '90%',
        alignSelf: 'center',
        borderRadius: 10
    },
    btnContainer: {
        marginTop: '4%'
    },
    subtext: {
        marginBottom: '10%',
        textAlign: 'center',
        fontFamily: Font_Family.NunitoSans_Bold,
        color: Colors.white,
        fontSize: 16
    },
    otp: {
        width: '95%',
        alignSelf: 'center',
        height: '40%',
        marginTop: '4%',
        fontSize: 20
    },
    underlineStyleBase: {
        width: 50,
        height: 50,
        borderWidth: 1.5,
        borderRadius: 5,
        // borderBottomWidth: 1.5,
        borderColor: Colors.grey,
        color: Colors.black,
        fontSize: 20
    },
    underlineStyleHighLighted: {
        borderColor: Colors.them_color,
    },
    resendContainer: {
        marginTop: '1%',
        // marginBottom: '2%',
        alignSelf: 'center'
    },
    resendText: {
        fontFamily: Font_Family.NunitoSans_Bold,
        color: Colors.them_color,
        textDecorationLine: 'underline'

    },
    resendTimer: {
        fontFamily: Font_Family.NunitoSans_Bold,
        color: Colors.black,
        textDecorationLine: 'underline'
    }
})