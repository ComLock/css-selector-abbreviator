import {createParser} from 'scalpel';
import generate from './generate.es';

const parser = createParser();

export default function abbreviate (selector) {
  return generate(parser.parse(selector));
}
