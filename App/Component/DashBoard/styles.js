import { Dimensions, StyleSheet } from "react-native";
import { Font_Family } from "../../Utils/Fonts";
import { Colors } from "../../Utils/Colors";

const { width, height } = Dimensions.get('window')

export const styles = StyleSheet.create({
    bannerimg: {
        width: '100%',
        height: 150,
        // resizeMode:'contain'
    },
    bodyContent: {
        flex: 1,
        paddingHorizontal: '4%',
        marginTop: '2%',
        paddingVertical: '6%',
        paddingBottom: 10,
        backgroundColor: Colors.white,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20
    },
    listContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        borderColor: Colors.black,
        // borderWidth: 1,
        borderRadius: 10,
        width: '100%',
        // height: 180,
        height: height * 0.2,
        alignSelf: 'center',
        overflow: 'hidden'
        // borderRadius: 10,
        // marginBottom: '5%'
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
    listLeftContent: {
        width: '50%',
        height: '100%'
    },
    listimg: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
        // borderRadius: 10
    },
    listRightContent: {
        // width: '50%',
        height: '100%',
        width: '50%',
        // height:height*0.07,
        padding: '8%',
        overflow: 'hidden'
    },
    listbtn: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: Colors.white,
        paddingVertical: '4%',
        paddingHorizontal: '10%',
        justifyContent: 'space-between',
        marginTop: '20%',
        borderRadius: 30
    },
    btnArrow: {
        width: 20,
        height: 20,
        tintColor: Colors.white,
    },
    flexSpacebtwn: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        // width:'100%'
    },
    locationText: {
        width: '70%'
    },
    locationtxt: {
        fontFamily: Font_Family.NunitoSans_Regular,
        color: Colors.black
    },
    flex: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    arrow: {
        width: 15,
        height: 15,
        tintColor: Colors.them_color
    }
})