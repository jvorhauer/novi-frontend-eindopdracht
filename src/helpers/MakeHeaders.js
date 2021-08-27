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

module.exports = makeHeaders;
export default makeHeaders;