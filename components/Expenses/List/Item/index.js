import { View, Text, StyleSheet, Pressable } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'

const ExpenseItem = ({ amount, category, date, title, id  }) => {
  const navigation = useNavigation()

  const onPressHandler = () => {
    navigation.navigate('manageExpenses', {
      action: 'EDIT',
      data: {
        id,
        amount,
        title,
        date
      }
    })
  }

  return (
    <Pressable 
      style={({ pressed }) => pressed && styles.pressed}
      onPress={onPressHandler}
    >
      <View style={styles.container}>
        <View style={styles.detailsContainer}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.date}>{date ? new Date(date).toDateString() : new Date().toLocaleDateString()}</Text>
        </View>
        <View style={styles.amountContainer}>
          <Text style={styles.amount}>{amount}</Text>
        </View>
      </View>
    </Pressable>
  )
}

export default ExpenseItem


const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 8,
    padding: 12,
    backgroundColor: '#3544f7',
    borderRadius: 6
  },
  detailsContainer: {
    gap: 8
  },
  date: {
    fontSize: 12,
    color: 'white'
  },
  title: {
    fontSize: 14,
    color: 'white',
    fontWeight: 600
  },
  amountContainer: {
    padding: 8,
    backgroundColor: 'white',
    borderRadius: 4,
    minWidth: 80,
    justifyContent: 'center',
    alignItems: 'center'
  },
  amount: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#3544f7'
  },
  pressed: {
    opacity: 0.75
  }
})