// @flow

import test from 'ava';
import abbreviate from '../lib/abbreviate';

// import abbreviate from '../dist';

const selectors = {
  '.a:focus': 'a-f'
};

for (const [input, output] of Object.entries(selectors)) {
  // test('\ninput:\t' + input + '\noutput:\t' + output, (t) => {
  if (typeof output !== 'string') {
    throw new TypeError('Unexpected state.');
  }
  test(`\ninput:\t${input}\noutput:\t${output}`, (t) => {
    t.true(output === abbreviate(input));
  });
}
