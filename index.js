const { isOfType, objectHasProperty, replaceValues, validateObject } = require("./utils")

/**
 * Replace properties of an object for the new ones
 * @param {Object} targetObj // Object that have the properties changed
 * @param {Object} mappings // Object that holds the mappings to be made
 */
function translateProperties (targetObj, mappings) {
  // Validating parameters
  validateObject(targetObj)
  validateObject(mappings)

  // Passing through all properties in the mappings
  Object.keys(mappings).forEach(prop => {
    // Only change if property exists in the target
    if (objectHasProperty(targetObj, prop)) {
      if (isOfType(mappings[prop], 'string')) {
        const propValue = Object.getOwnPropertyDescriptor(targetObj, prop)

        Object.defineProperty(targetObj, mappings[prop], propValue)

        delete targetObj[prop]
      } else if (isOfType(mappings[prop], 'object')) {
        const propValue = Object.getOwnPropertyDescriptor(targetObj, prop)
        const newKey = mappings[prop].keyName

        if (isOfType(propValue.value, 'array')) {
          if (isOfType(mappings[prop].children, 'array')) {
            mappings[prop].children.forEach((el, index) => {
              const itemIndex = el.itemIndex || index

              translateProperties(propValue.value[itemIndex], el.props)
            })
          } else if (isOfType(mappings[prop].children, 'object')) {
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

/**
 * Replace values of an object for new ones
 * @param {*} targetObj // Object that have the values changed
 * @param {*} mappings Object that holds the mappings to be made
 */
function translateValues (targetObj, mappings) {
  // Validating parameters
  validateObject(targetObj)
  validateObject(mappings)

  // Passing through all properties in the target object
  Object.keys(targetObj).forEach(prop => {
    const propValue = targetObj[prop]

    if (isOfType(propValue, 'string')) {
      if (objectHasProperty(mappings, propValue)) {
        targetObj[prop] = replaceValues(mappings[propValue], propValue, prop)
      }
    } else if (isOfType(propValue, 'array')) {
      targetObj[prop] = propValue.map(el => {
        if (isOfType(el, 'string')) {
          if (objectHasProperty(mappings, el)) {
            return replaceValues(mappings[el], el, prop)
          }
        } else if (isOfType(el, 'object')) {
          translateValues(el, mappings)
        }

        return el
      })
    } else if (isOfType(propValue, 'object')) {
      translateValues(propValue, mappings)
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