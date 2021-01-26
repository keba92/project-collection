import React, {Suspense} from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { Auth0Provider } from '@auth0/auth0-react';
import './i18n';
import { Spinner } from 'react-bootstrap';

const domain = process.env.REACT_APP_AUTH0_DOMAIN;
const clientId = process.env.REACT_APP_AUTH0_CLIENT_ID;

ReactDOM.render(
  <Suspense fallback={<Spinner animation="border" variant="primary" />}>
    <Auth0Provider
    domain={domain}
    clientId={clientId}
    redirectUri={window.location.origin}
    audience="https://dev-lma8p4gy.eu.auth0.com/api/v2/"
    scope="read:current_user update:current_user_metadata">
    <App />
  </Auth0Provider>
  </Suspense>,
  document.getElementById('root')
);
