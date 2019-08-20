import setProps from './setProps.js';

export default function createElement(tagName, props, children) {
  let element = document.createElement(tagName);
  setProps(element, props);
  if (children instanceof HTMLElement) {
    element.appendChild(children);
  } else if (typeof children === 'string' || typeof children === 'number') {
    element.appendChild(document.createTextNode(children));
  } else if (Array.isArray(children)) {
    children.forEach(child => {
      element.appendChild(child);
    });
  }

  return element;
}
