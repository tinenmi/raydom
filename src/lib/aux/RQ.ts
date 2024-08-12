import { Tracker } from "./Tracker"
import { Viewer } from "../Viewer"

// Response query
export abstract class RQ {
  static set: Set<Viewer> = new Set()
  static running: boolean = false
  static abort(viewer: Viewer) {
    RQ.set.delete(viewer)
  }

  static run(viewer: Viewer) {
    if (RQ.running) {
      RQ.set.add(viewer)
      return
    }
    while(true) {
      RQ.running = true
      Tracker.targets.push(viewer)
      Tracker.l.unbond(viewer)
      viewer.response(viewer)
      let poped = Tracker.targets.pop()
      if (poped !== viewer) { console.error("poped !== viewer") }
      let found = false
      RQ.set.delete(viewer)
      for(let candidate of RQ.set) {
        viewer = candidate
        found = true
        break
      }
      if (!found) { 
        RQ.running = false
        return
      }
    }
  }
}
