Template.home.updates = function(){
  return Session.get("user_updates");
}
Template.home.user_projects = function(){
  return Session.get("user_projects")
}
Template.home.has_projects = function(){
  return(Session.get("user_projects").length > 0)
}
Template.home.rendered = function(){
  $modal = $('.new_project.modal')
  //console.log($modal);
  if(Meteor.user())
    $modal.modal('attach events', '.launch_modal.button', 'show')
}
Template.home.user_name = function(user){
  if(user != undefined)
  {
    if(user.username == Meteor.user().username)
      return 'You'
    else
      return user.profile.name;
  }
  else{
    return '?';
  }
}