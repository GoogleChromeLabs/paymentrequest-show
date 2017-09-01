/* eslint-disable max-len */
const getDisplayItemTemplate = () => {
  const uniqueId = `display-item-${Date.now()}`;
  return `<div class="mdl-grid mdl-grid--no-spacing display-item-wrapper">
    <div class="mdl-cell mdl-cell--6-col">
      <div class="needs-mdl-upgrade mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
        <input class="mdl-textfield__input display-item-label" type="text" id="${uniqueId}-label" value="">
        <label class="mdl-textfield__label" for="${uniqueId}-label">Label</label>
      </div>
    </div>
    <div class="mdl-cell mdl-cell--4-col">
      <div class="needs-mdl-upgrade mdl-textfield mdl-js-textfield  mdl-textfield--floating-label">
        <input class="mdl-textfield__input display-item-amount" type="text" pattern="-?[0-9]*(\.[0-9]+)?" id="${uniqueId}-amount" value="">
        <label class="mdl-textfield__label" for="${uniqueId}-amount">Amount</label>
        <span class="mdl-textfield__error">The value must be a number.</span>
      </div>
    </div>
    <div class="mdl-cell mdl-cell--2-col">
      <div class="needs-mdl-upgrade mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
        <input class="mdl-textfield__input display-item-currency" type="text" id="${uniqueId}-currency" value="USD">
        <label class="mdl-textfield__label" for="${uniqueId}-currency">Currency</label>
      </div>
    </div>
  </div>`;
};

const getShippingOptionTemplate = (shippingId) => {
  const uniqueId = `shipping-opt-${Date.now()}`;
  const randomLabel = window.namegen();
  return `<div class="mdl-grid mdl-grid--no-spacing shipping-options-wrapper">
  <div class="mdl-cell mdl-cell--1-col">
    <div class="needs-mdl-upgrade mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
      <input class="mdl-textfield__input shipping-opt-id" type="text" id="${uniqueId}-id" value="${shippingId}">
      <label class="mdl-textfield__label" for="${uniqueId}-id">ID</label>
    </div>
  </div>
    <div class="mdl-cell mdl-cell--5-col">
      <div class="needs-mdl-upgrade mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
        <input class="mdl-textfield__input shipping-opt-label" type="text" id="${uniqueId}-label" value="${randomLabel}">
        <label class="mdl-textfield__label" for="${uniqueId}-label">Label</label>
      </div>
    </div>
    <div class="mdl-cell mdl-cell--3-col">
      <div class="needs-mdl-upgrade mdl-textfield mdl-js-textfield  mdl-textfield--floating-label">
        <input class="mdl-textfield__input shipping-opt-amount" type="text" pattern="-?[0-9]*(\.[0-9]+)?" id="${uniqueId}-amount" value="">
        <label class="mdl-textfield__label" for="${uniqueId}-amount">Amount</label>
        <span class="mdl-textfield__error">The value must be a number.</span>
      </div>
    </div>
    <div class="mdl-cell mdl-cell--1-col">
      <div class="needs-mdl-upgrade mdl-textfield mdl-js-textfield  mdl-textfield--floating-label">
        <input class="mdl-textfield__input shipping-opt-currency" type="text" value="USD">
        <label class="mdl-textfield__label" for="${uniqueId}-amount">Current</label>
      </div>
    </div>
    <div class="mdl-cell mdl-cell--2-col center-selected">
      <label class="needs-mdl-upgrade mdl-checkbox mdl-js-checkbox mdl-js-ripple-effect" for="${uniqueId}-selected">
        <input type="checkbox" id="${uniqueId}-selected" class="mdl-checkbox__input shipping-opt-selected">
        <span class="mdl-checkbox__label">Selected</span>
      </label>
    </div>
  </div>`;
};
/* eslint-enable max-len */

class DemoController {
  constructor() {
    this._shippingId = 0;

    // Just to set the initial state
    this.onEnableShippingChange();

    const addDisplayItemBtn = document.querySelector('.add-display-item');
    addDisplayItemBtn.addEventListener('click', () => this.addDisplayItem());

    const enableShippingCheckbox = document.querySelector('#checkbox-shipping');
    enableShippingCheckbox.addEventListener('change',
      () => this.onEnableShippingChange());

    const addShippingOptBtn = document.querySelector('.add-shipping-opt');
    addShippingOptBtn.addEventListener('click', () => this.addShippingOpt());

    const canMakePaymentBtn = document.querySelector('.can-make-payment-btn');
    canMakePaymentBtn.addEventListener('click',
                                       () => this.canMakePaymentClick());

    const buyNowBtn = document.querySelector('.buy-now-btn');
    buyNowBtn.addEventListener('click', () => this.buyNowClick());
  }

  addDisplayItem() {
    const templateString = getDisplayItemTemplate();
    const documentHack = document.createElement('div');
    documentHack.innerHTML = templateString;
    const newDisplayItem = documentHack.firstChild;

    const mdlElements = newDisplayItem.querySelectorAll(`.needs-mdl-upgrade`);
	for (var i = 0; i < mdlElements.length; i++) {
	  var mdlElement = mdlElements[i];
	  window.componentHandler.upgradeElement(mdlElement);
	}

    const itemsContainer = document.querySelector('.display-items-container');
    itemsContainer.appendChild(newDisplayItem);
  }

  addShippingOpt() {
    this._shippingId++;
    const templateString = getShippingOptionTemplate(this._shippingId);

    const documentHack = document.createElement('div');
    documentHack.innerHTML = templateString;
    const newDisplayItem = documentHack.firstChild;

    const mdlElements = newDisplayItem.querySelectorAll(`.needs-mdl-upgrade`);
	for (var i = 0; i < mdlElements.length; i++) {
	  var mdlElement = mdlElements[i];
	  window.componentHandler.upgradeElement(mdlElement);
	}

    const itemsContainer = document.querySelector('.shipping-opts-container');
    itemsContainer.appendChild(newDisplayItem);
  }

  _createPaymentRequest() {
    // Supported payment methods
    const supportedCardNetworks = [];
    const basicCardCheckboxes = document.querySelectorAll(
      '.basic-card-payment-methods input[type=\'checkbox\']');
	for (var i = 0; i < basicCardCheckboxes.length; i++) {
		var basicCardCheckbox = basicCardCheckboxes[i];
		if (basicCardCheckbox.checked &&
			basicCardCheckbox.dataset.cardnetwork) {
			supportedCardNetworks.push(basicCardCheckbox.dataset.cardnetwork);
		}
	}
    const basicCards = {
      supportedMethods: ['basic-card'],
      data: {
        supportedNetworks: supportedCardNetworks,
      },
    };

    const displayItemsFromUI = [];
    const displayItemElements =
      document.querySelectorAll('.display-item-wrapper');
	for (var i = 0; i < displayItemElements.length; i++) {
		var displayItemElement = displayItemElements[i];
		const labelValue =
        displayItemElement.querySelector('.display-item-label').value;
	    const amountValue =
		  displayItemElement.querySelector('.display-item-amount').value;
	    const currencyValue =
		  displayItemElement.querySelector('.display-item-currency').value;

	    if (!labelValue || labelValue.length === 0 ||
		  !amountValue || amountValue.length === 0) {
		  console.warn('Found a display item without a label and / ' +
		    'or amount value so excluding it from the results.');
		  return;
	    }

	    displayItemsFromUI.push({
		  label: labelValue,
		  amount: {
		    currency: currencyValue,
		    value: amountValue,
		  },
	    });
	}

    const totalLabelValue =
      document.querySelector('.summary-label').value;
    const totalCurrencyValue =
      document.querySelector('.summary-currency').value;
    const totalAmountValue =
      document.querySelector('.summary-amount').value;

    const totalFromUI = {
      label: totalLabelValue,
      amount: {
        currency: totalCurrencyValue,
        value: totalAmountValue,
      },
    };

    const shippingOptionsFromUI = [];
    const shippingOptionElements =
      document.querySelectorAll('.shipping-options-wrapper');
	for (var i = 0; i < shippingOptionElements.length; i++) {
	  var shippingOptionElement = shippingOptionElements[i];
      const idValue =
        shippingOptionElement.querySelector('.shipping-opt-id').value;
      const labelValue =
        shippingOptionElement.querySelector('.shipping-opt-label').value;
      const amountValue =
        shippingOptionElement.querySelector('.shipping-opt-amount').value;
      const currencyValue =
        shippingOptionElement.querySelector('.shipping-opt-currency').value;
      const selectedValue =
        shippingOptionElement.querySelector('.shipping-opt-selected').checked;

      if (!labelValue || labelValue.length === 0 ||
        !amountValue || amountValue.length === 0) {
        console.warn('Found a display item without a label and / ' +
          'or amount value so excluding it from the results.');
        return;
      }

      shippingOptionsFromUI.push({
        id: idValue,
        label: labelValue,
        amount: {
          currency: currencyValue,
          value: amountValue,
        },
        selected: selectedValue,
      });
    }

    const options = {
      requestPayerName: false,
      requestPayerPhone: false,
      requestPayerEmail: false,
      requestShipping: false,
    };

    if (document.querySelector('#checkbox-buyer-name').checked) {
      options.requestPayerName = true;
    }

    if (document.querySelector('#checkbox-buyer-phone').checked) {
      options.requestPayerPhone = true;
    }

    if (document.querySelector('#checkbox-buyer-email').checked) {
      options.requestPayerEmail = true;
    }

    if (document.querySelector('#checkbox-shipping').checked) {
      options.requestShipping = true;
    }
    const selectedShippingType = document.querySelector(
      '.shipping-type-option input[type=\'radio\']:checked');
    if (selectedShippingType && selectedShippingType.value !== 'default') {
      options.shippingType = selectedShippingType.value;
    }

    // Why is this an array of an object with supportedMethods?
    const supportedInstruments = [basicCards];
    const details = {
      displayItems: displayItemsFromUI,
      // Excluding total will result in an error - it's a required field.
      total: totalFromUI,
      shippingOptions: shippingOptionsFromUI,
    };

    const paymentRequest = new PaymentRequest(
      supportedInstruments,
      details,
      options);

    paymentRequest.addEventListener(
      'shippingaddresschange',
      (event) => this.onShippingAddressChange(event, details)
    );
    paymentRequest.addEventListener(
      'shippingoptionchange',
      (event) => this.onShippingOptionChange(event, details)
    );

    return paymentRequest;
  }

  canMakePaymentClick() {
    const paymentRequest = this._createPaymentRequest();
    const cmpResultContainer =
        document.querySelector('.can-make-payment-result-container pre');

    paymentRequest.canMakePayment()
    .then((result) => {
      cmpResultContainer.textContent = JSON.stringify(result, null, 2);
    })
    .catch((err) => {
      cmpResultContainer.textContent = err.message;

      console.group(
        'The promise from `paymentRequest.canMakePayment()` was rejected.');
      console.warn(`The error message received was: '${err.message}'`);
      console.error(err);
      console.groupEnd();
    });
  }

  buyNowClick() {
    var paymentRequest = this._createPaymentRequest();

    paymentRequest.show()
    .then((result) => {
      // Process the payment
      const data = {};
      data.methodName = result.methodName;
      data.details = result.details;

      const prResultContainer =
        document.querySelector('.payment-request-result-container pre');
      prResultContainer.textContent = JSON.stringify(data, null, 2);

      console.group('Payment Request Result');
      console.log('Data: ', JSON.stringify(data, null, 2));
      console.log('Result: ', result);
      console.groupEnd();

      return result.complete('success');
    })
    .catch((err) => {
      console.group(
        'The promise from `paymentRequest.show()` was rejected.');
      console.warn('This is normally due to the user closing or cancelling ' +
        'the payment request UI.');
      console.warn(`The error message received was: '${err.message}'`);
      console.error(err);
      console.groupEnd();
    });
  }

  // This event has nothing to do with Payment Request - just to explain
  // the UI / behavior a little bit.
  onEnableShippingChange() {
    const isEnabled = document.querySelector('#checkbox-shipping').checked;
    const shippingEnabledUI =
      document.querySelector('.depends-on-shipping-enabled');
    if (isEnabled) {
      shippingEnabledUI.classList.remove('is-disabled');
    } else {
      shippingEnabledUI.classList.add('is-disabled');
    }
  }

  onShippingAddressChange(event, previousDetails) {
    const paymentRequest = event.target;
    console.log(`Received a 'shippingaddresschange' event, change to: `,
      paymentRequest.shippingAddress);

    // The response needs to be details + at least one shipping option.
    // If no shipping option is defined then the API treats it as the
    // address is invalid.

    // TODO: Can you define a custom error "We only ship to US addresses..."

    // Assume every address is valid in this demo.

    event.updateWith(previousDetails);
  }

  onShippingOptionChange(event, previousDetails) {
    const paymentRequest = event.target;
    console.log(`Received a 'shippingoptionchange' event, change to: `,
      paymentRequest.shippingOption);
	for (var i = 0; i < previousDetails.shippingOptions.length; i++) {
	  var shippingOption = previousDetails.shippingOptions[i];
	  shippingOption.selected =
        shippingOption.id === paymentRequest.shippingOption;
	}

    // NOTE: You would normally update the total at this point in a normal
    // implementation, but to highlight that the PaymentRequest API
    // does no calculations, we are leaving the title as the user has
    // defined it.
    //
    // You would also need to include the shipping cost in the very initial
    // total if you mark a shipping option as selected by default.

    event.updateWith(previousDetails);
  }
}

window.addEventListener('load', function() {
  if (window.PaymentRequest) {
    // Enable the demo
    const demoContainer = document.querySelector('.demo-container');
    demoContainer.classList.remove('is-not-supported');
    new DemoController();
  } else {
    document.querySelector('.supported-warning').classList.remove('hide');
  }
});
