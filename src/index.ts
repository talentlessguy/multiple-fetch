export interface MultiFetchResponse {
  results: any[]
  serverErrors: MultifetchServerError[]
  errors: MultifetchError[]
}

export interface MultifetchServerError {
  response: Response
  url: string
}

export interface MultifetchError {
  error: Error
  url: string
}

export interface MultiFetchOptions {
  parse: 'json' | 'text'
  domain: string
}

const multiFetch = async (
  urls: string[],
  fetchOptions: RequestInit,
  opts: MultiFetchOptions
): Promise<MultiFetchResponse> => {
  const data: any[] = []
  const serverErrors: MultifetchServerError[] = []
  const errors: MultifetchError[] = []

  for (let url of urls) {
    let res, parsed, reqUrl

    if (opts.domain) reqUrl = `${opts.domain}/${url}`
    else reqUrl = url

    try {
      res = await fetch(reqUrl, fetchOptions)

      const statusClass = res.status.toString()[0]

      // status code is not 2XX or 3XX
      if (statusClass !== '2' && statusClass !== '3') {
        serverErrors.push({
          response: res,
          url
        })
      }

      if (opts.parse === 'json') {
        parsed = await res.json()
      } else {
        parsed = await res.text()
      }
      data.push({
      	[url]: parsed
      })
    } catch (e) {
      errors.push({
        error: e,
        url: reqUrl
      })
    }
  }

  return {
    results: data,
    errors,
    serverErrors
  }
}

export default multiFetch
