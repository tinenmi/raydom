interface State<T> extends Ray<T> {
    (newValue?: T): T
}

export class $<T>{
  value: T

  private constructor(initialValue: T) {
    this.value = initialValue
  }

  call(newValue?: T): T {
    if (newValue) {
      this.value = newValue
    }
    return this.value
  }

  public static new<T>(initialValue: T): State<T> {
    const instance = new $<T>(initialValue)
    return (newValue?: T) => instance.call(newValue)
  }
}
