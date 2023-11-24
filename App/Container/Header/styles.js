import { StyleSheet } from 'react-native';
import { Colors } from '../../Utils/Colors';


export const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: '4%',
        paddingVertical: '2%',
        // borderBottomWidth: 1.5,
        // borderColor: Colors.them_color,

    },
    lefticon: {
        width: 30,
        height: 30,
        tintColor: Colors.them_color
    },
    righticon: {
        width: 20,
        height: 20,
        tintColor: Colors.them_color
    },
    flex: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    logo: {
        width: 80,
        height: 40,
        resizeMode: 'contain'
    }
})