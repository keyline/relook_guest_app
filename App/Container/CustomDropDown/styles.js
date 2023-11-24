import { StyleSheet } from 'react-native'
import { Colors } from '../../Utils/Colors'
import { Font_Family } from '../../Utils/Fonts'


export const styles = StyleSheet.create({
    container: {
        // flex: 1,
        marginTop: '4%',
        // zIndex:1
    },
    text: {
        color: Colors.textColor,
        fontFamily: Font_Family.NunitoSans_Bold
    },
    dropdown: {
        // flex: 1,
        borderWidth: 1.5,
        // borderBottomWidth: 1.5,
        borderColor: Colors.them_color,
        // paddingVertical: -20,
        // height:30,
        paddingHorizontal: '6%',
        width: '102%',
        alignSelf: 'center',
        marginTop: '1%',
        borderRadius: 30
    },
    placeholderStyle: {
        color: Colors.grey
    },
    dropDownContainerStyle: {
        // flex: 1,
        // position: 'relative',
        // top: 0,
        // bottom:0,
        borderWidth: 1,
        borderTopWidth: 0,
        zIndex: 9999,
        backgroundColor: Colors.white,
        borderColor: Colors.black,
    },
    error: {
        color: 'red',
        paddingLeft: '3%',
        marginTop: '1%'
    }
})