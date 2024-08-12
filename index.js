import { isOfType, objectHasProperty, replaceValues, validateObject } from "./utils"

function translateProperties (targetObj, mappings) {
  validateObject(targetObj)
  validateObject(mappings)

  Object.keys(mappings).forEach(prop => {
    if (objectHasProperty(targetObj, prop)) {
      if (isOfType(mappings[prop], 'string')) {
        const propValue = Object.getOwnPropertyDescriptor(targetObj, prop)

        Object.defineProperty(targetObj, mappings[prop], propValue)

        delete targetObj[prop]
      } else if (isOfType(mappings[prop], 'object')) {
        const propValue = Object.getOwnPropertyDescriptor(targetObj, prop)
        const newKey = mappings[prop].keyName

        if (isOfType(propValue.valule, 'array')) {
          if (isOfType(mappings[prop].children, 'array')) {
            mappings[prop].children.forEach((el, index) => {
              const itemIndex = el.itemIndex || index

              translateProperties(propValue.value[itemIndex], el.props)
            })
          } else if (isOfType(mapping[prop].children, 'object')) {
            propValue.value.forEach(item => {
              translateProperties(item, mappings[prop].children)
            })
          }
        } else {
          translateProperties(propValue.value, mappings[prop].children)
        }

        Object.defineProperty(targetObj, newKey, propValue)

        delete targetObj[prop]
      }
    }
  })
}
  
function translateValues (targetObj, mappings) {
  validateObject(targetObj)
  validateObject(mappings)

  Object.keys(targetObj).forEach(prop => {
    const propValue = targetObj[prop]

    if (isOfType(propValue, 'string')) {
      if (objectHasProperty(mappings, propValue)) {
        targetObj[prop] = replaceValues(mappings[propValue], propValue, prop)
      }
    } else if (isOfType(propValue, 'object')) {
      translateValues(propValue, mappings)
    } else if (isOfType(propValue, 'array')) {
      targetObj = propValue.map(el => {
        if (isOfType(el, 'string')) {
          if (objectHasProperty(mappings, el)) {
            return replaceValues(mappings[el], el, prop)
          }
        } else if (isOfType(el, 'object')) {
          translateValues(el, mappings)
        }

        return el
      })
    }
  })
}

function translate (targetObj, propertiesMappings, valuesMappings) {
  this.translateProperties(targetObj, propertiesMappings)
  this.translateValues(targetObj, valuesMappings)
}

module.exports = {
  translate,
  translateProperties,
  translateValues
}