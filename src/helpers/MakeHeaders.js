function makeHeaders(token) {
  return {
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
      'Access-Control-Allow-Origin': '*'
    }
  }
}

export default makeHeaders;