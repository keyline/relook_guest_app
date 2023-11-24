import { StyleSheet, Dimensions } from "react-native";
import { Colors } from "../../Utils/Colors";
import { Font_Family } from "../../Utils/Fonts";
const screenHeight = Dimensions.get('window').height;


export const styles = StyleSheet.create({
    mainContent: {
        flex: 1,
        backgroundColor: Colors.white,
        paddingHorizontal: '2%',
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
        overflow: 'hidden',
        // marginBottom: '18%',
        // marginHorizontal: '2%'
    },
    img: {
        width: '100%',
        height: 140,
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
        borderColor: Colors.white,
        marginVertical: '4%'
    },
    inputContent: {
        paddingHorizontal: '4%',
        paddingVertical: '4%',
        marginTop: '4%',
        backgroundColor: Colors.white,
        borderRadius: 10,
        marginBottom: '18%'
    },
    dropContent: {
        flexDirection: 'row',
        // alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: '2%'
    },
    btnContainer: {
        position: 'absolute',
        bottom: 0,
        right: 0,
        left: 0,
        // width: '90%',
        // alignSelf: 'center',
        backgroundColor: Colors.highlight,
        borderTopWidth: 2,
        borderColor: Colors.them_color,
        height: '8%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: '4%'
    },
    btntext: {

    },
    btn: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: Colors.them_color,
        paddingHorizontal: '6%',
        paddingVertical: '2%',
        borderRadius: 20
    },
    modalStyle: {
        margin: 0,
    },
    modalContainer: {
        flex: 1,
        // position: 'absolute',
        width: '90%',
        alignSelf: 'center',
        // bottom: 0,
        // left: 0,
        backgroundColor: Colors.white,
        paddingHorizontal: '4%',
        paddingVertical: '4%',
        borderRadius: 15,
        // borderTopWidth:4,
        // borderColor:Colors.them_color,
        // borderTopRightRadius: 15,
        // borderTopLeftRadius: 15,
        maxHeight: screenHeight * 0.46
    },
    otp: {
        width: '90%',
        alignSelf: 'center',
        // height: '30%',
        marginBottom: '6%'
    },
    underlineStyleBase: {
        width: 50,
        height: 50,
        borderWidth: 1.5,
        // borderBottomWidth: 1.5,
        borderColor: Colors.grey,
        color: Colors.black,
        fontSize: 20
    },
    underlineStyleHighLighted: {
        borderColor: Colors.black,
    },
    resendContainer: {
        // flex:1,
        marginTop: '2%',
        // marginBottom: '2%',
        alignSelf: 'center'
    },
    resendText: {
        fontFamily: Font_Family.NunitoSans_Bold,
        color: Colors.them_color,
        textDecorationLine: 'underline'

    },
    resendTimer: {
        fontFamily: Font_Family.NunitoSans_Bold,
        color: Colors.black,
        textDecorationLine: 'underline'
    }
})