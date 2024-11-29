import { View, Text, StyleSheet } from 'react-native'
import React from 'react'

const ExpensesHeader = ({ headerText, expenses }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{headerText}</Text>
      <Text style={[styles.text, styles.amount]}>${expenses.reduce((acc, cur) => acc = acc + Number(cur.amount), 0)}</Text>
    </View>
  )
}

export default ExpensesHeader

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 14,
        borderWidth: 2,
        borderColor: '#949cf1',
        backgroundColor: '#a8ade7',
        borderRadius: 4
    },
    text: {
        fontSize: 14,
        fontWeight: 'bold',
        color: 'white'
    },
    amount: {
        fontSize: 18,
        color: '#3040ef'
    }
})