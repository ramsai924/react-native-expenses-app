import React, { createContext, useContext, useEffect, useState } from 'react'
import { emptyExpensesContext } from './constants'
import { getExpenses } from '../../services';

const ExpensesContext = createContext(emptyExpensesContext)

function RootContext({ children }) {
    const [token, setToken] = useState(null);
    const [expenses, setExpenses] = useState([]);
    const [isLoadingExpenses, setIsLoadingExpenses] = useState(true)
    const addExpenses = (data) => {
      setExpenses((prevData) => [data, ...prevData])
    }

    const editExpense = (id, data) => {
      const findIndex = expenses.findIndex((expense) => expense.id === id)
      let expensesCopy = expenses
      if(findIndex > -1){
        expensesCopy.splice(findIndex, 1, {...data, id})
      }
      setExpenses([...expensesCopy])
    }

    const deleteExpense = (id) => {
      setExpenses((prevData) => prevData.filter((expense) => expense.id !== id))
    }

    const fetchExpenses = async () => {
      try {
          setIsLoadingExpenses(true)
          const response = await getExpenses()
          if(response){
            const responseKeys = Object.keys(response)
            const expensesData = responseKeys.map((key) => {
              return {
                id: key,
                ...response[key]
              }
            })
            setExpenses(expensesData)
          }
          setIsLoadingExpenses(false)
      } catch (error) {
        setIsLoadingExpenses(false)
        
      }
    }

    const createToken = (token) => {
      setToken(token)
    }

    const deleteToken = () => {
      setToken(null)
    }

    useEffect(() => {
      fetchExpenses()
    }, [])
    
    const contextValue = {
        expenses,
        addExpenses,
        editExpense,
        deleteExpense,
        isLoadingExpenses,
        token,
        isAuthenticated: !!token,
        createToken,
        deleteToken
    }
     
  return (
    <ExpensesContext.Provider value={contextValue}>
        {children}
    </ExpensesContext.Provider>
  )
}

export default RootContext

export const useExpensesContext = () => useContext(ExpensesContext)