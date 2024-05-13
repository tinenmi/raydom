import { $, View } from "../lib/index"

describe('Signal test', () => {
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
})
