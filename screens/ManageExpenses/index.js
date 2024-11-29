import { View, Text, StyleSheet, ScrollView, Pressable, Alert } from 'react-native'
import React, { useCallback, useLayoutEffect, useMemo, useState } from 'react'
import { useNavigation } from '@react-navigation/native';
import Button from '../../components/UI/Button';
import IconButton from '../../components/UI/IconButton';
import ManageExpenseForm from './Form';
import { useExpensesContext } from '../../store/context';
import { createExpenses, deleteExpenseData, putExpenses } from '../../services';

const ManageExpenses = ({ route, navigation }) => {
  const params = route.params;
  const { action, data } = params;
  const { addExpenses, editExpense, deleteExpense } = useExpensesContext()
  const [formValues, setFormValues] = useState({
    amount: {
      value: '',
      isValid: false
    },
    date: {
      value: new Date().toISOString(),
      isValid: true
    },
    title: {
      value: '',
      isValid: false
    }
  })

  const onCancelHandler = () => {
    navigation.goBack()
  }

  const isInValidForm = useCallback((formValues) => {
    const formKeys = Object.keys(formValues)
    return formKeys.some((key) => !formValues[key]?.isValid)
  }, [formValues])

  const manageExpense = async () => {
    try {
        if(isInValidForm(formValues)){
          Alert.alert('Invalid form', 'Please fill in all required fields!!')
          return;
        }
        const updatedValues = {
        amount: formValues.amount.value,
        date: formValues.date.value,
        title: formValues.title.value,
      }
      if(action === 'ADD'){
        const createdExpense = await createExpenses(updatedValues)
        addExpenses({ ...updatedValues, id: createdExpense.name  })
      }else{
        const updatedExpense = await putExpenses(data.id, updatedValues)
        editExpense(data.id, updatedValues)
      }
      navigation.goBack()
    } catch (error) {
      Alert.alert('Error', 'Something went wrong!')
    }
  }

  const deleteExpenses = async () => {
    try {
      deleteExpenseData(data.id)   
      deleteExpense(data.id)
      navigation.goBack()
    } catch (error) {
      
    }
  }

  const onChangeHandler = (name, value) => {
     setFormValues((preValues) => ({
      ...preValues,
      [name]: {
        value: value,
        isValid: value !== ''
      }
     }))
  }

  useLayoutEffect(() => {
    if(action){
      navigation.setOptions({
        title: action === 'ADD' ? 'Add Expenses' : 'Edit Expenses'
      })

      if(action === 'EDIT'){
        const ObjectKeys = Object.keys(data).filter((key) => key !== 'id')
        const existingObject = ObjectKeys.reduce((acc, cur) => {
          let object = {}
          object[cur] = {
            value: data[cur],
            isValid: data[cur] !== ''
          }
          return acc = {...acc, ...object}
        },{})
        setFormValues(existingObject)
      }
    }
  }, [action])
  
  return (
    <ScrollView style={styles.container}>
      <View style={{ marginBottom: 10 }}>
        <ManageExpenseForm formValues={formValues} onChangeHandler={onChangeHandler}/>
      </View>
      <View style={styles.options}>
        <Button style={styles.button} onPress={onCancelHandler}>Cancel</Button>
        <Button 
          varient='primary' 
          style={styles.button}
          onPress={manageExpense}
          // disabled={isInValidForm(formValues)}
        >{action === 'ADD' ? 'Create' : 'Edit'}</Button>
      </View>
      {
        action === 'EDIT' && (
        <Pressable 
          style={({ pressed }) => {
            if(pressed){
              return [styles.trashContainer, styles.trashPressed]
            }else{
              return styles.trashContainer
            }
          }}
          onPress={deleteExpenses}
        >
          <IconButton icon={'trash'} size={24} color={'#C70039'} />
        </Pressable>
        )
      }
    </ScrollView>
  )
}

export default ManageExpenses

const styles = StyleSheet.create({
  container: {
    padding: 24
  },
  options: {
    borderTopWidth: 1,
    borderTopColor: 'grey',
    paddingVertical: 16,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  button: {
    minWidth: '48%',
    marginHorizontal: 8
  },
  trashContainer: {
    marginVertical: 8,
    padding: 4,
    borderWidth:2,
    borderColor: '#5662f8',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50
  },
  trashPressed: {
    opacity: 0.75
  }
})