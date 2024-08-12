export let cast = (func: Function) => function() {
  // @ts-ignore
  let thisValue: any = this
  return func(thisValue)
}
