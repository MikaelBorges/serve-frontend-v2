export type OverlayContextType = {
  overlay: boolean
  setOverlay: React.Dispatch<React.SetStateAction<boolean>>
}

export type OverlayContextProviderPropsType = {
  children: React.ReactNode
}
