import { useNavigate } from 'react-router-dom';
import { instance } from './api';
export function delFan() {
    const nav = useNavigate()
    const deleteDars = async (nomi) => {
      try {
        const response = await instance.delete(`/api/lessons/lesson/${nomi}`)
        console.log(response.data)
        nav('/admin')
      } catch (error) {
        console.error(error)
      }
    }
  return ({deleteDars})
}

