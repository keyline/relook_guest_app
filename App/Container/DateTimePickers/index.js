import { View, Text } from 'react-native'
import React from 'react'
import DateTimePicker from '@react-native-community/datetimepicker';

const DateTimePickers = ({ value, mode, onConfirm, minimumDate, disabled }) => {
    return (
        <View>
            <DateTimePicker
                value={value}
                onChange={(date) => onConfirm(date)}
                // disabled={true}
                minimumDate={minimumDate ? minimumDate : null}
                mode={mode}
            />
        </View>
    )
}

export default DateTimePickers