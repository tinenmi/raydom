import { peek } from "../../lib/array-helpers/peek"

describe('peek', () => {
  it('peek of empty array is undefined', () => {
    let result = peek([])
    expect(result).toBe(undefined)
  })
})