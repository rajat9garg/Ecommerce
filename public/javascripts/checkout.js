var stripe = Stripe('pk_test_foO8iBnVl5PKFGgbNYnvs0pd');

var $form = $('checkout-form');

$form.submit(function(event){
  $form.find('button').prop('disabled', true);
  stripe.createToken('bank_account', 
  routing_number: '110000000',
  account_number: '000123456789',
  account_holder_name: 'Jenny Rosen',
  account_holder_type: 'individual',
}).then(function(result) {
  // Handle result.error or result.token
});
})
