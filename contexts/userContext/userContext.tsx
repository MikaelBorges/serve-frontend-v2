import { createContext, useState, useEffect } from 'react'
import { UserContextType, AuthUser, UserContextProviderPropsType } from './types'

export const UserContext = createContext({} as UserContextType)

export const UserContextProvider = ({ children }: UserContextProviderPropsType) => {
  const [user, setUser] = useState<AuthUser | null>(null)
  useEffect(() => {
    if (user) localStorage.setItem('userStorage', JSON.stringify(user))
    else {
      const userStorage = localStorage.getItem('userStorage')
      if (userStorage) {
        const { _id, firstname, token, imageUser, initials } = JSON.parse(userStorage)
        setUser({ _id, firstname, token, imageUser, initials })
      } else {
        setUser({
          _id: '',
          firstname: '',
          token: '',
          imageUser: '',
          initials: ''
        })
        localStorage.removeItem('userStorage')
      }
    }
    if (user !== null) console.log('userContext', user)
  }, [user])
  return <UserContext.Provider value={{ user, setUser }}>{children}</UserContext.Provider>
}
