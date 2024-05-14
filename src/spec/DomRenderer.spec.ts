import { $ } from "../lib/$"
import { DomRenderer } from "../lib/DomRenderer"
import { T } from "../lib/T"

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

  it('rerender string', async () => {
    document.body.innerHTML = `
      <div id="root"></div>
    `

    let root = document.getElementById('root') as Element
    let renderer = new DomRenderer(root)
    renderer.render('Root there')
    renderer.render('Root here')
    expect(root?.innerHTML).toBe('Root here')
  })

  it('render ray', async () => {
    document.body.innerHTML = `
      <div id="root"></div>
    `

    let root = document.getElementById('root') as Element
    let renderer = new DomRenderer(root)
    let $model = $.new('Root there')
    renderer.render($model)
    $model('Root here')
    expect(root?.innerHTML).toBe('Root here')
  })

  it('render ray of iterable', async () => {
    document.body.innerHTML = `
      <div id="root"></div>
    `

    let root = document.getElementById('root') as Element
    let renderer = new DomRenderer(root)
    let $model = $.new(['Root', ' there'])
    renderer.render($model)
    $model(['Root', ' here'])
    expect(root?.innerHTML).toBe('Root here')
  })

  it('render simple tag', async () => {
    document.body.innerHTML = `
      <div id="root"></div>
    `

    let root = document.getElementById('root') as Element
    let renderer = new DomRenderer(root)
    renderer.render(T('div'))
    expect(root?.innerHTML).toBe('<div></div>')
  })

  it('render simple tag with text', async () => {
    document.body.innerHTML = `
      <div id="root"></div>
    `

    let root = document.getElementById('root') as Element
    let renderer = new DomRenderer(root)
    renderer.render(T('div', [ 'Root there' ]))
    expect(root?.innerHTML).toBe('<div>Root there</div>')
  })

  it('render nested tags', async () => {
    document.body.innerHTML = `
      <div id="root"></div>
    `

    let root = document.getElementById('root') as Element
    let renderer = new DomRenderer(root)
    renderer.render(T('div', [ T('div') ]))
    expect(root?.innerHTML).toBe('<div><div></div></div>')
  })

  it('render simple tag with ray', async () => {
    document.body.innerHTML = `
      <div id="root"></div>
    `

    let root = document.getElementById('root') as Element
    let $model = $.new('Root there')
    let renderer = new DomRenderer(root)
    renderer.render(T('div', [ $model ]))
    $model('Root here')
    expect(root?.innerHTML).toBe('<div>Root here</div>')
  })
})
