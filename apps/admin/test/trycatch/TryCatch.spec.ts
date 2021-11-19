import { tryPromise } from '../../src/trycatch/tryPromise';
import { tryAwait } from '../../src/trycatch/tryAwait';

describe('Try Catch Test', () => {
  it('promise test', async () => {
    await tryPromise();
  });

  it('async test', async () => {
    await tryAwait();
  });
});
