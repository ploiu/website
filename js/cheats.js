const enteredKeys = new Array(10);
enteredKeys.fill(undefined);
// TODO this doesn't work on mobile browsers
const validCodes = {
  [
    [
      'ArrowUp',
      'ArrowUp',
      'ArrowDown',
      'ArrowDown',
      'ArrowLeft',
      'ArrowRight',
      'ArrowLeft',
      'ArrowRight',
      'b',
      'a',
    ]
  ]: () => document.querySelector('html').classList.add('konami-code'),
};
document.querySelector('html').addEventListener('keyup', (e) => {
  if (enteredKeys.length === 10) {
    enteredKeys.shift();
  }
  enteredKeys.push(e.key);
  // only check for code if entered keys is filled up
  if (!enteredKeys.includes(undefined)) {
    for (const [codes, action] of Object.entries(validCodes)) {
      if (enteredKeys.toString() === codes.toString()) {
        action.apply();
      }
    }
  }
});
