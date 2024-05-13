import { Tracker } from "./Tracker"

interface $Interface<T> extends Ray<T> {
  (newValue?: T): T | undefined
}

export class $<T>{
  value: T

  private constructor(initialValue: T) {
    this.value = initialValue
  }

  call(self: $Interface<T>, newValue?: T): T {
    if (newValue) {
      this.value = newValue
      Tracker.linkage.poke(self)
    } else {
      Tracker.tease(self)
    }
    return this.value
  }

  public static new<T>(initialValue: T): $Interface<T> {
    let instance = new $<T>(initialValue)
    let self = (newValue?: T) => instance.call(self, newValue)
    return self
  }
}
