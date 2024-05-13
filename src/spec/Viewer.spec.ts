import { Viewer, Tracker, $ } from "../lib/index"

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

  it('after the response, the viewer should not be one of the targets in the tracker', () => {
    let targetCount = 0
    new Viewer(() => { })
    targetCount = Tracker.targets.length
    expect(targetCount).toBe(0)
  })

  it('viewer must be track cells', async () => {
    let callNumber = 0
    let $value = $.new(0)
    new Viewer(() => {
      $value()
      callNumber++
    })
    $value(1)
    expect(callNumber).toBe(2)
  })

  it('between the viewer pokes, a cleanup should be called for', async () => {
    let cleanCount = 0
    let $value = $.new(0)
    new Viewer((self) => {
      $value()
      self.oncleanup = () => { cleanCount++ }
    })
    $value(1)
    expect(cleanCount).toBe(1)
  })

  it('the cleanup function needs to be set on every response', async () => {
    let cleanCount = 0
    let $value = $.new(0)
    new Viewer((self) => {
      $value()
      if (cleanCount == 0) {
        self.oncleanup = () => { cleanCount++ }
      }
    })
    $value(1)
    $value(2)
    expect(cleanCount).toBe(1)
  })
})
