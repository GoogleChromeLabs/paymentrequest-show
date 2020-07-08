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
import { PaymentRequestHelper } from './payment-request-helper.js';

export const requestPayment = async (methods, details, options) => {
  const request = new PaymentRequest(methods, details, options);
  request.addEventListener('paymentmethodchange', e => {
    const helper = new PaymentRequestHelper(details);
    helper.selectPaymentMethod(e.methodName);
    e.updateWith(helper.getDetails());
  });
  request.addEventListener('shippingaddresschange', e => {
    const helper = new PaymentRequestHelper(details);
    // e.updateWith(Promise.resolve(details));
    const country = request.shippingAddress.country;
    if (country == 'US') {
      // How do we restrict the option when the customer selects international?
      helper.selectShippingOption('standard');
    } else if (country == 'JP') {
      helper.selectShippingOption('international');
    }
    e.updateWith(helper.getDetails());
  });
  request.addEventListener('shippingoptionchange', e => {
    const helper = new PaymentRequestHelper(details);
    helper.selectShippingOption(request.shippingOption);
    // e.updateWith(Promise.resolve(details));
    e.updateWith(helper.getDetails());
  });
  try {
    const result = await request.show();
    return new Promise(resolve => {
      setTimeout(e => {
        result.complete('success');
        resolve(result);
      }, 2000);
    });
  } catch (e) {
    return Promise.reject(e);
  }
};

const snackbar = document.querySelector('#snackbar');
export const toast = text => {
  snackbar.labelText = text;
  snackbar.show();
}
