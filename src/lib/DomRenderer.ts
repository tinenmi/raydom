type Content = string | Iterable<Content>

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
      this.render(item)
    }
  }

  render(content: Content) {
    if (typeof content === 'string') {
      this.renderString(content as string)
      return
    }
    this.renderIterable(content as Iterable<Content>)
  }
}
