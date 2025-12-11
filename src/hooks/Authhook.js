import {
  useEffect,
  useState
} from "react"
import {
  getuserservice
} from "../services/auth"

export const useIslogin = () => {
  const [loading, setloading] = useState(true)
  const [login, setlogin] = useState(false)
  const handlechecklogin = async () => {
    try {
      const res = await getuserservice()
      setlogin(res.status == 200 ? true : false)
      setloading(false)
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