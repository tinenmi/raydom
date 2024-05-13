import { Viewer, Tracker } from "../lib/index"

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

  it('during the response, the viewer should be one of the targets in the tracker', () => {
    let targetCount = 0
    new Viewer(() => { 
      targetCount = Tracker.targets.length
    })
    expect(targetCount).toBe(1)
  })
})
