import { StyleSheet } from 'react-native'
import { Colors } from '../../Utils/Colors'


export const styles = StyleSheet.create({
    bodyContent: {
        flex:1,
        paddingHorizontal: '4%',
        marginVertical: '4%'
    },
    headingContent: {
        alignItems: 'center',
        marginTop: '6%',
        // borderWidth: 1
    },
    logo: {
        width: 80,
        height: 80,
        borderRadius: 40
    },
    separator: {
        height: 1,
        backgroundColor: 'gray',
    },
    menuContainer: {
        flex: 1,
        // marginHorizontal: '8%',
        marginTop:'2%',
        marginBottom: '4%'
    },
    listcontent: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: '4%',
        paddingHorizontal: '2%'
    },
    leftcontent: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    icon: {
        width: 24,
        height: 24,
        resizeMode: 'contain',
        tintColor: Colors.grey
    },
    arrowicon: {
        width: 15,
        height: 15,
        resizeMode: 'contain',
        tintColor: Colors.grey
    },
    boldtxt: {
        fontWeight: 'bold',
        color: Colors.grey,
        marginLeft: 15,
        // fontSize:16
    },
    border: {
        width: '60%',
        alignSelf:'center',
        borderWidth: 0.5,
        borderColor: Colors.them_color,
        marginVertical: '5%'
    }
})