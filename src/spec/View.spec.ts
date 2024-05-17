import { $, P, View, cast, lense } from "../lib/index"
import { ray } from "../lib/view-helpers/ray"

describe('View', () => {
  it('view has to computed', async () => {
    let $value = View.new(() => 1)
    let value = $value()
    expect(value).toBe(1)
  })

  it('view has to recomputed', async () => {
    let $sourceValue = $.new(1)
    let $value = View.new(() => $sourceValue())
    $sourceValue(2)
    let value = $value()
    expect(value).toBe(2)
  }) 

  it('view can be created as cast', async () => {
    let $sourceValue = $.new(1)
    let doubler = cast((value: number) => value * 2)
    let $value = P($sourceValue, doubler)
    $sourceValue(2)
    let value = $value()
    expect(value).toBe(4)
  })

  it('view can be created as lense', async () => {
    let $rootValue = $.new({ prop: 1})
    let $value = P($rootValue, lense('prop'))
    $rootValue({ prop: 2})
    let value = $value()
    expect(value).toEqual(2)
  })

  it('view can be created as ray template string', async () => {
    let $data = $.new(1)
    let $view = ray`View has data: ${$data}`
    $data(2)
    let view = $view()
    expect(view).toEqual('View has data: 2')
  })

  it('chain of views', async () => {
    let $model = $.new(0)
    let $model2 = View.new(() => $model())
    let $model3 = View.new(() => $model2())
    let $model4 = View.new(() => $model3())

    $model(1)

    expect($model4()).toEqual(1)
  })

  it('counter', async () => {
    let $counter = $.new(0)
    let $isEven = P($counter, cast((x: any) => (x & 1) == 0))
    let $parity = P($isEven, cast((x: any) => x ? "even" : "odd"))
    let $view = View.new(() => $counter() + ' - ' + $parity())
        
    setTimeout(() => $counter(1), 200)
    setTimeout(() => $counter(2), 400)
    setTimeout(() => $counter(3), 600)
    setTimeout(() => $counter(4), 800)
    setTimeout(() => $counter(5), 1000)

    setTimeout(() => expect($view()).toBe('5 - even'), 1000)
  })
})
