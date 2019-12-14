import 'isomorphic-unfetch'
import multiFetch from '../src/index'

const URL = 'https://jsonplaceholder.typicode.com'

describe('404 Request', () => {
  it('should put 404 into response errors', async () => {
    const urls = ['some_404']

    const results = await multiFetch(urls, undefined, { domain: URL })

    expect(results.serverErrors[0].response.status).toBe(404)
  })
  it('should put 404 into request errors', async () => {
    const urls = ['random_page']

    const results = await multiFetch(urls, undefined, {
      domain: 'https://0NrQgjZDdMy.com'
    })

    expect(results.errors).not.toBeNull()
  })
})

describe('Basic example', () => {
  it('should fetch data and put stuff into `results` property', async () => {
    const urls = ['posts']

    const results = await multiFetch(urls, undefined, { domain: URL })

    expect(results.results[0].posts).not.toBeNull()
  })
})
