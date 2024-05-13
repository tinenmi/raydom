interface State<T> extends Ray<T> {

}

export class $<T>{
  value: T

  private constructor(initialValue: T) {
    this.value = initialValue
  }

  call(): T {
    return this.value
  }

  public static new<T>(initialValue: T): State<T> {
    const instance = new $<T>(initialValue)
    return () => instance.call()
  }
}
