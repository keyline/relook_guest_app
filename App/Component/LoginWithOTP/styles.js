import { StyleSheet } from 'react-native';
import { Colors } from '../../Utils/Colors';
import { Font_Family } from '../../Utils/Fonts';


export const styles = StyleSheet.create({
    content: {
        marginTop: '10%',
        marginBottom: '4%'
    },
    logoContainer: {
        // marginTop: '1%',
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
    headingText: {
        fontFamily: Font_Family.NunitoSans_Bold,
        color: Colors.white,
        alignSelf: 'center',
        fontSize: 18
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
    mainContent: {
        paddingHorizontal: '6%',
        marginTop: '10%',
        backgroundColor: Colors.white,
        width: '90%',
        alignSelf: 'center',
        borderRadius: 10,
        paddingVertical: '6%'
    },
    btnContainer: {
        marginTop: '6%'
    },
})
