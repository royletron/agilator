Template.new_story_modal.members = function(){
  var members = []
  $.each(Meteor.users.find({_id : { $in: Session.get("project").members } }).fetch(), function(idx, val){
    members.push({ name : val.profile.name, id : val._id, avatar : val.profile.avatar_url });
  })
  return members
}
Template.new_story_modal.events({
  'click .new_story_submit' : function(e, t)
  {
    /*console.log($('#project_name').val());
    if($('#project_name').val() == "")
    {
      toastr.warning("Projects need a name!")
    }
    else
    {
      Meteor.call('createProject', $('#project_name').val(), $('#project_description').val())
    }*/
    console.log('hey');
    if($('#story_name').val() == "")
    {

    }
    else{
      Meteor.call('createStory', Session.get('project'), $('#story_name').val(), $('#story_description').val(), $('#story_type').val(), $('#story_requester').val(), $('#story_owner').val())
    }
  }
})