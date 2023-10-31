import { StyleSheet } from 'react-native'
import { Colors } from '../../Utils/Colors'
import { Font_Family } from '../../Utils/Fonts'


export const styles = StyleSheet.create({
    bodyContent: {
        flex: 1,
        paddingHorizontal: '4%',
        marginVertical: '4%'
    },
    listContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: '6%',
        overflow: 'hidden'
    },
    modifyBtn: {
        borderWidth: 1,
        paddingHorizontal: '3%',
        width: 80,
        paddingVertical: '1%',
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
    innerContent: {
        width: '42%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    footerContainer: {
        marginVertical: '4%',
    },
    roomContainer: {
        backgroundColor: Colors.light_gery,
        borderRadius: 5,
        paddingVertical: '2%'
    },
    placeBtn: {
        alignSelf: 'center',
        marginTop: '10%',
        paddingVertical: '4%',
        paddingHorizontal: '4%',
        borderRadius: 5
    }
})