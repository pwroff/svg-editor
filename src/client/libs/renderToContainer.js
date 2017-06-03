/**
 * Created by Leonid on 28/04/17.
 */
import ReactDOM from 'react-dom';

export default (component, ...rest) => {
  let callback;
  let attributes = {
    class: 'container',
  };

  rest.find((e) => {
    if (typeof e === 'function') {
      callback = e;
    } else if (typeof e === 'object') {
      attributes = Object.assign({}, attributes, e);
    }
    return false;
  });

  const container = document.createElement('section');

  Object.keys(attributes).forEach((key) => {
    container.setAttribute(key, attributes[key]);
  });
  document.body.insertBefore(container, document.body.firstElementChild);
  ReactDOM.render(component, container, callback);
};
