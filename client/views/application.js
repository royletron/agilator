showModal = function(header, body, accept, decline){
  $modal = $('.confirmation.modal');
  $modal.find('.header').html(header);
  $modal.find('.right.body-text').html(body);
  $('.confirmation.modal')
  .modal('setting', {
    closable  : false,
    onDeny    : function(){
      decline()
    },
    onApprove : function() {
      accept();
    }
  }).modal('show');
}