import { StyleSheet } from 'react-native';
import { Font_Family } from '../../Utils/Fonts';
import { Colors } from '../../Utils/Colors';


export const styles = StyleSheet.create({
    bodyContent: {
        flex: 1,
        paddingHorizontal: '4%',
        marginTop: '2%',
        marginBottom: 65,
    },
    listContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: '2%',
        // width:'100%'
    },
    imgcontainer: {
        width: '30%'
    },
    img: {
        width: '100%',
        height: 100,
        resizeMode: 'stretch'
    },
    detailscontent: {
        marginLeft: '4%',
        width: '60%'
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
        marginTop: '2%',
        borderRadius: 5,
        alignItems: 'center',
        alignSelf: 'flex-end'
    },
    btntext: {
        fontFamily: Font_Family.NunitoSans_ExtraBold,
        color: Colors.highlight
    },
    btncontent: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: '4%',

    },
    itembtn: {
        paddingHorizontal: '4%',
        paddingVertical: '3%',
        borderRadius: 5,
        alignSelf: 'flex-end'
    },
    flex: {
        flexDirection: 'row',
        alignItems: 'center',

    },
    searchContainer: {
        backgroundColor: Colors.light_gery,
        width: '70%',
        alignSelf: 'center',
        borderRadius: 30,
        height: 40,
        paddingHorizontal: '4%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: '4%'
    },
    searchIcon: {
        width: 20,
        height: 20,
        tintColor: 'black'
    },
    btmContainer: {
        backgroundColor: 'red',
        position: 'absolute',
        bottom: 0,
        right: 0,
        left: 0,
        paddingVertical: '2%',
        paddingHorizontal: '4%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    cartbtn: {
        backgroundColor: Colors.white,
        paddingHorizontal: '3%',
        paddingVertical: '2%',
        borderRadius: 5,
        borderWidth: 1,
        borderColor: Colors.light_gery,
        elevation: 2
    },
    addBtn: {
        borderWidth: 1,
        // paddingHorizontal: '6%',
        width: 90,
        paddingVertical: '4%',
        alignItems: 'center',
        justifyContent: 'center',
        // height:40,
        borderRadius: 5,
        borderColor: Colors.grey,
        backgroundColor: Colors.light_gery,
        flexDirection: 'row',
        alignSelf:'flex-end',
        marginTop:'4%'
    },
    modifyBtn: {
        borderWidth: 1,
        paddingHorizontal: '2%',
        width: 90,
        paddingVertical: '1.5%',
        // height:40,
        borderRadius: 5,
        borderColor: Colors.grey,
        backgroundColor: Colors.light_gery,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        alignSelf:'flex-end',
        marginTop:'4%'
    },
    plusBtn: {
        fontFamily: Font_Family.NunitoSans_ExtraBold,
        fontSize: 24
    },
})