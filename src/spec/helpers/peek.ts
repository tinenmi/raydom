import { peek } from "../../lib/helpers/peek"

describe('peek', () => {
  it('peek of empty array is undefined', () => {
    let result = peek([])
    expect(result).toBe(undefined)
  })
  
  it('peek of non empty array is last element of array', () => {
    let result = peek([1, 2, 3])
    expect(result).toBe(3)
  })
})
