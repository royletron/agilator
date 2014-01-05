Template.teams.events({

})
Template.teams.user_owned_teams = function(){
  if(Session.get('user_owned_teams').length > 0)
    return Session.get('user_owned_teams')
  else
    return false
}

Template.teams.rendered = function(){
  $modal = $('.new_team.modal')
  $modal.modal('attach events', '#new-button', 'show')
}