import { $, $Interface } from "./$"
import { Viewer } from "./Viewer"

type ComputeFunction<T> = () => T | undefined

export interface ViewInterface<T> extends Ray<T> {
  (): T | undefined
}

export class View<T> {
  viewer: Viewer
  $value: $Interface<T>
  
  private constructor(computeFunction: ComputeFunction<T>) {
    this.$value = $.new()
    this.viewer = Viewer.new(() => {
      let newValue = computeFunction()
      this.$value(newValue)
    })
  }

  call(self: ViewInterface<T>): T | undefined {
    return this.$value()
  }

  public static new<T>(computeFunction: ComputeFunction<T>): ViewInterface<T> {
    let instance = new View<T>(computeFunction)
    let self: any = () => instance.call(self)
    self.isRay = true
    return self
  }
}
