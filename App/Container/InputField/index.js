import { View, Text, TextInput, Image, TouchableOpacity } from 'react-native'
import React, { memo, useContext } from 'react'
import { ImagePath } from '../../Utils/ImagePath'
import { styles } from './styles'
import { CommonStyle } from '../../Utils/CommonStyle'
import { Colors } from '../../Utils/Colors'
import AuthContext from '../../Services/Context'

const InputField = ({ name, headingColor, width, value, keyboardType, secureTextEntry, multiline, onChangeText, editable, leftIcon, rightIcon, rightonPress, placeholder, error }) => {

    const context = useContext(AuthContext);
    const appData = context.allData.appData

    return (
        <View style={[styles.container, { width: width ? width : '100%' }]}>
            {(name) && (
                <Text style={[CommonStyle.boldtext, { color: headingColor ? headingColor : appData.color_title }]}>{name} :</Text>
            )}
            <View style={[styles.inputContent, { borderBottomColor: appData.color_theme }]}>
                {(leftIcon) && (
                    <Image source={leftIcon} style={[styles.leftlogo, { marginRight: '2%', tintColor: appData.color_theme }]} />
                )}
                <TextInput
                    value={value}
                    onChangeText={(e) => onChangeText(e)}
                    placeholder={placeholder ? placeholder : `Enter ${name}`}
                    editable={editable}
                    multiline={multiline ? multiline : false}
                    secureTextEntry={secureTextEntry ? secureTextEntry : false}
                    keyboardType={keyboardType ? keyboardType : 'default'}
                    style={styles.input}
                    placeholderTextColor={'grey'}
                />
                {(rightIcon) && (
                    <TouchableOpacity onPress={() => rightonPress()} disabled={rightonPress ? false : true} activeOpacity={0.5} style={styles.rightIcon}>
                        <Image source={rightIcon} style={[styles.leftlogo, { tintColor: appData.color_theme }]} />
                    </TouchableOpacity>
                )}
            </View>
            {(error) && (
                <Text style={CommonStyle.errortxt}>{error}</Text>
            )}
        </View>
    )
}

export default InputField