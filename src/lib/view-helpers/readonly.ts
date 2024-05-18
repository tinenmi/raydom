import { View } from "../View"

export let readonly = () => function() {
  // @ts-ignore
  let $val: Ray<any> = this
  return View.new(() => $val())
}
