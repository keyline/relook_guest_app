import { StyleSheet } from 'react-native'
import { Colors } from '../../Utils/Colors'


export const styles = StyleSheet.create({
    container: {
        // flex: 1,
        marginVertical: '2%',
        // zIndex:1
    },
    text: {
        color: Colors.textColor,
        fontWeight: 'bold'
    },
    dropdown: {
        // flex: 1,
        borderWidth: 0,
        borderBottomWidth: 1.5,
        borderColor: Colors.them_color,
        marginVertical: -2,
        paddingHorizontal: '4%',
        width: '102%',
        alignSelf:'center'
    },
    placeholderStyle: {
        color: Colors.grey
    },
    dropDownContainerStyle: {
        // flex: 1,
        position: 'relative',
        top: 0,
        // bottom:0,
        borderWidth: 1,
        borderTopWidth: 0,
        // zIndex: 9999,
        backgroundColor:Colors.light_gery,
        borderColor: Colors.them_color,
    },
    error: {
        color: 'red',
        paddingLeft: '3%',
        marginTop: '1%'
    }
})