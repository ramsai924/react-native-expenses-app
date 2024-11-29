import { View, Text, StyleSheet, ActivityIndicator } from 'react-native'
import React from 'react'
import Expenses from '../../components/Expenses'
import { useExpensesContext } from '../../store/context'

const AllExpenses = () => {
  const { expenses, isLoadingExpenses } = useExpensesContext()

  return (
    <View style={styles.container}>
       {
        isLoadingExpenses ? (
          <View style={{ height: 500, justifyContent: 'center', alignItems: 'center' }}>
            <ActivityIndicator />
          </View>
        ) : (
          <Expenses expenses={expenses} headerText="All Expenses" />
        )
      }
    </View>
  )
}

export default AllExpenses

const styles = StyleSheet.create({
  container: {
    flex:1
  }
})