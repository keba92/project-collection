import React, {Suspense} from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { useHistory } from "react-router-dom";
import { Auth0Provider } from '@auth0/auth0-react';
import './i18n'

const domain = process.env.REACT_APP_AUTH0_DOMAIN;
const clientId = process.env.REACT_APP_AUTH0_CLIENT_ID;
// eslint-disable-next-line react-hooks/rules-of-hooks
const history = useHistory();

const onRedirectCallback = (appState) => {
  history.push(appState?.returnTo || window.location.pathname);
};

ReactDOM.render(
  <Suspense fallback={(<div>Loading ...</div>)}>
    <Auth0Provider
    domain={domain}
    clientId={clientId}
    redirectUri={window.location.origin}
    audience="https://dev-lma8p4gy.eu.auth0.com/api/v2/"
    scope="read:current_user update:current_user_metadata"
    onRedirectCallback={onRedirectCallback}>
    <App />
  </Auth0Provider>
  </Suspense>,
  document.getElementById('root')
);
