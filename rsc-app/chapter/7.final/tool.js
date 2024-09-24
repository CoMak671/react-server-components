import { readFile } from 'fs/promises';
import { renderToString } from 'react-dom/server';
import { stringifyJSX, parseJSX } from '../../tool.js';

export async function sendHtmlWithJsx(res, clientJSXString) {
  const clientJSX = JSON.parse(clientJSXString, parseJSX);
  let html = renderToString(clientJSX);

  html += `<script>window.__INITIAL_CLIENT_JSX_STRING__ = `;
  html += JSON.stringify(clientJSXString).replace(/</g, '\\u003c');
  html += `</script>`;
  html += `
    <script type="importmap">
      {
        "imports": {
          "react": "https://esm.sh/react@18.3.1?dev",
          "react-dom/client": "https://esm.sh/react-dom@18.3.1/client?dev"
        }
      }
    </script>
    <script type="module" src="/client.js"></script>
  `;
  res.setHeader('Content-Type', 'text/html');
  res.end(html);
}

export async function sendJSX(res, jsx) {
  const clientJSX = await renderJSXToClientJSX(jsx);
  const clientJSXString = JSON.stringify(clientJSX, stringifyJSX);
  res.setHeader('Content-Type', 'application/json');
  res.end(clientJSXString);
}

async function renderJSXToClientJSX(jsx) {
  if (
    typeof jsx === 'string' ||
    typeof jsx === 'number' ||
    typeof jsx === 'boolean' ||
    jsx == null
  ) {
    // Don't need to do anything special with these types.
    return jsx;
  } else if (Array.isArray(jsx)) {
    // Process each item in an array.
    return Promise.all(jsx.map((child) => renderJSXToClientJSX(child)));
  } else if (jsx != null && typeof jsx === 'object') {
    if (jsx.$$typeof === Symbol.for('react.element')) {
      if (typeof jsx.type === 'string') {
        // This is a component like <div />.
        // Go over its props to make sure they can be turned into JSON.
        return {
          ...jsx,
          props: await renderJSXToClientJSX(jsx.props),
        };
      } else if (typeof jsx.type === 'function') {
        // This is a custom React component (like <Footer />).
        // Call its function, and repeat the procedure for the JSX it returns.
        const Component = jsx.type;
        const props = jsx.props;
        const returnedJsx = await Component(props);
        return renderJSXToClientJSX(returnedJsx);
      } else throw new Error('Not implemented.');
    } else {
      // This is an arbitrary object (for example, props, or something inside of them).
      // Go over every value inside, and process it too in case there's some JSX in it.
      return Object.fromEntries(
        await Promise.all(
          Object.entries(jsx).map(async ([propName, value]) => [
            propName,
            await renderJSXToClientJSX(value),
          ])
        )
      );
    }
  } else throw new Error('Not implemented');
}

export async function sendScript(res, filename) {
  const content = await readFile(filename, 'utf8');
  res.setHeader('Content-Type', 'text/javascript');
  res.end(content);
}
