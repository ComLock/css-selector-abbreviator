import renderSelector from './renderSelector.es';

export default function generate (tokens) {
  const sequences = [];

  // tokens.forEach((token) => {

  for (const token of tokens) {
    if (token.type === 'selector') {
      sequences.push(renderSelector(token));
    } else if (token.type === 'descendantCombinator') {
      sequences.push(' ');
    } else if (token.type === 'childCombinator') {
      sequences.push(' > ');
    } else if (token.type === 'adjacentSiblingCombinator') {
      sequences.push(' + ');
    } else if (token.type === 'generalSiblingCombinator') {
      sequences.push(' ~ ');
    } else {
      throw new Error('Unknown token.');
    }
  }

  // });

  return sequences.join('');
}
