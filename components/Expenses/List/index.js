import { View, Text, FlatList, StyleSheet } from 'react-native'
import React from 'react'
import ExpenseItem from './Item'

const ExpensesList = ({ expenses }) => {
  return (
        <FlatList 
            data={expenses}
            renderItem={({ item }) => <ExpenseItem {...item}/>}  
            keyExtractor={(itemData) => itemData.id}
            contentContainerStyle={{ paddingBottom: 36 }}
        />
  )
}

export default ExpensesList