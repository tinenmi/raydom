type Reaction = (self: Viewer) => void

export class Viewer {
  response: Reaction
  
  constructor(response: Reaction) {
    this.response = response
    this.poke()
  }

  poke() {
    this.response(this)
  }
}
