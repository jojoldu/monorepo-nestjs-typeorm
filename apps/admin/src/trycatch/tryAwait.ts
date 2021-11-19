import { testPromise } from './testPromise';

export async function tryAwait() {
  try {
    await testPromise();
    console.log('tryAwait 성공');
  } catch (e) {
    console.log('tryAwait 실패\n', e);
  }
}
