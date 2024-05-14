import { DomRenderer } from "../lib/DomRenderer"

describe('Dom renderer', () => {
  it('render string', async () => {
    document.body.innerHTML = `
      <div id="root"></div>
    `

    let root = document.getElementById('root') as Element
    let renderer = new DomRenderer(root)
    renderer.render('Root there')
    expect(root?.innerHTML).toBe('Root there')
  })

  it('render string iterable', async () => {
    document.body.innerHTML = `
      <div id="root"></div>
    `

    let root = document.getElementById('root') as Element
    let renderer = new DomRenderer(root)
    renderer.render([ 'Root', ' there' ])
    expect(root?.innerHTML).toBe('Root there')
  })

  it('render iterable of string iterables', async () => {
    document.body.innerHTML = `
      <div id="root"></div>
    `

    let root = document.getElementById('root') as Element
    let renderer = new DomRenderer(root)
    renderer.render([[ 'Root', ' there' ], ' and here'])
    expect(root?.innerHTML).toBe('Root there and here')
  })
})
