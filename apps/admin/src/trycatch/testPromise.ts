export function testPromise(): Promise<string> {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      reject(new Error('testPromise 에러납니다'));
    }, 100);
  });
}
