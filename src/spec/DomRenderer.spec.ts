import { $, $Interface } from "../lib/$"
import { DomRenderer } from "../lib/DomRenderer"
import { Content, T } from "../lib/T"
import { View } from "../lib/View"
import { Viewer } from "../lib/Viewer"
import { P } from "../lib/function-helpers/P"
import { cast } from "../lib/view-helpers/cast"
import { ray } from "../lib/view-helpers/ray"

describe('Dom renderer', () => {
  it('render string', async () => {
    document.body.innerHTML = `<div id="root"></div>`

    let root = document.getElementById('root') as Element
    DomRenderer.new(root).render('Root there')
    expect(root?.innerHTML).toBe('Root there')
  })

  it('render string iterable', async () => {
    document.body.innerHTML = `<div id="root"></div>`

    let root = document.getElementById('root') as Element
    DomRenderer.new(root).render([ 'Root', ' there' ])
    expect(root?.innerHTML).toBe('Root there')
  })

  it('render iterable of string iterables', async () => {
    document.body.innerHTML = `<div id="root"></div>`

    let root = document.getElementById('root') as Element
    DomRenderer.new(root).render([[ 'Root', ' there' ], ' and here'])
    expect(root?.innerHTML).toBe('Root there and here')
  })

  it('rerender string', async () => {
    document.body.innerHTML = `<div id="root"></div>`

    let root = document.getElementById('root') as Element
    let renderer = DomRenderer.new(root)
    renderer.render('Root there')
    renderer.render('Root here')
    expect(root?.innerHTML).toBe('Root here')
  })

  it('render ray', async () => {
    document.body.innerHTML = `<div id="root"></div>`

    let root = document.getElementById('root') as Element
    let renderer = DomRenderer.new(root)
    let $model = $.new('Root there')
    renderer.render($model)
    $model('Root here')
    expect(root?.innerHTML).toBe('Root here')
  })

  it('render ray of iterable', async () => {
    document.body.innerHTML = `<div id="root"></div>`

    let root = document.getElementById('root') as Element
    let renderer = DomRenderer.new(root)
    let $model = $.new(['Root', ' there'])
    renderer.render($model)
    $model(['Root', ' here'])
    expect(root?.innerHTML).toBe('Root here')
  })

  it('render simple tag', async () => {
    document.body.innerHTML = `<div id="root"></div>`

    let root = document.getElementById('root') as Element
    let renderer = DomRenderer.new(root)
    renderer.render(T('div'))
    expect(root?.innerHTML).toBe('<div></div>')
  })

  it('render simple tag with text', async () => {
    document.body.innerHTML = `<div id="root"></div>`

    let root = document.getElementById('root') as Element
    let renderer = DomRenderer.new(root)
    renderer.render(T('div', [ 'Root there' ]))
    expect(root?.innerHTML).toBe('<div>Root there</div>')
  })

  it('render nested tags', async () => {
    document.body.innerHTML = `<div id="root"></div>`

    let root = document.getElementById('root') as Element
    let renderer = DomRenderer.new(root)
    renderer.render(T('div', [ T('div') ]))
    expect(root?.innerHTML).toBe('<div><div></div></div>')
  })

  it('render simple tag with ray', async () => {
    document.body.innerHTML = `<div id="root"></div>`

    let root = document.getElementById('root') as Element
    let $model = $.new('Root there')
    let renderer = DomRenderer.new(root)
    renderer.render(T('div', [ $model ]))
    $model('Root here')
    expect(root?.innerHTML).toBe('<div>Root here</div>')
  })

  it('render simple tag with attributes', async () => {
    document.body.innerHTML = `<div id="root"></div>`

    let root = document.getElementById('root') as Element
    let renderer = DomRenderer.new(root)
    renderer.render(T('div', { id: 'child' }))
    expect(root?.innerHTML).toBe('<div id="child"></div>')
  })

  it('render simple tag with ray attributes', async () => {
    document.body.innerHTML = `<div id="root"></div>`

    let root = document.getElementById('root') as Element
    let renderer = DomRenderer.new(root)
    let $model = $.new('child')
    renderer.render(T('div', { id: $model }))
    $model('container')
    expect(root?.innerHTML).toBe('<div id="container"></div>')
  })

  it('render components', async () => {
    document.body.innerHTML = `<div id="root"></div>`
    interface Props {
      $title: Ray<string>
      $raydom: $Interface<Content>
    }
    let Component = (({ $title }: Props) => {
      return T('div', [ $title ] )
    })

    let root = document.getElementById('root') as Element
    let renderer = DomRenderer.new(root)
    let $model = $.new('child')
    renderer.render(T(Component, { $title: $model }, []))
    $model('container')
    expect(root?.innerHTML).toBe('<div>container</div>')
  })

  it('props components', async () => {
    document.body.innerHTML = `<div id="root"></div>`
    let Title = T('h1', { className: 'title' })

    interface Props {
      $title: Ray<string>
      $raydom: $Interface<Content>
    }

    let Component = (({ $title }: Props) => {
      return T(Title, [ $title ] )
    })

    let root = document.getElementById('root') as Element
    let renderer = DomRenderer.new(root)
    let $model = $.new('child')
    renderer.render(T(Component, { $title: $model }, []))
    expect(root?.innerHTML).toBe('<h1 class="title">child</h1>')
  })
})
