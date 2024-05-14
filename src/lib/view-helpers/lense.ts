import { View } from "../View"

export let lense = (propName: string | number) => function() {
  // @ts-ignore
  let $val: Ray<any> = this
  return View.new(() => $val()[propName])
}
