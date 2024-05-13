import { Target } from "./Tracker"

export class Linkage {
  map: Map<Ray<any>, Target> = new Map()

  bond(target: Target, ray: Ray<any>) {
    this.map.set(ray, target)
  }
}
