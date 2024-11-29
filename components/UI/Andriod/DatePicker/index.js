import { View, Text, Pressable, StyleSheet } from 'react-native'
import React from 'react'
import { DateTimePickerAndroid } from '@react-native-community/datetimepicker';
import dayjs from 'dayjs';


const AndroidDatePicker = ({ date=new Date(), mode='date', onChange=() => {}, format='DD MMM YYYY', label }) => {

    const showMode = (currentMode) => {
        DateTimePickerAndroid.open({
            value: date,
            onChange:(_, date) => onChange(date),
            mode: currentMode,
            is24Hour: true,
        });
    };

    const showDatepicker = () => {
        showMode(mode);
    }

  return (
    <Pressable onPress={showDatepicker} style={styles.container}>
      <Text>{label}</Text>
      <View style={styles.datePicker}>
        <Text>{dayjs(date).format(format)}</Text>
      </View>
    </Pressable>
  )
}

export default AndroidDatePicker

const styles = StyleSheet.create({
    container: {
        gap: 5,
        flex: 1,
    },
    datePicker: {
        padding: 10,
        fontSize: 16,
        borderWidth: 1,
        borderColor: 'black',
        borderRadius: 4,
        opacity: 0.5,
    }
})