import { Target, Tracker } from "./Tracker"

type Reaction = (self: Viewer) => void
type Cleanup = () => void

export class Viewer implements Target {
  response: Reaction
  oncleanup?: Cleanup
  poked: boolean

  constructor(response: Reaction) {
    this.poked = false
    this.response = response
    this.poke()
  }

  poke() {
    if (!this.poked) {
      this.poked = true
    } else if (this.oncleanup) {
      this.oncleanup()
    }
    Tracker.targets.push(this)
    Tracker.linkage.unbond(this)
    this.response(this)
    Tracker.targets.pop()
  }
}
