import { StyleSheet } from 'react-native'
import { Font_Family } from '../../Utils/Fonts'
import { Colors } from '../../Utils/Colors'


export const styles = StyleSheet.create({
    bodyContent: {
        flex: 1,
        paddingHorizontal: '4%',
        // marginVertical: '1%'
    },
    listContainer: {
        // flexDirection: 'row',
        // alignItems: 'center',
        paddingVertical: '2%',
        // width:'100%'
        justifyContent: 'space-between',
        paddingRight: '4%',
        overflow: 'hidden'
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
        marginLeft: 20,
        // width:'60%'
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
        borderRadius: 5,
        alignItems: 'center',
        alignSelf: 'flex-end'
    },
    btntext: {
        fontFamily: Font_Family.NunitoSans_ExtraBold,
        color: Colors.highlight
    },
    flex: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    arrow: {
        width: 15,
        height: 15
    },
    lightText: {
        fontFamily: Font_Family.NunitoSans_Regular,
        color: Colors.grey,
        fontSize: 12
    },
    itemsContainer: {
        // borderBottomWidth: 1,
        // borderColor: Colors.light_gery
        // flexDirection: 'row',
        // alignItems: 'center',
        // justifyContent: 'space-between',
        paddingHorizontal: '2%',
        paddingVertical: '2%'
    },
    addBtn: {
        borderWidth: 1,
        // paddingHorizontal: '6%',
        width: 90,
        paddingVertical: '2%',
        alignItems: 'center',
        justifyContent: 'center',
        // height:40,
        borderRadius: 5,
        borderColor: Colors.grey,
        backgroundColor: Colors.light_gery,
        flexDirection: 'row'
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
    modifyBtn: {
        borderWidth: 1,
        paddingHorizontal: '2%',
        width: 90,
        paddingVertical: '0.8%',
        // height:40,
        borderRadius: 5,
        borderColor: Colors.grey,
        backgroundColor: Colors.light_gery,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    plusBtn: {
        fontFamily: Font_Family.NunitoSans_ExtraBold,
        fontSize: 24
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
    }
})