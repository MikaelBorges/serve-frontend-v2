import { createContext, useState, useEffect } from 'react'
import {
  UserContextType,
  AuthUser,
  UserContextProviderPropsType
} from './types'

export const UserContext = createContext({} as UserContextType)
export const UserContextProvider = ({
  children
}: UserContextProviderPropsType) => {
  const [user, setUser] = useState<AuthUser | null>(null)
  useEffect(() => {
    if (user) localStorage.setItem('userStorage', JSON.stringify(user))
    else {
      const userStorage = localStorage.getItem('userStorage')
      if (userStorage) {
        const { _id, firstname, token, imageUser } = JSON.parse(userStorage)
        setUser({ _id, firstname, token, imageUser })
      } else {
        setUser({ _id: '', firstname: '', token: '', imageUser: '' })
        localStorage.removeItem('userStorage')
      }
    }
  }, [user])
  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  )
}
