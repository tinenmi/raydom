export type Content = string | Iterable<Content> | Ray<Content> | Tag

export interface Tag {
  isTag: true
  tagName: string | Function | Tag
  attrs?: {}
  children?: Iterable<Content>
}

export let T = (
  tagName: string | Function | Tag,
  attrs?: {} | Iterable<Content>,
  children?: Iterable<Content>
): Tag => {
  // @ts-ignore
  if (!children && attrs?.[Symbol.iterator]) {
    return { isTag: true, tagName, children: attrs as Iterable<Content> }
  }
  return { isTag: true, tagName, attrs: attrs as {}, children }
}
