import { StyleSheet } from 'react-native';


export const styles = StyleSheet.create({
    bodyContent: {
        flex: 1,
        paddingHorizontal: '4%',
        marginVertical: '4%'
    },
    headingContent: {
        // alignItems: 'center',
        marginTop: '4%',
        // borderWidth: 1,
        alignSelf: 'center'
    },
    logo: {
        width: 120,
        height: 120,
        borderRadius: 60
    },
    editContainer: {
        position: 'absolute',
        bottom: -12,
        right: 0,
        zIndex: 99
    },
    editicon: {
        width: 35,
        height: 35
    },
    inputContent:{
        paddingHorizontal:'4%',
        marginVertical:'8%'
    }
})