const formatDate = (date: number) => {
  const d = new Date(date)
  const dateString = `${d.getDate()}/${d.getMonth()}/${d.getFullYear()}`
  return dateString
}

export default formatDate
