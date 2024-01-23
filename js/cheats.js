const enteredKeys = new Array(11);
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
      'Enter',
    ]
  ]: () => document.querySelector('html').classList.add('konami-code'),
};
document.querySelector('html').addEventListener('keyup', (e) => {
  if (enteredKeys.length == 11) {
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
    // reset to prevent from triggering repeatedly
    enteredKeys.fill(undefined);
  }
});
