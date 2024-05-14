import { Target } from "./Tracker"

export class GC {
  children = new Map<Target, Set<Target>>()

  registerChild(targets: Target[], child: Target) {
    if (targets.length === 0) { return }
    for(let oldTaret of targets) {
      if (this.children.has(oldTaret)) {
        this.children.get(oldTaret)?.add(child)
      } else {
        this.children.set(oldTaret, new Set([child]))
      }
    }
  }

  purgeChildren(parent: Target, onGarbage: (garbaged: Target) => void) {
    if (!this.children.has(parent)) { return }
    for(let newlyGarbaged of this.children.get(parent) as Set<Target>) {
      newlyGarbaged.garbage()
      onGarbage(newlyGarbaged)
    }
    this.children.delete(parent)
  }
}
