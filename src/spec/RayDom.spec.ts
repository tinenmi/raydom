import { $ } from "../lib/$"
import { RayDom } from "../lib/RayDom"
import { O } from "../lib/helpers/O"

describe('Dom renderer', () => {
  it('render string', async () => {
    document.body.innerHTML = `<div id="root"></div>`

    let root = document.getElementById('root') as Element
    RayDom.new(root).render('Root there')
    expect(root?.innerHTML).toBe('Root there')
  })

  it('render string iterable', async () => {
    document.body.innerHTML = `<div id="root"></div>`

    let root = document.getElementById('root') as Element
    RayDom.new(root).render([ 'Root', ' there' ])
    expect(root?.innerHTML).toBe('Root there')
  })

  it('render iterable of string iterables', async () => {
    document.body.innerHTML = `<div id="root"></div>`

    let root = document.getElementById('root') as Element
    RayDom.new(root).render([[ 'Root', ' there' ], ' and here'])
    expect(root?.innerHTML).toBe('Root there and here')
  })

  it('rerender string', async () => {
    document.body.innerHTML = `<div id="root"></div>`

    let root = document.getElementById('root') as Element
    let renderer = RayDom.new(root)
    renderer.render('Root there')
    renderer.render('Root here')
    expect(root?.innerHTML).toBe('Root here')
  })

  it('render ray', async () => {
    document.body.innerHTML = `<div id="root"></div>`

    let root = document.getElementById('root') as Element
    let renderer = RayDom.new(root)
    let $model = $.new('Root there')
    renderer.render($model)
    $model('Root here')
    expect(root?.innerHTML).toBe('Root here')
  })

  it('render ray of iterable', async () => {
    document.body.innerHTML = `<div id="root"></div>`

    let root = document.getElementById('root') as Element
    let renderer = RayDom.new(root)
    let $model = $.new(['Root', ' there'])
    renderer.render($model)
    $model(['Root', ' here'])
    expect(root?.innerHTML).toBe('Root here')
  })

  it('render simple tag', async () => {
    document.body.innerHTML = `<div id="root"></div>`

    let root = document.getElementById('root') as Element
    let renderer = RayDom.new(root)
    renderer.render(O('div'))
    expect(root?.innerHTML).toBe('<div></div>')
  })

  it('render simple tag with text', async () => {
    document.body.innerHTML = `<div id="root"></div>`

    let root = document.getElementById('root') as Element
    let renderer = RayDom.new(root)
    renderer.render(O('div', [ 'Root there' ]))
    expect(root?.innerHTML).toBe('<div>Root there</div>')
  })

  it('render nested tags', async () => {
    document.body.innerHTML = `<div id="root"></div>`

    let root = document.getElementById('root') as Element
    let renderer = RayDom.new(root)
    renderer.render(O('div', [ O('div') ]))
    expect(root?.innerHTML).toBe('<div><div></div></div>')
  })

  it('render simple tag with ray', async () => {
    document.body.innerHTML = `<div id="root"></div>`

    let root = document.getElementById('root') as Element
    let $model = $.new('Root there')
    let renderer = RayDom.new(root)
    renderer.render(O('div', [ $model ]))
    $model('Root here')
    expect(root?.innerHTML).toBe('<div>Root here</div>')
  })

  it('render simple tag with attributes', async () => {
    document.body.innerHTML = `<div id="root"></div>`

    let root = document.getElementById('root') as Element
    let renderer = RayDom.new(root)
    renderer.render(O('div', { id: 'child' }))
    expect(root?.innerHTML).toBe('<div id="child"></div>')
  })

  it('render simple tag with ray attributes', async () => {
    document.body.innerHTML = `<div id="root"></div>`

    let root = document.getElementById('root') as Element
    let renderer = RayDom.new(root)
    let $model = $.new('child')
    renderer.render(O('div', { id: $model }))
    $model('container')
    expect(root?.innerHTML).toBe('<div id="container"></div>')
  })

  it('render simplest component', async () => {
    document.body.innerHTML = `<div id="root"></div>`

    let Component = () => {
      return O('div', [ 'container' ] )
    }

    let root = document.getElementById('root') as Element
    RayDom.new(root).render(O(Component, []))
    expect(root?.innerHTML).toBe('<div>container</div>')
  })

  it('render component with simple props', async () => {
    document.body.innerHTML = `<div id="root"></div>`

    interface Props {
      title: string
    }

    let Component = ({ title }: Props) => {
      return O('div', [ title ] )
    }

    let root = document.getElementById('root') as Element
    RayDom.new(root).render(O(Component, { title: 'container' } , []))
    expect(root?.innerHTML).toBe('<div>container</div>')
  })

  it('render components', async () => {
    document.body.innerHTML = `<div id="root"></div>`
    interface Props {
      $title: Ray<string>
    }
    let Component = (({ $title }: Props) => {
      return O('div', [ $title ] )
    })

    let $model = $.new('child')

    let root = document.getElementById('root') as Element
    RayDom.new(root).render(O(Component, { $title: $model }, []))
    
    $model('container')
    expect(root?.innerHTML).toBe('<div>container</div>')
  })

  it('props components', async () => {
    document.body.innerHTML = `<div id="root"></div>`
    let Title = O('h1', { className: 'title' })

    interface Props {
      $title: Ray<string>
    }

    let Component = (({ $title }: Props) => {
      return O(Title, [ $title ] )
    })

    let root = document.getElementById('root') as Element
    let renderer = RayDom.new(root)
    let $model = $.new('child')
    renderer.render(O(Component, { $title: $model }, []))
    expect(root?.innerHTML).toBe('<h1 class="title">child</h1>')
  })
})
