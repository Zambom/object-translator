/**
 * Check is element passed is of delared type
 * @param {*} element 
 * @param {String} targetType 
 * @returns {boolean}
 */
function isOfType (element, targetType) {
  if (targetType === 'array') {
    return Array.isArray(element)
  }

  return typeof element === targetType
}

/**
 * Check if object passed is really an object
 * @param {Object} object 
 */
function validateObject (object) {
  if (Array.isArray(object)) {
    throw new Error("Invalid property type. 'Array' passed")
  }

  if (!isOfType(object, 'object')) {
    throw new Error(`Invalid property type. '${typeof object}' passed`)
  }
}

/**
 * Check if object has declare property
 * @param {Object} object 
 * @param {String} prop 
 * @returns {boolean}
 */
function objectHasProperty (object, prop) {
  return Object.prototype.hasOwnProperty.call(object, prop)
}

/**
 * Determine the new value of a property. Can be the new one passed or remain the same
 * @param {*} mappedValue // New value of the property. May be an object with an array of props to don't change
 * @param {*} originalValue // The original value of the property
 * @param {String} prop // Property that holds the value to be change
 * @returns // The new value of the property
 */
function replaceValues (mappedValue, originalValue, prop) {
  if (isOfType(mappedValue, 'object')) {
    const exclude = mappedValue?.exclude

    if (exclude?.length) {
      const shouldKeepValue = exclude.includes(prop)

      if (!shouldKeepValue) {
        return mappedValue.replacement
      }
    }
  } else if (isOfType(mappedValue, 'string')) {
    return mappedValue
  }

  return originalValue
}

module.exports = {
  isOfType,
  validateObject,
  objectHasProperty,
  replaceValues
}