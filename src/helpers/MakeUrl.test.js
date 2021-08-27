const makeUrl = require('./MakeUrl');

test('make url with path', () => {
  expect(
    makeUrl('/test')
  ).toBe('https://sheltered-gorge-50410.herokuapp.com/test');
});

test('make url with null path', () => {
  expect(
    makeUrl(null)
  ).toBe('https://sheltered-gorge-50410.herokuapp.com/')
});

test('make url with empty path', () => {
  expect(
    makeUrl('')
  ).toBe('https://sheltered-gorge-50410.herokuapp.com/');
});