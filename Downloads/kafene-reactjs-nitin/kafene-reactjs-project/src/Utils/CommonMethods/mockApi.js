import Axios from 'axios'
import { API_ENDPOINT } from './links'

export const getData = async (name)=>{
  let data = await Axios.get(`${API_ENDPOINT}${name}`)
  .then(response=>{
    return response.data
  })
  .catch(error=>{
    return error
  })

  return data
}

export const getProductData = async()=>{
  let data = await Axios.get(`${API_ENDPOINT}products`)
    .then(response=>{
      return response.data
    })
    .catch(error=>{
      return error
    })

    data.map(item=>{
      if(item.stock<100){
        item.lowstock = true 
      }
      else item.lowstock = false
      if(checkDate(item.expiryDate)){
        item.isExpired = false
      }
      else item.isExpired = true
    })

    return data
}

const checkDate = (date)=>{
  const monthArr = ['jan', 'feb', 'mar', 'apr', 'may', 'jun', 'jul', 'aug', 'sep', 'oct', 'nov', 'dec']
  const arr = date.split('-'); arr[1] = arr[1].toLowerCase()
  monthArr.map((item,pos)=>{
      if(item == arr[1]){ arr[1] = pos+1 }
  })
  let year = new Date().getFullYear()
  let month = new Date().getMonth()
  let pDate = new Date().getDate()
  if(arr[2]<year){ return false }
  else if(arr[1]<month && arr[2] == year){ return false }
  else if(arr[0]<=pDate && arr[1]<month && arr[2] == year){ return false }     
  else return true
}
