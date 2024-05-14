type Content = string | Iterable<Content>

let clearChildren = (el: Element) => { while(el.lastChild) el.removeChild(el.lastChild) }

export class DomRenderer {
  renderTarget: Element

  constructor(renderTarget: Element) {
    this.renderTarget = renderTarget
  }

  renderString(content: string) {
    this.renderTarget.append(content)
  }

  renderIterable(content: Iterable<Content>) {
    for(let item of content) {
      this.renderItem(item)
    }
  }

  renderItem(content: Content) {
    if (typeof content === 'string') {
      this.renderString(content as string)
      return
    }
    this.renderIterable(content as Iterable<Content>)
  }

  render(content: Content) {
    clearChildren(this.renderTarget)
    this.renderItem(content)
  }
}
