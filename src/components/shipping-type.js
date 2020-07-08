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
  editOptionsShippingType,
  removeOptionsShippingType
} from '../store/actions.js';
import { store } from '../store/store.js';

const editShippingType = e => {
  const type = e.target.value;
  store.dispatch(editOptionsShippingType(type));
};

const removeShippingType = e => {
  store.dispatch(removeOptionsShippingType());
}

export const ShippingType = (options) => {
  return html`
    <div class="form-area">
      <div class="mdc-layout-grid__inner">
        <div class="mdc-layout-grid__cell mdc-layout-grid__cell--span-3">
          <mwc-formfield label="No Type (i.e. default)">
            <mwc-radio
              name="options"
              @change="${removeShippingType}"
              ?checked="${options.shippingType === undefined}"
              value=""></mwc-radio>
          </mwc-formfield>
        </div>
        <div class="mdc-layout-grid__cell mdc-layout-grid__cell--span-3">
          <mwc-formfield label="Shipping">
            <mwc-radio
              name="options"
              @change="${editShippingType}"
              ?checked="${options.shippingType == 'shipping'}"
              value="shipping"></mwc-radio>
          </mwc-formfield>
        </div>
        <div class="mdc-layout-grid__cell mdc-layout-grid__cell--span-3">
          <mwc-formfield label="Delivery">
            <mwc-radio
              name="options"
              @change="${editShippingType}"
              ?checked="${options.shippingType == 'delivery'}"
              value="delivery"></mwc-radio>
          </mwc-formfield>
        </div>
        <div class="mdc-layout-grid__cell mdc-layout-grid__cell--span-3">
          <mwc-formfield label="Pickup">
            <mwc-radio
              name="options"
              @change="${editShippingType}"
              ?checked="${options.shippingType == 'pickup'}"
              value="pickup"></mwc-radio>
          </mwc-formfield>
        </div>
      </div>
    </div>`;
}