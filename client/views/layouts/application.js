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

Handlebars.registerHelper("isProjectOwner", function(){
  return Session.get('project').owner == Meteor.user().username;
})

Handlebars.registerHelper("getActive", function(name) {
  console.log(name +": "+Session.get('currentpage'))
  if(name == Session.get('currentpage'))
    return ' active';
  else
    return '';
});
Handlebars.registerHelper("getSubActive", function(name) {
  console.log(name +": "+Session.get('currentsubpage'))
  if(name == Session.get('currentsubpage'))
    return ' active';
  else
    return '';
});

Handlebars.registerHelper("getUserAvatar", function(username) {
  var user = Meteor.users.findOne({username: username});
  if(user != undefined)
    return user.profile.avatar_url
});

Handlebars.registerHelper("getComments", function(item, type){
  var comments = Comments.find({item: item._id, type: type}, {sort: {createdat: -1}}).fetch();
  if(comments.length == 0)
    return false;
  else
    return comments;
})

Handlebars.registerHelper("getCommentsLength", function(item, type){
  var comments = Comments.find({item: item._id, type: type}).fetch();
  if(comments.length == 0)
    return 'No comments';
  if(comments.length == 1)
    return '1 comment';
  if(comments.length > 1)
    return comments.length+' comments'
})