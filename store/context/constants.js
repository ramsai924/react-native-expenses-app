export const emptyExpensesContext = {
    expenses: [],
    addExpenses: (data) => {},
    editExpense: (id, data) => {},
    deleteExpense: (id) => {},
    isLoadingExpenses: true,
    token: null,
    createToken: (token) => {},
    deleteToken: () => {},
    isAuthenticated: false
}