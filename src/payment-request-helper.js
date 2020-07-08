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
export class PaymentRequestHelper {
  constructor(details) {
    this.details = details;
  }

  getDetails() {
    return this.details;
  }

  removeItem(label) {
    let total = 0;
    for (let i = 0; i < this.details.displayItems.length; i++) {
      let item = this.details.displayItems[i];
      if (label == item.label) {
        this.details.displayItems.splice(i--, 1);
        // Remove all items with the same label
      } else {
        total += parseFloat(item.amount.value);
      }
    }
    this.details.total.amount.value = total.toString();
  }

  appendItem(item) {
    let total = 0;
    this.details.displayItems.push(item);
    for (let item of this.details.displayItems) {
     total += parseFloat(item.amount.value);
    }
    this.details.total.amount.value = total.toString();
  }

  selectPaymentMethod(methodName) {
    if (methodName.indexOf('another-pay') > 0) {
      const discountItem = {
        label: 'special discount',
        amount: {
          currency: 'USD',
          value: '-10.00'
        }
      }
      this.appendItem(discountItem);
    } else {
      this.removeItem('special discount');
    }
  }

  selectShippingOption(id) {
    const oldShippingOption =
      this.details.shippingOptions.find(option => option.selected);
    const newShippingOption =
      this.details.shippingOptions.find(option => option.id === id);

    // If `newShippingOption` is not assigned, no changes.
    if (!newShippingOption) return this.details;

    if (oldShippingOption) {
      oldShippingOption.selected = false;
      this.removeItem(oldShippingOption.label);
    }
    newShippingOption.selected = true;
    this.appendItem(newShippingOption); // `id` should be removed
  }
};
