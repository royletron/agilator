Template.new_project_modal.events({
  'click .new_project_submit' : function(e, t)
  {
    console.log($('#project_name').val());
    if($('#project_name').val() == "")
    {
      toastr.warning("Projects need a name!")
      e.preventDefault();
      return false;
    }
    else
    {
      Meteor.call('createProject', $('#project_name').val(), $('#project_description').val(), $('#project_team').val())
      toastr.success("Created project '"+$('#project_name').val()+"'")
    }
  }
})

Template.new_project_modal.teams = function(){
  if(Meteor.user())
    return Teams.find({owner: Meteor.user().username}).fetch();
}

Template.new_project_modal.default_team = function(){
  if(Meteor.user())
    var team = Teams.findOne({owner: Meteor.user().username});
  if(team == null)
    return false;
  else
    return team
}