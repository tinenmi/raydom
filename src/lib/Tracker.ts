import { Linkage } from "./Linkage"



export interface Target {
  poke: () => void
}

export abstract class Tracker {
  static targets: Target[] = []
  static linkage = new Linkage()
    
  static tease(ray: Ray<any>) {

  }
}
