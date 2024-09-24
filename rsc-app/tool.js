export function stringifyJSX(key, value) {
  if (value === Symbol.for('react.element')) {
    // We can't pass a symbol, so pass our magic string instead.
    return '$RE'; // Could be arbitrary. I picked RE for React Element.
  } else if (typeof value === 'string' && value.startsWith('$')) {
    // To avoid clashes, prepend an extra $ to any string already starting with $.
    return '$' + value;
  } else {
    return value;
  }
}

export function parseJSX(key, value) {
  if (value === '$RE') {
    return Symbol.for('react.element');
  } else if (typeof value === 'string' && value.startsWith('$$')) {
    return value.slice(1);
  } else {
    return value;
  }
}
