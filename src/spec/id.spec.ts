import { id } from '../lib'

describe('id', () => {
  it('id is a function that returns its argument', () => {
    let arg = 1
    let result = id(arg)
    expect(result).toBe(1)
  })

  it('if the mutable argument has been changed after the function call, the result should also change', () => {
    let arg = { value: 1 }
    let result = id(arg)
    arg.value = 2
    expect(result).toEqual({ value: 2 })
  })

  it('id works the same way with dom elements', () => {
    document.body.innerHTML = `
      <div id="root">Root there</div>
    `

    let root = document.getElementById('root')
    let result = id(root)
    expect(result).toBe(root)
  })
})