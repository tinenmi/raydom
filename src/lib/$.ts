import { Tracker } from "./Tracker"

interface State<T> extends Ray<T> {
    (newValue?: T): T
}

export class $<T>{
  value: T

  private constructor(initialValue: T) {
    this.value = initialValue
  }

  call(self: State<T>, newValue?: T): T {
    if (newValue) {
      this.value = newValue
      Tracker.poke(self)
    } else {
      Tracker.tease(self)
    }
    return this.value
  }

  public static new<T>(initialValue: T): State<T> {
    let instance = new $<T>(initialValue)
    let self = (newValue?: T) => instance.call(self, newValue)
    return self
  }
}
