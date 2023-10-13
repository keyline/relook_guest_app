import { StyleSheet } from "react-native";
import { Font_Family } from "../../Utils/Fonts";
import { Colors } from "../../Utils/Colors";


export const styles = StyleSheet.create({
    bannerimg: {
        width: '100%',
        height: 150,
        // resizeMode:'contain'
    },
    bodyContent: {
        flex: 1,
        paddingHorizontal: '4%',
        marginVertical: '4%',
        paddingBottom: 10
    },
    listContainer: {
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
    listimg: {
        width: '100%',
        height: 120,
        resizeMode: 'stretch',
        borderRadius: 10
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