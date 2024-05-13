import { Viewer } from "../lib/Viewer"

describe('Viewer', () => {
  it('response must be called when viewer is created', () => {
    let called = false
    new Viewer(() => { called = true })
    expect(called).toBe(true)
  }) 
})
