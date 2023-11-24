import { StyleSheet, Dimensions } from "react-native";
import { Colors } from "../../Utils/Colors";
const screenHeight = Dimensions.get('window').height;


export const styles = StyleSheet.create({
    mainContent: {
        flex: 1,
        backgroundColor: Colors.white,
        paddingHorizontal: '4%',
        marginTop: '2%',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        paddingBottom: '2%',
        paddingTop: '6%'
    },
    bodyContent: {
        flex: 1,
        // marginTop: '2%',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        overflow: 'hidden'

        // marginBottom: '20%',
        // marginHorizontal: '2%'
    },
    imgBanner: {
        width: '100%',
        height: 140,
        resizeMode: 'stretch',
        // alignSelf: 'center',
        //    borderRadius:5 
    },
    img: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
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
        marginTop: '2%',
        flexDirection: 'row',
        alignItems: 'center'
    },
    location: {
        width: 25,
        height: 30,
        tintColor: Colors.white
    },
    locationContent: {
        marginHorizontal: '2%'
    },
    border: {
        borderWidth: 0.6,
        borderColor: Colors.them_color,
        marginVertical: '4%'
    },
    inputContent: {
        paddingHorizontal: '4%'
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
        maxHeight: screenHeight * 0.7
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
    listContainer: {
        borderWidth: 1,
        marginBottom: '4%',
        borderRadius: 10,
        borderColor: Colors.white,
        paddingVertical: '3%',
        backgroundColor: Colors.white,
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        overflow: 'hidden'
        // paddingHorizontal: '2%',
        // elevation: 0.5
    },
    listLeftContent: {
        width: '35%',
        justifyContent: 'center',
        alignItems: 'center'
    },
    listRightContent: {
        width: '60%',
        marginLeft: '2%'
    },
    imageContainer: {
        backgroundColor: Colors.white,
        width: 100,
        height: 100,
        borderRadius: 50,
        overflow: 'hidden'
    },
    noimage: {
        width: '100%',
        height: '100%',
    },
    listbtn: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: Colors.white,
        width: '50%',
        paddingVertical: '3%',
        paddingHorizontal: '6%',
        justifyContent: 'space-between',
        marginTop: '4%',
        borderRadius: 30
    },
    btnArrow: {
        width: 20,
        height: 20,
        tintColor: Colors.white,
    },
    moreContainer: {
        position: 'absolute',
        right: 8,
        top: 2
    },
    moreimage: {
        width: 20,
        height: 20
    }

})