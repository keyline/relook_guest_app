import { StyleSheet } from "react-native";
import { Colors } from "../../Utils/Colors";
import { Font_Family } from "../../Utils/Fonts";

export const styles = StyleSheet.create({
    starContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: Colors.them_color,
        justifyContent: 'center',
        borderRadius: 2,
        paddingVertical: '0.5%',
        paddingHorizontal: 8
        // borderWidth: 0.5,
        // width: '15%',
    },
    star: {
        width: 15,
        height: 15,
        tintColor: Colors.white
    },
    ratingText: {
        fontFamily: Font_Family.NunitoSans_ExtraBold,
        color: Colors.white
    },
})