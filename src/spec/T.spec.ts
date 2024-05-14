import { T } from "../lib/T"

describe('T', () => {
  it('T creates simple tag of virtual DOM', () => {
    let tag = T('div')
    expect(tag.tagName).toBe('div')
  })
})
