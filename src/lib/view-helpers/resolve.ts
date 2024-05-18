import { $ } from "../$"
import { P } from "../function-helpers/P"
import { readonly } from "./readonly"

export let resolve = () => function() {
  // @ts-ignore
  let thisValue: Promise<any> | Ray<Promise<any>>  = this
  let promise: Promise<any> | undefined = 
    (thisValue instanceof Promise)
    ? thisValue
    : thisValue()
    
  let $value = $.new()
  promise?.then(value => $value(value))
  return P($value, readonly())
}
