import { $, Linkage, Viewer } from "../lib"

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
    let viewers = [ new Viewer(() => {}), new Viewer(() => {})]
    let $value = $.new(0)
    linkage.bond(viewers[1], $value)
    linkage.bond(viewers[2], $value)
    expect(linkage.map.size).toBe(1)
    expect(linkage.map.get($value)?.size).toBe(2)
  })
})
