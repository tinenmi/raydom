import { $ } from "./$"
import { Content, Tag } from "./helpers/O"
import { View } from "./View"
import { Viewer } from "./Viewer"

type DOM = Node | Iterable<Node>

let clean = (el: Element) => { while(el.lastChild) el.removeChild(el.lastChild) }

let update = (oldDom: DOM | undefined, newDom: DOM) => {
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
        parent?.removeChild(oldItem.value)
      } else if (!newItem.done) {
        parent?.appendChild(newItem.value)
      }

      if (!oldItem.done) { oldItem = oldIterator.next() }
      if (!newItem.done) { newItem = newIterator.next() }
    }
  }
}

let newText = (content: string): Text => {
  return document.createTextNode(content)
}

export class RayDom {
  root: Element

  private constructor(root: Element) {
    this.root = root
  }

  public static new(root: Element): RayDom {
    return new RayDom(root)
  }

  iter(content: Iterable<Content>): Iterable<Node> {
    let result: Node[] = []
    let rendered = false
    for(let item of content) {
      let renderedItem = this.itm(item)
      if (typeof renderedItem === 'undefined')
        continue
      if (renderedItem instanceof Node) {
        result.push(renderedItem)
      } else {
        result.push(...renderedItem)
      }
      rendered = true
    }
    if (!rendered) {
      result.push(newText(''))
    }
    return result
  }

  // рендерим dom элемент
  dom(tagName: string, attrs?: {}, children?: Iterable<Content>): DOM {
    let result = document.createElement(tagName)

    if (attrs) {
      let allAttrs: any = attrs   
      let plainAttrs: any = {}  
      Object.keys(allAttrs).forEach(key => {
        // @ts-ignore
        if (allAttrs[key].isRay) {
          let $value = allAttrs[key] 
          Viewer.new(() => {
            let value = $value();
            (result as any)[key] = value
          })
        } else {
          plainAttrs[key] = allAttrs[key]
        }
      })
      Object.assign(result, plainAttrs)
    }

    if (children) {
      let chidlren = this.iter(children)
      result.append(...chidlren)
    }

    return result
  }

  // получаем элементы
  comp(content: Tag): DOM {
    // let { tagName, attrs, children } = content
    let tagName = content.tagName, attrs = content.attrs, children = content.children
    if (typeof tagName === 'string') {
      return this.dom(tagName, attrs || {}, children)
    }

    if ((tagName as Tag).isTag) {
      let innerTag = tagName as Tag
      return this.comp({
        tagName: innerTag.tagName,
        attrs: Object.assign({}, innerTag.attrs, attrs), 
        children,
        isTag: true
      })
    }

    let Component = tagName as Function
    let props = Object.assign({}, attrs, { children })
    return this.itm(Component(props))
  }

  view($content: Ray<Content>): DOM {
    let oldResult: DOM | undefined

    let $result = View.new(() => {
      let content = $content()
      if (typeof content === 'undefined') { return [] }
      let result = this.itm(content as Content)
      update(oldResult, result)
      return oldResult = result
    })
    
    return $result() as DOM
  }

  itm(content: Content): DOM {
    if (typeof content === 'undefined') {
      return newText('')
    }
    if (typeof content === 'boolean') {
        return newText(('' + content) as string)
    }    
    if (typeof content === 'number') {
        return newText(('' + content) as string)
    }
    if (typeof content === 'string') {
      return newText(content as string)
    }
    if ((content as Tag).isTag) {
      return this.comp(content as Tag)
    }
    if (typeof content === 'function') {
      return this.view(content as Ray<Content>)
    }
    // @ts-ignore
    if(content?.[Symbol.iterator]) {
      return this.iter(content as Iterable<Content>)
    }
    throw 'Not implemented'
  }

  render(content: Content) {
    clean(this.root)
    let dom = this.itm(content)
    if (typeof dom === 'undefined') {

    } else if (dom instanceof Node) {
      this.root.appendChild(dom)
    } else {
      this.root.append(...dom)
    }
  }
}
