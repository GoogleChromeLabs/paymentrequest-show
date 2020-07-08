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
import { html } from 'lit-html';
import {
  editOptionsName,
  editOptionsPhone,
  editOptionsEmail,
  editOptionsBilling,
  editOptionsShipping
} from '../store/actions.js';
import { store } from '../store/store.js';
import { ShippingType } from './shipping-type.js';
import { ShippingOptions } from './shipping-options.js';

const editName = e => {
  const checked = e.target.checked;
  store.dispatch(editOptionsName(checked));
};

const editPhone = e => {
  const checked = e.target.checked;
  store.dispatch(editOptionsPhone(checked));
};

const editEmail = e => {
  const checked = e.target.checked;
  store.dispatch(editOptionsEmail(checked));
};

const editBilling = e => {
  const checked = e.target.checked;
  store.dispatch(editOptionsBilling(checked));
};

const editShipping = e => {
  const checked = e.target.checked;
  store.dispatch(editOptionsShipping(checked));
};

export const Options = (paymentRequest) => {
  const options = paymentRequest.options;
  const shippingOptions = paymentRequest.details.shippingOptions;

  return html`
    <div class="form-area">
      <div class="mdc-layout-grid__inner">
        <div class="mdc-layout-grid__cell mdc-layout-grid__cell--span-3">
          <mwc-formfield label="Buyer Name">
            <mwc-checkbox
              @change="${editName}"
              ?checked="${options.requestPayerName}"></mwc-checkbox>
          </mwc-formfield>
        </div>

        <div class="mdc-layout-grid__cell mdc-layout-grid__cell--span-3">
          <mwc-formfield label="Buyer Phone">
            <mwc-checkbox
              @change="${editPhone}"
              ?checked="${options.requestPayerPhone}"></mwc-checkbox>
          </mwc-formfield>
        </div>

        <div class="mdc-layout-grid__cell mdc-layout-grid__cell--span-3">
          <mwc-formfield label="Buyer Email">
            <mwc-checkbox
              @change="${editEmail}"
              ?checked="${options.requestPayerEmail}"></mwc-checkbox>
          </mwc-formfield>
        </div>

        <div class="mdc-layout-grid__cell mdc-layout-grid__cell--span-3">
          <mwc-formfield label="Buyer Billing Address">
            <mwc-checkbox
              @change="${editBilling}"
              ?checked="${options.requestPayerBillingAddress}"></mwc-checkbox>
          </mwc-formfield>
        </div>

        <div class="mdc-layout-grid__cell mdc-layout-grid__cell--span-12">
          <mwc-formfield label="Shipping">
            <mwc-checkbox
              @change="${editShipping}"
              ?checked="${options.requestShipping}"></mwc-checkbox>
          </mwc-formfield>
        </div>
      </div>
    </div>

    <section class="shipping-options ${options.requestShipping ? '': 'is-disabled'}">
      <h3>Shipping Type</h3>

      ${ShippingType(options)}

      <h2>Shipping Options</h2>
      <p>If you require shipping information (i.e. you have the shipping option ticked above) you can
      provide a set of shipping options for the user to select from.</p>
      <p>The UI will require the user to input an address to ship to which you listen to when it changes
      and accept or deny the address as valid.</p>

      ${ShippingOptions(shippingOptions)}

    </section>`;
}