import { StyleSheet,Dimensions } from "react-native";
import { Colors } from "../../Utils/Colors";
const screenHeight = Dimensions.get('window').height;


export const styles = StyleSheet.create({
    bodyContent: {
        flex: 1,
        marginTop: '2%',
        // marginBottom: '20%',
        marginHorizontal: '2%'
    },
    imgBanner: {
        width: '100%',
        height: 180,
        resizeMode: 'stretch',
        // alignSelf: 'center',
        //    borderRadius:5 
    },
    img: {
        width: '100%',
        height: 220,
        resizeMode: 'stretch',
        // alignSelf: 'center',
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
        borderWidth: 1,
        marginBottom: '4%',
        borderRadius: 5,
        borderColor: Colors.light_gery,
        paddingVertical: '2%',
        // paddingHorizontal: '2%',
        // elevation: 0.5
    },
    btnContent: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: 5,
        paddingHorizontal: 10
    },
    bookbtn: {
        paddingHorizontal: 20,
        paddingVertical: 5,
        borderRadius: 5
    },
    listHeading: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: '4%',
        paddingVertical: '2%'
    },
    featureContent: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        paddingHorizontal: '2%',
        paddingTop: '4%'
    },
    bordernew: {
        borderWidth: 0.5,
        borderColor: Colors.light_gery,
        marginVertical: '2%'
    },
    modalStyle: {
        margin: 0,
    },
    modalContainer: {
        flex: 1,
        position: 'absolute',
        width: '100%',
        alignSelf: 'center',
        bottom: 0,
        // left: 0,
        backgroundColor: Colors.white,
        paddingHorizontal: '4%',
        paddingVertical: '4%',
        // borderTopWidth:4,
        // borderColor:Colors.them_color,
        borderTopRightRadius: 15,
        borderTopLeftRadius: 15,
        maxHeight:screenHeight*0.7
    },
    itemContent: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingTop: '2%',
        marginLeft: '3%'
    },
    dot: {
        width: 10,
        height: 10,
        borderRadius: 10,
        backgroundColor: Colors.black
    },

})