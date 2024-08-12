import { Tracker } from "./aux/Tracker";

export interface $Interface<T> extends Ray<T> {
  (newValue?: T): T | undefined;
}

export class $<T> {
  value?: T;

  private constructor(initialValue?: T) {
    this.value = initialValue;
  }

  call(self: $Interface<T>, newValue?: T): T | undefined {
    if (typeof newValue !== "undefined") {
      if (this.value !== newValue) {
        this.value = newValue;
        Tracker.l.poke(self);
      }
    } else {
      Tracker.tease(self);
    }
    return this.value;
  }

  public static new<T>(initialValue?: T): $Interface<T> {
    let instance = new $<T>(initialValue);
    let self: any = (newValue?: T) => instance.call(self, newValue);
    self.isRay = true;
    return self;
  }
}
