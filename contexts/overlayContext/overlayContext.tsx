import { createContext, useState } from 'react'
import { OverlayContextType, OverlayContextProviderPropsType } from './types'

export const OverlayContext = createContext<OverlayContextType | boolean>(false)
export const OverlayContextProvider = ({
  children
}: OverlayContextProviderPropsType) => {
  const [overlay, setOverlay] = useState<boolean>(false)
  return (
    <OverlayContext.Provider value={{ overlay, setOverlay }}>
      {children}
    </OverlayContext.Provider>
  )
}
