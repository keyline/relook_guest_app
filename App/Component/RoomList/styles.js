import { StyleSheet } from "react-native";
import { Colors } from "../../Utils/Colors";


export const styles = StyleSheet.create({
    bodyContent: {
        flex:1,
        marginTop: '2%',
        // marginBottom: '20%',
        marginHorizontal: '4%'
    },
    img: {
        width: '99%',
        height: 140,
        resizeMode: 'stretch',
        alignSelf: 'center',
        //    borderRadius:5 
    },
    flex: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    flexNew: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: '2%'
    },
    locationContainer: {
        // marginTop: '1%',
        flexDirection: 'row',
        alignItems: 'center'
    },
    location: {
        width: 20,
        height: 20,
        tintColor: Colors.them_color
    },
    border: {
        borderWidth: 1,
        borderColor: Colors.them_color,
        marginVertical: '4%'
    },
    inputContent: {
        paddingHorizontal: '4%'
    },
    listContainer: {
        borderWidth: 0.5,
        marginBottom: '4%',
        // borderRadius: 5,
        borderColor: Colors.light_gery,
        paddingVertical: '2%',
        // paddingHorizontal: '2%',
        elevation: 2
    },
    btnContent:{
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-between',
        paddingVertical:10,
        paddingHorizontal:10
    },
    bookbtn:{
        paddingHorizontal:10,
        paddingVertical:5,
        borderRadius:5
    }
})