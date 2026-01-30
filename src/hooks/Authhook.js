import {
  use,
  useEffect,
  useState
} from "react"
import {
  getuserservice
} from "../services/auth"
import { useDispatch } from "react-redux"
import { reciveUserResponse } from "../../redux/user/action"

export const useIslogin = () => {
  const [loading, setloading] = useState(true)
  const [login, setlogin] = useState(false)
  const dispatch = useDispatch()
  const handlechecklogin = async () => {
    try {
      const res = await getuserservice()
      setlogin(res.status == 200 ? true : false)
      setloading(false)
      const user = res.data
      user.full_name = user.first_name+' '+user.last_name
       dispatch(reciveUserResponse(user))
    } catch (error) {
      localStorage.removeItem('localtoken')
      setlogin(false)
      setloading(false)
    }
  }
  useEffect(() => {
    const logintoken = JSON.parse(localStorage.getItem('localtoken'))
    if (logintoken) {
      handlechecklogin()
    } else {
      setlogin(false)
      setloading(false)
    }
  }, [])

  return [loading, login]
}