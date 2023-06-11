export const seconds = (delay: number) => {
  return new Promise((res) => setTimeout(res, delay * 1000))
}
