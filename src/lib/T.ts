export type Content = string | Iterable<Content> | Ray<Content> | Tag

export interface Tag {
  tagName: string
  children?: Iterable<Content>
}

export let T = (tagName: string, children?: Iterable<Content>) => {
  return { tagName, children }
}
