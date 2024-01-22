import { StyleSheet } from "react-native";
import { Colors } from "../Utils/Colors";
import { Font_Family } from "../Utils/Fonts";

export const styles = StyleSheet.create({
    drawerTopContent: {
        marginVertical: '8%',
        alignItems: 'center',
    },
    drawerLogo: {
        width: 80,
        height: 80,
        borderRadius: 40,
        resizeMode: 'cover',
        // tintColor: Colors.light_blue
    },
    drawerNametext: {
        // fontFamily: Font_Family.NunitoSans_Bold,
        marginVertical: '5%',
        fontSize: 16,
        fontWeight: 'bold',
        color: Colors.black
    },
    border: {
        borderColor: Colors.them_color,
        borderWidth: 0.8,
        width: '90%',
        alignSelf: 'center'
    },
    menuText: {
        // fontFamily: Font_Family.NunitoSans_Bold,
        // fontSize:16
        fontWeight: 'bold',
        color: Colors.grey
    },
    contactContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '95%',
        borderTopWidth: 1.5,
        borderTopColor: Colors.them_color,
        alignSelf: 'center',
        paddingHorizontal: '4%',
        paddingVertical: '4%'
    },
    contactlogo: {
        width: 25,
        height: 25
    },
    versionContainer: {
        alignSelf: 'center',
        paddingVertical: '4%'
    },
    versionText: {
        fontFamily: Font_Family.NunitoSans_Regular,
        fontSize: 12
    }
})