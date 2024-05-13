import { Viewer } from "../lib/Viewer"

describe('Viewer', () => {
  it('response must be called when viewer is created', () => {
    let called = false
    new Viewer(() => { called = true })
    expect(called).toBe(true)
  })

  it('response must be called after a poke', () => {
    let callNumber = 0
    let viewer = new Viewer(() => { callNumber++ })
    viewer.poke()
    expect(callNumber).toBe(2)
  })
})
