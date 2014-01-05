Template.project.project = function(){
  return Session.get('project');
}
Template.project.events({
  'click #post-comment': function(e, t){
    Meteor.call('createComment', $('#comment-body').html(), Session.get('project')._id, 'project', function(){
      toastr.success('Comment added!');
      $('#comment-body').html('');
    })
  }
})

var penloaded = false;

var onPenLoad = function() {
  penloaded = true;
  if(!this._editor)
    this._editor = new Pen('#comment-body');
}

var chargeRandomPerson = function() {
  // Do something here with the stripe api.
  this._editor = new Pen('#comment-body');
  console.log(this._editor);
};

Template.project.created = function() {
  Meteor.Loader.loadCss("/bower_components/pen/src/pen.css");
  Meteor.Loader.loadJs("/bower_components/pen/src/pen.js", onPenLoad);
};

Template.project.rendered = function() {
  if(penloaded)
    this._editor = new Pen('#comment-body');
  
  console.log(this._editor);
}