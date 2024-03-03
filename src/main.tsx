// Dependencies
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store';
import Layout from './layout';
import router from './router';

// Create app
const app = ReactDOM.createRoot(document.getElementById('app'));

// Render app
app.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <Layout>
          <React.Suspense>{router}</React.Suspense>
        </Layout>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);
