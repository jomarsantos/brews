export const TEST = 'TEST';
export function testAction(word) {
  return {
    type: TEST,
    word: word
  };
}
