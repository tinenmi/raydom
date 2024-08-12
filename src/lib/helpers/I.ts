import { View } from "../View"

export let I = (self: any, ...chain: Function[]): any => { 
  return View.new(() => {
    let result = self
    if (result.isRay) { result = result() }
    for(let unit of chain) {
      result = unit.call(result)
      if (result.isRay) { result = result() }
    }
    return result
  })
}
