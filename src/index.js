import React from 'react';
import ReactDOM from 'react-dom';
import 'react-quill/dist/quill.snow.css';
import 'core-js';
import {
  BrowserRouter as Router,
} from "react-router-dom";
import App from './app/App';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { Provider } from "react-redux";
import store from './redux/store';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';

ReactDOM.render(
  <Provider store={store}>
    <Router>

      <App />

    </Router>
  </Provider>,
  document.getElementById('root')
);
serviceWorkerRegistration.register();
reportWebVitals();