import { StyleSheet } from 'react-native'
import { Colors } from '../../Utils/Colors'


export const styles = StyleSheet.create({
    mainContent: {
        flex: 1,
        backgroundColor: Colors.white,
        paddingHorizontal: '3%',
        marginTop: '2%',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        paddingBottom: '2%',
        paddingTop: '6%',
        // width: '100%'
    },
    bodyContent: {
        flex: 1,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        overflow: 'hidden',
        paddingHorizontal: '2%',
        paddingVertical: '4%'
    },
    prlistContainer: {
        backgroundColor: '#F9F8E8',
        borderWidth: 1,
        borderColor: '#cfad6f',
        borderRadius: 5
    },
    listContainer: {
        backgroundColor: Colors.white,
        // borderWidth: 1,
        borderColor: '#01a10d',
        borderRadius: 5,
        overflow: 'hidden'
    },
    delistContainer: {
        backgroundColor: '#F1F8F1',
        borderWidth: 1,
        borderColor: '#01a10d',
        borderRadius: 5
    },
    orlistContainer: {
        backgroundColor: '#F6F7F6',
        borderWidth: 1,
        borderColor: '#C5CAC5',
        borderRadius: 5
    },
    listHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: Colors.white,
        paddingHorizontal: '2%',
        paddingVertical: '3%'
    },
    deliverHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: '#01a10d',
        paddingHorizontal: '2%',
        paddingVertical: '2%'
    },
    processHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: '#ff9400',
        paddingHorizontal: '2%',
        paddingVertical: '2%'
    },
    orderHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: '#C5CAC5',
        paddingHorizontal: '2%',
        paddingVertical: '2%'
    },
    flex: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    arrow: {
        width: 15,
        height: 15,
        resizeMode: 'contain'
    },
    itemContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginHorizontal: '3%',
        paddingVertical: '2%',
        borderBottomWidth: 0.2
    },
    footer: {
        flexDirection: 'row',
        alignItems: 'center',
        // justifyContent: 'space-between',
        marginHorizontal: '3%',
        paddingVertical: '2.5%',
    },
    timer: {
        width: 14,
        height: 14,
        resizeMode: 'contain',
        tintColor: 'red'
    },
    border: {
        borderWidth: 0.8,
        width: '95%',
        alignSelf: 'center'
    }
})