import { testPromise } from './testPromise';

export function tryPromise() {
  try {
    return testPromise().then(() => console.log('tryPromise 성공'));
  } catch (e) {
    console.log('tryPromise 실패\n', e);
  }
}
