import { createContext, useState, useEffect } from 'react'
import { UserContextType, AuthUser, UserContextProviderProps } from './types'

export const UserContext = createContext({} as UserContextType)
export const UserContextProvider = ({ children }: UserContextProviderProps) => {
  const [user, setUser] = useState<AuthUser | null>(null)
  useEffect(() => {
    if (user) localStorage.setItem('userStorage', JSON.stringify(user))
    else {
      const userStorage = localStorage.getItem('userStorage')
      if (userStorage) {
        const { _id, firstname, token, imageUser } = JSON.parse(userStorage)
        setUser({ _id, firstname, token, imageUser })
      } else localStorage.removeItem('userStorage')
    }
  }, [user])
  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  )
}
