import React from 'react';
import ReactDOM from 'react-dom';
import Raven from 'raven-js';

import App from './App';

const sentry_key = '9d117eedb2724369b5e1e34f0812521d';
const sentry_app = '210658';
const sentry_url = `https://${sentry_key}@sentry.io/${sentry_app}`;

Raven.config(sentry_url).install();

ReactDOM.render(
  <App />,
  document.getElementById('root')
);
