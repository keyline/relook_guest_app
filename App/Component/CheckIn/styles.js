import { StyleSheet } from 'react-native'
import { Font_Family } from '../../Utils/Fonts'
import { Colors } from '../../Utils/Colors'


export const styles = StyleSheet.create({
    bodyContent: {
        paddingHorizontal: '4%',
        marginVertical: '4%',
        flex:1
    },
    listContainer: {
        backgroundColor: Colors.them_color,
        paddingHorizontal: '5%',
        paddingVertical: '6%',
        borderRadius: 10,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        elevation:6
    },
    labelText: {
        fontFamily: Font_Family.NunitoSans_ExtraBold,
        color: Colors.highlight,
        fontSize: 18
    },
    descText: {
        fontFamily: Font_Family.NunitoSans_Regular,
        color: Colors.highlight,
        fontSize: 12
    },
    arrow: {
        width: 20,
        height: 20,
        tintColor: Colors.highlight
    },
    checkinContainer: {
        backgroundColor: Colors.them_color,
        marginBottom: '4%',
        paddingHorizontal: '4%',
        paddingVertical: '3%',
        borderRadius: 10
    },
    checkinText: {
        fontFamily: Font_Family.NunitoSans_Bold,
        color: Colors.highlight,
        textAlign: 'center',
        fontSize: 16
    },
})