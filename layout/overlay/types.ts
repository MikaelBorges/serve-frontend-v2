export type OverlayProps = {
  message: {
    text: string
    color?: string
  }
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
