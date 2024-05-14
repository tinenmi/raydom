export type Content = string | Iterable<Content> | Ray<Content> | Tag

export interface Tag {
  tagName: string
  attrs?: {}
  children?: Iterable<Content>
}

export let T = (
  tagName: string,
  attrs?: {} | Iterable<Content>,
  children?: Iterable<Content>
): Tag => {
  // @ts-ignore
  if (!children && attrs?.[Symbol.iterator]) {
    return { tagName, children: attrs as Iterable<Content> }
  }
  return { tagName, attrs: attrs as {}, children }
}