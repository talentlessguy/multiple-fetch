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
  parse?: 'json' | 'text'
  domain?: string
}

const multiFetch = async (
  urls: string[],
  fetchOptions?: RequestInit,
  opts?: MultiFetchOptions
): Promise<MultiFetchResponse> => {
  const data: any[] = []
  const serverErrors: MultifetchServerError[] = []
  const errors: MultifetchError[] = []
  const promises: Promise<any>[] = []

  for (let url of urls) {
    let reqUrl
    if (opts?.domain) reqUrl = `${opts.domain}/${url}`
    else reqUrl = url
    promises.push(
      fetch(reqUrl, fetchOptions).catch(err => {
        errors.push({
          error: err,
          url
        })
        return null
      })
    )
  }

  const responses: Response[] = await Promise.all(promises)

  for (let i = 0; i < responses.length; i++) {
    const res = responses[i]
    const url = urls[i]

    if (res) {
      const statusFirst = res.status.toString()[0]

      if (statusFirst !== '2' && statusFirst !== '3') {
        serverErrors.push({
          response: res,
          url
        })
      }

      const parsed = await res[opts?.parse || 'json']()

      data.push({
        [url]: parsed
      })
    }
  }

  return {
    results: data,
    serverErrors,
    errors
  }
}

export default multiFetch
