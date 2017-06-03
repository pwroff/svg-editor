import React from 'react';
import PropTypes from 'prop-types';

const Html = ({ title, jsBundle, cssBundle, children }) => (
  <html lang="en">
    <head>
      <meta charSet="utf-8" />
      <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <title>{title}</title>
      {
          ((css) => {
            if (css) {
              return <link type="text/css" rel="stylesheet" href={css} />;
            }
            return null;
          })(cssBundle)
      }
    </head>
    <body>
      {children}
      <script src={jsBundle} />
    </body>
  </html>
);
const { string } = PropTypes;

Html.propTypes = {
  title: string,
  jsBundle: string,
  cssBundle: string,
};
Html.defaultProps = {
  title: 'SVG Drawer',
  jsBundle: '/dist/bundle.js',
  cssBundle: '',
};
export default Html;
