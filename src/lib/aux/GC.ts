import { Target } from "./Tracker"

export class GC {
  map = new Map<Target, Set<Target>>()

  reg(targets: Target[], child: Target) {
    if (targets.length === 0) { return }
    for(let oldTaret of targets) {
      if (this.map.has(oldTaret)) {
        this.map.get(oldTaret)?.add(child)
      } else {
        this.map.set(oldTaret, new Set([child]))
      }
    }
  }

  purge(parent: Target, onGarbage: (garbaged: Target) => void) {
    if (!this.map.has(parent)) { return }
    for(let newlyGarbaged of this.map.get(parent) as Set<Target>) {
      newlyGarbaged.garbage()
      onGarbage(newlyGarbaged)
    }
    this.map.delete(parent)
  }
}
