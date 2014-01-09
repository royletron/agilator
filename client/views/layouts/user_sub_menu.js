Template.user_sub_menu.active_stories = function(){
  if(Meteor.user())
    return Stories.find({owner: Meteor.user().username, status: {$nin : ['new', 'todo']}}).fetch().length;
}