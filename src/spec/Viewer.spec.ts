import { Viewer, Tracker, $ } from "../lib/index"

describe('Viewer', () => {
  it('response must be called when viewer is created', () => {
    let called = false
    Viewer.new(() => { called = true })
    expect(called).toBe(true)
  })

  it('response must be called after a poke', () => {
    let callNumber = 0
    let viewer = Viewer.new(() => { callNumber++ })
    viewer.poke()
    expect(callNumber).toBe(2)
  })

  it('during the response, the viewer should be one of the targets in the tracker', () => {
    let targetCount = 0
    Viewer.new(() => { 
      targetCount = Tracker.targets.length
    })
    expect(targetCount).toBe(1)
  })

  it('after the response, the viewer should not be one of the targets in the tracker', () => {
    let targetCount = 0
    Viewer.new(() => { })
    targetCount = Tracker.targets.length
    expect(targetCount).toBe(0)
  })

  it('viewer must be track cells', async () => {
    let callNumber = 0
    let $value = $.new(0)
    Viewer.new(() => {
      $value()
      callNumber++
    })
    $value(1)
    expect(callNumber).toBe(2)
  })

  it('between the viewer pokes, a purge should be called for', async () => {
    let purgeCount = 0
    let $value = $.new(0)
    Viewer.new((self) => {
      $value()
      self.onpurge = () => { purgeCount++ }
    })
    $value(1)
    expect(purgeCount).toBe(1)
  })

  it('the purge function needs to be set on every response', async () => {
    let purgeCount = 0
    let $value = $.new(0)
    Viewer.new((self) => {
      $value()
      if (purgeCount == 0) {
        self.onpurge = () => { purgeCount++ }
      }
    })
    $value(1)
    $value(2)
    expect(purgeCount).toBe(1)
  })

  it('viewers can be nested', async () => {
    let calledTimes = 0

    let $value = $.new(0)
    let viewer = Viewer.new(() => { 
      let nested = Viewer.new(() => { 
        $value()
        calledTimes++
      })
    })
    viewer.poke()
    $value(1)
    expect(calledTimes).toBe(3)
  })

  it('nested viewers have no effect on their parents', async () => {
    let calledTimes = 0

    let $value = $.new('')
    let viewer = Viewer.new(() => { 
      calledTimes++
      let nested = Viewer.new(() => { 
        $value()
      })
    })
    viewer.poke()
    $value('1')
    expect(calledTimes).toBe(2)
  })
})
