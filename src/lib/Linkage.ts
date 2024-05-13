import { Target } from "./Tracker"

export class Linkage {
  map: Map<Ray<any>, Set<Target>> = new Map()

  bond(target: Target, ray: Ray<any>) {
    if (this.map.has(ray)) {
      this.map.get(ray)?.add(target)
    } else {
      this.map.set(ray, new Set([target]))
    }
  }

  unbond(target: Target) {
    for(let targetSet of this.map.values()) {
      targetSet.delete(target)
    }
  }
}
