Template.project_sub_menu.title = function(){
  return Session.get("project").name
}

Template.project_sub_menu.events({
  'click #delete-button' : function(e, t)
  {
    console.log(Session.get('project'));
    showModal('Confirmation', '<p>Are you sure you want to delete the project \''+Session.get("project").name+'\'? This is irreversible.</p>', function(){ 
        //console.log('accept'); 
        var name = Session.get("project").name;
        Projects.remove({_id: Session.get("project")._id});
        Meteor.call('createUpdate', 'trash', "Deleted the project '"+name+"'");
        Session.set('warning_messsage', 'Project deleted');
        Router.go('/');
      }, function(){ 
        //console.log('decline'); 
      });
  }
})