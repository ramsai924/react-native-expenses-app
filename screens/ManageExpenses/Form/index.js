import { View, Text, StyleSheet, Button, Platform } from 'react-native'
import React, { useState } from 'react'
import Field from '../../../components/UI/Field'
import AndroidDatePicker from '../../../components/UI/Andriod/DatePicker';
import IOSDatePicker from '../../../components/UI/IOS/DatePicker';
// // import DateTimePicker from 'react-native-ui-datepicker';
// import dayjs from 'dayjs';

const ManageExpenseForm = ({ formValues, onChangeHandler }) => {
  return (
    <View style={styles.container}>
      <View>
        <Field 
            label={'Title'} 
            fieldConfig={{
                multiline: true,
                placeholder: 'Enter title',
                onChangeText:(value) => onChangeHandler('title', value),
                value: formValues.title.value
            }}
            isValid={formValues.title.isValid}
        />
      </View>
      <View style={styles.inputHostizontal}>
        {
            Platform.OS === 'android' && (
                <AndroidDatePicker 
                    label='Date'
                    date={new Date(formValues.date.value)}
                    onChange={(value) => onChangeHandler('date', new Date(value).toISOString())}
                />
            )
        }
        {
            Platform.OS === 'ios' && (
                <IOSDatePicker 
                    label='Date'
                    date={new Date(formValues.date.value)}
                    onChange={(value) => onChangeHandler('date', new Date(value).toISOString())}
                />
            )
        }
        <Field 
            label={'Amount'}  
            fieldConfig={{
                placeholder: 'eg. 100',
                onChangeText:(value) => onChangeHandler('amount', value),
                keyboardType:"numeric",
                value: formValues.amount.value?.toString()
            }}
            isValid={formValues.amount.isValid}
        />
      </View>
    </View>
  )
}

export default ManageExpenseForm

const styles = StyleSheet.create({
    container: {
        gap: 8
    },
    inputHostizontal: {
        flexDirection: 'row',
        gap: 8
    }
})