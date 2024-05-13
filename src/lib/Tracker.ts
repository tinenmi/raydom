import { GC } from "./GC"
import { Linkage } from "./Linkage"
import { peek } from "./array-helpers/peek"

export interface Target {
  poke: () => void
  garbage: () => void
}

export abstract class Tracker {
  static targets: Target[] = []
  static linkage = new Linkage()
  
  static GC = new GC()

  static tease(ray: Ray<any>) {
    let lastTarget = peek(Tracker.targets)
    if (!lastTarget) { return }
    Tracker.linkage.bond(lastTarget, ray)
  }

  static registerChild(child: Target) {
    Tracker.GC.registerChild(Tracker.targets, child)
  }

  static purgeChildren(parent: Target) {
    Tracker.GC.purgeChildren(parent, garbaged => Tracker.linkage.unbond(garbaged))
  }
}
