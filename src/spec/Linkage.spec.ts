import { $, Linkage, Viewer } from "../lib/index"

describe('Linkage', () => {
  it('add a one-to-one bond to linkage', async () => {
    let linkage = new Linkage()
    let viewer = new Viewer(() => {})
    let $value = $.new(0)
    linkage.bond(viewer, $value)
    expect(linkage.map.size).toBe(1)
  })

  it('add a one-to-many bond to linkage', async () => {
    let linkage = new Linkage()
    let viewers = [ new Viewer(() => {}), new Viewer(() => {}) ]
    let $value = $.new(0)
    linkage.bond(viewers[1], $value)
    linkage.bond(viewers[2], $value)
    expect(linkage.map.size).toBe(1)
    expect(linkage.map.get($value)?.size).toBe(2)
  })

  it('remove one linkage', async () => {
    var linkage = new Linkage()
    var viewers = [ new Viewer(() => {}), new Viewer(() => {}) ]
    let $value = $.new(0)
    linkage.bond(viewers[1], $value)
    linkage.bond(viewers[2], $value)
    linkage.unbond(viewers[1])
    expect(linkage.map.size).toBe(1)
    expect(linkage.map.get($value)?.size).toBe(1)
  })

  it('remove all linkages', async () => {
    var linkage = new Linkage()
    var viewers = [ new Viewer(() => {}), new Viewer(() => {}) ]
    let $value = $.new(0)
    linkage.bond(viewers[1], $value)
    linkage.bond(viewers[2], $value)
    linkage.unbond(viewers[1])
    linkage.unbond(viewers[2])
    expect(linkage.map.size).toBe(0)
  })

  it('poke a target', async () => {
    let linkage = new Linkage()
    let calledTimes = 0
    let viewer = new Viewer(() => { calledTimes++ })
    let $value = $.new(0)
    linkage.bond(viewer, $value)
    let calledTimes_beforePoke = calledTimes
    linkage.poke($value)
    let calledTimes_afterPoke = calledTimes
    expect(calledTimes_beforePoke).toBe(1)
    expect(calledTimes_afterPoke).toBe(2)
  })
})
