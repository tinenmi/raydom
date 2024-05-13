export interface Target {
  poke: () => void
}

export abstract class Tracker {
  static targets: Target[] = []
    
  static tease(ray: Ray<any>) {

  }

  static poke(ray: Ray<any>) {

  }
}
