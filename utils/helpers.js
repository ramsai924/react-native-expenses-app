export const getFilteredDaysValues = (array, days=0) => {
    const currentDate = new Date()
    let updateDate = currentDate.getDate() - days
    const previousdate = currentDate.setDate(updateDate)
    const filteredArray = array.filter((arr) => {
        return currentDate.getDate() <= new Date(arr.date).getDate() && new Date(arr.date).getDate() >= new Date(previousdate).getDate()
    })

    return filteredArray
}