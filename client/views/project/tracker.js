Template.tracker.rendered = function(){
  $('.new_story.modal').modal('attach events', '.test.button', 'show')
  $(document).ready(function(){
    $('#current').sortable({
      update: function(event, ui){
        $.each($('#current > .item'), function(idx, val){
          Meteor.call('setOrder', $(val).data('id'), idx);
        });
      }
    });
  });
}
Template.tracker.cooler = function(){
  return getStories({ project: Session.get('project')._id, status: 'new' });
}
Template.tracker.backlog = function(){
  return getStories({ project: Session.get('project')._id, status: 'todo' });
}
Template.tracker.current = function(){
  return getStories({ project: Session.get('project')._id, status: {$not : 'new'} }, {sort: {position: 1}})
}
getStories = function(query, sort){
  if(sort == undefined)
    sort = {};
  var stories = Stories.find(query, sort).fetch();
  $.each(stories, function(idx, val){
    val.user_info = Meteor.users.findOne({username: val.owner});
  });
  console.log(stories);
  return stories;
}