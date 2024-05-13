import { View } from "../lib/View"

describe('Signal test', () => {
  it('view has to computed', async () => {
    let $value = View.new(() => 1)
    let value = $value()
    expect(value).toBe(1)
  })
})
