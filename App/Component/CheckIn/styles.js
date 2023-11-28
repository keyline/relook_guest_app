import { StyleSheet } from 'react-native'
import { Font_Family } from '../../Utils/Fonts'
import { Colors } from '../../Utils/Colors'


export const styles = StyleSheet.create({
    mainContent: {
        flex: 1,
        backgroundColor: Colors.white,
        paddingHorizontal: '3%',
        marginTop: '2%',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        // paddingBottom: '2%',
        paddingTop: '6%',
        // width: '100%'
    },
    bodyContent: {
        flex: 1,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        overflow: 'hidden',
        paddingHorizontal: '4%',
        paddingVertical: '6%',
        // flex:1
    },
    listContainer: {
        backgroundColor: Colors.white,
        paddingHorizontal: '2%',
        paddingVertical: '6%',
        borderRadius: 10,
        height: '30%',
        // flexDirection: 'row',
        alignItems: 'center',
        marginBottom:'5%',
        // justifyContent: 'space-between',
        width: '47%',
        elevation: 6
    },
    labelText: {
        fontFamily: Font_Family.NunitoSans_ExtraBold,
        color: Colors.highlight,
        fontSize: 16,
        marginTop: '4%',
        textAlign: 'center'
    },
    descText: {
        fontFamily: Font_Family.NunitoSans_Regular,
        color: Colors.highlight,
        fontSize: 12,
        textAlign: 'center'
    },
    icon: {
        width: '70%',
        height: '45%',
        resizeMode: 'contain',
        tintColor: Colors.highlight
    },
    checkinContainer: {
        borderColor: Colors.them_color,
        marginBottom: '10%',
        paddingHorizontal: '4%',
        // paddingVertical: '3%',
        borderRadius: 10,
        // borderWidth:1
    },
    checkinText: {
        fontFamily: Font_Family.NunitoSans_SemiBold,
        color: Colors.white,
        textAlign: 'center',
        fontSize: 18
    },
})