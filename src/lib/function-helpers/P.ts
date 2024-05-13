export let P = (self: any, ...convector: Function[]): any => { 
  for(let chain of convector) {
    self = chain.call(self)
  }
  return self
}
