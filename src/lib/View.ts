type ComputeFunction<T> = () => T | undefined

interface ViewInterface<T> extends Ray<T> {
  (): T | undefined
}

export class View<T> {
  value?: T
  
  constructor(computeFunction: ComputeFunction<T>) {
    this.value = computeFunction()
  }

  call(self: ViewInterface<T>): T | undefined {
    return this.value
  }

  public static new<T>(computeFunction: ComputeFunction<T>): ViewInterface<T> {
    let instance = new View<T>(computeFunction)
    let self = () => instance.call(self)
    return self
  }
}
