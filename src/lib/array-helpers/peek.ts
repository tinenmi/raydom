export let peek = (arr: Array<any>) => {
  if (arr.length === 0) return undefined
  return arr[arr.length - 1]
}
