import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import App from './App';
import store from './store/store';
import { makeServer } from './mirageServer';


const container = document.getElementById('root');
const root = createRoot(container);

if (process.env.NODE_ENV === "development") {
  makeServer({ environment: "development" });
}
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
