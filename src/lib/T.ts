export interface Tag {
  tagName: string
  children?: Iterable<string>
}

export let T = (tagName: string, children?: Iterable<string>) => {
  return { tagName, children }
}
