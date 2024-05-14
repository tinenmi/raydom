import { View } from "./View"

type Content = string | Iterable<Content> | Ray<Content>
type DOM = Text | Iterable<Text>

let clearChildren = (el: Element) => { while(el.lastChild) el.removeChild(el.lastChild) }

export class DomRenderer {
  renderTarget: Element

  constructor(renderTarget: Element) {
    this.renderTarget = renderTarget
  }

  createText(content: string): Text {
    return document.createTextNode(content)
  }

  createIterable(content: Iterable<Content>): Iterable<Text> {
    let result: Text[] = []
    for(let item of content) {
      let renderedItem = this.createItem(item)
      if (renderedItem instanceof Text) {
        result.push(renderedItem)
        continue
      }
      result.push(...renderedItem)
    }
    return result
  }

  renderRay($content: Ray<Content>): DOM {
    let oldResult: DOM | undefined

    let $result = View.new(() => {
      let content = $content()
      if (typeof content === 'undefined') { return [] }
      let result = this.createItem(content as Content)
      if (typeof oldResult !== 'undefined') {
        if (result instanceof Text) {
          (oldResult as Text).replaceWith(result)
        } else {
          (oldResult as Text).replaceWith(...result)
        }
      }
      return oldResult = result
    })
    
    return $result() as DOM
  }

  createItem(content: Content): DOM {
    if (typeof content === 'string') {
      return this.createText(content as string)
    }
    if (typeof content === 'function') {
      return this.renderRay(content as Ray<Content>)
    }
    return this.createIterable(content as Iterable<Content>)
  }

  render(content: Content) {
    clearChildren(this.renderTarget)
    let dom = this.createItem(content)
    if (dom instanceof Text) {
        this.renderTarget.appendChild(dom)
    } else {
        this.renderTarget.append(...dom)
    }
  }
}
