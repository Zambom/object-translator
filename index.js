function isOfType(element, targetType) {
  return typeof element === targetType
}

function validateMappings (mappings) {
  if (Array.isArray(mappings)) {
    throw new Error("'mappings' should be an object. 'Array' passed")
  }

  if (!isOfType(mappings, 'object')) {
    throw new Error(`'mappings' should be an object. '${typeof mappings}' passed`)
  }
}

function translateProperties (targetObj, mappings) {
  if (typeof mappings !== typeof {}) {
    throw new Error("'mappings' should be an object.")
  }

  Object.keys(mappings).forEach(prop => {
    if (Object.prototype.hasOwnProperty.call(targetObj, prop)) {
      if (isOfType(mappings[prop], 'string')) {

      }
    }
  })
}
  
function translateValues (targetObj, mappings) {
  if (typeof mappings !== typeof {}) {
    throw new Error("'mappings' should be an object.")
  }
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