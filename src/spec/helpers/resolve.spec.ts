import { I, resolve } from "../../lib/index"

describe('Promise', () => {
  it('can be resolved', async () => {
    let promise = Promise.resolve(1)
    let $value = I(promise, resolve())

    setTimeout(() => expect($value()).toBe(2), 1000)
  })
})
