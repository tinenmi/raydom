import { cast } from "./cast"

export let lense = (propName: string | number) => cast((x: any) => x ? x[propName] : [])
