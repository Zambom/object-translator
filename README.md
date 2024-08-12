# object-translator

> A simple package to easily translate object keys and values

## Installation

npm i object-translator

## Usage

### For properties

Import the pachage

```js
import { translateProperties } from 'object-translator'

const testingObj = {
  propA: "prop",
  propB: "prop",
  propC: {
    child: "aaaa",
  },
  propD: ["a", "b", "c"],
  propE: [
    {
      childItem: "value",
      childItem2: "value 2",
    },
    {
      second: "second value",
      second2: "second value 2",
    },
  ],
  propF: [
    {
      childItem: "value",
      childItem2: "value 2",
    },
    {
      childItem: "second value",
      childItem2: "second value 2",
    },
  ],
  propG: ["value", "secondValue"],
};
```

Declare the mappings object

```js
const mappings = {
  propA: "newProp",
  propB: "newPropB",
  propC: {
    keyName: "newPropC",
    children: {
      child: "renamed",
    },
  },
  propD: "newPropD",
  propE: {
    keyName: "newPropE",
    children: [
      {
        itemIndex: 0,
        props: {
          childItem: "renamedItem",
          childItem2: "renamedItem2",
        },
      },
      {
        itemIndex: 1,
        props: {
          second: "renamedSecond",
          second2: "renamedSecond2",
        },
      },
    ],
  },
  propF: {
    keyName: "newPropF",
    children: {
      childItem: "renamedAll",
      childItem2: "renamedAll2",
    },
  },
};
```

Call the function passing the target object and the mappings

```js
translateProperties(targetObject, mappings)
```

### For values

```js
import { translateValues } from 'object-translator'

const mappingValues = {
  value: "newValue",
  prop: {
    replacement: "newProp",
    exclude: ["newPropB"],
  },
};

translateValues(targetObject, mappingValues)
```

### For both properties and values

```js
import { translate } from 'object-translator'

translate(targetObject, mappings, mappingValues)
```