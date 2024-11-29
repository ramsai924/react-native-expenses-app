import { View, StyleSheet } from 'react-native'
import React from 'react'
import ExpensesHeader from './Header'
import ExpensesList from './List'

const Expenses = ({ expenses, headerText }) => {
  return (
    <View style={styles.container}>
      <ExpensesHeader expenses={expenses} headerText={headerText} />
      <ExpensesList expenses={expenses}/>
    </View>
  )
}

export default Expenses

const styles = StyleSheet.create({
    container: {
      flex: 1,
      paddingHorizontal: 18,
      paddingTop: 18,
      paddingBottom: 0
    }
})