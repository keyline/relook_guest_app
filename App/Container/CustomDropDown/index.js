import { View, Text } from 'react-native'
import React from 'react'
import DropDownPicker from 'react-native-dropdown-picker'
import { styles } from './styles'
import { Colors } from '../../Utils/Colors'

const CustomDropDown = ({ name, open, headingColor, listMode, value, onChangeValue, searchable, items, setOpen, setValue, setItems, error }) => {
    return (
        <View style={styles.container}>
            {(name) && (
                <Text style={[styles.text, { color: headingColor ? headingColor : Colors.them_color }]}>{name} :</Text>
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
                style={styles.dropdown}
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