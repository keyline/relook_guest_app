import { StyleSheet } from 'react-native';
import { Colors } from '../../Utils/Colors';


export const styles = StyleSheet.create({
    content: {
        marginTop: '10%',
        marginBottom: '4%'
    },
    logoContainer: {
        marginTop: '1%',
        marginBottom: '6%'
    },
    logo: {
        width: '50%',
        height: 100,
        resizeMode: 'contain',
        alignSelf: 'center'
    },
    backContainer: {
        marginTop: '2%'
    },
    backicon: {
        width: 50,
        height: 50,
        tintColor: Colors.them_color,
    },
    mainContent: {
        paddingHorizontal: '6%',
        marginTop: '6%'
    },
    btnContainer: {
        marginTop: '6%'
    },
})
