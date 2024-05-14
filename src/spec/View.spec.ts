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
})
