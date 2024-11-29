import { View, Text, TextInput, StyleSheet, DatePickerIOS } from 'react-native'
import React from 'react'

const Field = ({ label, fieldConfig, isValid=true, labelStyles, inputStyle }) => {

    const inputStyles = [styles.field, inputStyle]

    if(fieldConfig && fieldConfig.multiline){
        inputStyles.push(styles.mutiline)
    }

    if(!isValid){
        inputStyles.push(styles.errorfield)
    }
  return (
    <View style={[styles.container]}>
      <Text style={[styles.label, labelStyles, !isValid && styles.errorlabel]}>{label}</Text>
      <TextInput style={inputStyles} {...fieldConfig} />
    </View>
  )
}

export default Field

const styles = StyleSheet.create({
    container:{
        gap: 4,
        flex: 1
    },
    label: {
        fontSize: 14,
        color: 'black'
    },
    errorlabel: {
        color: 'red'
    },
    field: {
        padding: 9,
        fontSize: 16,
        borderWidth: 1,
        borderColor: 'black',
        borderRadius: 4,
    },
    errorfield:{
        borderColor: 'red'
    },
    mutiline: {
        minHeight: 100,
        textAlignVertical: 'top',
    }
})