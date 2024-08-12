import { $ } from "../$"
import { I } from "./I"

export let resolve = () => function() {
  // @ts-ignore
  let thisValue: Promise<any> | Ray<Promise<any>> = this
  let promise: Promise<any> | undefined = 
    (thisValue instanceof Promise)
    ? thisValue
    : thisValue()
    
  let $value = $.new([])
  promise?.then(value => $value(value))
  return I($value)
}
