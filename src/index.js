/*
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
import '@material/layout-grid/dist/mdc.layout-grid.min.css';
import '@material/mwc-button';
import '@material/mwc-icon-button';
import '@material/mwc-formfield';
import '@material/mwc-textfield';
import '@material/mwc-textarea';
import '@material/mwc-radio';
import '@material/mwc-checkbox';
import '@material/mwc-top-app-bar-fixed';
import '@material/mwc-snackbar';
import { render } from 'lit-html';
import { PaymentMethods } from './components/payment-methods.js';
import { DisplayItems } from './components/display-items.js';
import { Total } from './components/total.js';
import { Options } from './components/options.js';
import { Result } from './components/result.js';
import { store } from './store/store.js';
import {
  init,
  initPaymentMethods,
  initTotal,
  initDisplayItems,
  initShippingOptions,
  initOptions
} from './store/actions.js';

store.dispatch(init());

if (store.getState().request === null) {
  store.getState().request = [];
  store.dispatch(initPaymentMethods());
  store.dispatch(initTotal());
  store.dispatch(initDisplayItems());
  store.dispatch(initShippingOptions());
  store.dispatch(initOptions());
}

const renderApp = () => {
  const paymentRequest = store.getState().request;
  const result = store.getState().result;
  render(PaymentMethods(paymentRequest.paymentMethods),
    document.querySelector('#payment-methods-container'));
  render(DisplayItems(paymentRequest.details.displayItems),
    document.querySelector('#display-items-container'));
  render(Total(paymentRequest.details.total),
    document.querySelector('#total-container'));
  render(Options(paymentRequest),
    document.querySelector('#options-container'));
  render(Result(result),
    document.querySelector('#payment-request-result-container'));
}

const url = new URL(document.location.href);
if (url.searchParams.has('error')) {
  toast('There was an error');
}

store.subscribe(renderApp);

renderApp();
