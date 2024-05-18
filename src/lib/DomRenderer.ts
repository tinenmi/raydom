import { $ } from "./$"
import { Content, Tag } from "./T"
import { View } from "./View"
import { Viewer } from "./Viewer"

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

let newText = (content: string): Text => {
  return document.createTextNode(content)
}

export class DomRenderer {
  renderTarget: Element

  private constructor(renderTarget: Element) {
    this.renderTarget = renderTarget
  }

  public static new(renderTarget: Element): DomRenderer {
    return new DomRenderer(renderTarget)
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

  newDomElement(tagName: string, attrs?: {}, children?: Iterable<Content>): DOM {
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
      let chidlren = this.newIterable(children)
      result.append(...chidlren)
    }

    return result
  }

  newTag(content: Tag): DOM {
    let { tagName, attrs, children } = content
    if (typeof tagName === 'string') {
      return this.newDomElement(tagName, attrs || {}, children)
    }

    if ((tagName as Tag).isTag) {
      let innerTag = tagName as Tag
      return this.newTag({
        tagName: innerTag.tagName,
        attrs: { ...innerTag.attrs, ...attrs },
        children,
        isTag: true
      })
    }

    let Component = tagName as Function
    let $raydom = $.new<Content>()
    Viewer.new(() => $raydom(Component({ ...attrs, children })))
    return this.newView($raydom)
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
      return this.newTag(content as Tag)
    }
    if (typeof content === 'function') {
      return this.newView(content as Ray<Content>)
    }
    // @ts-ignore
    if(content?.[Symbol.iterator]) {
      return this.newIterable(content as Iterable<Content>)
    }
    throw 'Not implemented'
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
