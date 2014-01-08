  Template.project_sub_menu.title = function(){
  return Session.get("project").name
}

Template.project_sub_menu.events({
  'click #delete-button' : function(e, t)
  {
    console.log(Session.get('project'));
    showModal('Confirmation', '<p>Are you sure you want to delete the project \''+Session.get("project").name+'\'? This is irreversible.</p>', function(){ 
        //console.log('accept'); 
        Meteor.call('deleteProject', Session.get('project'))
        toastr.warning('Project deleted');
        Router.go('/');
      }, function(){ 
        //console.log('decline'); 
      });
  }
})

Template.project_sub_menu.project_url = function(){
  return '/project/'+Session.get('project').slug;
}