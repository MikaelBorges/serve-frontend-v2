export type OverlayProps = {
  message: string
  link?: {
    text: string
    url: string
  }
  buttons?: {
    text: string
    colorButton: string
    action?: () => void
  }[]
}
