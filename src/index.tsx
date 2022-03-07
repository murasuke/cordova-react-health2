import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import 'semantic-ui-css/semantic.min.css';
import App from './App';
import 'utils/initFirebase';

const startApp = () => {
  ReactDOM.render(
    <React.StrictMode>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </React.StrictMode>,
    document.getElementById('root'),
  );
};

if ((window as any).cordova) {
  document.addEventListener('deviceready', startApp, false);
} else {
  startApp();
}
