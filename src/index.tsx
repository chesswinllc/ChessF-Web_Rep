import * as React from 'react';
import * as ReactDOM from 'react-dom';
import registerServiceWorker from './config/registerServiceWorker';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import { store, history } from './redux';
import './assets/css';
import 'flag-icon-css/css/flag-icon.css'
import App from './App';


ReactDOM.render(
  <Provider store={store} >
    <ConnectedRouter history={history}>
      <App store={store} />
    </ConnectedRouter>
  </Provider>,
  document.getElementById('root') as HTMLElement
);


registerServiceWorker();
