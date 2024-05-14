import { View } from "../View"

export let cast = (func: Function) => function() {
  // @ts-ignore
  let $val: Ray<any> = this
  return View.new(() => func($val()))
}
