import { Target, Tracker } from "./Tracker"

type Reaction = (self: Viewer) => void
type OnPurge = () => void

export class Viewer implements Target {
  response: Reaction
  onpurge?: OnPurge
  poked: boolean
  garbaged: boolean

  constructor(response: Reaction) {
    this.poked = false
    this.garbaged = false
    Tracker.registerChild(this)
    this.response = response
    this.poke()
  }

  poke() {
    if (!this.poked) {
      this.poked = true
    } else {
      this.purge()
    }
    Tracker.targets.push(this)
    Tracker.linkage.unbond(this)
    this.response(this)
    Tracker.targets.pop()
  }

  purge() {
    Tracker.purgeChildren(this)
    if (!this.onpurge) return
    this.onpurge()
    delete this.onpurge
  }

  garbage() {
    this.garbaged = true
    Tracker.purgeChildren(this)
  }
}
