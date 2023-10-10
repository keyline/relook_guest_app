import { StyleSheet } from 'react-native';
import { Font_Family } from '../../Utils/Fonts';
import { Colors } from '../../Utils/Colors';


export const styles = StyleSheet.create({
    bodyContent: {
        paddingHorizontal: '4%',
        marginVertical: '3%'
    },
    listContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: '2%',
        width:'90%'
    },
    imgcontainer: {
        width: '30%'
    },
    img: {
        width: 120,
        height: 100,
        resizeMode: 'stretch'
    },
    detailscontent: {
        marginLeft: '8%',
        width: '70%'
    },
    nametext: {
        fontFamily: Font_Family.NunitoSans_ExtraBold,
        color: Colors.them_color,
        fontSize: 16
    },
    desctext: {
        fontFamily: Font_Family.NunitoSans_Regular,
        fontSize: 12,
        color: Colors.black
    },
    pricetext: {
        fontFamily: Font_Family.NunitoSans_ExtraBold,
        color: Colors.them_color,
        fontSize: 18
    },
    btnContainer: {
        backgroundColor: Colors.them_color,
        paddingHorizontal: '4%',
        paddingVertical: '2%',
        marginTop:'2%',
        borderRadius: 5,
        alignItems: 'center',
        alignSelf: 'flex-end'
    },
    btntext: {
        fontFamily: Font_Family.NunitoSans_ExtraBold,
        color: Colors.highlight
    }
})