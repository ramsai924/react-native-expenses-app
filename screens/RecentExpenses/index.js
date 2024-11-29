import { View, Text, StyleSheet, ActivityIndicator } from 'react-native'
import React, { useEffect } from 'react'
import Expenses from '../../components/Expenses'
import { useExpensesContext } from '../../store/context'
import { getFilteredDaysValues } from '../../utils/helpers'

const RecentExpenses = () => {
  const { expenses, isLoadingExpenses } = useExpensesContext()
  const updatedExpenses = getFilteredDaysValues(expenses, 7)

  return (
    <View style={styles.container}>
      {
        isLoadingExpenses ? (
          <View style={{ height: 500, justifyContent: 'center', alignItems: 'center' }}>
            <ActivityIndicator />
          </View>
        ) : (
          <Expenses expenses={updatedExpenses} headerText="Last 7 days"/>
        )
      }
    </View>
  )
}

export default RecentExpenses

const styles = StyleSheet.create({
  container: {
    flex:1
  }
})