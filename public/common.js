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
    const oldShippingOption = this.details.shippingOptions.find(option => {
      return option.selected;
    });    
    const newShippingOption = this.details.shippingOptions.find(option => {
      return option.id === id;
    });

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
