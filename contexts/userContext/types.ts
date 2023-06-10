export type UserContextType = {
  user: AuthUser | null
  setUser: React.Dispatch<React.SetStateAction<AuthUser | null>>
}

export type AuthUser = {
  _id: string
  token: string
  firstname: string
  imageUser: string
}

export type UserContextProviderProps = {
  children: React.ReactNode
}
