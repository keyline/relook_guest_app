import { StyleSheet } from 'react-native'
import { Font_Family } from '../../Utils/Fonts'
import { Colors } from '../../Utils/Colors'


export const styles = StyleSheet.create({
    container: {
        alignSelf: 'center',
        marginTop: '4%',
    },
    inputContent: {
        flexDirection: 'row',
        alignItems: 'center',
        // justifyContent: 'space-between',
        // borderBottomWidth: 1,
        borderWidth: 1,
        paddingHorizontal: '4%',
        borderColor: Colors.them_color,
        borderRadius: 30,
        marginTop: '2%',
        backgroundColor: Colors.white
    },
    leftlogo: {
        width: 20,
        height: 20,
        tintColor: Colors.them_color
    },
    input: {
        fontFamily: Font_Family.NunitoSans_Regular,
        width: '80%',
        marginVertical: -2,
        color: Colors.black
    },
    rightIcon: {
        alignItems: 'center',
        // justifyContent: 'flex-end'
        position: 'absolute',
        right: 10
    }
})