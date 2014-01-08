Template.tracker.rendered = function(){
  //$('.new_story.modal').modal('attach events', '.test.button', 'show')
  $(document).ready(function(){
    $( "#cooler, #backlog" ).sortable({
      connectWith: ".connected",
      update: function(event, ui){
        $.each($('#backlog > .item'), function(idx, val){
          Meteor.call('setOrder', $(val).data('id'), idx, 'todo');
        });
        $.each($('#cooler > .item'), function(idx, val){
          Meteor.call('setOrder', $(val).data('id'), idx, 'new');
        });
      }
    }).disableSelection();
    $('#current').sortable({
      update: function(event, ui){
        $.each($('#current > .item'), function(idx, val){
          Meteor.call('setOrder', $(val).data('id'), idx);
        });
      }
    });
    $('.new_story.modal').modal('setting', {
      onShow : function() {
        //window.alert('Show!!');
        jigItem('#story_type')
        jigItem('#story_points')
        jigItem('#story_requester')
        jigItem('#story_owner')
      }
    })
  });
}
jigItem = function(el){
  $(el).parent().find('.text').html($(el).parent().find("[data-value='"+$(el).val()+"']").text());
}
Template.tracker.events({
  'click .test.button': function(e,t){
    Session.set('current_story', '')
    $('.edit_story_submit').hide();
    $('.new_story_submit').show();
    $('#story_id').val('');
    $('#story_header').html('New Story');
    $('.new_story.modal').modal('show');
  }
})
Template.tracker.cooler = function(){
  return cooler();
}
Template.tracker.backlog = function(){
  return backlog();
}
Template.tracker.current = function(){
  return current();
}
Template.tracker.cooler_points = function(){
  var count = 0; 
  $.each(cooler(), function(idx, val){
    count += parseInt(val.points);
  });
  return count
}
Template.tracker.backlog_points = function(){
  var count = 0; 
  $.each(backlog(), function(idx, val){
    count += parseInt(val.points);
  });
  return count 
}
Template.tracker.current_points = function(){
  var count = 0; 
  $.each(current(), function(idx, val){
    count += parseInt(val.points);
  });
  return count
}

cooler = function(){
  return getStories({ project: Session.get('project')._id, status: 'new' }, {sort: {position: 1}});
}
backlog = function(){

  return getStories({ project: Session.get('project')._id, status: 'todo' }, {sort: {position: 1}});
}
current = function(){
  return getStories({ project: Session.get('project')._id, status: {$nin : ['new', 'todo']} }, {sort: {position: 1}})
}
getStories = function(query, sort){
  if(sort == undefined)
    sort = {};
  var stories = Stories.find(query, sort).fetch();
  $.each(stories, function(idx, val){
    val.user_info = Meteor.users.findOne({username: val.owner});
    if(val.user_info == null)
      val.user_info = Session.get("user_"+val.owner)
//      val.user_info = Meteor.call("getGithubMember", val.owner)
  });
  console.log(stories);
  return stories;
}