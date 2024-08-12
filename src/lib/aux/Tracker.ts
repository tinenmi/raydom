import { GC } from "./GC"
import { Linkage } from "./Linkage"
import { peek } from "../helpers/peek"

export interface Target {
  poke: () => void
  garbage: () => void
}

export abstract class Tracker {
  static targets: Target[] = []
  static l = new Linkage()
  
  static GC = new GC()

  static tease(ray: Ray<any>) {
    let lastTarget = peek(Tracker.targets)
    if (!lastTarget) { return }
    Tracker.l.bond(lastTarget, ray)
  }

  static reg(child: Target) {
    Tracker.GC.reg(Tracker.targets, child)
  }

  static purge(parent: Target) {
    Tracker.GC.purge(parent, garbaged => Tracker.l.unbond(garbaged))
  }
}
