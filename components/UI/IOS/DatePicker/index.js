import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import DateTimePicker from '@react-native-community/datetimepicker';

const IOSDatePicker = ({ date=new Date(), mode='date', onChange=() => {}, format='DD MM YYYY', label   }) => {
  return (
    <View style={styles.container}>
      <Text>{label}</Text>
        <DateTimePicker 
            mode={mode}
            value={date}
            is24Hour={true}
            onChange={(_, date) => onChange(date)}
            dateFormat="dayofweek day month"
            style={styles.datePicker}
            placeholderText='Date'
        />
    </View>
  )
}

export default IOSDatePicker

const styles = StyleSheet.create({
    container: {
        gap: 4,
        flex: 1,
    },
    datePicker: {
        fontSize: 16,
        borderWidth: 1,
        borderColor: 'black',
        borderRadius: 4,
        opacity: 0.5,
        alignSelf: 'flex-start',
        backgroundColor: 'white',
        minWidth: '100%',
        padding: 0,
        margin: 0,
        
    }
})