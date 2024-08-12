export function isOfType (element, targetType) {
  if (targetType === 'array') {
    return Array.isArray(element)
  }

  return typeof element === targetType
}

export function validateObject (object) {
  if (Array.isArray(object)) {
    throw new Error("Invalid property type. 'Array' passed")
  }

  if (!isOfType(mappings, 'object')) {
    throw new Error(`Invalid property type. '${typeof object}' passed`)
  }
}

export function objectHasProperty (object, prop) {
  return Object.prototype.hasOwnProperty.call(object, prop)
}

export function replaceValues (mappedValue, originalValue, prop) {
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