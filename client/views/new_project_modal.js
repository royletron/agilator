Template.new_project_modal.events({
  'click .new_project_submit' : function(e, t)
  {
    console.log($('#project_name').val());
    if($('#project_name').val() == "")
    {
      toastr.warning("Projects need a name!")
    }
    else
    {
      Meteor.call('createProject', $('#project_name').val(), $('#project_description').val())
      toastr.success("Created project '"+$('#project_name').val()+"'")
    }
  }
})