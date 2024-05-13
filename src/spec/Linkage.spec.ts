import { $, Linkage, Viewer } from "../lib"

describe('Linkage', () => {
  it('add a one-to-one bond to linkage', async () => {
    let linkage = new Linkage()
    let viewer = new Viewer(() => {})
    let $value = $.new(0)
    linkage.bond(viewer, $value)
    expect(linkage.map.size).toBe(1)
  })
})
