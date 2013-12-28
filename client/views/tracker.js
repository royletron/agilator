Template.tracker.rendered = function(){
  $('.new_story.modal').modal('attach events', '.test.button', 'show')
}
Template.tracker.cooler = function(){
  return Stories.find({ project: Session.get('project')._id, status: 'new' }).fetch()
}
Template.tracker.backlog = function(){
  return Stories.find({ project: Session.get('project')._id, status: 'todo' }).fetch()
}
Template.tracker.current = function(){
  return Stories.find({ project: Session.get('project')._id, status: 'started' }).fetch()
}