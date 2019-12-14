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

    expect(results.errors[0]).toMatchObject({
      error: {
        message:
          'request to https://0nrqgjzddmy.com/random_page failed, reason: getaddrinfo ENOTFOUND 0nrqgjzddmy.com',
        type: 'system',
        errno: 'ENOTFOUND',
        code: 'ENOTFOUND'
      },
      url: 'random_page'
    })
  })
})

describe('Basic example', () => {
  it('should fetch data and put stuff into `results` property', async () => {
    const urls = ['posts']

    const results = await multiFetch(urls, undefined, { domain: URL })

    expect(results.results.posts[0]).toMatchObject({
      userId: 1,
      id: 1,
      title:
        'sunt aut facere repellat provident occaecati excepturi optio reprehenderit',
      body:
        'quia et suscipit\n' +
        'suscipit recusandae consequuntur expedita et cum\n' +
        'reprehenderit molestiae ut ut quas totam\n' +
        'nostrum rerum est autem sunt rem eveniet architecto'
    })
  })
})
