import { StyleSheet } from 'react-native'
import { Colors } from '../../Utils/Colors'
import { Font_Family } from '../../Utils/Fonts'


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
    },
    bodyContent: {
        flex: 1,
        paddingHorizontal: '3%',
        marginVertical: '4%'
    },
    icon: {
        width: '60%',
        height: 70,
        alignSelf: 'center',
        resizeMode: 'contain',
        tintColor: Colors.white,
        marginVertical: '2%'
    },
    midContent: {
        backgroundColor: Colors.white,
        paddingHorizontal: '2%',
        paddingVertical: '4%',
        borderRadius: 10,
        marginBottom:'8%'
        // borderTopLeftRadius: 10,
        // borderTopRightRadius: 10,

    },
    listContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: '2%',
        paddingHorizontal: '2%',
        overflow: 'hidden',
        paddingVertical: '2%',
        // borderBottomWidth: 0.5,
        borderColor: Colors.grey
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
    innerContent: {
        width: '30%',
        // flexDirection: 'row',
        alignItems: 'center',
        // justifyContent: 'space-between',
        // backgroundColor: 'blue',
        // alignSelf: 'center'
    },
    footerContainer: {
        marginVertical: '4%',
    },
    roomContainer: {
        backgroundColor: Colors.light_gery,
        borderRadius: 5,
        paddingVertical: '2%',
        borderWidth: 1.5
    },
    placeBtn: {
        alignSelf: 'center',
        marginTop: '10%',
        paddingVertical: '3%',
        paddingHorizontal: '8%',
        borderRadius: 30
    },
    headingContainer: {
        // backgroundColor: Colors.light_gery,
        paddingVertical: '2.5%',
        paddingHorizontal: '2%',
        // borderRadius: 5,
        marginBottom: '3%',
        borderBottomWidth: 1,
    },
    flex: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    border: {
        borderWidth: 0.8,
        borderColor: Colors.grey,
        marginVertical: '2%'
    },
    orderBtmContainer: {
        position: 'absolute',
        bottom: 0,
        right: 0,
        left: 0,
        backgroundColor: Colors.white,
        alignItems: 'center',
        paddingVertical: '2.5%',
        borderTopWidth: 1,
        borderColor: Colors.light_gery
    },
    orderBtm: {
        paddingHorizontal: '4%',
        paddingVertical: '2.5%',
        borderRadius: 30
    }
})