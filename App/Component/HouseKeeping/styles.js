import { StyleSheet } from 'react-native';
import { Font_Family } from '../../Utils/Fonts';
import { Colors } from '../../Utils/Colors';


export const styles = StyleSheet.create({
    mainContent: {
        flex: 1,
        backgroundColor: Colors.white,
        paddingHorizontal: '3%',
        marginTop: '2%',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        paddingBottom: '2%',
        paddingTop: '6%',
        // width: '100%'
    },
    bodyContainer: {
        flex: 1,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        overflow: 'hidden',
        // paddingBottom:100
        // paddingVertical:'2%'
        // paddingHorizontal: '2%',
        // marginVertical: '1%'
    },
    bannerImage: {
        width: '100%',
        height: 120,
        resizeMode: 'cover',
        // alignSelf: 'center',
        //    borderRadius:5 
    },
    icon: {
        width: '50%',
        height: 50,
        alignSelf: 'center',
        resizeMode: 'contain',
        marginVertical: '2%'
    },
    bodyContent: {
        flex: 1,
        marginHorizontal: '2%',
        paddingHorizontal: '2%',
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        marginTop: '0%',
        paddingBottom: 65,
        backgroundColor: Colors.white
    },
    listContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: '3%',
        // width:'100%',
        overflow: 'hidden'

    },
    imgcontainer: {
        width: '20%'
    },
    img: {
        width: '100%',
        height: 50,
        resizeMode: 'contain'
    },
    detailscontent: {
        marginLeft: '1%',
        width: '75%',
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-between'
        // backgroundColor: 'blue'
    },
    nametext: {
        fontFamily: Font_Family.NunitoSans_ExtraBold,
        color: Colors.them_color,
        fontSize: 14
    },
    desctext: {
        fontFamily: Font_Family.NunitoSans_Regular,
        fontSize: 12,
        color: Colors.grey
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
        marginBottom: '4%',
        borderWidth: 1.5,
        borderColor: Colors.white
        // marginTop: '2%'
    },
    searchIcon: {
        width: 20,
        height: 20,
        tintColor: Colors.white
    },
    btmContainer: {
        backgroundColor: 'red',
        position: 'absolute',
        bottom: 0,
        right: 0,
        left: 0,
        paddingVertical: '3%',
        paddingHorizontal: '4%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderTopWidth:1,
        borderColor:Colors.light_gery,
        // elevation:20
    },
    cartbtn: {
        backgroundColor: Colors.white,
        paddingHorizontal: '4%',
        paddingVertical: '2.5%',
        borderRadius: 30,
        borderWidth: 1,
        borderColor: Colors.light_gery,
        elevation: 2
    },
    addBtn: {
        borderWidth: 1.2,
        // paddingHorizontal: '6%',
        width: 90,
        paddingVertical: '2%',
        alignItems: 'center',
        justifyContent: 'center',
        // height:40,
        borderRadius: 20,
        borderColor: Colors.grey,
        backgroundColor: Colors.white,
        flexDirection: 'row'
    },
    modifyBtn: {
        borderWidth: 1.2,
        paddingHorizontal: '6%',
        width: 90,
        paddingVertical: '0.4%',
        // height:40,
        borderRadius: 20,
        borderColor: Colors.grey,
        backgroundColor: Colors.white,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    plusBtn: {
        fontFamily: Font_Family.NunitoSans_ExtraBold,
        fontSize: 24
    },
})