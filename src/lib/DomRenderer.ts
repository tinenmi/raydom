export class DomRenderer {
  renderTarget: Element

  constructor(renderTarget: Element) {
    this.renderTarget = renderTarget
  }

  renderString(content: string) {
    this.renderTarget.append(content)
  }

  render(content: string | Iterable<string>) {
    if (typeof content[Symbol.iterator] === 'function') {
      for(let item of content) {
        this.renderString(item as string)
      }
      return
    }
    this.renderString(content as string)
  }
}
