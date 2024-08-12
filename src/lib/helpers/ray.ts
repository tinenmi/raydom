import { View } from "../View"

export let ray = (text: TemplateStringsArray, ...values: any) => {
  return View.new(() => {
    let result = ''
    for(let i = 0; i < text.length; i++) {
      let staticString = text[i]  
      let dynamicValue = values[i]
      if (dynamicValue?.isRay) {
        dynamicValue = dynamicValue()
      }
      if (typeof dynamicValue === 'undefined') {
        result += staticString
      } else {
        result += staticString + dynamicValue
      }
    }
    return result
  })
}
