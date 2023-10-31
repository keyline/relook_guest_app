import { View, Text } from 'react-native'
import React, { useContext } from 'react'
import DropDownPicker from 'react-native-dropdown-picker'
import { styles } from './styles'
import { Colors } from '../../Utils/Colors'
import AuthContext from '../../Services/Context'

const CustomDropDown = ({ name, open, headingColor, listMode, value, onChangeValue, searchable, items, setOpen, setValue, setItems, error }) => {

    const context = useContext(AuthContext);
    const { appData, accesstoken, isLogin } = context.allData

    return (
        <View style={styles.container}>
            {(name) && (
                <Text style={[styles.text, { color: headingColor ? headingColor : appData?.color_theme }]}>{name} :</Text>
            )}
            <DropDownPicker
                open={open}
                value={value}
                items={items}
                setOpen={setOpen}
                setValue={setValue}
                setItems={setItems}
                onSelectItem={val => onChangeValue(val)}
                placeholder={`Select ` + name}
                placeholderStyle={styles.placeholderStyle}
                searchable={searchable ? searchable : false}
                listMode={listMode ? listMode : 'SCROLLVIEW'}
                searchPlaceholder={`Search ${name}`}
                style={[styles.dropdown,{borderColor:appData?.color_theme}]}
                autoScroll={true}
                dropDownDirection={'AUTO'}
                dropDownContainerStyle={styles.dropDownContainerStyle}
                scrollViewProps={{
                    nestedScrollEnabled: true
                }}
                flatListProps={{
                    nestedScrollEnabled: true,
                    initialNumToRender: 5
                }}
            />
            {error && (
                <Text style={styles.error}>{error}</Text>
            )}
        </View>
    )
}

export default CustomDropDown