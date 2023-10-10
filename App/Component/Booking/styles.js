import { StyleSheet } from "react-native";
import { Colors } from "../../Utils/Colors";
import { Font_Family } from "../../Utils/Fonts";


export const styles = StyleSheet.create({
    bodyContent: {
        marginTop: '2%',
        marginBottom:'20%',
        marginHorizontal: '4%'
    },
    img: {
        width: '99%',
        height: 180,
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
        marginVertical:'2%'
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
    border:{
        borderWidth:1,
        borderColor:Colors.them_color,
        marginVertical:'4%'
    },
    inputContent:{
        paddingHorizontal:'4%'
    },
    dropContent:{
        flexDirection: 'row',
        // alignItems: 'center',
        justifyContent: 'space-between',
        marginTop:'2%'
    },
    btnContainer:{
        position:'absolute',
        bottom:0,
        right:0,
        left:0,
        backgroundColor:Colors.highlight,
        borderTopWidth:2,
        borderColor:Colors.them_color,
        height:'8%',
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
        paddingHorizontal:'4%'
    },
    btntext:{
    },
    btn:{
        backgroundColor:Colors.them_color,
paddingHorizontal:'6%',
paddingVertical:'2%',
borderRadius:5
    }
})