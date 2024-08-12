import { RQ } from "./aux/index"
import { Target, Tracker } from "./aux/Tracker"

type Reaction = (self: Viewer) => void
type OnPurge = () => void

export class Viewer implements Target {
  response: Reaction
  onpurge?: OnPurge
  poked: boolean
  garbaged: boolean

  private constructor(response: Reaction) {
    this.poked = false
    this.garbaged = false
    Tracker.reg(this)
    this.response = response
    this.poke()
  }

  poke() {
    if (!this.poked) {
      this.poked = true
    } else {
      // TODO uncomment this.purge()
    }
    RQ.run(this)
  }

  purge() {
    Tracker.purge(this)
    if (!this.onpurge) return
    this.onpurge()
    delete this.onpurge
  }

  garbage() {
    this.garbaged = true
    RQ.abort(this)
    this.purge()
  }

  static new(response: Reaction) {
    return new Viewer(response)
  }
}
