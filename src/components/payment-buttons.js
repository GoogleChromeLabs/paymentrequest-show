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

export const PaymentButtons = (paymentMethods) => {
  return html`
    <div class="mdc-layout-grid__inner">
      ${paymentMethods.map(paymentMethod => html`
      <div class="mdc-layout-grid__cell mdc-layout-grid__cell--span-3">
        <mwc-button
          icon="account_balance_wallet"
          data-payment-method="${paymentMethod.supportedMethods}"
          @click="${pay}"
          style="--mdc-theme-primary: #33AA33"
          raised>
          BobBucks Pay
        </mwc-button>
      </div>`)}
      <div class="mdc-layout-grid__cell mdc-layout-grid__cell--span-3">
        <div id="google-pay"></div>
      </div>
<!--       <div id="line-pay">
    <img src="https://cdn.glitch.com/5683233d-c450-44bc-944d-32f182095464%2Flinepay_logo_119x39_v3.png?v=1569837529178" width="119" height="39">
    <form method="post" id="linepay_form" action="/linepay/reserve"></form>
  </div> -->
<!--       <div id="paypal"></div> -->
    </div>`;
}