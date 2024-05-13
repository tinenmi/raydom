import { Target, Tracker } from "./Tracker"

type Reaction = (self: Viewer) => void

export class Viewer implements Target {
  response: Reaction
  
  constructor(response: Reaction) {
    this.response = response
    this.poke()
  }

  poke() {
    Tracker.targets.push(this)
    Tracker.linkage.unbond(this)
    this.response(this)
    Tracker.targets.pop()
  }
}
