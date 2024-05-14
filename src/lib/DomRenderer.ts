import { Tag } from "./T"
import { View } from "./View"

type Content = string | Iterable<Content> | Ray<Content> | Tag
type DOM = Node | Iterable<Node>

let clearChildren = (el: Element) => { while(el.lastChild) el.removeChild(el.lastChild) }

let replaceWith = (oldDom: DOM | undefined, newDom: DOM) => {
  if (typeof oldDom === 'undefined') { return }

  if (oldDom instanceof Node && newDom instanceof Node) {
    let parent: Element | null = (oldDom as Node).parentElement
    parent?.replaceChild(newDom as Node, oldDom as Node)
  } else {
    if (oldDom instanceof Node) { oldDom = [ oldDom ] }
    if (newDom instanceof Node) { newDom = [ newDom ] }

    let oldIterator = oldDom[Symbol.iterator]()
    let newIterator = newDom[Symbol.iterator]()

    let oldItem = oldIterator.next()
    let newItem = newIterator.next()

    let parent: Element | null = null
    while(!oldItem.done || !newItem.done) {
      if (!oldItem.done && !newItem.done) {
        parent = (oldItem.value as Text).parentElement;
        (oldItem.value as Text).replaceWith(newItem.value)
      } else if (!oldItem.done) {
        parent?.appendChild(newItem.value)
      } else if (!newItem.done) {
        parent?.removeChild(oldItem.value)
      }

      if (!oldItem.done) { oldItem = oldIterator.next() }
      if (!newItem.done) { newItem = newIterator.next() }
    }
  }
}

export class DomRenderer {
  renderTarget: Element

  constructor(renderTarget: Element) {
    this.renderTarget = renderTarget
  }

  newText(content: string): Text {
    return document.createTextNode(content)
  }

  newIterable(content: Iterable<Content>): Iterable<Node> {
    let result: Node[] = []
    for(let item of content) {
      let renderedItem = this.newItem(item)
      if (renderedItem instanceof Node) {
        result.push(renderedItem)
        continue
      }
      result.push(...renderedItem)
    }
    return result
  }

  newTag(content: Tag): DOM {
    let result = document.createElement(content.tagName)

    if (content.children) {
      let chidlren = this.newIterable(content.children)
      result.append(...chidlren)
    }

    return result
  }

  newView($content: Ray<Content>): DOM {
    let oldResult: DOM | undefined

    let $result = View.new(() => {
      let content = $content()
      if (typeof content === 'undefined') { return [] }
      let result = this.newItem(content as Content)
      replaceWith(oldResult, result)
      return oldResult = result
    })
    
    return $result() as DOM
  }

  newItem(content: Content): DOM {
    if (typeof content === 'string') {
      return this.newText(content as string)
    }
    if (typeof (content as Tag).tagName === 'string') {
      return this.newTag(content as Tag)
    }
    if (typeof content === 'function') {
      return this.newView(content as Ray<Content>)
    }
    return this.newIterable(content as Iterable<Content>)
  }

  render(content: Content) {
    clearChildren(this.renderTarget)
    let dom = this.newItem(content)
    if (dom instanceof Node) {
      this.renderTarget.appendChild(dom)
    } else {
      this.renderTarget.append(...dom)
    }
  }
}
