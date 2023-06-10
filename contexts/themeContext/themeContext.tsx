import { createContext, useState, useEffect } from 'react'
import { ThemeContextProviderProps } from './types'

const darkMode = false
export const ThemeContext = createContext(darkMode)
export const ThemeContextProvider = ({
  children
}: ThemeContextProviderProps) => {
  return (
    <ThemeContext.Provider value={darkMode}>{children}</ThemeContext.Provider>
  )
}
