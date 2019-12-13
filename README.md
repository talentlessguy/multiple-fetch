# multiple-fetch

![npm bundle size](https://img.shields.io/bundlephobia/min/multiple-fetch?style=flat-square)
![npm](https://img.shields.io/npm/v/multiple-fetch?style=flat-square) ![npm type definitions](https://img.shields.io/npm/types/multiple-fetch?style=flat-square) ![npm](https://img.shields.io/npm/dt/multiple-fetch?style=flat-square)

Make multiple fetch requests and structurize responses.

## Installation

```sh
# pnpm / npm
pnpm i multiple-fetch isomorhpic-unfetch
# yarn
yarn add multiple-fetch isomorhpic-unfetch
```

## Example

```js
import 'isomorhpic-unfetch'
import multiFetch from 'multifetch'

const urls = ['todos', 'comments']

const results = await multiFetch(
  urls,
  {
    method: 'GET',
    headers: {
      token: 'lol'
    }
  },
  { parse: 'json', domain: 'https://jsonplaceholder.typicode.com/' }
)

console.log(results)

/*

{
  "results": {
    "todos": [...]
  },
  "errors: [{
    "response": {
      status: 404,
      ...
    }
    "url: "https://jsonplaceholder.typicode.com/comments"
  }],
  "serverErrors": []
}

*/
```
