import { Linkage } from "./Linkage"
import { peek } from "./array-helpers/peek"

export interface Target {
  poke: () => void
}

export abstract class Tracker {
  static targets: Target[] = []
  static linkage = new Linkage()
    
  static tease(ray: Ray<any>) {
    let lastTarget = peek(Tracker.targets)
    if (!lastTarget) { return }
    Tracker.linkage.bond(lastTarget, ray)
  }
}
