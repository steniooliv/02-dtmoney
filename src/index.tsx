import React from 'react';
import ReactDOM from 'react-dom';
import { createServer, Model } from 'miragejs';
import { App } from './App';
import { timeStamp } from 'console';

createServer({
  models: {
    transaction: Model,
  },

  routes() {
    this.namespace = 'api';
    
    this.get('transactions', () => {
      return this.schema.all('transaction')
    });

    this.post('transactions', (schema, request) => {
      const data = JSON.parse(request.requestBody);
      return schema.create('transaction');
    })

  }
});

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);