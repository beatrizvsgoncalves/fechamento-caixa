import { useState } from 'react';

export default function useSaleList() {
  const [ id, setId ] = useState(1)
  const [ sales, setSales ] = useState(() => {
    const storedSales = localStorage.getItem('sales')

    if (!storedSales) return []
    return JSON.parse(storedSales)
  })

  const addSale = ({ saleValue, payment, deliverName, deliverRate }) => {
    const sale = { id, saleValue, payment, deliverName, deliverRate }
    setSales((state) => {
      const newState = [...state, sale]
      localStorage.setItem('sales', JSON.stringify(newState))
      return newState
    })
    setId(current => current + 1)
  }
  
  return { sales, setSales, addSale, setId }
} 