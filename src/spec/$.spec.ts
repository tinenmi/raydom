import { $ } from "../lib/$"

describe('$', () => {
  it('$ is a callable object that returns its own state', () => {
    let $value = $.new(1)
    let value = $value()
    expect(value).toEqual(1)
  })

  it('$ implements Ray interface', () => {
    let $value: Ray<number> = $.new(1)
    expect(true).toEqual(true)
  })

  it('$ allows to set a new value', () => {
    let $value = $.new(1)
    $value(2)
    let value = $value()
    expect(value).toEqual(2)
  })
})
