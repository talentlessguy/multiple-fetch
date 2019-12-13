# multiple-fetch

Make multiple fetch request using one function.

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
    "statusCode": 404,
    "status": "Not found",
    "url: "/comments"
  }]
}

*/
```
