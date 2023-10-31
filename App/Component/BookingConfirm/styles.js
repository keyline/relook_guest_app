import { StyleSheet } from 'react-native'
import { Colors } from '../../Utils/Colors'


export const styles = StyleSheet.create({
    bodyContent: {
        flex: 1,
        marginTop: '10%'
    },
    logo: {
        width: 200,
        height: 200,
        alignSelf: 'center',
        marginTop: '4%'
    },
    border: {
        width: '90%',
        borderWidth: 0.5,
        alignSelf: 'center',
        borderColor: Colors.grey,
        marginVertical: '2%'
    },
    infoContent: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: '4%',
        paddingVertical: '4%'
    },
    itemContainer: {
        width: '50%',
        alignItems: 'center',
        borderColor: Colors.grey
    }
})