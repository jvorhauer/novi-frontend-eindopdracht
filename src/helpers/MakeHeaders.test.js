const makeHeaders = require('./MakeHeaders');

test('make headers with token', () => {
  expect(makeHeaders('test')).toEqual({
    'headers': {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Bearer test`,
      'Access-Control-Allow-Origin': '*'
    }
  });
});


