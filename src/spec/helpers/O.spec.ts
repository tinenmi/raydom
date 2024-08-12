import { O } from "../../lib/helpers/O"

describe('O', () => {
  it('O creates simple tag of virtual DOM', () => {
    let tag = O('div')
    expect(tag.tagName).toBe('div')
  })
})
