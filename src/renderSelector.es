import escapeValue from './escapeValue.es';

export default function renderSelector (selectorToken) {
  const tokens = selectorToken.body;
  const parts = [];

  // tokens.forEach((token) => {

  for (const token of tokens) {
    let part;

    if (token.type === 'universalSelector') {
      // part = '*';
      part = '-';
    } else if (token.type === 'typeSelector') {
      part = token.name;
    } else if (token.type === 'idSelector') {
      // part = '#' + token.name;
      part = `-${token.name}`;
    } else if (token.type === 'classSelector') {
      // part = '.' + token.name;
      part = `-${token.name}`;
    } else if (token.type === 'attributePresenceSelector') {
      // part = '[' + token.name + ']';
      part = `-${token.name}-`;
    } else if (token.type === 'attributeValueSelector') {
      // part = '[' + token.name + token.operator + escapeValue(token.value) + ']';
      // part = `[${token.name}${token.operator}${escapeValue(token.value)}]`;
      part = `[${token.name + token.operator + escapeValue(token.value)}]`;
    } else if (token.type === 'pseudoClassSelector') {
      // part = '-' + token.name;
      part = `-${token.name}`;
      if (token.parameters && token.parameters.length) {
        // part += '(' + token.parameters.map(escapeValue).join(', ') + ')';
        part += `(${token.parameters.map(escapeValue).join(', ')})`;
      }
    } else if (token.type === 'pseudoElementSelector') {
      // part = '::' + token.name;
      part = `-${token.name}`;
    } else {
      throw new Error('Unknown token.');
    }

    parts.push(part);
  }

  // });

  return parts.join('');
}
