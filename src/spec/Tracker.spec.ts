import { $, Tracker, Viewer } from "../lib/index"

describe('Tracker', () => {
  it('poke a target', async () => {
    let calledTimes = 0
    let viewer = new Viewer(() => { calledTimes++ })
    let $value = $.new(0)
    Tracker.linkage.bond(viewer, $value)
    let calledTimes_beforePoke = calledTimes
    Tracker.linkage.poke($value)
    let calledTimes_afterPoke = calledTimes
    expect(calledTimes_beforePoke).toBe(1)    
    expect(calledTimes_afterPoke).toBe(2)
  })

  it('tease a target', async () => {
    let calledTimes = 0
    let viewer = new Viewer(() => { calledTimes++ })
    let $value = $.new(0)
    Tracker.targets.push(viewer)
    Tracker.tease($value)
    Tracker.targets.pop()
    let calledTimes_beforePoke = calledTimes
    Tracker.linkage.poke($value)
    let calledTimes_afterPoke = calledTimes
    expect(calledTimes_beforePoke).toBe(1)    
    expect(calledTimes_afterPoke).toBe(2)
  })
})