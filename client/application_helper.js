Template.layout.rendered = function(){
  if(Session.get('error_message'))
    toastr.error(Session.get('error_message'))
  if(Session.get('warning_messsage'))
    toastr.warning(Session.get('warning_messsage'))
  if(Session.get('success_message'))
    toastr.success(Session.get('success_message'))
  Session.set('error_message', undefined)
  Session.set('warning_messsage', undefined)
  Session.set('success_message', undefined)

  $.each($('.timeago'), function(idx, item){

  });

  update_time();
  setInterval(update_time,1000);
  console.log('app');

  var inta = setInterval(function(){
    clearInterval(inta);
    $('.active.modal').modal('refresh')
  }, 1000)
}


function update_time(){
  $('.timeago').each(function(idx, item){
    item.innerHTML = moment.unix($(item).data('timestamp')).fromNow();
  });
}