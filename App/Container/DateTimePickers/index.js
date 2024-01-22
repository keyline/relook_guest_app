import { View, Text, Platform } from 'react-native'
import React from 'react'
import DateTimePicker from '@react-native-community/datetimepicker';

const DateTimePickers = ({ value, mode, onConfirm, minimumDate, maximumDate, disabled }) => {
    return (
        <View>
            <DateTimePicker
                value={value}
                onChange={(date) => onConfirm(date)}
                // disabled={true}
                minimumDate={minimumDate ? minimumDate : null}
                maximumDate={maximumDate ? maximumDate : null}
                mode={mode}
                display={Platform.OS == 'ios' ? 'spinner' : 'default'}
            />
        </View>
    )
}

export default DateTimePickers